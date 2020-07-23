var express = require('express');
var router = express.Router();
const userRouteHandle = require('./users')

/* GET home page. */
router.use('/users', userRouteHandle)

module.exports = router;
