const express = require('express') ;
const router = new express.Router() ;
const passport = require('../passport') ;

router.post('', /*passport.authenticate('login', {}),*/ (req, res)=>{
    res.send({ message : "<h1>Welcome to the backend service of my app</h1>" }) ;
}) ;

module.exports = router ;