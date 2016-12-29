(function() {
  "use strict";

  angular.module("app").controller("cartCtrl", 
    function($scope)
    {
      // DEBUG
      window.$scope = $scope;

      // Global Variables
      $scope.products = new Array;
      $scope.cart = new Array;
      $scope.cartSubtotal = 0;
      $scope.cartTax = 0;
      $scope.cartTotal = 0;

      // Dummy Data
      $scope.products.push({
        name: "Baseball",
        price: 5.00
      });

      $scope.products.push({
        name: "Pizza",
        price: 10.00
      });

      $scope.cart.push({product: $scope.products[0], quantity: 0});

      // Function Code
      $scope.updateCartTotals = function(){
        // Loop Through Cart Items, Calculate Subtotal, Tax, & Total.
        var subtotal = 0;
        for (var i = 0 ; i < $scope.cart.length; i++ ) {
          var item = $scope.cart[i];
          var product_total = 
            item.product.price * item.quantity;
          subtotal += product_total;
        }
        $scope.cartSubtotal = subtotal;
        $scope.cartTax = subtotal * .09;
        $scope.cartTotal = $scope.cartSubtotal + $scope.cartTax;
      }

      $scope.addToCart = function(product){
        // Find Product In Cart. 
        var item = $scope.getCartProductItem(product);

        // If first Product of Type in Cart, create new Item Object.
        if (item == undefined) {
          var new_item = {product: product, quantity: 1};
          $scope.cart.push(new_item);
        } else {
          // Else, Increment Quantity of Product in Cart.
          item.quantity += 1;
        }
        
        // updateCartTotals
        $scope.updateCartTotals();
      }

      $scope.removeFromCart = function(item){
        // Slice Associated Item Out of Cart Array. 
        var index = $scope.cart.indexOf(item);
        $scope.cart.splice(index,1);
        console.log("Removed Item at Index : "+index)
        // updateCartTotals
        $scope.updateCartTotals();
      }

      $scope.hasValue = function(obj,key,value) {
        return obj.hasOwnProperty(key) && (obj[key] == value);
      }

      $scope.cartHasProductItem = function(product) {
        // item.product.
        return $scope.cart.some(function(element) { return $scope.hasValue(element,'product',product)});
      }

      $scope.getCartProductItem = function(product){
        return $scope.cart.find(function(element) { return $scope.hasValue(element,'product',product)});
      }



      // Page Execution 
    }
  );

})();