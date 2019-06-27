var express = require('express');
var validate = require('../validate/user.validate.js');
var router= express.Router();
var controller = require('../controllers/product.controller.js');

router.get('/', controller.index);
router.get('/cart/add/:productId', controller.addToCart);

module.exports = router;