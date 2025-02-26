(function () {
    'use strict';
  
    angular.module('LunchCheck', [])
      .controller('LunchCheckController', LunchCheckController);
  
    // Protect from minification
    LunchCheckController.$inject = ['$scope'];
  
    function LunchCheckController($scope) {
      // Default message and lunchItems model
      $scope.lunchItems = '';
      $scope.message = '';
  
      // Function to check the lunch items
      $scope.checkLunch = function () {
        var items = $scope.lunchItems.trim();
  
        // Check if the input is empty
        if (items === '') {
          $scope.message = 'Please enter data first';
          return;
        }
  
        // Split the input string by commas and filter empty strings
        var itemList = items.split(',').filter(function(item) {
          return item.trim() !== ''; // Ignore empty items
        });
  
        // Check the number of items
        if (itemList.length <= 3) {
          $scope.message = 'Enjoy!';
        } else {
          $scope.message = 'Too much!';
        }
      };
    }
  })();
  
