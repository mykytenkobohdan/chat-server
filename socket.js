module.exports = function (io) {
    return io.on('connection', function (socket) {
        console.log('socket connected');

        socket.on('message', function (data) {
            console.log('on message', data.message);
            socket.emit('message', data);
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