const { verifySignUp, authJwt } = require('../middleware');
const controller = require('../controllers/auth.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/auth', [authJwt.verifyToken], (req, res) => {
    res.status(200).send({ message: 'User logged in.' });
  });

  app.post(
    '/api/auth/signup',
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post(
    '/api/auth/confirm/:confirmationCode',
    controller.verifyuserConfirmation
  );

  app.post(
    '/api/auth/resendconfirmationlink',
    controller.sendConfirmationEmail('confirmEmail')
  );

  app.post('/api/auth/signin', controller.signin);

  app.post(
    '/api/auth/resetpassword/:confirmationCode',
    controller.verifyuserConfirmation
  );

  app.post(
    '/api/auth/sendresetpasswordlink',
    controller.sendConfirmationEmail('resetPassword')
  );
};
