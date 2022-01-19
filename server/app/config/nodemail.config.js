const config = require("../config/auth.config");
const mailgun = require("mailgun-js");
const nodemailer = require("nodemailer");

const confRoute = config.confRoute;
const contactRoute = config.contactRoute;
const resetPasswordRoute = config.resetPasswordRoute;
const useMailgun = config.useMailgun;

//With mailgun
const mailgun_api_key = config.mailgun_api_key;
const mailgun_domain = config.mailgun_domain;

var mg = mailgun({
  apiKey: mailgun_api_key,
  domain: mailgun_domain,
  host: "api.eu.mailgun.net",
});

const sendConfirmationEmailWithMailgun = (name, email, confirmationCode) => {
  const emailData = {
    from: "Okalo <no-reply@okalo.ch>",
    to: email,
    subject: "Confirme ton adresse",
    html: `<h1>Email de confirmation</h1>
        <h2>Salut ${name}</h2>
        <p>Merci de t'être inscrit !
        <br/>Confirme ton adresse email et ton compte en suivant le lien suivant : <a href=${confRoute}/${confirmationCode}>activer mon compte</a>
        <br/>L'adresse email est, par défaut, le moyen avec lequel <b>les gens intéssés par tes annonces te contacteront.
        Une fois ton compte activé, tu pourras ajouter d'autres moyens de contact <a href=${contactRoute}>ici</a> (ton numéro de téléphone ou ton compte instagram par exemple).</p>
        <p>Questions ou suggestions : <a href="mailto:contact@okalo.ch">contact@okalo.ch</a>`,
  };
  mg.messages().send(emailData, function (err, body) {
    if (err) {
      console.log(err);
    }
  });
};

const sendResetPasswordEmailWithMailgun = (name, email, confirmationCode) => {
  const emailData = {
    from: "Okalo  <no-reply@okalo.ch>",
    to: email,
    subject: "Mot de passe oublié",
    html: `<h1>Mot de passe oublié</h1>
        <h2>Salut ${name}</h2>
        <p>Réinitialise ton mot de passe en cliquant sur le lien ci-dessous : </p>
        <a href=${resetPasswordRoute}/${confirmationCode}>Cliques ici</a>
        <p>Si ce n'est pas toi qui a demandé à réinitialiser ton mot de passe, ignores simplement cet email.</p>`,
  };
  mg.messages().send(emailData, function (err, body) {
    if (err) console.log(err);
  });
};

//With nodemailer
const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  secure: false,
  port: 587,
  direct: true,
  //encryption: 'smarttns',
  auth: {
    user: user,
    pass: pass,
  },
});

const sendConfirmationEmailWithNodemailer = (name, email, confirmationCode) => {
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Confirmer ton adresse",
      html: `<h1>Email de confirmation</h1>
      <h2>Salut ${name}</h2>
      <p>Merci de t'être inscrit !
      <br/>Confirme ton adresse email et ton compte en suivant le lien suivant : <a href=${confRoute}/${confirmationCode}>activer mon compte</a>
      <br/>L'adresse email est, par défaut, le moyen avec lequel <b>les gens intéssés par tes annonces te contacteront.
      Une fois ton compte activé, tu pourras ajouter d'autres moyens de contact <a href=${contactRoute}>ici</a> (ton numéro de téléphone ou ton compte instagram par exemple).</p>
      <p>Questions ou suggestions : <a href="mailto:contact@okalo.ch">contact@okalo.ch</a>`,
    })
    .catch((err) => console.log(err));
};

const sendResetPasswordEmailWithNodemailer = (
  name,
  email,
  confirmationCode
) => {
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Mot de passe oublié",
      html: `<h1>Mot de passe oublié</h1>
      <h2>Salut ${name}</h2>
      <p>Réinitialise ton mot de passe en cliquant sur le lien ci-dessous : </p>
      <a href=${resetPasswordRoute}/${confirmationCode}>Cliques ici</a>
      <p>Si ce n'est pas toi qui a demandé à réinitialiser ton mot de passe, ignores simplement cet email.</p>`,
    })
    .catch((err) => console.log(err));
};

module.exports.sendConfirmationEmail = useMailgun
  ? sendConfirmationEmailWithMailgun
  : sendConfirmationEmailWithNodemailer;
module.exports.sendResetPasswordEmail = useMailgun
  ? sendResetPasswordEmailWithMailgun
  : sendResetPasswordEmailWithNodemailer;
