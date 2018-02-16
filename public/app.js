//declaring the module with dependencies
var app = angular.module('chatapp', ['ui.router', 'ngMaterial', 'ngAnimate', 'toaster', 'angucomplete']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/login');

	$stateProvider
	.state('login', {
		url: '/login',
		templateUrl: 'views/login.html',
		controller: 'LoginController'
	})
	.state('signup', {
		url: '/signup',
		templateUrl: 'views/signup.html',
		controller: 'SignupController'
	})
	.state('main', {
		url: '/main',
		templateUrl: 'views/main.html',
		controller: 'LoginController'
	})
	.state('main.chatwindow', {
		url: '/chatwindow',
		templateUrl: 'views/chatwindow.html',
		controller: 'ChatwindowController'
	});
}])
.run(['$rootScope', '$location', 'AuthService', function ($rootScope, $location, AuthService) {

	$rootScope.$on('$locationChangeStart', function (event, next, current) {
		// redirect to login page if not logged in
		// console.log('$locationChangeStart called');
		if ($location.path() !== '/login' && $location.path() !== '/signup' && !AuthService.loadUserCredentials()) {
				//event.preventDefault();
				$location.path('/login');
			}
	});

}]);
