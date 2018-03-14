from flask import Flask, render_template, request, Response
from flask import url_for, redirect, send_from_directory
from flask import send_file, make_response, abort

import os, sys
sys.path.append(os.path.join(os.path.dirname(__file__), "../"))

#from database_manager.manager import DatabaseManager

app = Flask(__name__)

#db = DatabaseManager()

# routing for basic pages (pass routing onto the Angular app)
@app.route('/')
@app.route('/about')
def basic_pages(**kwargs):
    return make_response(open('templates/index.html').read())

'''
@app.route('/getData')
def get_data():
    return db.getData(), 200, {'Content-Type': 'application/json'}

@app.route('/saveData', methods=['POST'])
def save_Data():
    name = request.json['username']
    latitude = request.json['latitude']
    longitude = request.json['longitude']
    value = request.json['value']

    return db.saveData(name, latitude, longitude, value), 200, {'Content-Type': 'application/json'}


@app.route('/getUserSubmittedData', methods=['POST'])
def get_User_Submitted_Data():
    name = request.json['username']

    return db.getUserSubmittedData(name), 200, {'Content-Type': 'application/json'}
'''

if __name__ == "__main__":
    app.run()

app.run(host=os.getenv('IP', '0.0.0.0'),port=int(os.getenv('PORT', 8080)))