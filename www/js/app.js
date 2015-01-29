// ===============================================
// ================ Dependancies =================
// ===============================================
var simplydo = angular.module('simplydo', ['ionic', 'ngResource']);


// ===============================================
// ============= Application Execute =============
// ===============================================
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


// ===============================================
// ================ Configuration ================
// ===============================================
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('app', {
    url:'/app',
    templateUrl: "templates/home.html"
  })
  .state('app-login', {
    url:'/app-login',
    templateUrl: "templates/login.html"
  })
  .state('app-task', {
    url:'/app-task',
    templateUrl: "templates/task.html"
  });
  $urlRouterProvider.otherwise('/app-login');
});


// ===============================================
// ============= Application Service =============
// ===============================================
simplydo.factory('DataService', function($resource, $state, $http){
  var domain = 'https://simply-do-api.herokuapp.com/api';
  var headerData = {'Content-Type': 'application/x-www-form-urlencoded'}

  return {
    login: function(input){
      return $http({
        url: domain + '/login',
        withCredentials: true,
        method: 'POST',
        data: 'username=' + input.username + '&password=' + input.password,
        headers: headerData
      });
    },
    getTasks: function(){
      return $http({
        url: domain + '/tasks',
        method: 'GET',
        withCredentials: true
      });
    }, 
    addTask: function(input){
      return $http({
        url: domain + '/tasks' + input,
        method: 'POST',
        withCredentials: true
      });
    }
  };
});


// ===============================================
// ============ Login Page Controller ============
// ===============================================
simplydo.controller('LoginController', ['$scope', '$state', 'DataService', function($scope, $state, DataService){
  $scope.formData = {};
  
  $scope.requestLogin = function(){
    $scope.dataConnection = DataService.login({
      username: $scope.formData.username,
      password: $scope.formData.password
    }).then(function(){
       $state.go('app');
    },function(){
       $scope.formData.error = 'Incorrect Username or Password';
    });
    console.log($scope.dataConnection);
  };
}]);


// ===============================================
// ============ Task Page Controller =============
// ===============================================
simplydo.controller('TaskController', function($scope, $state, DataService){
  $scope.tasks = DataService.getTasks().then(function(){
    // Success
    console.log($scope.tasks);
  },function(){
    $scope.tasks.error = 'Failed to load tasks';
  });

  $scope.refreshTasks = function(){
    $scope.tasks = DataService.getTasks().then(function(){
      // Success
      console.log($scope.tasks);
    }, function(){
      $scope.tasks.error = 'Failed to load tasks';
    });
    console.log($scope.tasks);
  };

  $scope.addTask = function(){
    $state.go('app-task');
  };
});


// ===============================================
// ============ Add Task Controller ==============
// ===============================================
simplydo.controller('AddTaskController', function($scope, $state, DataService){
  $scope.goBack = function(){
    $state.go('app');
  };

  $scope.addTask = function(){
    $scope.temp = 
      {
        title: $scope.formData.title,
        tags: [
          {tag: $scope.formData.tags}
        ],
        images: [
          {url: $scope.formData.images}
        ],
        contents: [
          {content: $scope.formData.content}
        ]
      };
    

    console.log($scope.temp);

    DataService.addTask(
      $scope.temp

    ).then(function(){
    }, function(){
      $scope.tasks.error = 'Failed to add task';
    });

    $state.go('app');
  };
});