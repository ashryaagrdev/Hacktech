const passport = require('passport') ;
const User = require('./models/user') ;

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

var JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;

// var eBayStrategy = require("passport-ebay");
// console.log(eBayStrategy)

var opts = {} ;

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken() ;
opts.secretOrKey = process.env.SECRET_KEY ;

passport.use('jwt', new JwtStrategy(opts, function(jwt_payload, done) {
	User.findOne({_id: jwt_payload._id}, function(err, user) {
		if (err) {
			return done(err, false);
		}
		if (user) {
			return done(null, user);
		} else {
			return done(null, false);
			// or you could create a new account
		}
	});
}));

opts = {} ;
opts.jwtFromRequest = ExtractJwt.fromExtractors([cookieExtractor]);
opts.secretOrKey = process.env.SECRET_KEY ;

passport.use('cookie', new JwtStrategy(opts, function(jwt_payload, done) {
	// console.log("jwtpayload is : ", jwt_payload, jwt_payload.sub)
	User.findById(jwt_payload._id, function(err, user) {
		if (err) {
			return done(err, false);
		}
		// console.log(user)
		if (user) {
			return done(null, user);
		} else {
			return done(null, false);
			// or you could create a new account
		}
	});
}));

/*
var _passportOauth = require('passport-oauth2');
var _passportOauth2 = _interopRequireDefault(_passportOauth);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class eBayStrategy extends _passportOauth2.default {
  constructor(options = {}, verify = null) {

  	options.clientSecret = 'SBX-69eabc89fac3-0d8f-413a-9603-941c';
  	options.clientID = 'AshryaAg-dev-SBX-c69eabc89-6a3028ab';
  	options.clientId = options.clientID;
    options.ruName = 'Ashrya_Agrawal-AshryaAg-dev-SB-chsldix';

    if (!options.clientSecret) {
      throw new TypeError('Strategy requires a clientSecret option');
    }

    if (!options.ruName) {
      throw new TypeError('Strategy requires a ruName option');
    }


    options.authorizationURL = options.authorizationURL || 'https://signin.ebay.com/authorize';
    options.tokenURL = options.tokenURL || 'https://api.ebay.com/identity/v1/oauth2/token';

    options.customHeaders = options.customHeaders || {};
    options.customHeaders.Authorization = 'Basic ' + new Buffer(options.clientID + ':' + options.clientSecret).toString('base64');

    options.callbackURL = options.ruName;
    options.useExactURLs = true;
    options.skipUserProfile = true;

    let cb;

    if (verify) {
      if (options.passReqToCallback) {
        cb = (req, accessToken, refreshToken, noProfile, done) => verify(req, accessToken, refreshToken, done);
      } else {
        cb = (accessToken, refreshToken, noProfile, done) => verify(accessToken, refreshToken, done);
      }
    }

    super(options, cb);

    this.name = 'ebay';
  }
}
*/



/*passport.use('ebay', new eBayStrategy({
	clientSecret : 'SBX-69eabc89fac3-0d8f-413a-9603-941c',
	clientID : 'AshryaAg-dev-SBX-c69eabc89-6a3028ab',
    ruName : 'Ashrya_Agrawal-AshryaAg-dev-SB-chsldix'
	},
  function(accessToken, refreshToken, cb) {
    // Do whatever you need with credentials. A request call to eBay api to fetch user perhaps?
	  console.log(`access token is ${accessToken}`);
    cb();
  }
));*/

module.exports = passport ;