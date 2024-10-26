import time
import tkinter as tk
from tkinter import Canvas
from PIL import Image, ImageTk
import io
import qrcode
import requests
from flask import Flask, request, jsonify
from threading import Thread
import os
import RPi.GPIO as GPIO

app = Flask(__name__)

COUNTDOWN_SECONDS = 15
GPIO_PIN = 26  # GPIO pin to control the servo

class QRCodeApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Pasumai")
        self.root.geometry("320x240")
        self.root.attributes("-fullscreen", True)

        self.canvas = Canvas(self.root, width=320, height=240, bg="white")
        
        self.circle_center = (160, 120)
        self.circle_radius = 100

        self.timer_text = self.canvas.create_text(
            160, 120, text=f"{COUNTDOWN_SECONDS}s", font=("Arial", 24), fill="black"
        )

        self.qr_code_label = tk.Label(self.root)
        self.qr_code_label.pack()

        self.get_and_show_qr_code()

    def display_timer(self, seconds):
        """Show the countdown timer, animate the circle, and control the servo."""
        self.qr_code_label.pack_forget() 
        self.canvas.pack()  

       
        GPIO.output(GPIO_PIN, GPIO.HIGH)
        print("Setting GPIO pin to HIGH (servo open).")

      
        import picamera
        from datetime import datetime

        camera = picamera.PiCamera()
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        video_filename = f"{self.otp}_{timestamp}.h264"
        camera.start_recording(video_filename)

        
        for i in range(seconds, 0, -1):
            self.canvas.itemconfig(self.timer_text, text=f"{i}s")
            self.update_circle(i, seconds)
            self.root.update() 
            camera.wait_recording(1)

        camera.stop_recording()
        camera.close()

        self.canvas.pack_forget()
        self.verifying_label = tk.Label(self.root, text="Verifying...", font=("Arial", 24), fg="black")
        self.verifying_label.pack()


        GPIO.output(GPIO_PIN, GPIO.LOW)
        print("Setting GPIO pin to LOW (servo closed).")

        mp4_filename = f"{self.otp}_{timestamp}.mp4"
        command = f"ffmpeg -i {video_filename} -c:v libx264 -strict experimental {mp4_filename}"
        os.system(command)
        with open(mp4_filename, 'rb') as video_file:
            response = requests.post('http://192.168.1.2:8000/vidupload', files={'video': video_file})
            if response.status_code == 200:
                print("Video uploaded successfully")
            else:
                print("Failed to upload video")

        
        self.verifying_label.pack_forget()

        
        self.get_and_show_qr_code()

    def update_circle(self, current, total):
        """Update the circular progress bar based on the remaining time"""
        angle = (current / total) * 360


        self.canvas.delete("circle")  
        self.canvas.create_arc(
            self.circle_center[0] - self.circle_radius,
            self.circle_center[1] - self.circle_radius,
            self.circle_center[0] + self.circle_radius,
            self.circle_center[1] + self.circle_radius,
            start=90,  
            extent=-angle,  
            outline="blue",
            width=5,
            style="arc",
            tags="circle"
        )

    def get_and_show_qr_code(self):
        """Generate and display QR code"""
        response = requests.get('http://192.168.1.2:8000/generate-otp')
        data = response.json()
        self.otp = data['otp']

        
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=8,
            border=4,
        )
        qr.add_data(self.otp)
        qr.make(fit=True)
        img = qr.make_image(fill='black', back_color='white')

        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format='PNG')
        img_byte_arr = img_byte_arr.getvalue()
        pil_image = Image.open(io.BytesIO(img_byte_arr))
        tk_image = ImageTk.PhotoImage(pil_image)

        self.qr_code_label.config(image=tk_image)
        self.qr_code_label.image = tk_image 
        self.qr_code_label.pack()

@app.route('/validated', methods=['POST'])
def validated():
    """Endpoint that starts the countdown when the user scans the OTP"""
    app_instance.display_timer(seconds=COUNTDOWN_SECONDS)
    return jsonify({'status': 'Countdown started'}), 200

if __name__ == "__main__":
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(GPIO_PIN, GPIO.OUT)

    root = tk.Tk()
    app_instance = QRCodeApp(root)

    flask_thread = Thread(target=app.run, kwargs={'host': '0.0.0.0', 'port': 5000})
    flask_thread.daemon = True 
    flask_thread.start()

    try:
        root.mainloop()
    finally:
        # Cleanup GPIO on exit
        GPIO.cleanup()
