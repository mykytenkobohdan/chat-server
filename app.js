var createError = require('http-errors');
var compression = require('compression');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var messagesRouter = require('./routes/messages');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/authorize');

var app = express();

app.use(compression());
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// view engine setup
// remove views because our server use only like rest api
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var connectionsString = 'mongodb://test-user:qazwsx123@ds233541.mlab.com:33541/chat-db';
// var connectionsString = 'mongo://' + process.env.IP + ':27017/chat';

mongoose.Promise = global.Promise;
mongoose.connect(connectionsString, {useNewUrlParser: true})
    .then(function () {
        console.log('Successfully connected to database.');
    })
    .catch(function (err) {
        console.log(err);
    });

app.use('/', indexRouter);
app.use('/messages', messagesRouter);
app.use('/users', usersRouter);
app.use('/authorize', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '8080');
app.set('port', port);


/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var io = require('socket.io')(server);
// next line is the money
app.set('socketio', io);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

/**
 *  Socket connection.
 */

require('./socket')(io);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

module.exports = app;