var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
	title: String,
	author: String,
	edition: Number,
	publisher: {
		type: String,
		ref: 'Publisher'
	},
	isbn: String,
	publish_date: Date,
	page_count: Number,
	price: Number,
	is_hardcover: Boolean,
	is_ebook: Boolean
});

module.exports = mongoose.model('Book', bookSchema);