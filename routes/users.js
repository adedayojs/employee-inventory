var express = require('express');
var router = express.Router();
const {getAllUsers, getUser} = require('../controllers/users')

/* GET users listing. */
router.get('/', getAllUsers);
router.get('/:id', getUser);

//  These should be in it own router file but because of the storage mechanism. For simplicity purpose
router.get('/login', getAllUsers);
router.get('/signup', getAllUsers);

module.exports = router;
