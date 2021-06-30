const db = require('../models');
const Bid = db.bid;

exports.bidBoard = (req, res) => {
  User.findByPk(req.bidId)
    .then((bid) => {
      res.status(200).send(bid);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.newBid = (req, res) => {
  Bid.create({
    title: req.body.title,
    author: req.body.author,
    edition: req.body.edition,
    condition: req.body.condition,
    annotation: req.body.annotation,
    price: req.body.price,
    userId: req.userId,
  })
    .then((bid) => {
      res.status(200).send({
        message: 'Bid registered successfully!',
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.changeBidInfo = (req, res) => {
  return controllerHelper.changeObjectSettings(
    Bid,
    ['title', 'author', 'edition', 'condition', 'annotation', 'price'],
    req.bidId
  )(req, res);
};
