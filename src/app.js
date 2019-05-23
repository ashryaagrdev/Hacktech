const auth_router = require('./routers/authentication') ;
const item_router = require('./routers/items') ;
const main_router = require('./routers/main') ;
var bodyParser = require('body-parser') ;
const passport = require('./passport') ;

require('./db/mongoose') ;

const express = require('express') ;
const app = express() ;
app.use(passport.initialize());

// Next 5 lines help in parsing input and getting req.body
app.use(bodyParser.urlencoded({ extended: false })) ;
// parse application/json
app.use(bodyParser.json()) ;
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })) ;

app.use(auth_router) ;
app.use(item_router) ;
app.use(main_router) ;

module.exports = app;
