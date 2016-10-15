angular.module('shortly', [
  'shortly.services',
  'shortly.links',
  'shortly.shorten',
  'shortly.auth',
  'ui.router'
])
.config(function ($httpProvider, $stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('signin', {
      url: '/signin',
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController',
      authenticate: false
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController',
      authenticate: false
    })
    .state('links', {
      url: '/links',
      templateUrl: 'app/links/links.html',
      controller: 'LinksController',
      authenticate: true
    })
    .state('shorten', {
      url: '/shorten',
      templateUrl: 'app/shorten/shorten.html',
      controller: 'ShortenController',
      authenticate: true
    });

    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
  $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.shortly');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $state, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  // $rootScope.$on('$stateChangeStart', function (evt, next, current) {
  $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
    if (toState.authenticate && !Auth.isAuth()) {
      evt.preventDefault();
      $state.transitionTo('signin');
    }
  });
});
