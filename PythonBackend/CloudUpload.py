from flask import Flask, request
from google.cloud import storage
from flask_cors import CORS
import Model
import os

app = Flask(__name__)

bucket_name = "python_upload_script"
credentials = "bdbiarrydet-246dc976c94c.json"

def cloud_upload(source_path, destination_name):
    storage_client = storage.Client.from_service_account_json(credentials)
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(destination_name)
    blob.upload_from_filename(source_path)
    return "file uploaded"


@app.route('/upload', methods=['GET', 'POST'])
def upload():
    file = request.files['file']
    name = file.filename
    destination = "Uploads/" + name
    file.save(destination)
    result = Model.get_prediction(destination)
    return result

if __name__ == "__main__":
    app.run(debug = True, host= "0.0.0.0")

CORS(app, expose_headers='Authorization')