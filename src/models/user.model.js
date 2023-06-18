const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        trim: true,
        minlength: 8,
        validate(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                return new Error('Password must contain at least one letter and one number');
            }
        },
        private: true,
    },

    role: {
        type: String,
        enum: roles,
        default: 'subscriber',
    }

}, { timestamps: true });

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */


userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    user.password = await bcrypt.hash(user.password, 10);;
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;