from flask import Flask, render_template, request, Response
from flask import url_for, redirect, send_from_directory
from flask import send_file, make_response, abort

import os, sys
sys.path.append(os.path.join(os.path.dirname(__file__), "../"))

from manager import DatabaseManager

app = Flask(__name__)

app.url_map.strict_slashes = False

db = DatabaseManager()

@app.route('/')
@app.route('/about')
@app.route('/devices')
@app.route('/manage-events')
@app.route('/login')
@app.route('/lost-report')
def basic_pages(**kwargs):
    return make_response(open('templates/index.html').read())
# routing for basic pages (pass routing onto the Angular app)

@app.route('/<model_name>/<item_id>')
def rest_device_page(**kwargs):
    return make_response(open('templates/index.html').read())
# routing for REST alike pages (pass routing onto the Angular app)

@app.route('/getEvent', methods=['POST'])
def get_Event():
    event_id = request.json['event_id']
    device_id = request.json['device_id']
    fromDate = request.json['fromDate']
    toDate = request.json['toDate']
    status = request.json['status']
    changeDate = request.json['changedDate']
    changeBy = request.json['changedBy']
    event_type = request.json['event_type']
    if event_id == "" :
        event_id = "all"
    if device_id == "" :
        device_id = "all"
    if event_type == "" :
        event_type = "all"
    if fromDate == "" :
        fromDate = "all"
    if toDate == "" :
        toDate = "all"
    if status == "" :
        status = "all"
    if changeDate == "" :
        changeDate = "all"
    if changeBy == "" :
        changeBy = "all"
    return db.getEvent(event_id, device_id, fromDate, toDate, status, changeDate, changeBy, event_type), 200, {'Content-Type': 'application/json'}

@app.route('/saveEvent', methods=['POST'])
def save_Event():
    name = request.json['device_id']
    latitude = request.json['latitude']
    longitude = request.json['longitude']
    event_type = request.json['type']
    if name is not None and latitude is not None and longitude is not None and event_type is not None:
        return db.saveEvent(name, latitude, longitude, event_type), 200, {'Content-Type': 'application/json'}
    else:
        return {"status":"Failed to save as data is incomplete!"}

@app.route('/updateEvent', methods=['POST'])
def update_Event():
    event_id = request.json['event_id']
    status = request.json['status']
    updated_by = request.json['updated_by']
    return db.updateEvent(event_id, status, updated_by), 200, {'Content-Type': 'application/json'}

@app.route('/getDevice', methods=['POST'])
def get_device():
    deviceName = request.json['device_id']
    status = request.json['status']
    if deviceName == "" :
        deviceName = "all"
    if status == "" :
        status = "all"
    return db.getDevice(deviceName, status), 200, {'Content-Type': 'application/json'}

@app.route('/checkDevice', methods=['POST'])
def check_device():
    deviceName = request.json['device_mac']
    return db.checkDevice(deviceName), 200, {'Content-Type': 'application/json'}

@app.route('/saveDevice', methods=['POST'])
def save_Device():
    device_id = request.json['device_id']
    device_mac = request.json['device_mac']
    if device_id != None and device_mac != None:
        return db.saveDevice(device_id, device_mac), 200, {'Content-Type': 'application/json'}
    else:
        return {"status":"Failed to save as data is incomplete!"}

@app.route('/updateDevice', methods=['POST'])
def update_Device():
    device_id = request.json['device_id']
    status = request.json['status']
    return db.updateDevice(device_id, status), 200, {'Content-Type': 'application/json'}

@app.route('/saveUser', methods=['POST'])
def save_User():
    username = request.json['username']
    password = request.json['password']
    name = request.json['name']
    position = request.json['position']
    if username != None and password != None:
        return db.saveUser(username, password, name, position), 200, {'Content-Type': 'application/json'}
    else:
        return {"status":"Failed to save user as data is incomplete!"}

@app.route('/validateUser', methods=['POST'])
def validate_User():
    username = request.json['username']
    password = request.json['password']
    if username != None and password != None:
        return db.validateUser(username, password), 200, {'Content-Type': 'application/json'}
    else:
        return {"status":"Failed to validate user as data is incomplete!"}

@app.route('/getUserInfo', methods=['POST'])
def get_user():
    username = request.json['username']
    if username != None and password != None:
        return db.getUserInfo(username), 200, {'Content-Type': 'application/json'}
    else:
        return {"status":"Failed to validate user as data is incomplete!"}

if __name__ == "__main__":
    app.run()

#app.run(host=os.getenv('IP', '0.0.0.0'),port=int(os.getenv('PORT', 8080)))
