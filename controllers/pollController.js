var User = require('../models/User');
var Poll = require('../models/Poll');


// Display a list of all polls.
exports.index = function(req, res) {
	res.send('NOT IMPLEMENTED: Poll list');
};

// Create a poll from the profile page.
exports.create_poll = function(req, res, next) {
	process.nextTick(function() {
		Poll.findOne({ 'title': req.body.title, 'author': req.user._id}, function(err, poll) {
			if (err)
				throw err;

			if (poll) {
				req.flash('createPollMessage', 'You already have a poll by that title');
				res.redirect('/users/profile');
			} else {
				var newPoll = new Poll();

				newPoll.title = req.body.title;
				newPoll.author = req.user._id;
				newPoll.option1.name = req.body.option1;
				newPoll.option2.name = req.body.option2;
				newPoll.option3.name = req.body.option3;
				newPoll.option4.name = req.body.option4;

				newPoll.save(function(err) {
					if (err)
						throw err;
					res.redirect('/users/profile');
					return newPoll;
				});
			}
		});
	});	
};

// Display a poll's voting page from it's unique id.
exports.get_poll = function(req, res, next) {
	var user = req.user ? req.user.name : '';
	process.nextTick(function() {
		Poll.findOne({ _id: req.params.id })
			.populate('author')
			.exec(function(err, poll) {
			if (err)
				throw err;
			else {
				res.render('poll', {title: 'Vote!', user: user, pollData: poll });
			}
		});
	});
};

// Display all polls related to search query
exports.search_polls = function(req, res, next) {
	var user = req.user ? req.user.name : '';
	var string = encodeURIComponent(req.body.search);
	process.nextTick(function() {
		Poll.find({ title: {"$regex": string, "$options": "i" } })
		.exec(function(err, polls) {
			if (err)
				throw err;
			else {
				res.render('searchresults', {search: string, polls: polls, user: user});
			}
		});
	});
};

// Post vote submission to the database
exports.post_poll_vote = function(req, res, next) {
	var response = JSON.parse(req.body.pollResponse);
	var id = req.params.id;
	console.log(response.responses);
	Poll.findById(id, function(err, poll) {
		if (err) 
			throw err;

		poll[response.option].responses++;
		poll.save(function (err, updatePoll) {
			if (err) 
				throw err;
			res.redirect('/polls/vote/'+id+'/results');
		});
	});
};

exports.poll_results_get = function(req, res, next) {
	var user = req.user ? req.user.name : '';
	var poll = Poll.findById(req.params.id, function(err, poll) {
		if (err)
			throw err;
		else {
			res.render('results', { title: 'Results', poll: poll, user: user });
		}
	});
};