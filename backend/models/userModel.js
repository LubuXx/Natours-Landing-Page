const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please tell us your name!'],
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, 'Please provide an email address!'],
            validate: [validator.isEmail, 'Please provide a valid email address!']
        },
        role: {
            type: String,
            enum: ['user', 'guide', 'lead-guide', 'admin'],
            default: 'user'
        },
        active: {
            type: Boolean,
            default: true,
            select: false
        },
        photo: String,
        password: {
            type: String,
            minlength: 8,
            required: [true, 'Please provide a password!'],
            select: false
        },
        passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your password!'],
            validate: {
                validator: function (val) {
                    return val === this.password;
                },
                message: 'The passwords are not the same!'
            }
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;