var User = require('../models/User');
var Poll = require('../models/Poll');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.index = function(req, res) {
	res.send('NOT IMPLEMENTED: User root page');
};

// Display a list of all users
exports.user_list = function(req, res) {
	res.send('NOT IMPLEMENTED: User list');
};

// Display detail page for a specific User
exports.user_detail = function(req, res) {
	res.send('NOT IMPLEMENTED: User detail: '+req.params.id);
};

// Display user signup form on GET
exports.user_create_get = function(req, res, next) {
	res.render('signup', { title: 'Sign up | Voting Application', message: req.flash('signupMessage') });
};

// Handle user signup form on POST
exports.user_create_post = passport.authenticate('local-signup', {
	successRedirect: 'profile/',
	failureRedirect: 'signup',
	failureFlash: true
});

// Handle User login form on GET
exports.user_login_get = function(req, res, next) {
  res.render('login', { title: 'Login | Voting Application', message: req.flash('loginMessage') });
};

// Handle User login form on POST
exports.user_login_post = passport.authenticate('local-login', {
	successRedirect : 'profile',
	failureRedirect : 'login',
	failureFlash : true
});

// Display user profile on GET
exports.user_profile_get = function(req, res, next) {
	Poll.find({author: req.user._id}, 'title url')
		.exec(function (err, list_polls) {
			if (err) { return next(err); }
			// Success, so render
			res.render('profile', {title: 'Profile', user: req.user.name, polls: list_polls, message: req.flash('createPollMessage') });
		});
};

// Display other user's profile on GET
exports.other_user_profile_get = function(req, res, next) {
	res.send('NOT IMPLMENTED: OTHER USER PROFILES')
};