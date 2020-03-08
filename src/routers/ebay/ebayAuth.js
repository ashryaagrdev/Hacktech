const EbayAuthToken = require('ebay-oauth-nodejs-client');

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
	clientId: 'AshryaAg-dev-PRD-f69ec6ae1-ae9d0284',
    clientSecret: 'PRD-69ec6ae180cf-2fca-4a49-a2dc-303b',
    // grantType: "-- Grant type --", // optional
	devid: 'cbdc7682-17bf-4071-bae1-a743dec65574',
    scope: scopes, // array of scopes,
    // state: '', // optional
	redirectUri: 'Ashrya_Agrawal-AshryaAg-dev-PR-ijnvfr',
    env: "PRODUCTION" // either PRODUCTION or PROD (Default Value = PROD)
});

module.exports = ebayAuthToken;