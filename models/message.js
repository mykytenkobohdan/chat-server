var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const messageSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    userId: mongoose.Schema.Types.ObjectId,
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;