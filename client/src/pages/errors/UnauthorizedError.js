import React from 'react';
import { BiError } from 'react-icons/bi';

import AlertPage from '../../components/AlertPage/AlertPage';

function ServerError(props) {
  return (
    <AlertPage
      icon={<BiError />}
      color='primary'
      title='Erreur 401'
      body="Tu n'as pas le droit d'accéder à cette page. Essaies de te connecter si tu ne l'es pas déja"
      ctaButton={{
        children: 'Se connecter',
        onClick: () => {
          props.history.push('/auth/login');
        },
      }}
    />
  );
}

export default ServerError;
