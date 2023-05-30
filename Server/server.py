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
app = Flask(__name__)
CORS(app)
# Disable Flask logger
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)
# HashMap mapping printer ID and server locations
hashmap = {}
# logdata = {}
def addPrinters():
    hashmap["1234"] = "4321"
    hashmap["2341"] = "1432" 
    hashmap["3412"] = "2143" 
    hashmap["4123"] = "3214"  
    print("Hashmap updated")

addPrinters()

# Endpoint to check printer
@app.route('/checkPrinter', methods=['POST'])
def chckPrinter():
    print("Received a check req")
    id = request.get_data(as_text=True)
    if id not in hashmap:
        print("Not found: ", id)
        return 'NotFound'
    # forward the file to the url
    return hashmap[id]

@app.route('/logFiles', methods=['POST'])
def log():
    print("Received a log req")
    strs = request.get_data(as_text=True).split("\n")

    printerID = strs[0]
    fileName = strs[1]
    print("Printed file: ", fileName," at printer: ", printerID)
    return 'Logged successfully'



if __name__ == '__main__':
    port = 8080 
    app.run(port=port)
