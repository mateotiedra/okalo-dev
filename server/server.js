require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// Use cors as a middleware
const origin = 'http://' + process.env.DB_HOST + ':' + process.env.FRONT_PORT;
app.use(
  cors({
    origin: [origin],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

app.use(cookieParser());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: 'userId',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expire: 60 * 60 * 24,
    },
  })
);

// simple route
app.get('/api', (req, res) => {
  console.log('dfghjklé');
  res.json({ message: 'Welcome to the okalo application.' });
});

require('./app/routes/user.routes.js')(app);

// set port, listen for requests
const PORT = process.env.DB_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
