// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var simplydo = angular.module('simplydo', ['ionic', 'ngResource']);

simplydo.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('app', {
    url:'/app',
    templateUrl: "templates/home.html"
  })
  .state('app-login', {
    url:'/app-login',
    templateUrl: "templates/login.html"
  });
  $urlRouterProvider.otherwise('/app-login');
});

// simplydo.factory('AuthorizationService', function($resource){
//   return $resource('https://simply-do-api.herokuapp.com/api/');
// });

// simplydo.controller('LoginController', function($scope, $state, AuthorizationService){
//   $scope.posts = AuthorizationService.query();

//   $scope.formData = {};
//   $scope.login = function(){
//     console.log($scope.formData);
//     var request = new AuthorizationService.login($scope.formData);
//     request.$save();
//   }
// });

simplydo.controller('LoginController', function($scope, $state, $http){
  Waves.displayEffect();

  $scope.form = { username: "", password: "", error: "" };

  $scope.login = function(){
    // $http.post('https://simply-do-api.herokuapp.com/api/login/').then(function(res){
    //   console.log(res);
      // if(res.statusText == '/api')
        $state.go('app');
    // }, function(err){
    //   if(err){
    //     $scope.form.error = '*Username or Password incorrect';
    //   };
    // });
  };
});

simplydo.controller('TaskController', function($scope){
  $scope.tasks = [
    {
      title: 'Ideas',
      tags: [
        {tag: 'Idea'}, 
        {tag: 'Work'}
      ],
      contents: [
        {content: 'Hello I am text for a task'},
        {content: 'THis is a second task'},
        {content: 'THe 3rd task thing to do'}
      ]
    },
    {
      title: 'Car',
      tags: [
        {tag: 'Idea'}, 
        {tag: 'Work'}
      ],
      contents: [
        {content: 'Hello I am text for a task'},
        {content: 'THis is a second task'},
        {content: 'THe 3rd task thing to do'}
      ]
    },
    {
      title: 'Ideas',
      tags: [
        {tag: 'Idea'}, 
        {tag: 'Work'}
      ],
      contents: [
        {content: 'Hello I am text for a task'},
        {content: 'THis is a second task'},
        {content: 'THe 3rd task thing to do'}
      ]
    },
    {
      title: 'Ideas',
      tags: [
        {tag: 'Idea'}, 
        {tag: 'Work'}
      ],
      contents: [
        {content: 'Hello I am text for a task'},
        {content: 'THis is a second task'},
        {content: 'THe 3rd task thing to do'}
      ]
    }
  ];
});