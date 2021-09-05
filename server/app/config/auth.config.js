require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET,
  confRoute: process.env.APP_ORIGIN + '/auth/confirm',
  contactRoute: process.env.APP_ORIGIN + '/accounts/edit',
  resetPasswordRoute: process.env.APP_ORIGIN + '/auth/resetpassword',
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASS,
  mailgun_api_key: process.env.MAILGUN_API_KEY,
  mailgun_domain: process.env.MAILGUN_DOMAIN,
};
