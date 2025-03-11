(function () {
    'use strict';

    angular.module('MenuApp', ['ngRoute'])
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$routeProvider'];
    function RoutesConfig($routeProvider) {
        $routeProvider
            .when('/signup', {
                templateUrl: 'signup.html',
                controller: 'SignupController as signupCtrl'
            })
            .when('/myinfo', {
                templateUrl: 'myinfo.html',
                controller: 'MyInfoController as myinfoCtrl'
            })
            .otherwise({
                redirectTo: '/signup'
            });
    }
})();
