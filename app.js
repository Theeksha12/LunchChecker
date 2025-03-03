(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);

  // Inject dependencies
  NarrowItDownController.$inject = ['MenuSearchService'];
  
  function NarrowItDownController(MenuSearchService) {
      var ctrl = this;
      ctrl.searchTerm = "";
      ctrl.found = [];

      ctrl.narrowItDown = function () {
          if (!ctrl.searchTerm) {
              ctrl.found = [];
              ctrl.errorMessage = "Nothing found";
              return;
          }

          var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
          promise.then(function (foundItems) {
              ctrl.found = foundItems;
              ctrl.errorMessage = foundItems.length === 0 ? "Nothing found" : "";
          });
      };

      ctrl.removeItem = function (index) {
          ctrl.found.splice(index, 1);
      };
  }

  MenuSearchService.$inject = ['$http'];
  
  function MenuSearchService($http) {
      var service = this;
      var apiUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json";

      service.getMatchedMenuItems = function (searchTerm) {
          return $http.get(apiUrl).then(function (response) {
              var allItems = response.data;
              var foundItems = [];

              // Loop through categories and filter items
              for (var category in allItems) {
                  allItems[category].menu_items.forEach(function (item) {
                      if (item.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                          foundItems.push(item);
                      }
                  });
              }

              return foundItems;
          });
      };
  }

  function FoundItemsDirective() {
      return {
          restrict: 'E',
          templateUrl: 'foundItems.html',
          scope: {
              found: '<',
              onRemove: '&'
          }
      };
  }
})();
