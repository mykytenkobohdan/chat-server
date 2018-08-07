var express = require('express');
var Message = require('../models/message');
var router = express.Router();

/* GET get all messages. */
router.get('/', function (req, res, next) {
    Message.find({}, function (err, messages) {
        res.json(messages);
    });
});

/* POST create message. */
router.post('/', function (req, res, next) {
    Message.create(req.body, function (err, message) {
        if (err) return res.json({status: 500, data: err});

        var io = req.app.get('socketio');
        io.emit('message', message);
        // req.io.emit('message', message);
        return res.json({status: 200, message: 'Message created!'});
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
            // if (err) return handleError(err);
            res.json({status: 200, message: 'Message updated!', data: updatedMessage});
        });
    });
});

module.exports = router;
