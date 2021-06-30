import React from 'react';
import { BiError } from 'react-icons/bi';

import AlertPage from '../../components/AlertPage/AlertPage';

function ServerError(props) {
  return (
    <AlertPage
      icon={<BiError />}
      color='primary'
      title='Erreur 404'
      body="La page auquelle tu essaie d'accéder n'existe pas.<br />Es-tu sur que l'URL est correct ?"
      ctaButton={{
        children: "Retourner à l'acceuil",
        onClick: () => {
          props.history.push('/');
        },
      }}
    />
  );
}

export default ServerError;
