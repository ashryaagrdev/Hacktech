const express = require('express') ;
const {router:auth_router} = require('./routers/authentication');
const item_router = require('./routers/items') ;
require('./db/mongoose') ;

const app = express() ;

app.use(auth_router) ;
app.use(item_router) ;

app.get('', (req, res)=>{
    res.send({ message : "<h1>Welcome to the backend service of my app</h1>" }) ;
}) ;


module.exports = app ;
