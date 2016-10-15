angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  $scope.data = {};

  $scope.getAll = function() {
    Links.getAll()
    .then(function(resp) {
      $scope.data.links = resp;
    });
  }();

})


.directive('ngShortenedLink', function() {
  return {
    template:
      '<div class="link code"> Code: {{link.code}} </div>' +
      '<div class="link url"> URL: {{link.url}} </div>' +
      '<div class="link title"> Title: {{link.title}} </div>' +
      '<div class="link visits"> Visits: {{link.visits}} </div>'
  };
});

// .directive('ngShortenedLink', function() {
//   return {
//     scope: {
//       datasource: '='
//     },

//     template: '<div>{{datasource}} HELLO </div>'
  // template: '<div class="shortened">' + 
  //     '<div class="code"> Code: {{data.links.code}} {{link.code}} </div>' +
  //     '<div class="url"> URL: {{data.links.url}} {{link.url}} </div>' +
  //     '<div class="visits"> Visits: {{data.links.visits}} {{link.visits}} </div>' +
  //     '<div class="title"> Title: {{data.links.title}} {{link.title}} </div>' +
  //     '</div>' 
  
