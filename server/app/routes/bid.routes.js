const { authJwt } = require('../middleware');
const controller = require('../controllers/bid.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post('/api/bid/new', [authJwt.verifyToken], controller.newBid);

  app.post('/api/bid/update', [authJwt.verifyToken], controller.changeBidInfo);
};
