const express = require('express') ;
const passport = require('../passport') ;
const User = require('../models/user') ;

const router = new express.Router() ;

router.post('/login', passport.authenticate('local-login', {}), async (req, res)=>{

});

router.get('/logout', passport.authenticate('jwt', {}), async (req, res)=>{

}) ;

router.post('/user', async (req, res)=>{
    const user = new User(req.body) ;
    try {
        await user.save()
    } catch(e) {
        res.status(400).send(e)
    }
}) ;

router.patch('/user', passport.authenticate('jwt', { session:false }),
    async (req , res)=>{
        const updates = Object.keys(req.body) ;
        const allowedUpdates = ['username', 'email', 'password', 'name', 'location', 'phone', 'address'] ;
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) ;

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }

        try {
            updates.forEach((update) => req.user[update] = req.body[update])
            await req.user.save() ;
            res.send(req.user)
        } catch (e) {
            res.status(400).send(e)
        }
    }) ;

router.delete('/user', passport.authenticate('jwt', { session:false }),
    async (req , res)=>{
        try {
            await req.user.remove()
        } catch (e) {
            res.status(500).send(e)
        }
    }) ;

module.exports = router ;