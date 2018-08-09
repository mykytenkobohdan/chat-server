var express = require('express');
var Message = require('../models/message');
var router = express.Router();
var handleError = require('../helpers/error-handling');

/* GET get all messages. */
router.get('/', function (req, res, next) {
  const query = {}
  const projection = {}
  // const options = { sort: { id: 1 }, limit: 2, skip: 10 }
  const options = {
    sort: {
      createdAt: 1
    }
  }

  Message.find(query, projection, options)
    .exec(function (err, messages) {
      if (err) return handleError(err, res);

      var clone = JSON.parse(JSON.stringify(messages));

      clone.forEach(function (item) {
        if (item.isRemoved) delete item['message'];
      });

      res.json(clone);
    });
});

/* POST create message. */
router.post('/', function (req, res, next) {
  Message.create(req.body, function (err, message) {
    if (err) return handleError(err, res);

    var io = req.app.get('socketio');
    io.emit('message', message);
    return res.json({
      status: 200,
      message: 'Message created!'
    });
  });
});

/* PUT update message */
router.put('/', function (req, res, next) {
  Message.findById(req.body._id, function (err, message) {
    message.isUpdated = true;
    message.message = req.body.message;

    message.save(function (err, updatedMessage) {
      var io = req.app.get('socketio');

      io.emit('update-message', message);
      if (err) return handleError(err, res);
      res.json({
        status: 200,
        message: 'Message updated!',
        data: updatedMessage
      });
    });
  });
});

/* DELETE remove message */
router.delete('/', function (req, res, next) {
  Message.findById(req.query.id, function (err, message) {
    message.isRemoved = true;
    message.save(function (err, ms) {
      ms.message = undefined;

      var io = req.app.get('socketio');
      io.emit('remove-message', ms);
      if (err) return handleError(err, res);
      res.json({
        status: 200,
        message: 'Message removed!'
      });
    });
  });
});

module.exports = router;
