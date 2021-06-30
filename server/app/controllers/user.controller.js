const db = require('../models');
const controllerHelper = require('./helper');
const User = db.user;
const Bid = db.bid;

var bcrypt = require('bcrypt');

exports.userBoard = (req, res) => {
  User.findOne({
    where: { id: req.userId },
    include: {
      model: Bid,
      attributes: {
        exclude: ['id', 'userId'],
      },
    },
    attributes: {
      exclude: ['password', 'confirmationCode'],
    },
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
};

exports.otherUserBoard = (req, res) => {
  const username = req.params.username;

  User.findOne({
    where: {
      username: username,
    },
  })
    .then((user) => {
      res
        .status(200)
        .send({ username: user.username, school: user.school, id: user.id });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.changeUserSettings = (req, res) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
  }
  return controllerHelper.changeObjectSettings(
    User,
    ['fullname', 'insta', 'phone', 'school', 'snap', 'password'],
    req.userId
  )(req, res);
};
