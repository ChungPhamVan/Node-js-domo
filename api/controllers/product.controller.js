var Product = require('../../models/product.model.js');
var Session = require('../../models/session.model.js');

module.exports.index = async function(req, res, next) {
	var page = parseInt(req.query.page) || 1;
	var perPage = 8;
	var start = (page - 1) * perPage;
	var end = page * perPage;
	var pages;
	if(page % 3 == 1) {
		pages = [page, page + 1, page + 2];
	}
	else if(page % 3 == 2) {
		pages = [page -1, page, page + 1];
	}
	else if(page % 3 ==0) {
		pages = [page - 2, page -1, page];
	}
	var sessionId = req.signedCookies.sessionId;
	if(!sessionId) {//xảy ra lỗi gì đó không có cookies
		res.redirect('/products');
		return;
	}

	// var arrayProduct_dbProducts = db.get('products')
	// 								.filter(function(product) {
	// 										return db.get('sessions')
	// 													.find({ id: sessionId })
	// 													.get('cart.' + product.id, 0)
	// 													.value() > 0;
	// 									})
	// 								.value();

	// arrayProduct_dbProducts.map(function(product) {
	// 	product.amount = db.get('sessions')
	// 						.find({ id: sessionId })
	// 						.get('cart.' + product.id, 0)
	// 						.value();
	// });
	var products = await Product.find();
	res.json(products);
	// res.render('products/index.pug', {
	// 	products: db.get('products').value().slice(start, end),
	// 	arrayProducts: arrayProduct_dbProducts,
	// 	pages: pages,
	// 	onPage: page,
	// 	pageNext: page + 1,
	// 	pagePrev: page -1
	// });

	// console.log(arrayProduct_dbProducts);
	// console.log(typeof arrayProduct_dbProducts);
	// console.log(db.get('products').value().slice(start, end));
};
module.exports.addToCart = async function(req, res, next) {
	var productId = req.params.productId;// cart/add/:productId

	var sessionId = req.signedCookies.sessionId;

	if(!sessionId) {//xảy ra lỗi gì đó không có cookies
		res.redirect('/products');
		return;
	}
	var lastSession = await Session.findOne().sort({ _id: -1 }).limit(1);
	if(!lastSession.cart) {
		var cartCreate = {};
		cartCreate[productId] = 1;

		console.log(cartCreate);


		await Session.findOneAndUpdate({ _id: lastSession._id },
				{ $set: { cart: cartCreate }}
		);
	}
	else {
		var lastCart = lastSession.cart;
		if(!lastCart[productId]) {
			lastCart[productId] = 1;
		}

		else {
			lastCart[productId] += 1;
		}
		await Session.findOneAndUpdate({ _id: lastSession._id },
				{ cart: lastCart }
		);
	}

	res.redirect('/products');
};

module.exports.createPost = async function(req, res, next) {
	var product = await Product.create(req.body);
	res.json(product);
};
module.exports.delete = async function(req, res, next) {
	var findProduct = await Product.find({ "name": req.body.name});
	if(findProduct.lenght == 0) {
		res.json({
			input: "Not find product'Id"
		});
	}
	else if(findProduct.lenght != 0){
		var deleteProduct = await Product.remove({ "name": req.body.name });
		res.json(await Product.find());
	}
};
module.exports.put = async function(req, res, next) {
	var findProduct = await Product.find({ "name": req.body.name });
	if(findProduct.length == 0) {
		var createProduct = await Product.create(req.body);
		res.json(await Product.find());
	}
	else if(findProduct.lenght != 0) {
		var putProduct = await Product.update({ "name": req.body.name }, req.body);
		res.json(await Product.find());
	}
};
module.exports.patch = async function(req, res, next) {
	
};