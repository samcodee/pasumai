from flask import Flask, request, jsonify
import os
import uuid
import random
import torch
from transformers import ViTForImageClassification, ViTFeatureExtractor
from PIL import Image
import requests

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

OTP_FILE = 'otp.txt'

#u can also use google/vit-base-patch16-224 as model
model_name = 'dima806/garbage_types_image_detection' 
model = ViTForImageClassification.from_pretrained(model_name)
feature_extractor = ViTFeatureExtractor.from_pretrained(model_name)

# generate 6dig otp
@app.route('/generate-otp', methods=['GET'])
def generate_otp():
    otp = str(random.randint(100000, 999999))
    with open(OTP_FILE, 'w') as f:
        f.write(otp) 
    return jsonify({'otp': otp}), 200

# otp verification
@app.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.json
    received_otp = data.get('otp')
    try:
        with open(OTP_FILE, 'r') as f:
            stored_otp = f.read().strip()

        if received_otp == stored_otp:
            requests.post('http://localhost:5000/validated')
            return jsonify({'status': 'valid'}), 200
        else:
            return jsonify({'status': 'invalid'}), 400

    except FileNotFoundError:
        return jsonify({'error': 'OTP not generated'}), 400

#vid upload handler
@app.route('/vidupload', methods=['POST'])
def vidupload():
    if 'video' not in request.files:
        return jsonify({'error': 'No video uploaded'}), 400

    file = request.files['video']
    filename = f"{uuid.uuid4()}.mp4"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    return jsonify({'status': 'Video uploaded successfully', 'filename': filename}), 200


# Image classification
@app.route('/classify', methods=['POST'])
def classify():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']
    filename = f"{uuid.uuid4()}.jpg"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    img = Image.open(filepath)
    inputs = feature_extractor(images=img, return_tensors="pt")

    with torch.no_grad():
        outputs = model(**inputs)
        preds = torch.argmax(outputs.logits, dim=1)
        label = model.config.id2label[preds.item()]

    return jsonify({'label': label, 'filename': filename})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
