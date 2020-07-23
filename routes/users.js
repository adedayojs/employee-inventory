var express = require("express");
var router = express.Router();
const { getAllUsers, getUser, logUserIn, signUserUp } = require("../controllers/users");

/* GET users listing. */
router.get("/", getAllUsers);

//  These should be in it own router file but because of the storage mechanism. For simplicity purpose
router.post("/login", logUserIn);
router.post("/signup", signUserUp);

router.get("/:id", getUser);

module.exports = router;
