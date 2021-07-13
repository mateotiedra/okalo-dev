const { authJwt } = require('../middleware');
const controller = require('../controllers/ask.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post('/api/ask', [authJwt.verifyToken], controller.newAsk);

  app.post(
    '/api/ask/update',
    [authJwt.verifyBidOwner],
    controller.changeAskStatus
  );

  /* app.get('/api/ask', controller.bidBoard); */

  app.delete('/api/ask', controller.deleteAsk);
};
