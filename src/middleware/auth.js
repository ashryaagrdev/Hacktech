const jwt = require('jsonwebtoken') ;
const User = require('../models/user') ;
// Most probably i will remove this whole file
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '') ;
        const decoded = jwt.verify(token, process.env.JWT_SECRET) ;
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) ;

        if (!user) {
             throw new Error('Please login again. Token has expired.') ;
        }

        req.token = token;
        req.user = user ;
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
} ;

module.exports = auth ;