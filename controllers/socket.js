var Message = require('../models/message');

module.exports = function (io) {
    return io.on('connection', function (socket) {
        console.log('socket connected');

        socket.on('message', function (data) {
            Message.create(data, function (err, message) {
                if (err) return err;
                socket.emit('message', message);
            });
        });

        socket.on('update-message', function (data) {
            Message.findById(data._id, function (err, message) {
                message.isUpdated = true;
                message.message = data.message;
        
                message.save(function (err, updatedMessage) {
                    if (err) console.log(err);

                    socket.emit('update-message', updatedMessage);
                });
            });
        });

        socket.on('disconnect', function () {
            console.log('socket disconnected!');
        });
    });
};