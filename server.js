var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var Book = require('./Book');
var Publisher = require('./Publisher');
var Product = require('./Product');
var Order = require('./Order');
var User = require('./User');

var app = express();
app.use(bodyParser.json());

app.post('/api/users', function(req, res) {
	var user = new User(req.body);
	user.save(function(err, new_user) {
		return res.json(new_user);
	});
});

app.put('/api/users/:userId', function(req, res) {
	User.findOne({_id: req.params.userId}).exec().then(function(user) {
		user.first_name = req.body.first_name;
		user.last_name = req.body.last_name;
		user.email = req.body.email;
		user.password = req.body.password;
		user.save(function(err) {
			return res.status(200).end();
		});
	});
});

app.post('/api/orders', function(req, res) {

	var product_id = req.body.product_id;
	Product.findOne({_id: product_id}).exec().then(function(product) {
		var order = new Order({
			product: product,
			date: new Date()
		});
		order.save(function(err, new_record) {
			return res.status(201).json(new_record);
		});
	});

});

app.post('/api/products', function(req, res) {
	var product = new Product(req.body);
	product.save(function(err, new_record) {
		return res.status(201).json(new_record);
	});
});

app.post('/api/books', function(req, res) {
	var book = new Book(req.body);
	book.save(function(err, new_record) {
		return res.status(201).json(new_record);
	});
});

app.get('/api/books', function(req, res) {

	//pagination
	var page = req.query.page || 1;
	var limit = 10;

	var skip = (page-1)*limit;

	Book
	.find()
	.sort('publish_date')
	.limit(limit)
	.skip(skip)
	.exec()
	.then(function(books) {
		return res.json(books);
	});
});

app.post('/api/publishers', function(req, res) {
	var publisher = new Publisher(req.body);
	publisher.save(function(err, new_record) {
		return res.status(201).json(new_record);
	});
});

app.get('/api/publishers', function(req, res) {
	Publisher
	.find()
	.populate({
		path: 'books',
		select: 'title',
		options: {limit: 10}
	})
	.exec()
	.then(function(pubs) {
		return res.json(pubs);
	});
});

app.listen(8081);

mongoose.connect('mongodb://localhost/test-mongo-db');

