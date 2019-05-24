const express = require('express') ;
const router = new express.Router() ;
const passport = require('../passport') ;

router.post('', passport.authenticate('jwt', { session:false}), (req, res)=>{
    res.send({ message : "<h1>Welcome to the backend service of my app :)</h1>" }) ;
}) ;

router.post('/nearby', passport.authenticate('jwt', { session:false}), (req, res)=>{
    res.status(200).send()
}) ;

module.exports = router ;