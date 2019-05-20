const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const validator = require('validator') ;
const bcrypt = require('bcryptjs') ;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 8,
    },
    location: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    phone: {
        type: String,
        trim: true,
        length: 10,
        unique: true,
    },
    address: {
        type: String
    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
}, {
    timestamps: true
});

userSchema.virtual('items', {
    ref: 'item',
    localField: '_id',
    foreignField: 'owner'
});

userSchema.pre('save', async function (next) {
    const user = this ;
    validator.normalizeEmail(user.email, [ true, true, true, true, true, true, true, true,
                                            true, true, true]) ;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
}) ;

userSchema.plugin(passportLocalMongoose);

const user = mongoose.model('user_model', userSchema);

module.exports = user ;