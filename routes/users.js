var express = require('express');
var User = require('../models/user');
var Message = require('../models/message');
var router = express.Router();

/* GET get all users. */
router.get('/', function (req, res, next) {
  User.find({}, function (err, users) {
    res.json(users);
  });
});

/* GET get current user. */
router.get('/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    res.json(user);
  });
});

/* POST create user. */
router.post('/', function (req, res, next) {
  User.create(req.body, function (err, user) {
    if (err) {
      console.log(err);
      return res.json({
        error: true,
        errorMessage: err.message
      })
    }

    return res.json({
      status: 200,
      message: 'User created!'
    });
  });
});

/* PUT update user. */
router.put('/', function (req, res, next) {
  User.findById(req.body)
    .then(function (user) {
      var isNewName = user.username !== req.body.username;

      user.email = req.body.email;
      user.username = req.body.username;

      user.save()
        .then(function (u) {
          res.json(u);
        }, function (err) {
          return res.json(err);
        });

      if (isNewName) {
        Message.update({
          userId: user._id
        }, {
          username: req.body.username
        }, {
          multi: true
        }, function (err, data) {
          console.log('updated all!')
        });
      }
    })
    .catch(function (err) {
      return res.json({
        error: err
      });
    });
});

module.exports = router;
