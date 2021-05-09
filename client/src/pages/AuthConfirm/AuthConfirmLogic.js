import { useEffect, useState } from 'react';

import AppConfig from '../../config/AppConfig';

import Axios from 'axios';
import FormHelper from '../../helpers/FormHelper';

const AuthConfirmLogic = (props) => {
  const { API_ORIGIN } = AppConfig();
  const history = props.history;
  const { email } = (props.location && props.location.state) || {};
  const [destinationEmail, setDestinationEmail] = useState(email);

  const confirmationCode = props.match.params.confirmationCode;
  const [pageStatus, setPageStatus] = useState(
    `${
      !confirmationCode || confirmationCode === 'pending'
        ? 'pending'
        : 'sending'
    }`
  );

  const { isEmail } = FormHelper();

  const [emailField, setEmailField] = useState({
    value: '',
    error: false,
    helper: '',
  });

  const handleEmailChange = (event) => {
    setEmailField({ ...emailField, value: event.target.value });
  };

  const updatePageStatus = () => {
    Axios.post(API_ORIGIN + '/api/auth/confirm/' + confirmationCode)
      .then((res) => {
        localStorage.setItem('accessToken', res.data.accessToken);
        setPageStatus('success');
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 404) {
          setPageStatus('expired');
          return;
        }
        console.log(err);
      });
  };

  const goBackToHome = () => {
    history.push('/');
  };

  const goToResendingPage = () => {
    setPageStatus('resendingEmail');
  };

  const sendEmail = () => {
    if (isEmail(emailField.value)) {
      Axios.post(API_ORIGIN + '/api/auth/resendconfirmationlink', {
        email: emailField.value,
      })
        .then((res) => {
          setDestinationEmail(res.data.destinationEmail);
          setPageStatus('pending');
        })
        .catch((err) => {
          console.log('err');
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

  const pagesData = {
    pending: {
      avatar: '📫',
      title: 'Check ta boite mail',
      body: `Nous avons envoyé un email de confirmation${
        destinationEmail
          ? ` à l'adresse :
         ${destinationEmail}`
          : ''
      }. Vérifie aussi tes spams si tu le trouves pas.`,
      ctaButton: {
        children: 'Recevoir un autre email',
        onClick: goToResendingPage,
      },
    },
    expired: {
      avatar: '⌛',
      title: 'Lien expiré',
      body: 'Le lien que vous avez suivi a expiré.',
      ctaButton: {
        children: 'Recevoir un nouveau lien',
        onClick: goToResendingPage,
      },
    },
    success: {
      avatar: '🤸‍♂️',
      title: 'Inscription terminé',
      body: `Tu t'es inscrit avec succès ! Ton compte est maintenant prêt à être utilisé.`,
      ctaButton: {
        children: 'Super !',
        onClick: goBackToHome,
      },
    },
    sending: {
      loading: true,
    },
    resendingEmail: {
      avatar: '📧',
      title: 'Nouveau lien',
      body:
        "Donnes nous l'adresse email avec laquelle tu t'es inscrit afin de recevoir un nouveau lien.",
      emailField: [
        {
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
      ],
      ctaButton: {
        children: 'Recevoir un autre email',
        onClick: goToResendingPage,
      },
      ctaButton: {
        children: 'Envoyer',
        onClick: sendEmail,
      },
    },
  };

  useEffect(() => {
    if (pageStatus === 'sending' && confirmationCode) updatePageStatus();
  }, []);

  const pageData = pagesData[pageStatus];

  return { pageStatus, pageData };
};

export default AuthConfirmLogic;
