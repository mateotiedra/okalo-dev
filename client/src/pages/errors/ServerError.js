import React from 'react';
import { BiServer } from 'react-icons/bi';

import AlertPage from '../../components/AlertPage/AlertPage';
import { useHistory } from 'react-router-dom';

function ServerError() {
  let history = useHistory();

  return (
    <AlertPage
      icon={<BiServer />}
      color='primary'
      title='Le serveur a crashé'
      body='Il semblerait que nos serveurs rencontrent quelques problèmes concernants cette action... Merci de réessayer plus tard et de contacter okalo@contact.com si le problème persiste.'
      ctaButton={{
        children: 'Réessayer',
        onClick: () => {
          history.replace(history.location.pathname, {
            errorStatusCode: 200,
          });
          window.location.reload();
        },
      }}
    />
  );
}

export default ServerError;
