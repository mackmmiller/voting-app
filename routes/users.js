var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');

/// User Routes ///

/* GET signup page and blank form. */
router.get('/signup', user_controller.user_create_get);

/* POST signup form and redirect to dashboard. */
router.post('/signup', user_controller.user_create_post);

/* GET login page. */
router.get('/login', user_controller.user_login_get);

/* Handle POST to login page */
router.post('/login', user_controller.user_login_post);

/* GET profile page. */
router.get('/profile', isLoggedIn, user_controller.user_profile_get);

/* GET other's profile page. */
router.get('/profiles/:id', user_controller.other_user_profile_get);

/* GET logout */
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

module.exports = router;
