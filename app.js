(function () {
  'use strict';

  angular.module('MenuApp', ['ui.router'])
  .service('MenuDataService', ['$http', function ($http) {
    var service = this;

    service.getAllCategories = function () {
      return $http.get('https://coursera-jhu-default-rtdb.firebaseio.com/categories.json')
        .then(response => response.data);
    };

    service.getItemsForCategory = function (categoryShortName) {
      return $http.get(`https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${categoryShortName}.json`)
        .then(response => response.data.menu_items);
    };
  }])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        template: '<h1>Welcome to our Restaurant</h1><a ui-sref="categories">View Categories</a>'
      })
      .state('categories', {
        url: '/categories',
        template: '<ul><li ng-repeat="category in catCtrl.categories"><a ui-sref="items({ categoryShortName: category.short_name })">{{ category.name }}</a></li></ul>',
        controller: ['MenuDataService', function (MenuDataService) {
          var catCtrl = this;
          MenuDataService.getAllCategories().then(data => catCtrl.categories = data);
        }],
        controllerAs: 'catCtrl'
      })
      .state('items', {
        url: '/items/{categoryShortName}',
        template: '<ul><li ng-repeat="item in itemCtrl.items">{{ item.name }} - {{ item.description }}</li></ul>',
        controller: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
          var itemCtrl = this;
          MenuDataService.getItemsForCategory($stateParams.categoryShortName).then(data => itemCtrl.items = data);
        }],
        controllerAs: 'itemCtrl'
      });
  }]);

})();
