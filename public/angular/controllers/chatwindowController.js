//var app = angular.module('chatapp', ['ui.router', 'ngMaterial', 'ngAnimate', 'toaster']);

app.controller('ChatwindowController', ['$scope', '$filter', 'toaster', '$state', '$timeout', function($scope, $filter, toaster, $state, $timeout){

//make socket connection
var socket = io.connect('http://localhost:3000');

// Querying DOM
var output = document.getElementById('output'), feedback = document.getElementById('feedback');

// emit events
$scope.emitJoinEvent =function () {

	socket.emit('join', localStorage.localTokenKey);

}

$scope.emitChatEvent =function () {

	if ($scope.message) {
		socket.emit('chat', {
			handle: localStorage.localTokenKey,
			message: $scope.message
		});
	}
	else{
		toaster.pop('warning', 'type a text pls')
	}

//make it empty again
	$scope.message = '';

}

$scope.keypressEvent = function () {

	socket.emit('typing', localStorage.localTokenKey);

}

$scope.setTimeout = function () {

	$timeout(function () {
		feedback.innerHTML = '';
	}, 2000);

}

//listen for events/ handle events
socket.on('chat', function(data){
	feedback.innerHTML = '';
	output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('join', function(data){
	feedback.innerHTML = '<p><em>' + data + ' has joined</em></p>';
	$scope.setTimeout();
});

socket.on('typing', function(data){
	feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('leave', function(data){
	feedback.innerHTML = '<p><em>' + data + ' has left</em></p>';
	$scope.setTimeout();
});

}]); // end of 'ChatwindowController'