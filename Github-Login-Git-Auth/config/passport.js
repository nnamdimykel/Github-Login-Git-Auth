var LocalStrategy    = require('passport-local').Strategy;
var GithubStrategy = require('passport-github2').Strategy;

// load the user model
var User       = require('../app/models/user');

// load the auth variables
var configAuth = require('./auth'); // you should use environment variables instead

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // GITHUB ==================================================================
    // =========================================================================
    var ghStrategy = configAuth.githubAuth;
    ghStrategy.passReqToCallback = true;  // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    passport.use(new GithubStrategy(ghStrategy,
    function(req, token, refreshToken, profile, done) {

        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'github.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        if (!user.github.token) {
                            user.github.token = token;
                            user.github.name  = profile.displayName; // + ' ' + profile.familyName;
                            user.github.email = (profile.emails[0].value || '').toLowerCase();

                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                    
                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // create new user
                        var newUser          = new User();

                        newUser.github.id    = profile.id;
                        newUser.github.token = token;
                        newUser.github.name  = profile.displayName; //
                        newUser.github.email = (profile.emails[0].value || '').toLowerCase();

                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                                
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user          = req.user; // pull the user out of the session
                user.github.id    = profile.id;
                user.github.token = token;
                user.github.name  = profile.displayName; //
                user.github.email = (profile.emails[0].value || '').toLowerCase();

                user.save(function(err) {
                    if (err)
                        return done(err);
                        
                    return done(null, user);
                });

            }
        });

    }));

};
