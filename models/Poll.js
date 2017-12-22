// Poll Model =================================================================
// Mongoose schema and model definitions
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the schema for the Poll database
var PollSchema = new Schema(
	{
		title: {type: String, required: true},
		author: {type: Schema.ObjectId, ref: 'User', required: true},
		option1: {
			option: {type: String, required: true, default: "option1"},
			name: {type: String, required: true},
			responses: {type: Number, default: 0}
		},
		option2: {
			option: {type: String, required: true, default: "option2"},
			name: {type: String, required: true},
			responses: {type: Number, default: 0}
		},
		option3: {
			option: {type: String, required: true, default: "option3"},
			name: {type: String, required: true},
			responses: {type: Number, default: 0}
		},
		option4: {
			option: {type: String, required: true, default: "option4"},
			name: {type: String, required: true},
			responses: {type: Number, default: 0}
		}
	}
);

// Virtual for poll's URL
PollSchema
.virtual('url')
.get(function() {
	return '/polls/vote/' + this._id;
});

// Methods ====================================================================


// Create the model and expose it to the app
module.exports = mongoose.model('Poll', PollSchema);