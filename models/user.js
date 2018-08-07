var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var sanitizerPlugin = require('mongoose-sanitizer');
var Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;
require('mongoose-type-email');

const userSchema = new Schema({
        username: {
            type: String,
            required: true,
            index: {unique: true}
        },
        // nickname: String,
        password: {
            type: String,
            required: true
        },
        email: {
            type: mongoose.SchemaTypes.Email,
            required: true
        }
    },
    {
        // add for created_at and updated_at
        timestamps: true
    });

userSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.getRounds = function (password) {
    if (!password) return '';
    return bcrypt.getRounds(password);
};

userSchema.methods.encryptPassword = function (password) {
    if (!password) return '';
    return bcrypt.hashSync(password, SALT_WORK_FACTOR);
};

userSchema.plugin(sanitizerPlugin);

const User = mongoose.model('User', userSchema);

module.exports = User;