(function () {
    'use strict';

    angular.module('MenuApp')
    .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['UserService', '$http'];
    function MyInfoController(UserService, $http) {
        var myinfoCtrl = this;
        myinfoCtrl.user = UserService.getUser();

        if (myinfoCtrl.user && myinfoCtrl.user.favoriteDish) {
            var dishCode = myinfoCtrl.user.favoriteDish.trim().toUpperCase();
            var categoryShortName = dishCode.charAt(0); 
            var itemNumber = parseInt(dishCode.slice(1)) - 1;  

            var url = `https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${categoryShortName}/menu_items/${itemNumber}.json`;

            $http.get(url).then(function (response) {
                if (response.data) {
                    myinfoCtrl.user.favoriteItem = {
                        name: response.data.name,
                        image: response.data.image_url || 'default-image.jpg'
                    };
                }
            });
        }
    }
})();
