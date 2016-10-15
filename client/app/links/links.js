angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  $scope.data = {};

  $scope.getAll = function() {
    Links.getAll()
    .then(function(resp) {
      $scope.data.links = resp;
    });
  }();

  $scope.$watch('filter', function() {
    console.log($scope.filter);
  });
});
