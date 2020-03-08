const express = require('express') ;
const passport = require('../../passport') ;
const User = require('../../models/user') ;
const EbayAuthToken = require('ebay-oauth-nodejs-client');
const router = new express.Router() ;
const request = require('request');

const scopes = ['https://api.ebay.com/oauth/api_scope',
    'https://api.ebay.com/oauth/api_scope/sell.marketing.readonly',
    'https://api.ebay.com/oauth/api_scope/sell.marketing',
    'https://api.ebay.com/oauth/api_scope/sell.inventory.readonly',
    'https://api.ebay.com/oauth/api_scope/sell.inventory',
    'https://api.ebay.com/oauth/api_scope/sell.account.readonly',
    'https://api.ebay.com/oauth/api_scope/sell.account',
    'https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly',
    'https://api.ebay.com/oauth/api_scope/sell.fulfillment'
];

const ebayAuthToken = new EbayAuthToken({
	clientId: 'AshryaAg-dev-SBX-c69eabc89-6a3028ab',
    clientSecret: 'SBX-69eabc89fac3-0d8f-413a-9603-941c',
    // grantType: "-- Grant type --", // optional
	devid: 'cbdc7682-17bf-4071-bae1-a743dec65574',
    scope: scopes, // array of scopes,
    // state: '', // optional
	redirectUri: 'Ashrya_Agrawal-AshryaAg-dev-SB-chsldix',
    env: "SANDBOX" // either SANDBOX or PROD (Default Value = PROD)
});

router.get('/ebay', (req, res)=>{
	const clientScope = 'https://api.ebay.com/oauth/api_scope';
	console.log(clientScope)
	// Client Crendential Auth Flow
	ebayAuthToken.getApplicationToken('SANDBOX', clientScope).then((data) => {
		console.log(data);
	}).catch((error) => {
		console.log(`Error to get Access token :${JSON.stringify(error)}`);
	});
	console.log('Application token recieved!!');

	// Authorization Code Auth Flow
	const consentUrl = ebayAuthToken.generateUserAuthorizationUrl('SANDBOX', scopes); // get user consent url.
	// Using user consent url, you will be able to generate the code
	// which you can use it for exchangeCodeForAccessToken.
	res.redirect(consentUrl);


});

router.post('/ebay/callback', (req, res)=>{
	console.log('Accepted req is post')
	res.send('Accepted!!')
});

router.get('/decline', (req, res)=>{
	console.log('Please accept TnC');
	res.send('Declined!!')
});

router.get('/ebay/callback', (req, res)=>{
	console.log('Thanks for accepting TNC');
	var code = req.query.code;
	console.log('access code is : ' + code);
	// Exchange Code for Authorization token
	const authToken = ebayAuthToken.getApplicationToken('SANDBOX', scopes);
	ebayAuthToken.exchangeCodeForAccessToken(authToken).then((data) => { // eslint-disable-line no-undef
		console.log(data);
	}).catch((error) => {
		console.log(error);
		console.log(`Error to get Access token :${JSON.stringify(error)}`);
	});

	// Getting access token from refresh token obtained from Authorization Code flow
	const refreshToken = 'v^1.1#i^1#r^1#f^0#I^3#p^3#t^Ul4xMF8yOjNDMjU1MUI0OTJBMDg5NUZGMUY4RkEwNjk1MDRBQjQ2XzNfMSNFXjI2MA==';
	ebayAuthToken.getAccessToken('PRODUCTION', refreshToken, scopes).then((data) => {
		console.log(data);
	}).catch((error) => {
		console.log(`Error to get Access token from refresh token:${JSON.stringify(error)}`);
	});
	res.send("Welcome");

});

/*router.get('/auth/ebay', passport.authenticate('ebay'));

router.get('/auth/ebay/callback',
  function(req, res) {
	console.log('Inside callback!!');
    // Successful authentication, redirect home.
    res.redirect('/');
  });*/

module.exports = router ;
