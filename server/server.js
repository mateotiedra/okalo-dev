require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);
app.use(cookieParser());
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

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  /*password: '5VH7Bxep9awQzC6&',*/
  database: 'okalo',
});

db.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected!');
  }
});

const verifyEmail = (req, res, next) => {
  const email = req.body.email;

  db.query('SELECT * FROM users WHERE email = ?', email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      res.json({
        success: false,
        message: 'Cette adresse e-mail est déjà utilisée pour un autre compte',
      });
    } else {
      next();
    }
  });
};

const verifyUsername = (req, res, next) => {
  const username = req.body.username;

  db.query(
    'SELECT * FROM users WHERE username = ?',
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.json({
          success: false,
          message:
            "Ce nom d'utilisateur n'est pas disponible. Veuillez en choisir un autre.",
        });
      } else {
        next();
      }
    }
  );
};

app.post('/api/signup', verifyEmail, verifyUsername, (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const fullname = req.body.fullname;
  const username = req.body.username;
  const phone = req.body.phone;
  const school = req.body.school;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      res.send({ err: err });
    }
    db.query(
      'INSERT INTO users (email, password, fullname, username, phone, school) VALUES (?,?,?,?,?,?)',
      [email, hash, fullname, username, phone, school],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          res.json({
            success: true,
            message: 'Compte créé avec succès !',
          });
        }
      }
    );
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (token === undefined || token === null || token === 'null') {
    res.json({ auth: false, message: 'No token given, login first' });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: decoded });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

app.get('/userAuthenticated', verifyJWT, (req, res) => {
  res.json({ auth: true, message: 'You are authenticated' });
});

app.get('/api/login', (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post('/api/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query('SELECT * FROM users WHERE email = ?', email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          const id = result[0].id;
          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: 300,
          });
          req.session.user = result;

          res.json({
            auth: true,
            token: token,
            result: result,
            message: 'Login with success',
          });
        } else {
          res.json({
            auth: false,
            message: 'wrong email/password combination',
          });
        }
      });
    } else {
      res.json({ auth: false, message: 'no user exists' });
    }
  });
});

app.listen(8080, () => {
  console.log('Server (backend) is running..');
});
