import React from 'react';
import { BiServer } from 'react-icons/bi';

import AlertPage from '../../components/AlertPage/AlertPage';

function ServerError(props) {
  return (
    <AlertPage
      icon={<BiServer />}
      color='primary'
      title='Serveur en maintenance'
      body='Il semblerait que nos serveurs rencontrent quelques problèmes... Nos techniciens ont été contactés ! Merci de réessayer plus tard.'
      ctaButton={{
        children: 'Réessayer',
        onClick: () => {
          window.location.reload();
        },
      }}
    />
  );
}

export default ServerError;
