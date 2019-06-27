var db = require('../db.js');
var User = require('../models/user.model.js');
module.exports.post = async function(req, res, next) {
	var errors = [];
	if(!req.body.name) {
		errors.push('Name is required');
	}
	if(!req.body.phone) {
		errors.push('Phone is required');
	}
	if(!req.body.email) {
		errors.push('Email is required');
	}
	var user = (await User.find())
					.find(function(user) {
						return user.email == req.body.email;
					});
	if(user) {
		errors.push('Existed email');
	}
	if(!req.body.password) {
		errors.push('Password is required');
	}
	
	if(errors.length) {
		res.render('auth/signup.pug', {
			errors: errors,
			values: req.body
		});

		return;
	}
	next();
};