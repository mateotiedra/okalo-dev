import React from 'react';
import { BiError } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';

import AlertPage from '../../components/AlertPage/AlertPage';

function ServerError() {
  let history = useHistory();
  return (
    <AlertPage
      icon={<BiError />}
      color='primary'
      title='Erreur 404'
      body="La page auquelle tu essaie d'accéder n'existe pas ou plus. Es-tu sur que l'URL est correct ?"
      ctaButton={{
        children: "Retourner à l'acceuil",
        onClick: () => {
          history.push('/');
        },
      }}
    />
  );
}

export default ServerError;
