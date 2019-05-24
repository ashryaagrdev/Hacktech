const redis = require('redis'),
    client = redis.createClient() ;

var geo = require('georedis').initialize(client) ;


// Npm package used : https://www.npmjs.com/package/georedis

module.exports = geo ;