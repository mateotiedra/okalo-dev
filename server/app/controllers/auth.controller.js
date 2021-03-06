const db = require('../models');
const config = require('../config/auth.config');
const nodemailer = require('../config/nodemail.config');
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const getNewConfCode = (base) => {
  const characters =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = base;
  for (let i = 0; i < 15; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  token = jwt.sign({ confirmationCode: token }, config.secret);
  return token;
};

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    fullname: req.body.fullname,
    phone: req.body.phone,
    school: req.body.school,
    instaName: req.body.instaName || '',
    confirmationCode: getNewConfCode(req.body.username),
  })
    .then((user) => {
      res.status(200).send({
        message: 'User registered successfully! Please check your email',
      });
      nodemailer.sendConfirmationEmail(
        user.username,
        user.email,
        user.confirmationCode
      );
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      [Op.or]: [
        { username: req.body.emailOrUsername },
        { email: req.body.emailOrUsername },
      ],
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      }

      if (user.status != 'active') {
        return res.status(401).send({
          message: 'Account pending. Check your Email',
          destinationEmail: user.email,
        });
      }

      var token = jwt.sign({ uuid: user.uuid }, config.secret);

      res.status(200).send({
        uuid: user.uuid,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.sendConfirmationEmail =
  (purpose = 'confirmEmail') =>
  (req, res) => {
    const resetPassord = purpose === 'resetPassword';
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User Not found.' });
        }

        if (!resetPassord && user.status !== 'pending') {
          return res.status(409).send({ message: 'User is already active.' });
        }

        user.confirmationCode = getNewConfCode(user.username);
        user.save((err) => {
          if (err) {
            return res.status(500).send({ message: err });
          }
        });

        if (resetPassord) {
          nodemailer.sendResetPasswordEmail(
            user.username,
            user.email,
            user.confirmationCode
          );
          res.status(200).send({
            message: 'Email to reset password sent',
            destinationEmail: user.email,
          });
        } else {
          nodemailer.sendConfirmationEmail(
            user.username,
            user.email,
            user.confirmationCode
          );
          res
            .status(200)
            .send({ message: 'New email sent', destinationEmail: user.email });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  };

exports.verifyuserConfirmation = (req, res) => {
  const confirmationCode = req.params.confirmationCode;
  if (!confirmationCode) {
    return res.status(403).send({
      message: 'No confirmation code provided!',
    });
  }

  User.findOne({
    where: { confirmationCode: confirmationCode },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }

      if (user.status === 'pending') {
        user.status = 'active';
      }
      user.confirmationCode = getNewConfCode(user.username);
      user.save((err) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
      });
      var token = jwt.sign({ uuid: user.uuid }, config.secret);
      res.status(200).send({ accessToken: token });
    })
    .catch((e) => console.log('error', e));
};
