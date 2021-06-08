const db = require('../models');
const User = db.user;

var bcrypt = require('bcrypt');

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

exports.changeUserSettings = (req, res) => {
  User.findByPk(req.userId)
    .then((user) => {
      const fieldsToChange = [
        'fullname',
        'insta',
        'phone',
        'school',
        'snap',
        'password',
      ];
      var smthChanged = false;
      fieldsToChange.forEach((fieldName) => {
        if (
          req.body[fieldName] !== undefined &&
          req.body[fieldName] != user[fieldName]
        ) {
          user[fieldName] =
            fieldName === 'password'
              ? bcrypt.hashSync(req.body.password, 8)
              : req.body[fieldName];
          smthChanged = true;
        }
      });

      if (!smthChanged) {
        return res.status(304).send({ message: 'Nothing changed' });
      }
      user.save((err) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
      });
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
