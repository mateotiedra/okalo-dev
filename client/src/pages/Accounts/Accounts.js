// eslint-disable-next-line
import React from 'react';
import { BiCog, BiKey } from 'react-icons/bi';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  Link,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import AccountsLogic from './AccountsLogic';

import MobileContainer from '../../components/MobileContainer/MobileContainer';
import FieldsGroup from '../../components/FieldsGroup/FieldsGroup';
import LoadingPage from '../../components/LoadingPage/LoadingPage';
import FormHeader from '../../components/pageParts/FormHeader/BlobAvatar/FormHeader';

const useStyles = makeStyles((theme) => ({
  sectionContainer: {
    margin: theme.spacing(2, 0, 3),
  },
  sectionTitle: {
    color: 'grey',
    fontWeight: 'bold',
  },
  sectionBody: {
    color: 'grey',
  },
  submit: {
    margin: theme.spacing(1, 0, 3),
  },
  submitChange: {
    margin: theme.spacing(3, 0, 2),
  },
  changeLink: {
    alignSelf: 'flex-end',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
}));

function Accounts(props) {
  const classes = useStyles();
  const {
    pageStatus,
    fieldsSchema,
    fieldsProps,
    formik,
    disconnectUser,
    goToChangePassword,
    goToGeneralSettings,
    setChangeSuccess,
    changeSuccess,
  } = AccountsLogic(props);

  const schoolSection = (
    <Box className={classes.sectionContainer}>
      <Typography component='h6' className={classes.sectionTitle}>
        Informations personnelles
      </Typography>
      <Typography variant='body2' className={classes.sectionBody}>
        Ton nom et celui de ton collège apparaîtront sur ton profile publique
        afin de renseigner les potentiels acheteur de tes livres mis en vente.
      </Typography>
    </Box>
  );

  // eslint-disable-next-line
  const changeEmailLink = (
    <Link
      href='#'
      variant='body2'
      type='button'
      component={'button'}
      onClick={() => {
        console.log('chanfe email adress');
      }}
      className={classes.changeLink}
    >
      Changer d'adresse email
    </Link>
  );

  const changePasswordLink = (
    <Link
      href='/password'
      variant='body2'
      type='button'
      component={'button'}
      onClick={goToChangePassword}
      className={classes.changeLink}
    >
      Changer de mot de passe
    </Link>
  );

  const successAlert = (
    <Collapse in={changeSuccess}>
      <Alert>Changements sauvegardés !</Alert>
    </Collapse>
  );

  const contactSection = (
    <Box className={classes.sectionContainer}>
      <Typography component='h6' className={classes.sectionTitle}>
        Autres moyens de contact
      </Typography>
      <Typography variant='body2' className={classes.sectionBody}>
        L'adresse email est le moyen de contact acheteur/vendeur par défaut. Tu
        peux en ajouter d'autres si tu le souhaites.
      </Typography>
    </Box>
  );

  const saveButton = (
    <Button
      type='submit'
      fullWidth
      variant='contained'
      color='primary'
      className={classes.submitChange}
      onBlur={() => {
        setChangeSuccess(false);
      }}
    >
      Enregistrer
    </Button>
  );
  if (pageStatus === 'loading') return <LoadingPage />;
  else if (pageStatus === 'password') {
    return (
      <MobileContainer goBackFunction={goToGeneralSettings}>
        <FormHeader icon={<BiKey />} title='Nouveau mot de passe' />
        <FieldsGroup
          fieldsSchema={fieldsSchema}
          fieldsProps={fieldsProps}
          formik={formik}
          className={classes.form}
        >
          {successAlert}
          {saveButton}
        </FieldsGroup>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
      <FormHeader icon={<BiCog />} title='Modifier profile' />
      <FieldsGroup
        fieldsSchema={fieldsSchema}
        fieldsProps={{
          ...fieldsProps,
          school: { ...fieldsProps.school, nextComponents: schoolSection },
          password: {
            ...fieldsProps.password,
            nextComponents: (
              <>
                {changePasswordLink}
                <Divider className={classes.sectionContainer} />
              </>
            ),
          },
          instaName: {
            ...fieldsProps.instaName,
            nextComponents: contactSection,
          },
        }}
        formik={formik}
        fieldsVariant='standard'
        className={classes.form}
      >
        {successAlert}
        {saveButton}
      </FieldsGroup>
      <Grid container>
        <Grid item xs>
          <Link
            variant='body2'
            type='button'
            component={'button'}
            onClick={disconnectUser}
          >
            Se déconnecter
          </Link>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </MobileContainer>
  );
}

export default Accounts;
