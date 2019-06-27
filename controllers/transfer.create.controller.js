var Transfer = require('../models/transfer.model.js');

module.exports.createGet = function(req, res) {
	res.render('transfer/create.pug', {
		csrfToken: req.csrfToken()
	});
};

module.exports.createPost = function(req, res) {
	var data = {
		account: req.body.account,
		amount: parseInt(req.body.amount),
		userid: req.signedCookies.userId
	};
	Transfer.create(data, function(error, small) {
		res.redirect('/transfer/create');
	});
};