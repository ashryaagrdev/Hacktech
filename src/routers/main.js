const express = require('express') ;
const router = new express.Router() ;
const passport = require('../passport') ;
const User = require('../models/user') ;

router.post('', passport.authenticate('jwt', { session:false}), (req, res)=>{
	res.send({ message : "<h1>Welcome to the backend service of my app :)</h1>" }) ;
}) ;

router.post('/nearby/', passport.authenticate('jwt', { session:false}), (req, res)=>{
	// Can think of moving this to model as User.statistics
	User.find({
		_id: { $ne : req.user._id},
		location: {
			$near: {
				$geometry: {
					coordinates: req.user.location,
					$maxDistance: req.body.max_distance * 1000, // Conversion from Km to m and setting max limit
				},

			}
		}
	}).then((locations)=>{
		res.status(200).send(locations)
	}).catch((error)=>{
		res.status(500).send(error)
	})

}) ;

module.exports = router ;