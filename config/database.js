var dotenv = require('dotenv').config();

module.exports = {
	'url': process.env.MONGOLAB_URI,
	'user': process.env.MONGOLAB_USER,
	'pass': process.env.MONGOLAB_PASS
};