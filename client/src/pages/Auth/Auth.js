// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
//import { useHistory } from 'react-router';
//import Axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import {
  // eslint-disable-next-line
  Button,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core';
import EmojiIcon from '../../components/EmojiIcon/EmojiIcon';
import FieldsGroup from '../../components/FieldsGroup/FieldsGroup';

import AuthLogic from './AuthLogic';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.

    marginTop: theme.spacing(1),
    [theme.breakpoints.down('sm')]: { padding: theme.spacing(0, 2, 0, 2) },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Auth() {
  const classes = useStyles();

  const {
    fieldsObj,
    displaySignIn,
    switchSignIn,
    signup,
    signin,
  } = AuthLogic();

  return (
    <Container maxWidth='xs'>
      <div className={classes.root}>
        <Box className={classes.avatar}>
          <EmojiIcon icon={displaySignIn ? '👤' : '👥'} size={37} />
        </Box>
        <Typography component='h1' variant='h5'>
          {displaySignIn ? 'Connexion' : 'Inscription'}
        </Typography>
        <Box noValidate className={classes.form}>
          <FieldsGroup fieldsObj={fieldsObj} />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={displaySignIn ? signin : signup}
          >
            {displaySignIn ? 'Se connecter' : "S'inscrire"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Mot de passe oublié ?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href='#'
                variant='body2'
                component={'button'}
                onClick={switchSignIn}
              >
                {displaySignIn ? "S'inscrire" : 'Se connecter'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Container>
  );
}

export default Auth;
