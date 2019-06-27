var User = require('../models/user.model.js');
module.exports.authMiddleware = async function(req, res, next) {
	if(!req.signedCookies.userId) {
		res.redirect('/auth/login');
		return;
	}
	var user = (await User.find())
					.find(function(user) {
						return String(user._id) == req.signedCookies.userId;
					});
	if(!user) {
		res.redirect('/auth/login');
		return;
	}
	res.locals.user = user;
	next();
};