var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const messageSchema = new Schema({
    nickName: String,
    message: String,
    created: {
        type: Date,
        default: Date.now()
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;