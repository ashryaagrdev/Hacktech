const express = require('express') ;
const router = new express.Router() ;
const passport = require('../passport') ;
const Item = require('../models/item') ;

router.get('/item/:id/', passport.authenticate('jwt', { session:false}),
    async (req, res)=>{
        const item = Item.findById(id) ;
            res.send(item) ;
}) ;

router.post('/item', passport.authenticate('jwt', { session:false }),
    async (req , res)=>{
        const item = Item(req.body) ;
        item.owner = req.user.id ;
		await item.save().then((item)=>{
			res.status(200).send({item})
		}).catch((e)=>{
			res.status(400).send(e) ;
		}) ;

}) ;

router.patch('/item/:id/', passport.authenticate('jwt', { session:false }),
    async (req , res)=>{
        Item._findOneAndUpdate({ObjectId:id}, req.body)
}) ;

router.delete('/item/:id/', passport.authenticate('jwt', { session:false }),
    async (req , res)=>{
    try {
        await Item.delete(id)
    }catch (e) {
        res.status(500).send(e)
    }

}) ;

module.exports = router ;