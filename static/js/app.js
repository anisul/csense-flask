'use strict';

var app = angular.module('CsenseFlask', ['csenseFlaskServices', 'ngRoute', 'ngMap', 'rzModule', 'ui.bootstrap','ngAnimate', 'ngSanitize', 'twitter.timeline']);

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
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
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
