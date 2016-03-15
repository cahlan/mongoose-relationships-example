var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	name: String,
	price: String,
	rating: Number
});

module.exports = mongoose.model('Product', productSchema);