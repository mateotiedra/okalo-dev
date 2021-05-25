const db = require('../models');
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {
  User.findByPk(req.userId)
    .then((user) => {
      user.password = undefined;
      user.confirmationCode = undefined;
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
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

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.');
};
