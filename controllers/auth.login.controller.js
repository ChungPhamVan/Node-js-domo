var User = require('../models/user.model.js');
var md5 = require('md5');
module.exports.login = function(req, res, next) {
	res.render('auth/login.pug');
};
module.exports.loginPost = async function(req, res, next) {
	var user = await User.find({ "email": req.body.email});
	if(!user) {
		res.render('auth/login.pug', {
			errors: ['Not exits user']
		});
		return;
	}
	
	var userFirst = user.find(function(user) {
		return user.password == md5(req.body.password);
	});
	if(!userFirst) {
		res.render('auth/login.pug', {
			errors: ['Wrong password'],
			values: req.body
		});
		return;
	}
	res.cookie('userId', String(userFirst._id), {
		signed: true
	});
	console.log(req.signedCookies.userId);
	res.redirect('/users');
};