var mongoose = require('mongoose');
var Product = require('./Product');

var orderSchema = new mongoose.Schema({
	date: Date,
	product: Product.schema
});

module.exports = mongoose.model('Order', orderSchema);