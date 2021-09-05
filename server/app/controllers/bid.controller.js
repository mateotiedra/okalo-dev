const { authJwt } = require('../middleware');
const controllerHelper = require('./helper');
const db = require('../models');
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const User = db.user;
const Bid = db.bid;

exports.searchBids = (req, res) => {
  const {
    searchTitle,
    searchAuthor,
    searchEdition,
    searchSchool,
    searchLimit = 20,
  } = req.query;

  const searchTitleWords = searchTitle ? searchTitle.split(' ') : [];

  const searchTitleClause = searchTitleWords.map((word) => {
    return sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), {
      [Op.like]: `%${word}%`,
    });
  });

  const searchAuthorWords = searchAuthor
    ? searchAuthor.replace('-', ' ').split(' ')
    : [];

  const searchAuthorClause = searchAuthorWords.map((word) => {
    return sequelize.where(sequelize.fn('LOWER', sequelize.col('author')), {
      [Op.like]: `%${word}%`,
    });
  });

  const whereClause = {
    [Op.and]: [
      ...searchTitleClause,
      ...searchAuthorClause,
      ...(searchEdition
        ? [
            sequelize.where(sequelize.fn('LOWER', sequelize.col('edition')), {
              [Op.like]: `%${searchEdition}%`,
            }),
          ]
        : []),
    ],
  };

  Bid.findAll({
    where: whereClause,
    attributes: {
      exclude: ['ownerUuid'],
    },
    include: [
      {
        model: User,
        as: 'bidsOwned',
        attributes: ['school'],
      },
    ],
    order: db.Sequelize.literal('rand()'),
    // limit: searchLimit || 20,
  })
    .then((bids) => {
      if (searchSchool)
        bids = bids.filter((bid) => bid.bidsOwned.school === searchSchool);

      if (bids && bids.length)
        return res.status(200).send(bids.slice(0, searchLimit));

      return res.status(404).send({ message: 'Bid not found' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
};

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
        attributes: ['username', 'school'],
      },
    ],
  })
    .then((bid) => {
      if (bid) {
        const bidOwner = userUuid === bid.ownerUuid;

        delete bid.dataValues.ownerUuid;

        return res.status(200).send({
          bid,
          bidOwner,
          username: bid.bidsOwned.username,
          school: bid.bidsOwned.school,
        });
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

exports.deleteBid = async (req, res) => {
  const uuid = req.headers['bidid'];
  const newBidStatus = req.headers['bid-status'];
  const bid = await Bid.findOne({
    where: {
      uuid: uuid,
    },
  });

  if (!bid) return res.status('404').send({ message: 'Bid not found!', err });

  bid.status = newBidStatus || 'deleted';
  await bid.save();
  await bid.destroy();
  return res.status(200).send({ message: 'Bid well deleted!' });
};

exports.changeBidInfo = (req, res) => {
  return controllerHelper.changeObjectSettings(
    Bid,
    ['title', 'author', 'edition', 'condition', 'annotation', 'note', 'price'],
    req.headers['bidid']
  )(req, res);
};
