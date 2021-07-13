const { authJwt } = require('../middleware');
const controllerHelper = require('./helper');
const db = require('../models');
const Op = db.Sequelize.Op;
const User = db.user;
const Bid = db.bid;

exports.bidBoard = (req, res) => {
  const token = req.headers['x-access-token'];
  const userUuid = authJwt.getUuidDecoded(token) || 'rien';
  const bidUuid = req.params.uuid;

  Bid.findOne({
    where: { uuid: bidUuid },
    include: [
      {
        model: User,
        as: 'bidsOwned',
        attributes: ['username'],
      },
      {
        model: User,
        as: 'asks',
        where: { uuid: userUuid },
        attributes: ['uuid'],
        required: false,
      },
    ],
  })
    .then((bid) => {
      if (bid) {
        const bidOwner = userUuid === bid.ownerUuid;
        const bidAsker = bid.asks.length > 0
        var bidAskerInDeal = false
        bid.asks.forEach(ask => {
          if(ask.uuid === userUuid) bidAskerInDeal=true
        });

        delete bid.dataValues.ownerUuid;
        delete bid.asks;

        return res
          .status(200)
          .send({ bid, bidOwner, username: bid.bidsOwned.username, bidAsker, bidAskerInDeal });
      }

      return res.status(404).send({ message: 'Bid not found' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
};

exports.newBid = (req, res) => {
  Bid.create({
    title: req.body.title,
    author: req.body.author,
    edition: req.body.edition,
    condition: req.body.condition,
    annotation: req.body.annotation,
    note: req.body.note,
    price: req.body.price,
    ownerUuid: req.userId,
  })
    .then((bid) => {
      res.status(200).send({
        message: 'Bid registered successfully!',
      });
    })

    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

exports.deleteBid = (req, res) => {
  const uuid = req.headers['bidid'];
  Bid.destroy({
    where: {
      uuid: uuid,
    },
  })
    .then(() => {
      res.status(200).send({
        message: 'Bid deleted successfully!',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.changeBidInfo = (req, res) => {
  return controllerHelper.changeObjectSettings(
    Bid,
    ['title', 'author', 'edition', 'condition', 'annotation', 'note', 'price'],
    req.body.bidId
  )(req, res);
};
