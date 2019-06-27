var Session = require('../models/session.model.js');

module.exports = async function(req, res, next) {
	if(!req.signedCookies.sessionId) {
		var session = new Session({
			cart: {

			}
		});

		await Session.create(session, function(err, small) {
			if(err)		console.log(err);
		});

		var lastSession = await Session.findOne().sort({ _id: -1 }).limit(1);
		res.cookie('sessionId', String(lastSession._id), {
			signed: true
		});
	}
	next();
};