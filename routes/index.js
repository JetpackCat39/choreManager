var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.app.returnCool());
  res.render('index', { title: "lol xd" });
});

module.exports = router;
