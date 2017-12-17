// Mongoose schema and model definitions
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the schema for the Account database
var UserSchema = new Schema(
	{
		user_name: {type: String, required: true, unique: true},
		email: {type: String, required: true, unique: true},
		password: {type: String, required: true}
	}
);

module.exports = mongoose.model('User', UserSchema);