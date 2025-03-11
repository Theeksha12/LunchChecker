(function () {
    'use strict';

    angular.module('MenuApp')
    .controller('SignupController', SignupController);

    SignupController.$inject = ['UserService', '$http'];
    function SignupController(UserService, $http) {
        var signupCtrl = this;
        signupCtrl.user = {};
        signupCtrl.invalidDish = false;
        signupCtrl.saved = false;

        // Validate Favorite Dish
        signupCtrl.validateDish = function () {
            if (!signupCtrl.user.favoriteDish) return;

            var dishCode = signupCtrl.user.favoriteDish.trim().toUpperCase();
            var categoryShortName = dishCode.charAt(0); 
            var itemNumber = parseInt(dishCode.slice(1)) - 1;  

            var url = `https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${categoryShortName}/menu_items/${itemNumber}.json`;

            $http.get(url).then(function (response) {
                if (response.data) {
                    signupCtrl.invalidDish = false;
                } else {
                    signupCtrl.invalidDish = true;
                }
            }).catch(function () {
                signupCtrl.invalidDish = true;
            });
        };

        // Save Form Data
        signupCtrl.submitForm = function () {
            if (signupCtrl.invalidDish) return;

            UserService.saveUser({
                firstName: signupCtrl.user.firstName,
                lastName: signupCtrl.user.lastName,
                email: signupCtrl.user.email,
                phone: signupCtrl.user.phone,
                favoriteDish: signupCtrl.user.favoriteDish
            });

            signupCtrl.saved = true;
        };
    }
})();
