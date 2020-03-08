const EbayAuthToken = require('ebay-oauth-nodejs-client');

const scopes = require('./scopes');

var ebayAuthToken;

if(process.env.env==="PRODUCTION") {
	ebayAuthToken = new EbayAuthToken({
		clientId: 'AshryaAg-dev-PRD-f69ec6ae1-ae9d0284',
		clientSecret: 'PRD-69ec6ae180cf-2fca-4a49-a2dc-303b',
		// grantType: "-- Grant type --", // optional
		devid: 'cbdc7682-17bf-4071-bae1-a743dec65574',
		scope: scopes, // array of scopes,
		// state: '', // optional
		redirectUri: 'Ashrya_Agrawal-AshryaAg-dev-PR-ijnvfr',
		env: process.env.env
	});
} else {
	ebayAuthToken = new EbayAuthToken({
		clientId: 'AshryaAg-dev-SBX-c69eabc89-6a3028ab',
		clientSecret: 'SBX-69eabc89fac3-0d8f-413a-9603-941c',
		// grantType: "-- Grant type --", // optional
		devid: 'cbdc7682-17bf-4071-bae1-a743dec65574',
		scope: scopes, // array of scopes,
		// state: '', // optional
		redirectUri: 'Ashrya_Agrawal-AshryaAg-dev-SB-chsldix',
		env: process.env.env // either PRODUCTION or PROD (Default Value = PROD)
	});
}


module.exports = ebayAuthToken;