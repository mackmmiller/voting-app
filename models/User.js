// User Model =================================================================
// Mongoose schema and model definitions
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// Create the schema for the User database
var UserSchema = new Schema(
	{
		name: {type: String, required: true, unique: true},
		password: {type: String, required: true}
	}
);

UserSchema
.virtual('url')
.get(function() {
	return '/users/profiles/'+ this._id;
});

// Methods ====================================================================
// Generating a hash
UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);