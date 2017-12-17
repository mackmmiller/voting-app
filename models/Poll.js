var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PollSchema = new Schema(
	{
		title: {type: String, required: true},
		user: {type: Schema.ObjectId, ref: 'User', required: true}
	}
);

// Virtual for poll's URL
PollSchema
.virtual('url')
.get(function () {
	return '/polls/' + this._id;
});

// Export model
module.exports = mongoose.model('Poll', PollSchema);