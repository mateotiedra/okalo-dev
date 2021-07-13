const db = require('../models');
const controllerHelper = require('./helper');
const User = db.user;
const Bid = db.bid;

var bcrypt = require('bcrypt');

const basicsExclude = ['uuid', 'password', 'status', 'confirmationCode'];

exports.userBoard = (req, res) => {
  User.findOne({
    where: { uuid: req.userId },
    include: {
      model: Bid,
      as: 'bidsOwned',
      attributes: {
        exclude: ['userId'],
      },
    },
    attributes: {
      exclude: basicsExclude,
    },
  })
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      } else res.status(404).send({ message: 'user not found' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
};

exports.getUserProfile = (req, res) => {
  const username = req.params.username;

  User.findOne({
    where: { username: username },
    include: {
      model: Bid,
      as: 'bidsOwned',
      attributes: {
        exclude: ['userId'],
      },
    },
    attributes: {
      exclude: [...basicsExclude, 'email', 'fullname', 'phone'],
    },
  })
    .then((user) => {
      if (user) return res.status(200).send(user);
      else res.status(404).send({ message: 'user not found' });
    })
    .catch((err) => {
      res.status(500).send();
    });
};

exports.changeUserSettings = (req, res) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
  }
  return controllerHelper.changeObjectSettings(
    User,
    ['fullname', 'phone', 'school', 'password'],
    req.userId
  )(req, res);
};
