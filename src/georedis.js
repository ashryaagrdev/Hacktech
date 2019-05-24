const redis = require('redis'),
    client = redis.createClient() ;

var geo = require('georedis').initialize(client) ;

module.exports = geo ;