var express = require('express');
var router= express.Router();


var controller = require('../controllers/auth.login.controller.js');
router.get('/login', controller.login);

router.post('/login', controller.loginPost);
module.exports = router;