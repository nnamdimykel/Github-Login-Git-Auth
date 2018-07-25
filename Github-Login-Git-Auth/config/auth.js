// config/auth.js
module.exports = {

    'githubAuth' : {
        'clientID'        : 'CLIENT-ID', // your App ID
        'clientSecret'    : 'APP-SECRET', // your App Secret
        'callbackURL'     : 'http://127.0.0.1:5045/auth/github/callback',
        'profileFields'   : ['id', 'email', 'name'],
        'userAgent'       : 'oauth-app-name' // change this to your github oauth app name.
    }
};
