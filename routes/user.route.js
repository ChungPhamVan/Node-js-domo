var express = require('express');
var validate = require('../validate/user.validate.js');
var multer  = require('multer');
var router= express.Router();
var upload = multer({ dest: './public/uploads/' });

var controller = require('../controllers/user.controller.js');

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.createGet);

router.post('/create',
	 upload.single('avatar'),
	 validate.post,
	 controller.createPost
);

router.get('/:id', controller.view);

module.exports = router;