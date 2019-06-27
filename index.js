require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);



var userRoute = require('./routes/user.route.js');
var loginRoute = require('./routes/auth.login.js');
var signupRoute = require('./routes/auth.signup.js');
var showProductRoute = require('./routes/product.route.js');
var transferCreateRoute = require('./routes/transfer.create.route.js');
var apiProductRoute = require('./api/routes/product.route.js');




var authMiddlewares = require('./middlewares/auth.middleware.js');
var sessionMiddleware = require('./middlewares/session.middleware.js');

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);


var port = 3000;

app.use('/users', authMiddlewares.authMiddleware, userRoute);
app.use('/auth', loginRoute);
app.use('/auth', signupRoute);
app.use('/products', showProductRoute);
app.use('/transfer', authMiddlewares.authMiddleware, transferCreateRoute);
app.use('/api/products', apiProductRoute);





app.use(express.static('public'));


app.get('/', function(req, res) {
    res.render('index.pug', {
    	name: 'Chung'
    });
});

app.listen(port, function() {
    console.log('Server listening on port: ' + port);
});
