import React from 'react';

import { TextField } from '@material-ui/core';

import AuthConfirmLogic from './AuthConfirmLogic';
import AlertPage from '../../components/AlertPage/AlertPage';

function AuthConfirm(props) {
  const { pageData } = AuthConfirmLogic(props);

  return (
    <AlertPage {...pageData}>
      {pageData.emailField && (
        <TextField
          fullWidth
          variant={'outlined'}
          margin={'normal'}
          {...pageData.emailField}
        />
      )}
    </AlertPage>
  );
}

export default AuthConfirm;
