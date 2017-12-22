var express = require('express');
var Poll = require('../models/Poll');
var User = require('../models/User');
var router = express.Router();

var poll_controller = require('../controllers/pollController');

/* GET home page. */
router.get('/', function(req, res, next) {
	var user = req.user ? req.user.name : '';
	res.render('index', { title: 'Voting Application' , user: user });
});

module.exports = router;
