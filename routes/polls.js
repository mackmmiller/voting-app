var express = require('express');
var router = express.Router();
var poll_controller = require('../controllers/pollController');

/* GET searchresults listing. */
router.get('/', function(req, res, next) {
	var user = req.user ? req.user.name : '';
	res.send(req.body);
	//res.render('searchresults', {title: 'Search Results | Voting Application', user: user, search: req.body.search });
});

/* POST new Poll from profile page */
router.post('/create', poll_controller.create_poll);

/* GET poll page from URL */
router.get('/vote/:id', poll_controller.get_poll);

/* POST vote on poll page */
router.post('/vote/:id', poll_controller.post_poll_vote);

/* GET poll results page */
router.get('/vote/:id/results', poll_controller.poll_results_get);

/* POST search query from Home page */
router.post('/search', poll_controller.search_polls);

module.exports = router;
