var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sanitizerPlugin = require('mongoose-sanitizer');

const messageSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    userId: Schema.Types.ObjectId,
    message: {
        type: String,
        required: true
    },
    isUpdated: {type: Boolean, default: false},
    isRemoved: {type: Boolean, default: false}
}, {
    timestamps: true
});

messageSchema.plugin(sanitizerPlugin);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;