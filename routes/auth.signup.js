var express = require('express');
var router= express.Router();
var multer  = require('multer');
var validate = require('../validate/signup.validate.js');
var upload = multer({ dest: './public/uploads/' });
var controller = require('../controllers/auth.signup.controller.js');
router.get('/signup', controller.signup);

router.post('/signup', 
	upload.single('avatar'),
	validate.post,
	controller.signupCreate);

module.exports = router;