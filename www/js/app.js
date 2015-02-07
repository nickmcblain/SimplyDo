// ===============================================
// ================ Dependancies =================
// ===============================================
var simplydo = angular.module('simplydo', ['ionic', 'ngResource']);


// ===============================================
// ============= Application Execute =============
// ===============================================
simplydo.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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
        url: domain + '/tasks',
        method: 'POST',
        withCredentials: true,
        data: input
      });
    },
    deleteTask: function(input){
      return $http({
        url: domain + '/tasks',
        method: 'DELETE',
        withCredentials: true,
        data: 'task_id=' + input,
        headers: headerData
      });
    }
  };
});


// ===============================================
// ============= Global Controller ===============
// ===============================================
simplydo.controller('AppCtrl', ['$scope', 'DataService', function($scope, DataService){
  $scope.refreshTasks = function(){
    $scope.tasks = DataService.getTasks().then(function(data){
      // Success
      $scope.tasks = data.data;
    }, function(){
      $scope.tasks.error = 'Failed to load tasks';
    });
  };
}]);


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
  $scope.refreshTasks();

  $scope.addTask = function(){
    $state.go('app-task');
  };
});


// ===============================================
// =========== Single Task Controller ============
// ===============================================
simplydo.controller('SingleTaskController', function($scope, DataService){
  $scope.deleteTask = function(){
    DataService.deleteTask($scope.task._id).then(function(){
      $scope.refreshTasks();
    }, function(err){
      console.log(err);
    });
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
        tags: $scope.formData.tags,
        image: $scope.formData.image,
        contents: [
          {content: $scope.formData.content}
        ]
      };

    DataService.addTask($scope.temp).then(function(){
      $scope.refreshTasks();
    }, function(err){
      console.log(err);
      $scope.tasks.error = 'Failed to add task';
    });

    $state.go('app');
  };
});