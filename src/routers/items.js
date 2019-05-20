const express = require('express') ;
const router = new express.Router() ;
const {passport} = require('authentication') ;

router.post('/item', apassport.authenticate('jwt', { session: false }), async (req, res)=>{

}) ;

router.patch('/item', passport.authenticate('jwt', { session: false }), async (req, res)=>{

}) ;

router.delete('/item', passport.authenticate('jwt', { session: false }), async (req, res)=>{

}) ;

module.exports = router ;