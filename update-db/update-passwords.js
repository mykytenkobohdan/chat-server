var User = require('../models/user');
var mongoose = require('mongoose');
var connectionsString = 'mongodb://test-user:qazwsx123@ds233541.mlab.com:33541/chat-db';

mongoose.Promise = global.Promise;
mongoose.connect(connectionsString, {useNewUrlParser: true})
    .then(function () {
        User.find({}, function (err, users) {
            if (err) {
                return console.log(err);
            }

            users.forEach(function (item) {
                try {
                    item.getRounds(item.password);
                } catch (err) {
                    console.log(item._id);

                    User.update({'password': item.encryptPassword(item.password)}, function (err, user) {
                        if (err) {
                            console.log(err);
                        }
                        console.log(item.username + ' update!');
                    })
                }
            });
        });
    })
    .catch(function (err) {
        console.log(err);
    });