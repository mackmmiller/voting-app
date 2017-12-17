var express = require('express');
var router = express.Router();

/* GET searchresults listing. */
router.get('/', function(req, res, next) {
  res.render('searchresults', {title: 'Search Results | Voting Application'});
});

module.exports = router;
