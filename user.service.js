(function () {
    'use strict';

    angular.module('MenuApp')
    .service('UserService', UserService);

    function UserService() {
        var service = this;
        service.user = null;

        // Save user data
        service.saveUser = function (userData) {
            service.user = userData;
        };

        // Get user data
        service.getUser = function () {
            return service.user;
        };
    }
})();
