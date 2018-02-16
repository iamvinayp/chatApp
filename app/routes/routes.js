'use strict';

//load packages
var express = require('express');
var router = express.Router();

//requiring modules
var usersController = require('../controllers/usersController.js');
var chatController = require('../controllers/chatController.js');

//defining/mounting all the route handlers on the router instance

//user signup
router.post('/users/signup', chatController.signupUser);
//user login
router.post('/users/login', chatController.loginUser);


module.exports = router;