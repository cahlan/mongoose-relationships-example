var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String
});

userSchema.pre('save', function(next) {
	//capitalizing first name prior to save
	// this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
	// next();

	var user = this;

	console.log("presave");

	if(!user.isModified('password')) {
		return next();
	};

	bcrypt.genSalt(12, function(err, salt) {
		bcrypt.hash(user.password, salt, function(err, hash) {
			console.log(user.password);
			user.password = hash;
			next();
		});
	});

});

module.exports = mongoose.model('User', userSchema);