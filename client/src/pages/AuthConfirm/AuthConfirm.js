import React from 'react';

import AuthConfirmLogic from './AuthConfirmLogic';
import AlertPage from '../../components/AlertPage/AlertPage';
import FieldsGroup from '../../components/FieldsGroup/FieldsGroup';

function AuthConfirm(props) {
  const { pageData } = AuthConfirmLogic(props);

  return (
    <AlertPage {...pageData}>
      {pageData.emailField && <FieldsGroup fieldsObj={pageData.emailField} />}
    </AlertPage>
  );
}

export default AuthConfirm;
