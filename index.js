const express = require('express');
const session = require('express-session');
const passport = require('passport');
const authController = require('./controllers/authController');
require('dotenv').config()
const path = require('path'); // Add this line

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set views directory

// Initialize session middleware
app.use(session({
  secret: process.env.sessionKey,
  resave: true,
  saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

// Mount authentication routes
app.use('/auth', authController);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
