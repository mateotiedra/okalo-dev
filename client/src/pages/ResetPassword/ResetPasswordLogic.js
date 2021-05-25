import { useEffect, useRef, useState } from 'react';

import AppConfig from '../../config/AppConfig';

import Axios from 'axios';
import FormHelper from '../../helpers/FormHelper';

const ResetPasswordLogic = (props) => {
  const { API_ORIGIN } = AppConfig();
  const history = props.history;
  const { email } = (props.location && props.location.state) || {};
  const [destinationEmail, setDestinationEmail] = useState(email);

  const confirmationCode = props.match.params.confirmationCode;
  const [pageStatus, setPageStatus] = useState(
    `${
      !confirmationCode || confirmationCode === 'sending'
        ? 'sendingEmail'
        : 'sending'
    }`
  );

  console.log(pageStatus);
  const hasFetchedData = useRef(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  const { isEmail } = FormHelper();

  const [emailField, setEmailField] = useState({
    value: '',
    error: false,
    helper: '',
  });

  const handleEmailChange = (event) => {
    setEmailField({ ...emailField, value: event.target.value });
  };

  const sendEmail = () => {
    if (isEmail(emailField.value)) {
      Axios.post(API_ORIGIN + '/api/auth/sendresetpasswordlink', {
        email: emailField.value,
      })
        .then((res) => {
          setDestinationEmail(res.data.destinationEmail);
          setPageStatus('pending');
        })
        .catch((err) => {
          if (err.response.status && err.response.status === 404) {
            setEmailField({
              value: emailField.value,
              error: true,
              helper: "Cette adresse email n'est attribuée à aucun compte",
            });
          }
        });
    } else {
      const helperText = `${
        emailField.value === '' ? '' : "L'adresse email est invalide"
      }`;
      setEmailField({
        value: emailField.value,
        error: true,
        helper: helperText,
      });
    }
  };

  const goToResendingPage = () => {
    setPageStatus('sendingEmail');
  };

  const goBackToHome = () => {
    history.push('/');
  };

  const pagesData = {
    pending: {
      avatar: '📫',
      title: 'Email de réinitialisation du mot de passe envoyé !',
      body: `Tu vas recevoir un mail pour réinitialiser ton mot de passe${
        destinationEmail
          ? ` à l'adresse suivante :
         ${destinationEmail} `
          : ''
      }.`,
      ctaButton: {
        children: 'Parfait',
        onClick: goBackToHome,
      },
    },
    expired: {
      avatar: '⌛',
      title: 'Lien expiré',
      body: 'Le lien que vous avez suivi a expiré. Si tu as toujours besoin de réinitialiser ton mot de passe, demandes à en recevoir un nouveau',
      ctaButton: {
        children: 'Recevoir un nouveau lien',
        onClick: goToResendingPage,
      },
    },
    sending: {
      loading: true,
    },
    sendingEmail: {
      avatar: '📧',
      title: 'Réinitialiser ton mot de passe',
      body: "Entres l'adresse email qui est associé à ton compte.",
      emailField: {
        name: 'email',
        id: 'email',
        label: 'Adresse email',
        autoComplete: 'email',
        value: emailField.value,
        autoFocus: true,
        error: emailField.error,
        helperText: emailField.helper,
        required: true,
        displayed: true,
        onChange: handleEmailChange,
      },

      ctaButton: {
        children: 'Envoyer',
        onClick: sendEmail,
      },
    },
  };

  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;

    const updatePageStatus = () => {
      Axios.post(API_ORIGIN + '/api/auth/resetpassword/' + confirmationCode)
        .then((res) => {
          localStorage.setItem('accessToken', res.data.accessToken);
          history.push('/accounts/edit/password');
          setPageLoaded(true);
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.status === 404) {
            setPageStatus('expired');
            setPageLoaded(true);
            return;
          }
        });
    };

    if (pageStatus === 'sending' && confirmationCode) updatePageStatus();
    else setPageLoaded(true);
  }, [API_ORIGIN, history, pageStatus, confirmationCode]);

  const pageData = pagesData[pageStatus];

  return { pageStatus, pageData, pageLoaded };
};

export default ResetPasswordLogic;
