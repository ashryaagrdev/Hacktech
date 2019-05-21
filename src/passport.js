const passport = require('passport') ;
const CookieStrategy = require('passport-cookie').Strategy ;
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('login', new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.use(new CookieStrategy({
  cookieName: 'auth',
  signed: true,
  passReqToCallback: true
}, function(req, token, done) {
  User.findByToken({ token: token }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    return done(null, user);
  });
})) ;

module.exports = passport