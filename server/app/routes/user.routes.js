const { authJwt } = require('../middleware');
const controller = require('../controllers/user.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/user/u', [authJwt.verifyToken], controller.userBoard);
  app.get('/api/user/:username', controller.otherUserBoard);

  app.post(
    '/api/user/settings',
    [authJwt.verifyToken],
    controller.changeUserSettings
  );

  // Examples routes
  app.get(
    '/api/user/profile/settings',
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get('/api/test/all', controller.allAccess);

  app.get('/api/test/user', [authJwt.verifyToken], controller.userBoard);

  app.get(
    '/api/test/mod',
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    '/api/test/admin',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
