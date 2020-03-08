const express = require('express') ;
const passport = require('../../passport') ;
const User = require('../../models/user') ;
const ebayAuthToken = require('./ebayAuth');
const router = new express.Router() ;


/* Sandbooxx
const ebayAuthToken = new EbayAuthToken({
	clientId: 'AshryaAg-dev-SBX-c69eabc89-6a3028ab',
    clientSecret: 'SBX-69eabc89fac3-0d8f-413a-9603-941c',
    // grantType: "-- Grant type --", // optional
	devid: 'cbdc7682-17bf-4071-bae1-a743dec65574',
    scope: scopes, // array of scopes,
    // state: '', // optional
	redirectUri: 'Ashrya_Agrawal-AshryaAg-dev-SB-chsldix',
    env: "PRODUCTION" // either PRODUCTION or PROD (Default Value = PROD)
});
*/

router.get('/ebay', passport.authenticate('cookie', {}), (req, res)=>{
	const clientScope = 'https://api.ebay.com/oauth/api_scope';
	console.log(clientScope)
	// Client Crendential Auth Flow
	ebayAuthToken.getApplicationToken('PRODUCTION', clientScope).then((data) => {
		console.log(data);
	}).catch((error) => {
		console.log(`Error to get Access token :${JSON.stringify(error)}`);
	});
	console.log('Application token recieved!!');

	// Authorization Code Auth Flow
	const consentUrl = ebayAuthToken.generateUserAuthorizationUrl('PRODUCTION', scopes); // get user consent url.
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
	ebayAuthToken.exchangeCodeForAccessToken('PRODUCTION', code).then((data) => {
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
