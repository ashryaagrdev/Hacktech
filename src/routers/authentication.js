const express = require('express') ;
const router = new express.Router() ;
const passport = require('passport-jwt') ;
const User = require('../models/user') ;
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt ;

var opts = {} ;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET ;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

router.post('/login', async (req, res) => {

}) ;

router.post('/user', async (req, res)=>{

}) ;

router.patch('/user', passport.authenticate('jwt', { session: false }), async (req, res)=>{

}) ;

router.delete('/user', passport.authenticate('jwt', { session: false }), async (req, res)=>{

}) ;

module.exports = {router, passport} ;