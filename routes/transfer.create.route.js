var express = require('express');
var router= express.Router();
var validate = require('../validate/transfer.validate.js');

var csurf = require('csurf');
router.use(csurf({ cookie: true }));

var controller = require('../controllers/transfer.create.controller.js');

router.get('/create', controller.createGet);

router.post('/create',
	validate.post,
	controller.createPost
);
module.exports = router;