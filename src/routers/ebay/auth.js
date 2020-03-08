const express = require('express') ;
const passport = require('../../passport') ;
const User = require('../../models/user') ;
const ebayAuthToken = require('./ebayAuth');
const scopes = require('./scopes');

const router = new express.Router() ;


router.get('/ebay', passport.authenticate('cookie', {}), (req, res)=>{
	// const clientScope = 'https://api.ebay.com/oauth/api_scope';
	// Client Crendential Auth Flow
/*	ebayAuthToken.getApplicationToken('PRODUCTION', clientScope).then((data) => {
		console.log(data);
	}).catch((error) => {
		console.log(`Error to get Access token :${JSON.stringify(error)}`);
	});*/
	// Authorization Code Auth Flow
	const consentUrl = ebayAuthToken.generateUserAuthorizationUrl(process.env.env, scopes); // get user consent url.
	// Using user consent url, you will be able to generate the code
	// which you can use it for exchangeCodeForAccessToken.
	res.redirect(consentUrl);


});

router.get('/ebay/callback', passport.authenticate('cookie', {}), (req, res)=>{
	console.log('Thanks for accepting TNC');
	var code = req.query.code;
	console.log('access code is : ' + code);
	// Exchange Code for Authorization token
	// const authToken = ebayAuthToken.getApplicationToken('PRODUCTION', scopes);
	ebayAuthToken.exchangeCodeForAccessToken(process.env.env, code).then((data) => {
		req.user.access_token = code["access_token"];
		req.user.refresh_token = code["refresh_token"];
		req.user.save();
		console.log(data);
	}).catch((error) => {
		console.log(error);
		console.log(`Error to get Access token :${JSON.stringify(error)}`);
	});

	res.send("Welcome");

});

router.get('/decline', (req, res)=>{
	console.log('Please accept TnC');
	res.send('Declined!!')
});

module.exports = router ;
