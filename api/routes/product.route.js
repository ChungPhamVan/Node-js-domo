var express = require('express');
var router= express.Router();
var controller = require('../controllers/product.controller.js');

router.get('/', controller.index);
router.post('/', controller.createPost);
router.delete('/', controller.delete);
router.put("/", controller.put);
router.patch("/", controller.patch);
router.get('/cart/add/:productId', controller.addToCart);

module.exports = router;