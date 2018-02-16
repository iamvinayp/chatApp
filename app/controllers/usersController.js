'use strict';

//importing the required files/modules
var usersModel = require('../models/usersModel.js');
var responseLib = require('../libs/responseLib.js');

//declaring an object
var exports = module.exports = {};

//definitions of all the route handlers

exports.loginUser = function (req, res, next) {

	if (!req.body.userName) {
		console.log('Syntax invalid in the request');
		var response = responseLib.responseGenerate(null, 400, true, 'Syntax invalid in the request');
		res.status(400).send(response);
	}
	else {
		var newUser = new usersModel({
			userName: req.body.userName
		});
		usersModel.findOne({'userName': newUser.userName}, function (err, user) {
			if (err) {
				next(err);
			}
			else if (!user) {
				newUser.save(function (err, user) {
					if (err) {
						next(err);
					}
					else {
						console.log('User login successfull');
						var response = responseLib.responseGenerate(user, 201, false, 'User login successfull');
						res.status(201).send(response);
					}
				});// end save()
			}
			else {
				console.log('User name is already taken');
				var response = responseLib.responseGenerate(newUser, 409, true, 'User name is already taken');
				res.status(409).send(response);
			}
		});//end findOne()
	}// end main else

}//end loginUser()