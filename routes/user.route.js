var express = require('express')
var router= express.Router();


router.get('', function(req, res) {
	res.render('users/index.pug', {
		users: db.get('users').value()
	});
});

router.get('/search', function(req, res) {
	var qr = req.query.q;
	var arrSearch = db.get('users').value().filter(function(index) {
		return index.name.toLowerCase().includes(qr.toLowerCase());
	});
	res.render('users/index.pug', {
		users: arrSearch,
		q: qr
	});
});

router.get('/create', function(req, res) {
	res.render('users/create.pug');
});

router.post('/create', function(req, res) {
	req.body.id = shortid.generate();
	db.get('users').push(req.body).write();
	res.redirect('/users');
});

router.get('/:id', function(req, res) {
	var idm = req.params.id;
	var user = db.get('users').find({ id: idm}).value();
	res.render('users/viewuser.pug',{ user: user});
});

module.exports = router;