'use strict';

/* Controllers */

function IndexController($scope, $http) {
    $scope.events = {};

    $scope.deviceId = "";
    $scope.eventId = "";
    $scope.fromDate = "";
    $scope.toDate = "";
    $scope.status = "";
    $scope.changedDate = "";
    $scope.changedBy = "";
    $scope.eventType = "";

    var data = {
        "device_id" : $scope.deviceId,
        "event_id": $scope.eventId,
        "fromDate": $scope.fromDate,
        "toDate": $scope.toDate,
        "status": $scope.status,
        "changedDate": $scope.changedDate,
        "changedBy": $scope.changedBy,
        "event_type": $scope.eventType
    };

    $scope.loadEvents = function () {
        var data = {};

        data.device_id = $scope.deviceId;
        data.event_id = $scope.eventId;
        data.fromDate = $scope.fromDate;
        data.toDate = $scope.toDate;
        data.status = $scope.status;
        data.changedDate = $scope.changedDate;
        data.changedBy = $scope.changedBy;
        data.event_type = $scope.eventType;

        $http({
            method: "POST",
            url: "/getEvent",
            data: data
        }).then(successCallback, errorCallback);

        function successCallback(response){
            $scope.events = response.data.result;

            for (var i = 0; i < $scope.events.length; i++) {
                var position = [];
                position.push($scope.events[i].latitude);
                position.push($scope.events[i].longitude);
                $scope.events[i].pos = position;
            }

            $scope.zoomToIncludeMarkers();
        }

        function errorCallback(error){
            //error code
        }
    }();
        
    $scope.search = function () {
        $scope.loadEvents();
    }

    $scope.zoomToIncludeMarkers = function() {
        var bounds = new google.maps.LatLngBounds();
        $scope.events.forEach(function(c) {
            var latLng = new google.maps.LatLng(c.pos[0],c.pos[1]);
            bounds.extend(latLng);
        });
        $scope.map.fitBounds(bounds);
        $scope.map.setZoom(13);
    };
}

function AboutController($scope, $http) {

}

function DevicesController($scope, $http, $location) {
    $scope.devices = {};

    $scope.deviceId = ""; //for fetching all devices
    $scope.deviceStatus = "";

    var data = {
        "device_id" : $scope.deviceId,
        "status": $scope.deviceStatus
    };

    $scope.loadDevices = function () {
        var data = {};

        data.device_id = $scope.deviceId;
        data.status = $scope.deviceStatus;

        $http({
            method: "POST",
            url: "/getDevice",
            data: data
        }).then(successCallback, errorCallback);

        function successCallback(response){
            $scope.devices = response.data.result;
        }

        function errorCallback(error){
            //error code
        }
    }();
}

function DeviceController($scope, $http, $routeParams, $location, $window) {
    if ($routeParams.id === '-1') {
        $scope.id = 0;
    } else {
        $scope.id = $routeParams.id;
    }

    $scope.pageTitle = $scope.id ? "Update Device" : "Create A New Device";
    $scope.alerts = {};

    var deviceInfo = function () {
        if ($scope.id) {
            var data = {
                "device_id" : $scope.id,
                "status": ""
            };
            $http({
                method: "POST",
                url: "/getDevice",
                data: data
            }).then(function successCallback(response) {
                $scope.device = response.data.result[0];
            },function errorCallback(response) {
                //error code
            });
        }
    }();

    $scope.update = function () {
        $scope.alerts.length = 0;

        if (!$scope.editForm.$invalid) {
            var data = {
                "device_id" : $scope.device.deviceId,
                "status": $scope.device.status,
                "device_mac": $scope.device.device_mac
            };

            if ($scope.id != 0) {
                $http({
                    method: "POST",
                    url: "/updateDevice",
                    data: data
                }).then(function successCallback(response) {
                    $window.history.back();
                },function errorCallback(response) {
                    //error code
                });
            } else {
                $http({
                    method: "POST",
                    url: "/saveDevice",
                    data: data
                }).then(function successCallback(response) {
                    $window.history.back();
                },function errorCallback(response) {
                    //error code
                });
            }
        }
    }

    $scope.back = function () {
        $scope.device = {};
        $window.history.back();
    }
}

function DeviceDetailController($scope, $http, $routeParams, $location, $window) {
    $scope.device = {};

    var data = {
        "device_id" : $routeParams.id,
        "status": ""
    };

    $scope.loadDevice = function () {
        $http({
            method: "POST",
            url: "/getDevice",
            data: data
        }).then(successCallback, errorCallback);

        function successCallback(response){
            $scope.device = response.data.result[0];
        }

        function errorCallback(error){
            //error code
        }
    };

    $scope.loadDevice();

    $scope.back = function () {
        $scope.device = {};
        $window.history.back();
    }
}