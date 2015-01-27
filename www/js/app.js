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
  });
  $urlRouterProvider.otherwise('/app-login');
});


// ===============================================
// ============= Application Service =============
// ===============================================
simplydo.factory('DataService', function($resource, $state, $http){
  // return $resource('https://simply-do-api.herokuapp.com/api/', {}, {
  //   login: {
  //           method : 'post',
  //           url : 'https://simply-do-api.herokuapp.com/api/login/',
  //           headers : {'Content-Type': 'application/x-www-form-urlencoded'},
  //   },
  //   retrieveTasks: {
  //           method : 'get',
  //           url : 'https://simply-do-api.herokuapp.com/api/tasks/',
  //           headers : {'Content-Type': 'application/x-www-form-urlencoded'},
  //   }
  // });
  
  var domain = 'https://simply-do-api.herokuapp.com/api';
  var headerData = {'Content-Type': 'application/x-www-form-urlencoded'}

  return {
    login: function(input){
      return $http.post(domain + '/login', input, { headers: headerData}).success(function(){
        $state.go('app');
      });
    },
    getTasks: function(){
      return $http.get(domain + '/tasks');
    }, 
    addTask: function(input){
      return $http.post(domain + '/tasks');
    }
  }
});


// ===============================================
// ============ Login Page Controller ============
// ===============================================
simplydo.controller('LoginController', ['$scope', '$state', 'DataService', function($scope, $state, DataService){
  $scope.formData = {};
  
  $scope.requestLogin = function(){
    $scope.dataConnection = DataService.login($.param({
      username: $scope.formData.username,
      password: $scope.formData.password
    })).error(function(){
      $scope.formData.error = 'Incorrect Username or Password';
    });
    console.log($scope.dataConnection);
  };
}]);


// ===============================================
// ============ Task Page Controller =============
// ===============================================
simplydo.controller('TaskController', function($scope, DataService){
    
  $scope.tasks = DataService.getTasks().error(function(){
    $scope.tasks.error = 'Failed to load tasks';
  });
  console.log($scope.tasks);

  $scope.refreshTasks = function(){
    $scope.tasks = DataService.getTasks().error(function(){
      $scope.tasks.error = 'Failed to load tasks';
    });
    console.log($scope.tasks);
  };

  

  // $scope.tasks = [
  //   {
  //     title: 'Ideas',
  //     tags: [
  //       {tag: 'Idea'}, 
  //       {tag: 'Work'}
  //     ],
  //     images: [
  //       {url: 'http://cdn.wonderfulengineering.com/wp-content/uploads/2014/07/HD-landscape-Photographs-3.jpg'},
  //       {url: 'http://background-download.com/background/animals-computer-dog-hd-landscape-view-wallpaper-39345.jpg'}
  //     ],
  //     contents: [
  //       {content: 'Hello I am text for a task'},
  //       {content: 'THis is a second task'},
  //       {content: 'THe 3rd task thing to do'}
  //     ]
  //   },
  //   {
  //     title: 'Dog',
  //     tags: [
  //       {tag: 'Idea'}, 
  //       {tag: 'Work'}
  //     ],
  //     images: [
  //       {url: 'http://background-download.com/background/animals-computer-dog-hd-landscape-view-wallpaper-39345.jpg'},
  //       {url: 'http://cdn.wonderfulengineering.com/wp-content/uploads/2014/07/HD-landscape-Photographs-3.jpg'}
  //     ],
  //     contents: [
  //       {content: 'Hello I am text for a task'},
  //       {content: 'THis is a second task'},
  //       {content: 'THe 3rd task thing to do'}
  //     ]
  //   },
  //   {
  //     title: 'Ideas',
  //     tags: [
  //       {tag: 'Idea'}, 
  //       {tag: 'Work'}
  //     ],
  //     images: [
  //       {url: 'http://background-download.com/background/animals-computer-dog-hd-landscape-view-wallpaper-39345.jpg'},
  //       {url: 'http://cdn.wonderfulengineering.com/wp-content/uploads/2014/07/HD-landscape-Photographs-3.jpg'}
  //     ],
  //     contents: [
  //       {content: 'Hello I am text for a task'},
  //       {content: 'THis is a second task'},
  //       {content: 'THe 3rd task thing to do'}
  //     ]
  //   },
  //   {
  //     title: 'Ideas',
  //     tags: [
  //       {tag: 'Idea'}, 
  //       {tag: 'Work'}
  //     ],
  //     images: [
  //       {url: 'http://cdn.wonderfulengineering.com/wp-content/uploads/2014/07/HD-landscape-Photographs-3.jpg'},
  //       {url: 'http://background-download.com/background/animals-computer-dog-hd-landscape-view-wallpaper-39345.jpg'}
  //     ],
  //     contents: [
  //       {content: 'Hello I am text for a task'},
  //       {content: 'THis is a second task'},
  //       {content: 'THe 3rd task thing to do'}
  //     ]
  //   }
  // ];
});