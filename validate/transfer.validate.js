module.exports.post = function(req, res, next) {
	var errors = [];
	if(!req.body.account) {
		errors.push('Account is required');
	}
	if(!req.body.amount) {
		errors.push('Amount is required');
	}
	if(errors.length) {
		res.render('transfer/create.pug', {
			errors: errors,
			values: req.body
		});
		return;
	}
	next();

};