var express = require('express');
var router = express.Router();

// Require controller modules
var user_controller = require('../controllers/userController');

/// Signup Routes ///

/* GET signup page and blank form. */
router.get('/', function(req, res, next) {
	res.render('signup', { title: 'Sign up | Voting Application' });
});

/* POST signup form and redirect to dashboard. */
router.post('/', user_controller.user_list);

module.exports = router;
