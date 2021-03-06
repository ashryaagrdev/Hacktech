const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
	name : {
		type: String,
		default: "N.A."
	},
	price : {
		type: Number,
		required: true,
		validate(value) {
			if (value<1){
				throw new Error("The price of the item cant be less than 1 Rs")
			}
		}
	},
	company: {
		type: String,
		required: true,
		lowercase: true
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'user',
	}
}, {
	timestamps: true
}) ;

const item = new mongoose.model('item', itemSchema) ;

module.exports = item ;