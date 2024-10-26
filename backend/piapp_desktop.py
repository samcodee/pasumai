import time
import tkinter as tk
from tkinter import Canvas
from PIL import Image, ImageTk
import io
import qrcode
import requests
from flask import Flask, request, jsonify
from threading import Thread

app = Flask(__name__)

COUNTDOWN_SECONDS = 15

class QRCodeApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Pasumai")
        self.root.geometry("300x300")

        
        self.canvas = Canvas(self.root, width=300, height=300, bg="white")
        
        
        self.circle_center = (150, 150)
        self.circle_radius = 100

        
        self.timer_text = self.canvas.create_text(
            150, 150, text=f"{COUNTDOWN_SECONDS}s", font=("Arial", 24), fill="black"
        )

        
        self.qr_code_label = tk.Label(self.root)
        self.qr_code_label.pack()

        # Show the QR code on startup
        self.get_and_show_qr_code()

    def display_timer(self, seconds):
        """shows countdown"""
        self.qr_code_label.pack_forget()  
        self.canvas.pack()  

        
        for i in range(seconds, 0, -1):
           
            self.canvas.itemconfig(self.timer_text, text=f"{i}s")
            self.update_circle(i, seconds)

            self.root.update()  
            time.sleep(1)

       
        self.canvas.pack_forget()

        
        self.get_and_show_qr_code()

    def update_circle(self, current, total):
        """updates the circular progress bar based on the remaining time"""
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
        response = requests.get('http://localhost:8000/generate-otp')
        data = response.json()
        otp = data['otp']

        
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(otp)
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
   
    root = tk.Tk()
    app_instance = QRCodeApp(root)

    
    flask_thread = Thread(target=app.run, kwargs={'host': '0.0.0.0', 'port': 5000})
    flask_thread.daemon = True  
    flask_thread.start()

    
    root.mainloop()
