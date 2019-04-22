const express = require('express') ;
const path = require('path') ;

const app = express() ;
const publicPathDirectory = path.join(__dirname, '../public') ;

app.use(express.static(publicPathDirectory)) ;

const port = process.env.PORT ;

app.listen(port, ()=>{
    console.log(`server is running on port : ${port}`) ;
}) ;