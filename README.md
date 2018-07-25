# Github-Login-Git-Auth
Soft Alliance Test{Nodejs application implementing passport for github oauth authentication with session store, and Profile Page}

This project is a simple solution to use Express 4.x and Passport to authenticate users using github.

Make sure to configure the mongodb uri on gh-auth.js

First things

go to https://github.com/settings/applications/new.		

choose a name

use http://127.0.0.1:5045 as Homepage URL

Give a description(optional), though this will be displayed to all users of your application.

authorization callback URL will be http://127.0.0.1:5045/auth/github/callback

click on register application

Running The APP

$ git clone git@github.com/nnamdimykel/github-login-git-auth.git

$ cd github-login-git-auth

$ npm install

$ npm start

Your app should now be running on localhost:5054.

