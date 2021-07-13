const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.user;
const Bid = db.bid;

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    req.userId = decoded.uuid;
    next();
  });
};

const verifyBidOwner = (req, res, next) => {
  let token = req.headers['x-access-token'];
  const uuid = req.headers['bidid'];

  if (!uuid)
    return res.status(403).send({
      message: 'No bid id provided!',
    });

  Bid.findOne({
    where: { uuid: uuid },
    attributes: ['userUuid'],
  })
    .then((bid) => {
      if (bid) {
        const bidOwner =
          Boolean(token) && authJwt.getUuidDecoded(token) === bid.userUuid;

        if (!bidOwner)
          return res.status(401).send({
            message: 'Unauthorized!',
          });
        next();
      } else {
        return res.status(404).send({ message: 'Bid not found' });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const getUuidDecoded = (token) => {
  return jwt.verify(token, config.secret, (err, decoded) => {
    return decoded ? decoded.uuid : undefined;
  });
};

const authJwt = {
  verifyToken,
  getUuidDecoded,
  verifyBidOwner,
};
module.exports = authJwt;
