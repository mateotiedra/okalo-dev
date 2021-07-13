const { authJwt } = require('../middleware');
const controllerHelper = require('./helper');
const db = require('../models');
const Ask = db.ask;
const Bid = db.bid;
const User = db.user;

const getUserAndBid = (userUuid, bidUuid) => async (req, res) => {
  if (!userUuid)
    return res.status(403).send({ message: 'No user id provided!' });
  if (!bidUuid) return res.status(403).send({ message: 'No bid id provided!' });

  const user = await User.findOne({ where: { uuid: userUuid } }).catch(() => {
    return res.status(404).send({ message: 'User not found' });
  });
  const bid = await Bid.findOne({ where: { uuid: bidUuid } }).catch(() => {
    return res.status(404).send({ message: 'Bid not found' });
  });

  return [user, bid];
};

exports.newAsk = async (req, res) => {
  const [user, bid] = await getUserAndBid(req.userId, req.headers['bidid'])(
    req,
    res
  );

  if (!user || !bid) return;

  if (bid.ownerUuid === req.userId)
    return res.status(409).send({ message: 'The user cannot ask his own bid' });

  user
    .addAsk(bid, { as: 'asks', through: { status: 'pending' } })
    .then(() => {
      res.status(200).send({ message: 'New ask relation created!' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

exports.deleteAsk = (req, res) => {
  const bidUuid = req.headers['bidid'];
  const userUuid = authJwt.getUuidDecoded(req.headers['x-access-token']);

  if (!bidUuid) return res.status(403).send({ message: 'No bid id provided!' });
  if (!userUuid)
    return res.status(403).send({ message: 'No user id provided!' });

  Ask.destroy({
    where: {
      userUuid: userUuid,
      bidUuid: bidUuid,
    },
  })
    .then(() => {
      res.status(200).send({
        message: 'Ask deleted successfully!',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send({ message: 'Ask not found!' });
    });
};

exports.changeAskStatus = (req, res) => {};
