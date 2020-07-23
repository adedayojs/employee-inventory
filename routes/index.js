var express = require("express");
var router = express.Router();
const userRouteHandle = require("./users");
const { resumptionTime } = require("../helpers/database");

/* GET home page. */
router.use("/users", userRouteHandle);
router.get("/resumption", (req, res) => {
  res.json({ time: resumptionTime });
  return;
});

module.exports = router;
