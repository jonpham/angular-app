(function() {
  "use strict";

  angular.module("app").controller("pageCtrl", 
    function($scope)
    {
      $scope.message = "Hello World!";
      window.$scope = $scope;
    }
  );
})();