'use strict';

//importing/loading the express module/package and other dependencies
var express = require('express');
var socket = require('socket.io');

//set up an express app instance
var app = express();

//initializing the port number
var port = process.env.PORT || 3000;

//requiring other necessary modules
require('./app/config/dbConnection.js');
var routes = require('./app/routes/routes.js');

//loading required middlewares
//body parsing middleware
var bodyParser = require('body-parser');
//cookie parsing middleware
var cookieParser = require('cookie-parser');
//error handler middleware
var errorHandler = require('./app/middlewares/errorHandler.js');
//wrong route redirection middleware
var wrongRoute = require('./app/middlewares/wrongRoute.js');

//body parsing middleware that only parses json/tells the system to use json.
app.use(bodyParser.json({limit: '10mb', extended: true}));

//body parsing middleware that only parses urlencoded bodies
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
//cookie parser
app.use(cookieParser());

//serve front end resources for '/app' route
app.use('/app',express.static(__dirname + '/public'));

//register the routes
app.use('/api', routes);

//register/initialise middleware for redirection of wrong routes
app.use('*', wrongRoute.checkRoute);

//register/initialise error handling middleware
app.use(errorHandler.handleError);

//server listening on port
var server = app.listen(port, function () {
	console.log('Chat server listening on port:' +port);
});

//socket setup
var io = socket(server);

//listen for socket connections
io.on('connection', function (socket) {
	console.log('socket connection established for id ', socket.id);

	// //handle new user event
	// socket.on('new user', function (data) {
	// 	io.sockets.emit('chat', data);
	// });

	//handle chat event
	socket.on('chat', function (data) {
		io.sockets.emit('chat', data);
	});

	//handle join event
	socket.on('join', function (data) {
		socket.broadcast.emit('join', data);
	})

	//handle typing event
	socket.on('typing', function (data) {
		console.log(data);
		socket.broadcast.emit('typing', data);
	})

	//handle leave event
	socket.on('leave', function (data) {
		socket.broadcast.emit('leave', data);
	})

});



