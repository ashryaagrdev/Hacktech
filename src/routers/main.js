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

router.post('', passport.authenticate('jwt', { session:false}), (req, res)=>{
	res.send({ message : "<h1>Welcome to the backend service of my app :)</h1>" }) ;
}) ;


module.exports = router ;