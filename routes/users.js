var express = require('express');
var User = require('../models/user');
var router = express.Router();

/* GET get all users. */
router.get('/', function (req, res, next) {
    User.find({}, function (err, users) {
        res.json(users);
    });
});

/* GET get current user. */
router.get('/:id', function (req, res, next) {
    console.log('Get user by ID: ', req.params);

    User.find({'_id': req.params.id}, function (err, user) {
        res.json(user);
    });
});

/* POST create user. */
router.post('/', function (req, res, next) {
    User.create(req.body, function (err, user) {
        if (err) {
            console.log(err);
            return res.json({error: true, errorMessage: err.message})
        }

        return res.json({status: 200, message: 'User created!'});
    });
});

/* PUT update user. */
router.put('/', function (req, res, next) {
    console.log('PUT update user: ', req.body);

    User.findByIdAndUpdate(req.body, function (err, user) {
        res.json(user);
    });
});

module.exports = router;
