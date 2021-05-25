// eslint-disable-next-line
import React, { useEffect } from 'react';
//import { useHistory } from 'react-router';
//import Axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  Typography,
} from '@material-ui/core';

import AccountsLogic from './AccountsLogic';

import MobileContainer from '../../components/MobileContainer/MobileContainer';
import FieldsGroup from '../../components/FieldsGroup/FieldsGroup';
import EmojiIcon from '../../components/EmojiIcon/EmojiIcon';
import AlertPage from '../../components/AlertPage/AlertPage';

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
    pageData,
    pageLoaded,
    disconnectUser,
    goToChangePassword,
  } = AccountsLogic(props);

  if (!pageLoaded) {
    return <></>;
  }

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

  const contactSection = (
    <Box className={classes.sectionContainer}>
      <Typography component='h6' className={classes.sectionTitle}>
        Moyens de contact
      </Typography>
      <Typography variant='body2' className={classes.sectionBody}>
        Au moins un des moyens de contact (réseaux sociaux ou numéro de
        téléphone) est nécessaire afin de pouvoir créer le contact entre vous et
        le vendeur/acheteur. Ces informations ne seront pas rendues publiques.
      </Typography>
    </Box>
  );

  if (pageStatus === 'password') {
    return (
      <AlertPage {...pageData} goBackLink='/accounts/edit'>
        <FieldsGroup
          fieldsSchema={fieldsSchema}
          fieldsProps={fieldsProps}
          formik={formik}
          className={classes.form}
        >
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submitChange}
          >
            Enregistrer
          </Button>
        </FieldsGroup>
      </AlertPage>
    );
  }

  return (
    <MobileContainer>
      <Box className={classes.avatar}>
        <EmojiIcon icon={pageData.avatar} size={37} />
      </Box>
      <Typography component='h1' variant='h5'>
        {pageData.title}
      </Typography>
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
          snap: { ...fieldsProps.snap, nextComponents: contactSection },
        }}
        formik={formik}
        fieldsVariant='standard'
        className={classes.form}
      >
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
        >
          Enregistrer
        </Button>
      </FieldsGroup>
      <Grid container>
        <Grid item xs>
          <Link variant='body2' onClick={disconnectUser}>
            Se déconnecter
          </Link>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </MobileContainer>
  );
}

export default Accounts;
