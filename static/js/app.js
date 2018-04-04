'use strict';

var app = angular.module('CsenseFlask', ['CsenseFlask.filters', 'ngRoute', 'ngCookies', 'ngMap', 'rzModule', 'ui.bootstrap','ngAnimate', 'ngSanitize', 'twitter.timeline']);
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'static/partials/landing.html',
            controller: IndexController
        })
        .when('/login', {
            templateUrl: 'static/partials/login.html',
            controller: LoginController
        })
        .when('/manage-events', {
            templateUrl: 'static/partials/manage-events.html',
            controller: ManageEventsController
        })
        .when('/manage-event/:id', {
            templateUrl: 'static/partials/manage-event.html',
            controller: ManageEventController
        })
        .when('/users', {
            templateUrl: 'static/partials/users.html',
            controller: UsersController
        })
        .when('/about', {
            templateUrl: 'static/partials/about.html',
            controller: AboutController
        })
        .when('/help', {
            templateUrl: 'static/partials/help.html',
            controller: HelpController
        })
        .when('/devices', {
            templateUrl: 'static/partials/devices.html',
            controller: DevicesController
        })
        .when('/device/:id', {
            templateUrl: 'static/partials/device.html',
            controller: DeviceController
        })
        .when('/device-detail/:id', {
            templateUrl: 'static/partials/device-detail.html',
            controller: DeviceDetailController
        })
        .when('/lost-report', {
            templateUrl: 'static/partials/lost-report.html',
            controller: LostReportController
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

app.controller('MainController', function ($scope, $http, $location, $cookies) {
    $scope.admin = {};
    $scope.admin.loggedIn = "false";
    var cookie = $cookies.username;
    $scope.logout = function () {
        $http({
            method: "GET",
            url: "/logout"
        }).then(successCallback, errorCallback);

        function successCallback(response){
            $scope.admin.loggedIn = "false";
            $location.path('/');
        }

        function errorCallback(error){
            //error code
            console.log("log out failed");
        }
    };
});

/*
app.config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'static/partials/landing.html',
                    controller: IndexController
                })
                .when('/about', {
                    templateUrl: 'static/partials/about.html',
                    controller: AboutController
                })
                /!*.when('/post', {
                    templateUrl: 'static/partials/post-list.html',
                    controller: PostListController
                })
                .when('/post/:postId', {
                    templateUrl: '/static/partials/post-detail.html',
                    controller: PostDetailController
                })
                /!* Create a "/blog" route that takes the user to the same place as "/post" *!/
                .when('/blog', {
                    templateUrl: 'static/partials/post-list.html',
                    controller: PostListController
                })*!/
                .otherwise({
                    redirectTo: '/'
                })
            ;

            $locationProvider.html5Mode(true);
        }])
;*/
