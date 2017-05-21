var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', function(req, res, next) {
    console.log(res.app.get('sess').loggedIn);
    if(req.body.username === "mememaker7" && req.body.password === "firemonk") {
        req.app.get('sess').loggedIn = true;
        // res.render('/index');
        res.render('../routes/index');
    }
});

module.exports = router;
