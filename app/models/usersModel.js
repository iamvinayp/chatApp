'use strict';

//importing/loading the express module/package
var mongoose = require('mongoose');

//declaring a schema
var Schema = mongoose.Schema;

//defining required schemas
var UserSchema = new Schema({
	userName:{
		type: String,
		trim: true,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	created:{
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Users', UserSchema);