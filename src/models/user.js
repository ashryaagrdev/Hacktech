const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const validator = require('validator') ;
const bcrypt = require('bcryptjs') ;
const jwt = require('jsonwebtoken') ;
const geo = require('../georedis') ;
const Item = require('./item') ;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        default: "Anonymous"
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    location: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
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
        default: "0000000000"
    },
    address: {
        type: String,
        default: "India"
    },
    total_price:{
        type: Number,
        default: 0
    },
    tokens: [{
        token: {
            type: String,
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

	if (user.isModified('location')){
		if (geo.location(user._id)){
			geo.updateLocation(user._id, user.location) ;
		}else {
			geo.addLocation(user._id, user.location) ;
		}
	}

	next()
}) ;

userSchema.methods.toJSON = function () {
	const user = this ;
	const userObject = user.toObject() ;

	delete userObject.password ;
	delete userObject.tokens ;

	return userObject
} ;

userSchema.methods.generateAuthToken = async function () {
	const user = this ;
	const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY) ;

	user.tokens = user.tokens.concat({ token }) ;
	await user.save() ;

	return token
} ;

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
	const user = this ;

	geo.removeLocation(user._id, function(err, reply){
		if(err) console.error(err);
	});

	await Item.deleteMany({ owner: user._id }) ;
	next()
}) ;

userSchema.plugin(passportLocalMongoose);

const user = mongoose.model('User', userSchema);

module.exports = user ;