const express = require('express');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const router = express.Router();
require('dotenv').config()

// Configure Twitter OAuth strategy
passport.use(new TwitterStrategy({
    consumerKey: 'L6GsCozIYG2NEqJflUxgRQnKb',
    consumerSecret: 'ydwGoJA6LQ65kPTZjiI8JpXxf2sLYxnYQg8imv3G2ikfxuAExU',
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    // In a real application, you would find or create a user in your database
    // based on the profile information received from Twitter.
    return done(null, profile);
  }
));

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;
