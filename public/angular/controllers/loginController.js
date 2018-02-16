//var app = angular.module('chatapp', ['ui.router', 'ngMaterial', 'ngAnimate', 'toaster']);

app.controller('LoginController', ['$scope', '$filter', 'toaster', '$state', 'ChatService', 'AuthService', function($scope, $filter, toaster, $state, ChatService, AuthService){

	$scope.emitLeaveEvent =function () {

	if (localStorage.localTokenKey) socket.emit('leave', localStorage.localTokenKey);
	AuthService.destoryUserCredentials();
	$state.go('login');

	}

	//make socket connection
	var socket = io('http://localhost:3000');

	$scope.login = function (userName, password) {

		var userData = {
			userName: userName,
			password: password
		}

		if (!userName || userName == '') {
			toaster.pop('warning', 'username can\'t be empty');
		}
		else if (!password || password == '') {
			toaster.pop('warning', 'password can\'t be empty');
		}
		else {
			ChatService
			.loginUser(userData)
			.then(function successCallback(response){
				toaster.pop('success', response.data.message);
				response = response.data;
				console.log(response);
				AuthService.storeUserCredentials($scope.userName);
				$state.go('main.chatwindow');
			},
			function errorCallback(response){
				if (response.status == 400) toaster.pop('warning', response.data.message);
				else if (response.status == 401) toaster.pop('warning', response.data.message);
				else if (response.status == 500) toaster.pop('error', response.data.message);
				console.log(response);
			}); // end loginUser
		}

	}

}]); // end of 'LoginController'