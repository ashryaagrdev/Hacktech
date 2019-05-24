const express = require('express') ;
const router = new express.Router() ;
const passport = require('../passport') ;
const geo = require('../georedis') ;

router.post('', passport.authenticate('jwt', { session:false}), (req, res)=>{
	res.send({ message : "<h1>Welcome to the backend service of my app :)</h1>" }) ;
}) ;

router.get('/nearby/:dis/', passport.authenticate('jwt', { session:false}), (req, res)=>{
	const options = {
		// Can change the option "withCoordinates" in future to integrate app with google maps app
		withCoordinates: false, // Will provide coordinates with locations, default false
		withHashes: false, // Will provide a 52bit Geohash Integer, default false
		withDistances: true, // Will provide distance from query, default false
		order: 'ASC', // or 'DESC' or true (same as 'ASC'), default false
		units: 'm', // or 'km', 'mi', 'ft', default 'm'
		count: 100, // Number of results to return, default undefined
		accurate: true // Useful if in emulated mode and accuracy is important, default false
	} ;

	// Do a check for maximum distance in the app itself

	geo.nearby(req.user._id, req.params.dis, options, (error, locations)=>{
		if (error){
			res.status(500).send(error)
		}else {
			res.status(200).send(locations)
		}
	}) ;
}) ;

module.exports = router ;