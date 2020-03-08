const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const validator = require('validator') ;
const bcrypt = require('bcryptjs') ;
const jwt = require('jsonwebtoken') ;
const Item = require('./item') ;
const ebayAuthToken = require('../routers/ebay/ebayAuth');

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
        // minlength: 8,
    },
	location: {
		type: [Number],
		index: '2dsphere'
	},
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
/*        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }*/
    },
	access_token: {
    	type: String,
	},
	refresh_token: {
		type: String,
	},
    phone: {
        type: String,
        trim: true,
        length: 10,
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
    },],
}, {
	timestamps: true
});

userSchema.virtual('items', {
	ref: 'item',
	localField: '_id',
	foreignField: 'owner'
});

const getLocation = ()=>[Math.random(), Math.random()];// Mocking the fetching proocess of location for user

userSchema.pre('save', async function (next) {
	const user = this ;
	if(!user.location) user.location = getLocation();
	validator.normalizeEmail(user.email, [ true, true, true, true, true, true, true, true,
		true, true, true]) ;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8)
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

const scopes = require('../routers/ebay/scopes');
userSchema.methods.refreshAccessToken = async function(){
	const user = this ;
	ebayAuthToken.getAccessToken(process.env.env, user.refresh_token, scopes).then((data) => {
		console.log(data);
	}).catch((error) => {
		console.log(`Error to get Access token from refresh token:${JSON.stringify(error)}`);
	});
};


// Delete user items when user is removed
userSchema.pre('remove', async function (next) {
	const user = this ;

	await Item.deleteMany({ owner: user._id }) ;
	next()
}) ;

userSchema.plugin(passportLocalMongoose);

const user = mongoose.model('User', userSchema);

module.exports = user ;