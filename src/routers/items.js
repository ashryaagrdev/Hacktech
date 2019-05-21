const express = require('express') ;
const router = new express.Router() ;
const passport = require('../passport') ;

router.post('/item', passport.authenticate('cookie', { session:false }),
    async (req , res)=>{

}) ;

router.patch('/item', passport.authenticate('cookie', { session:false }),
    async (req , res)=>{

}) ;

router.delete('/item', passport.authenticate('cookie', { session:false }),
    async (req , res)=>{

}) ;

module.exports = router ;