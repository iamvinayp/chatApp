//var app = angular.module('chatapp', ['ui.router', 'ngMaterial', 'ngAnimate', 'toaster']);

// using factory method

app.factory('AuthService', [ function () {

	var localTokenKey, authToken, isLoggedin;
	var authAPIS = {};

	authAPIS.storeUserCredentials = function (userName) {

		localStorage.localTokenKey = userName;
		authAPIS.useCredentials(userName);

	}

	authAPIS.useCredentials = function (userName) {

		isLoggedin = true;
		authToken = userName;

	}

	authAPIS.loadUserCredentials = function () {

		if(localStorage.localTokenKey) {
			authAPIS.useCredentials(localStorage.localTokenKey);
		}
		return localStorage.localTokenKey;

	}

	authAPIS.destoryUserCredentials = function () {

		isLoggedin = false;
		authToken =undefined;
		localStorage.removeItem('localTokenKey');

	}

	return authAPIS;

}]);