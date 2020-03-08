const express = require('express') ;
const router = new express.Router() ;
const passport = require('../passport') ;
const User = require('../models/user') ;

router.get('/welcome', (req, res)=>{
	res.send('Welcome!! Authentication worked fine!!')
});

router.get('/', (req, res)=>{
	res.render('register') ;
}) ;

router.get('/login', (req, res)=>{
	res.render('login') ;
}) ;

router.get('/register', (req, res)=>{
	res.render('register') ;
}) ;

router.get('/matching', (req, res)=>{
	matches = []
	res.render('matching', {
		matches
	}) ;
}) ;

router.post('', passport.authenticate('jwt', { session:false}), (req, res)=>{
	res.send({ message : "<h1>Welcome to the backend service of my app :)</h1>" }) ;
}) ;

router.post('/nearby/', passport.authenticate('jwt', { session:false}), (req, res)=>{
	// Can think of moving this to model as User.statistics
	User.find({
		_id: { $ne : req.user._id}, // $ne stands for not equals
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