var express = require("express");
var router = express.Router();
var api = require("../sender/controller");

var upload = require("../../common/uploadFile");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/uploadFile", upload.single("file"), api.sender);

module.exports = router;
