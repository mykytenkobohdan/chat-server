var mongoose = require('mongoose');
require('mongoose-type-email');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: {unique: true}
    },
    nickname: String,
    password: {
        type: String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;