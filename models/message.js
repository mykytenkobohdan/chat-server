var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const messageSchema = new Schema({
    username: String,
    message: String
}, {
    timestamps: true
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;