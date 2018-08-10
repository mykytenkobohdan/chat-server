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