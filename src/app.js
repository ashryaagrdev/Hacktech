const auth_router = require('./routers/auth') ;
const item_router = require('./routers/items') ;
const main_router = require('./routers/main') ;
const ebayAuth_router = require('./routers/ebay/auth');
const matching_router = require('./routers/matching');
var bodyParser = require('body-parser') ;
const passport = require('./passport') ;
const cookieParser = require('cookie-parser') ;
const path = require('path') ;
const express = require('express') ;

require('./db/mongoose') ;

const app = express() ;

const publicDirectoryPath = path.join(__dirname, '../public') ;

app.set('view engine', 'ejs');
app.set('views', publicDirectoryPath) ;



// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) ;

app.use(passport.initialize()) ;

// Next 5 lines help in parsing input and getting req.body
app.use(bodyParser.urlencoded({ extended: false })) ;
// parse application/json
app.use(bodyParser.json()) ;
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })) ;

// parses cookies and gives an object req.cookies
app.use(cookieParser()) ;

app.use(matching_router);
app.use(ebayAuth_router);
app.use(auth_router) ;
app.use(item_router) ;
app.use(main_router) ;

module.exports = app;

//MONGODB_URL=mongodb://127.0.0.1:27017/eshopping_collab
//mongodb+srv://ashryaagr:Qwerty12345@cluster0-dx7jb.mongodb.net/test?retryWrites=true&w=majority