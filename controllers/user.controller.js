var User = require('../models/user.model.js');
module.exports.index = async function(req, res) {
	var users = await User.find();
	res.render('users/index.pug', {
		users: users
	});
};
module.exports.search = async function(req, res) {
	var qr = req.query.q;
	var arrayUser = await User.find();
	var searchUser = arrayUser.filter(function(index) {
		return index.name.toLowerCase().includes(qr.toLowerCase());
	});
	res.render('users/index.pug', {
		users: searchUser,
		q: qr
	});
};
module.exports.createGet = function(req, res) {
	res.render('users/create.pug');
};
module.exports.createPost = function(req, res) {
};
module.exports.view = async function(req, res) {
	var user = await User.findById(req.params.id);
	res.render('users/viewuser.pug',{ user: user});
};