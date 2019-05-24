const express = require('express') ;
const router = new express.Router() ;
const passport = require('../passport') ;
const Item = require('../models/item') ;

router.get('/item/:id/', passport.authenticate('jwt', { session:false}),
    async (req, res)=>{
        Item.findById(req.params.id, (error, item)=>{
        	if (error){
        		res.status(400).send(error)
			}else {
				res.status(200).send({item}) ;
			}
		}) ;

}) ;

router.post('/item', passport.authenticate('jwt', { session:false }),
    async (req , res)=>{
        const item = Item(req.body) ;
        item.owner = req.user.id ;
        item.owner.total_price += item.price ;
		await item.save().then((item)=>{
			res.status(200).send({item})
		}).catch((e)=>{
			res.status(400).send(e) ;
		}) ;

}) ;

router.patch('/item/:id/', passport.authenticate('jwt', { session:false }),
    async (req , res)=>{
        Item.findOneAndUpdate({_id:req.params.id, owner:req.user._id}, req.body,{new: true} ,(err, doc)=>{
        	if (err){
        		res.status(400).send(error)
			}else {
        	res.status(200).send({doc})
		}
        })

}) ;

router.delete('/item/:id/', passport.authenticate('jwt', { session:false }),
    async (req , res)=>{
		try {
			const item = await Item.findOneAndDelete({ _id: req.params.id, owner: req.user._id }) ;

			if (!item) {
				res.status(404).send()
			}
			item.owner.total_price -= item.price ;
			await item.owner.save() ; // TODO: This line needs to be tested for bugs

			res.send(item)
		}catch (e) {
			res.status(500).send()
		}

}) ;

module.exports = router ;