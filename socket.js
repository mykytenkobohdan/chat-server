var Message = require('./models/message');

module.exports = function (io) {
    return io.on('connection', function (socket) {
        console.log('socket connected');

        socket.on('message', function (data) {
            Message.create(data, function (err, message) {
                if (err) return err;
                socket.emit('message', data);
            });
        });

        socket.on('update-message', function (data) {
            console.log('update message', data.message);
            socket.emit('update-message', data);
        });

        socket.on('disconnect', function () {
            console.log('socket disconnected!');
        });
    });
};