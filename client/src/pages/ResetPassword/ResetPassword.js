import React from 'react';

import { TextField } from '@material-ui/core';

import ResetPasswordLogic from './ResetPasswordLogic';
import AlertPage from '../../components/AlertPage/AlertPage';

function ResetPassword(props) {
  const { pageData, pageLoaded } = ResetPasswordLogic(props);

  if (!pageLoaded) {
    return <></>;
  }

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

export default ResetPassword;
