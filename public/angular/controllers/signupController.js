//var app = angular.module('chatapp', ['ui.router', 'ngMaterial', 'ngAnimate', 'toaster']);

app.controller('SignupController', ['$scope', '$filter', 'toaster', '$state', 'ChatService', function($scope, $filter, toaster, $state, ChatService){

	$scope.signup = function (userName, email, password) {

		var userData = {
			userName: userName,
			password: password
		}

		console.log(userData);

		ChatService
		.signupUser(userData)
		.then(function successCallback(response){
			toaster.pop('success', response.data.message);
			response = response.data;
			console.log(response);
			$state.go('login');
		},
		function errorCallback(response){
			if (response.status == 400) toaster.pop('warning', response.data.message);
			else if (response.status == 409) toaster.pop('warning', response.data.message);
			else if (response.status == 500) toaster.pop('error', response.data.message);
			console.log(response);
		}); // end signupUser

	}

}]); // end of 'SignupController'