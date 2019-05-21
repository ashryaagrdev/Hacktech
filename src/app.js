const express = require('express') ;
const auth_router = require('./routers/authentication') ;
const item_router = require('./routers/items') ;
const passport = require('./passport') ;

const User = require('./models/user') ;
require('./db/mongoose') ;

const app = express() ;

const session = require("express-session"),
    bodyParser = require("body-parser");

// app.use(express.static("public"));
app.use(session({ secret: process.env.SECRET_KEY }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(auth_router) ;
app.use(item_router) ;

app.get('', passport.authenticate('login', {}), (req, res)=>{
    res.send({ message : "<h1>Welcome to the backend service of my app</h1>" }) ;
}) ;

module.exports = app;
