const db = require('../models');
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {
  User.findByPk(req.userId)
    .then((user) => {
      user.password = undefined;
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.');
};
