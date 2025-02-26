(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController);

  // Service to manage the shopping list data
  function ShoppingListCheckOffService() {
    var service = this;

    // Initial 'to buy' items
    var toBuyItems = [
      { name: "cookies", quantity: 10 },
      { name: "chips", quantity: 5 },
      { name: "soda", quantity: 3 },
      { name: "bread", quantity: 2 },
      { name: "milk", quantity: 1 }
    ];

    var alreadyBoughtItems = [];

    // Get items to buy
    service.getToBuyItems = function () {
      return toBuyItems;
    };

    // Get bought items
    service.getAlreadyBoughtItems = function () {
      return alreadyBoughtItems;
    };

    // Move item to 'Already Bought' list
    service.buyItem = function (itemIndex) {
      var item = toBuyItems.splice(itemIndex, 1)[0];
      alreadyBoughtItems.push(item);
    };
  }

  // Controller for 'To Buy' list
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyCtrl = this;
    toBuyCtrl.items = ShoppingListCheckOffService.getToBuyItems();

    // Buy an item
    toBuyCtrl.buyItem = function (item) {
      var itemIndex = toBuyCtrl.items.indexOf(item);
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  // Controller for 'Already Bought' list
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBoughtCtrl = this;
    alreadyBoughtCtrl.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
  }

})();
