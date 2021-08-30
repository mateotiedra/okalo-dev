const nodemailer = require('nodemailer');
const config = require('../config/auth.config');

const user = config.user;
const pass = config.pass;

const confRoute = config.confRoute;
const resetPasswordRoute = config.resetPasswordRoute;

const transport = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',
  secure: false,
  port: 587,
  //encryption: 'smarttns',
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  transport
    .sendMail({
      from: user,
      to: email,
      subject: 'Confirmer ton adresse',
      html: `<h1>Email de confirmation</h1>
        <h2>Salut ${name}</h2>
        <p>Merci de t'être inscrit ! Confirme ton adresse email et ton compte en suivant le lien suivant : </p>
        <a href=${confRoute}/${confirmationCode}>Confirmer mon adresse email</a>
        </div>`,
    })
    .catch((err) => console.log(err));
};

module.exports.sendResetPasswordEmail = (name, email, confirmationCode) => {
  transport
    .sendMail({
      from: user,
      to: email,
      subject: 'Mot de passe oublié',
      html: `<h1>Mot de passe oublié</h1>
        <h2>Salut ${name}</h2>
        <p>Réinitialise ton mot de passe en cliquant sur le lien ci-dessous : </p>
        <a href=${resetPasswordRoute}/${confirmationCode}>Cliques ici</a>
        <p>Si ce n'est pas toi qui a demandé à réinitialiser ton mot de passe, ignores simplement cet email.</p>
        </div>`,
    })
    .catch((err) => console.log(err));
};
