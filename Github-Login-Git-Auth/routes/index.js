var express = require('express');
module.exports = function(app, passport) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index', {
            title: 'Index Page'
        });
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('user/home', {
            user : req.user,
            title: 'Github User Profile'
        });
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // github -------------------------------

        // send to github to do the authentication
        app.get('/auth/github', passport.authenticate('github', { scope : ['public_profile', 'public_repo', 'email'] }));

        // handle the callback after github has authenticated the user
        app.get('/auth/github/callback',
            passport.authenticate('github', {
                failureRedirect : '/' }),
            function(req, res) {
              //successRedirect : '/profile',
              res.redirect('/profile');
        });
// =============================================================================
// GH - AUTH - passport ========================================================
// =============================================================================



};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
