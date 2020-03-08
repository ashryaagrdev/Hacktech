const express = require('express') ;
const router = new express.Router() ;
const passport = require('../passport') ;
const User = require('../models/user') ;
const request = require('request');

//Mocking shooping cart API data
router.post('/randomCart', (req, res)=>{
	const price = Math.floor((Math.random() * 300) + 200);
	res.send({price}) ;
}) ;

//TODO: Need to write matching logic here
router.get('/matching', passport.authenticate('cookie', {}), (req, res)=>{
	 request('/randomCart', {}, (value)=>{
		req.user.price = value;
		req.user.save();
	});
	var matches = [{
		name: 'ASHRYA',
		phone: '1234567890',
		address: 'afff',
		price: 100
	}]; // Just some test data for default case
	User.find({
		_id: { $ne : req.user._id}, // $ne stands for not equals
		location: {
			$near: {
				$geometry: {
					coordinates: req.user.location,
					$maxDistance: -1, // Conversion from Km to m and setting max limit
				},

			}
		}
	}).then((locations)=>{
		matches = locations;
		res.render('matching', {
			matches
		}) ;
	}).catch((error)=>{
		console.log(error);
		res.status(500).send(error)
	});
}) ;

/*
router.post('/nearby/', passport.authenticate('jwt', { session:false}), (req, res)=>{
	// Can think of moving this to model as User.statistics
	User.find({
		_id: { $ne : req.user._id}, // $ne stands for not equals
		location: {
			$near: {
				$geometry: {
					coordinates: req.user.location,
					$maxDistance: -1, // Conversion from Km to m and setting max limit
				},

			}
		}
	}).then((locations)=>{
		res.status(200).send(locations)
	}).catch((error)=>{
		res.status(500).send(error)
	})

}) ;
*/
module.exports = router;