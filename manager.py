import pymongo
from pymongo import MongoClient
from flask import Flask, jsonify, request
from datetime import datetime

MONGO_HOST = "mongodb://root:root@ds117848.mlab.com:17848/nodelogin"
MONGO_PORT = 23456
MONGO_DB = "nodelogin"
MONGO_USER = "root"
MONGO_PASS = "root"
connection = MongoClient(MONGO_HOST, MONGO_PORT)
mongo = connection[MONGO_DB]

class DatabaseManager:
    def getEvent(self, event_id, deviceName, fromDate, toDate, status, changeDate, changeBy, event_type):
        data = mongo.event
        today = datetime.today()
        output = []
        query = {}
        if event_id != "all" :
            query['event_id'] = event_id
        if event_type != "all" :
            query['event_type'] = event_type
        if deviceName != "all" :
            query['event_device_id'] = deviceName
        if fromDate != "all" and toDate != "all" :
            fromDate = parser.parse(fromDate)
            toDate = parser.parse(toDate)
            query['event_date_time'] = {"$lt": toDate, "$gte" : fromDate}
        if status != "all" :
            query['event_status'] = status
        if changeDate != "all" :
            query['event_date_updated'] = changeDate
        if changeBy != "all" :
            query['event_updated_by'] = changeBy
        for q in data.find(query):
            output.append({'latitude':q['event_latitude'],'longitude':q['event_longitude'],'event_date_time':q['event_date_time']})
        return jsonify({'status':'success','result':output, 'query':query})

    def saveEvent(self, device_id, latitude, longitude, value):
        data = mongo.event
        #currTime = datetime.now()
        currTime = datetime.today()
        device = mongo.device
        unique_id = str(uuid.uuid4())
        check_device = device.find_one({'device_id':device_id})
        if check_device['status'] == 'active' :
            save_id = data.insert({'event_id':unique_id,'event_device_id': device_id, 'event_latitude':latitude, 'event_longitude' : longitude, 'event_type' : value, 'event_date_time':currTime,'event_status':'new','event_updated_by':'','event_date_updated':''})
            new_data = data.find_one({'_id' : save_id})
            output = {'device_id':check_device['status'],'name' : new_data['event_device_id'], 'value':new_data['event_type']}
        else:
            output = {"device_id":"Device not registered or inactive! Please register device and try again."}
        return jsonify({'status':'success', 'result':output})

    def updateEvent(self, event_id, status, updated_by):
        data = mongo.event
        currTime = datetime.now()
        update_id = data.update({"event_id":event_id}, {'$set': {"event_status":status, "event_updated_by":updated_by, "event_date_updated": currTime}})
        new_data = data.find_one({'event_id' : event_id})
        output = {'name' : new_data['event_device_id'], 'value':new_data['event_type']}
        return jsonify({'status':'success', 'result':output})

    def getDevice(self, deviceName, status):
        data = mongo.device
        output = []
        query = {}
        if deviceName != "all" :
            query['device_id'] = deviceName
        if status != "all" :
            query['status'] = status
        for q in data.find(query):
            output.append({'deviceId':q['device_id'],'status':q['status'],'device_mac':q['device_mac']})
        return jsonify({'status':'success', 'result':output})

    def saveDevice(self, deviceId, deviceMac):
        data = mongo.device
        save_id = data.insert({'device_id': deviceId, 'status':'active','device_mac':deviceMac})
        new_data = data.find_one({'_id' : save_id})
        output = {'device_id' : new_data['device_id'], 'mac':new_data['device_mac']}
        return jsonify({'status':'success', 'result':output})

    def updateDevice(self, device_id, status):
        data = mongo.device
        currTime = datetime.now()
        if data.find_one({'device_id' : device_id}):
            update_id = data.update({"device_id":device_id}, {'$set': {"status":status, "date_updated": currTime}})
            new_data = data.find_one({'device_id' : device_id})
            output = {'device_id' : new_data['device_id'], 'status':new_data['status']}
        else:
            output = {"device_id":"device not found!"}
        return jsonify({'status':'success', 'result':output})

'''
    def getData(self):
        data = mongo.event
        output = []
        for q in data.find():
            output.append({'latitude':q['event_latitude'],'longitude':q['event_longitude']})
        return jsonify({'result':output})

    def getUserSubmittedData(self, username):
        data = mongo.event
        output = []
        for q in data.find({'event_device_id': username}):
            output.append({'latitude':q['event_latitude'],'longitude':q['event_longitude']})
        return jsonify({'result':output})
    
    def saveData(self, name, latitude, longitude, value):
        data = mongo.event
        currTime = str(datetime.now())
        save_id = data.insert({'event_device_id': name, 'event_latitude':latitude, 'event_longitude' : longitude, 'event_type' : value, 'event_date_time':currTime}) 
        new_data = data.find_one({'_id' : save_id})
        output = {'name' : new_data['event_device_id'], 'value':new_data['event_type']}
        return jsonify({'result':output})
'''