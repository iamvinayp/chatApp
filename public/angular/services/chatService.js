//var app = angular.module('chatapp', ['ui.router', 'ngMaterial', 'ngAnimate', 'toaster']);

// using factory method

app.factory('ChatService', ['$http', function ($http) {

	var chatAPIS  =  {};
	var baseUrl = 'http://localhost:3000/api';

	chatAPIS.signupUser = function (userData) {

		return $http.post(baseUrl + '/users/signup', userData);

	}// end userSignin()

	chatAPIS.loginUser = function (userData) {

		return $http.post(baseUrl + '/users/login', userData);

	}// end userSignin()

	return chatAPIS;

}]);//end ChatService