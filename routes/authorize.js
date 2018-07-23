var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* POST check authorize. */
router.post('/', function (req, res, next) {
    User.find({'username': req.body.username}, function (err, user) {
        console.log(user);
        res.json(user);
    });
});

module.exports = router;