const express = require('express') ;
const router = new express.Router() ;
const passport = require('../passport') ;
const User = require('../models/user') ;

//Will render about page here
router.get('/', (req, res)=>{
	res.render('about')
});

router.get('/login', (req, res)=>{
	res.render('login') ;
}) ;

router.get('/register', (req, res)=>{
	res.render('register') ;
}) ;

router.post('', passport.authenticate('jwt', { session:false}), (req, res)=>{
	res.send({ message : "<h1>Welcome to the backend service of my app :)</h1>" }) ;
}) ;


module.exports = router ;