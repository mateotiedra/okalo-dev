require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET,
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASS,
  confRoute: process.env.APP_ORIGIN + '/auth/confirm',
};
