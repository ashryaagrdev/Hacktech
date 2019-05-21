const express = require('express') ;
const passport = require('../passport') ;
const User = require('../models/user') ;

const router = new express.Router() ;

router.post('/login', passport.authenticate('local-login', {
/*    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true*/
  }));

router.post('/user', async (req, res)=>{

}) ;

router.patch('/user', passport.authenticate('cookie', { session:false }),
    async (req , res)=>{

}) ;

router.delete('/user', passport.authenticate('cookie', { session:false }),
    async (req , res)=>{

}) ;

module.exports = router ;