const express = require('express') ;
const passport = require('../passport') ;
const User = require('../models/user') ;

const router = new express.Router() ;

router.post('/login', async (req, res)=>{

	User.findOne({ username: req.body.username }, async function(err, user) {
		if (err) {
			return res.status(500).send();
		}
		if (!user) {
			return res.status(400).send("No such username");
		}
		const match = await bcrypt.compare(req.body.password, user.password);
		if (!match) {
			return res.status(400).send("Incorrect username") ;
		}
		const token = await user.generateAuthToken() ;
		res.cookie('jwt', token) ;
		res.redirect('/add_friend') ;
	}) ;
});


router.get('/logout', passport.authenticate('cookie', {}), (req, res)=>{
	try {
		req.user.tokens = req.user.tokens.filter((token) => token.token!==req.cookies.jwt) ;
		req.user.save() ;
		res.clearCookie('jwt') ;
		res.redirect('/login')
	} catch (e) {
		res.status(500).send() ;
	}
}) ;

router.post('/user', async (req, res)=>{
	if (req.body.phone && req.body.phone.length!==10)
		return res.status(400).send("Please enter a valid phone number") ;
	// I did a sanity check here to avoid sanity check while entering data into database
	const user = new User(req.body) ;
	user.save().then((user)=>{
		res.status(200).send({user})
	}).catch((err)=>{
		res.status(400).send(err)
	}) ;
}) ;


router.patch('/user', passport.authenticate('jwt', { session:false }),
	async (req , res)=>{
		const updates = Object.keys(req.body) ;
		const allowedUpdates = ['username', 'email', 'password', 'name'] ;
		const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) ;

		if (!isValidOperation) {
			return res.status(400).send({ error: 'Invalid updates!' })
		}

		try {
			updates.forEach((update) => req.user[update] = req.body[update]) ;
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