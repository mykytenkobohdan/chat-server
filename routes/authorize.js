var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* POST check authorize. */
router.post('/', function (req, res, next) {
    User.find({'username': req.body.username}, function (err, user) {
        // Add compare password with hash;
        if (user.length > 0 && user[0].password === req.body.password) {
            return res.json(user);
        }
        return res.json([]);
    });
});

module.exports = router;