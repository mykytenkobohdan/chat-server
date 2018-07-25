var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* POST check authorize. */
router.post('/', function (req, res, next) {
    // use findOne for one object
    User.find({'username': req.body.username}, function (err, user) {
        if (user.length > 0) {
            user[0].comparePassword(req.body.password, function (err, isMatch) {
                if (err) return res.json({error: true, errorMessage: err.message});

                isMatch ? res.json(user[0]) : res.json({error: true, errorMessage: 'Wrong password!'});
            });
        } else {
            return res.json({error: true, errorMessage: 'Wrong user name!'});
        }
    });
});

module.exports = router;