import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import {
  BiUpsideDown,
  BiTrophy,
  BiAt,
  BiHourglass,
  BiMailSend,
} from 'react-icons/bi';

import AppConfig from '../../config/AppConfig';
import AxiosHelper from '../../helpers/AxiosHelper';

import FormHelper from '../../helpers/FormHelper';

const AuthConfirmLogic = ({ history, location, match }) => {
  const { API_ORIGIN } = AppConfig();
  const { setInterceptors } = AxiosHelper(axios, history);

  const { email } = (location && location.state) || {};
  const [destinationEmail, setDestinationEmail] = useState(email);

  const hasFetchedData = useRef(false);
  const confirmationCode = match.params.confirmationCode;
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

  const goBackToHome = () => {
    history.push('/');
  };

  const goToResendingPage = () => {
    setPageStatus('resending');
  };

  const sendEmail = () => {
    if (isEmail(emailField.value)) {
      axios
        .post(API_ORIGIN + '/api/auth/resendconfirmationlink', {
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
          } else if (err.response.status && err.response.status === 409) {
            setPageStatus('alreadyActive');
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
      icon: <BiMailSend />,
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
      icon: <BiHourglass />,
      title: 'Lien expiré',
      body: 'Le lien que vous avez suivi a expiré.',
      noGoBackArrow: true,
      ctaButton: {
        children: 'Recevoir un nouveau lien',
        onClick: goToResendingPage,
      },
    },
    success: {
      icon: <BiTrophy />,
      title: 'Inscription terminé',
      body: `Tu t'es inscrit avec succès ! Ton compte est maintenant prêt à être utilisé.`,
      noGoBackArrow: true,
      ctaButton: {
        children: 'Super',
        onClick: goBackToHome,
      },
    },
    sending: {
      loading: true,
    },
    resending: {
      icon: <BiAt />,
      title: 'Nouveau lien',
      body: "Donnes nous l'adresse email avec laquelle tu t'es inscrit afin de recevoir un nouveau lien de confirmation.",
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
    alreadyActive: {
      icon: <BiUpsideDown />,
      title: 'Déjà confirmé',
      noGoBackArrow: true,
      body: `L'adresse email${
        destinationEmail ? ` : ${destinationEmail}` : ''
      } a déjà été confirmée !`,
      ctaButton: {
        children: 'Parfait',
        onClick: goBackToHome,
      },
    },
  };

  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;

    setInterceptors();

    const updatePageStatus = () => {
      axios
        .post(API_ORIGIN + '/api/auth/confirm/' + confirmationCode)
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

    if (pageStatus === 'sending' && confirmationCode) updatePageStatus();
  }, [API_ORIGIN, setInterceptors, pageStatus, confirmationCode]);

  const pageData = pagesData[pageStatus];

  return { pageStatus, pageData };
};

export default AuthConfirmLogic;
