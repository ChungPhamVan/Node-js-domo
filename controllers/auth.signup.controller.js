var User = require('../models/user.model.js');
var md5 = require('md5');
var shortid = require('shortid');
module.exports.signup = function(req, res, next) {
	res.render('auth/signup.pug');
};
module.exports.signupCreate = function(req, res, next) {
	var user = new User({
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		password: md5(req.body.password),
		avatar: req.file.path.slice(7)
	});
	User.create(user, function(err, small) {
		User.find().then(function(users) {
			var checkUser = users.find(function(user) {
				return user.email == req.body.email;
			});
			res.cookie('userId', String(checkUser._id), {
				signed: true
			});
			res.redirect('/users');
		});
	});
}