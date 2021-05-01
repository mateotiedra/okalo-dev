const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const User = require('../models/user.model.js');

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
    // Create a User
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      fullname: req.body.fullname,
      username: req.body.username,
      phone: req.body.phone,
      school: req.body.school,
    });

    // Save User in the database
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || 'Some error occurred while creating the User.',
        });
      else res.send(data);
    });
  });
};

// Check if there is already a user with the same email
exports.verifyEmail = (req, res, next) => {
  User.findBy('email', req.body.email, (err, result) => {
    if (err) {
      if (err.kind === 'not_found') {
        next();
      } else {
        res.status(500).send({
          message: 'Error retrieving User with id ' + req.params.userId,
        });
      }
    } else {
      res.json({
        success: false,
        message: 'Cette adresse e-mail est déjà utilisée par un autre compte',
      });
    }
  });
};

// Check if there is already a user with the same username
exports.verifyUsername = (req, res, next) => {
  User.findBy('username', req.body.username, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        next();
      } else {
        res.status(500).send({
          message: 'Error retrieving User with id ' + req.params.userId,
        });
      }
    } else {
      res.json({
        success: false,
        message: "Ce nom d'utilisateur est déjà utilisée par un autre compte",
      });
    }
  });
};

// Find a single User with its username
exports.loginByUsername = (req, res) => {
  User.findBy('username', req.body.username, (err, foundUser) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with username ${req.body.username}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving User with id ' + req.body.username,
        });
      }
    } else {
      bcrypt.compare(req.body.password, foundUser.password, (error, ok) => {
        if (ok) {
          const id = foundUser.id;
          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: 300,
          });

          foundUser.password = undefined;
          req.session.user = foundUser;

          res.status(200).json({
            auth: true,
            token: token,
            user: foundUser,
            message: 'Login with success',
          });
        } else {
          res.status(401).send({ message: 'Wrong username' });
        }
      });
    }
  });
};

// Find a single User with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving User with id ' + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  console.log(req.body);

  User.updateById(req.params.userId, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating User with id ' + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

// Delete a User with the specified userId in the request
exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete User with id ' + req.params.userId,
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

// Delete all User from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all users.',
      });
    else res.send({ message: `All User were deleted successfully!` });
  });
};
