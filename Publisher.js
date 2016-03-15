var mongoose = require('mongoose');

var publisherSchema = new mongoose.Schema({
	name: String,
	city: String,
	state: String,
	country: String,
	books: [{
		type: String,
		ref: 'Book'
	}]
});

module.exports = mongoose.model('Publisher', publisherSchema);