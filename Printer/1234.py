from flask import Flask, request
from flask_cors import CORS
from datetime import datetime
from diff_match_patch import diff_match_patch
from bs4 import BeautifulSoup
import threading
import requests
import time
import logging
import os
from queue import Queue
# Load the shared library
import ctypes
startPrint = ctypes.CDLL('./print.so')
# Define the function signature
startPrint.print_file.restype = None
startPrint.print_file.argtypes = (ctypes.c_char_p,ctypes.c_int,)

printerID = "1234"

global counter
counter = 0
app = Flask(__name__)
CORS(app)
# Disable Flask logger
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

# utility function for logging
def logger(filename):
    url = 'http://127.0.0.1:8080/logFiles'
    data = {printerID, filename}
    response = request.post(url, data)
    if response.status_code == 200:
        # Request was successful
        print(response.text)
    else:
        # Request failed
        print('Request failed')

# Endpoint to upload file
@app.route('/4321', methods=['POST'])
def printFile():
    print("Received print request:")
    file = request.files['file']
    option = int(request.form['printOption'])
    filename = file.filename
    save_path = os.path.join('Files', filename)  # Specify the folder name
    file.save(save_path)
    print("File path: ", save_path)
    # C function call to print the file , passed save_path to access the file
    save_path = ctypes.c_char_p(save_path.encode())
    startPrint.print_file(save_path, option)
    logger(filename)
    return 'True'



if __name__ == '__main__':
    port = 8008
    app.run(port=port)
