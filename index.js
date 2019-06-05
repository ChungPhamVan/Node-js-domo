var express = require('express');
var app = express();
var shortid = require('shortid');
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);
db.defaults({ users: [] })
  .write();






var port = 3000;
app.get('/', function(req, res) {
    res.render('index.pug', {
    	name: 'Chung'
    });
});

app.get('/users', function(req, res) {
	res.render('users/index.pug', {
		users: db.get('users').value()
	});
});

app.get('/users/search', function(req, res) {
	var qr = req.query.q;
	var arrSearch = db.get('users').value().filter(function(index) {
		return index.name.toLowerCase().includes(qr.toLowerCase());
	});
	res.render('users/index.pug', {
		users: arrSearch,
		q: qr
	});
});

app.get('/users/create', function(req, res) {
	res.render('users/create.pug');
});

app.post('/users/create', function(req, res) {
	req.body.id = shortid.generate();
	db.get('users').push(req.body).write();
	res.redirect('/users');
});

app.get('/users/:id', function(req, res) {
	var idm = req.params.id;
	var user = db.get('users').find({ id: idm}).value();
	res.render('users/viewuser.pug',{ user: user});
});
app.listen(port, function() {
    console.log('Server listening on port: ' + port);
});
