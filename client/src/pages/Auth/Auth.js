// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
//import { useHistory } from 'react-router';
//import Axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import {
  // eslint-disable-next-line
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core';
import EmojiIcon from '../../components/EmojiIcon/EmojiIcon';
import PasswordField from '../../components/PasswordField/PasswordField';
import SelectOption from '../../components/SelectOption/SelectOption';

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
    onMobile,
    displaySignIn,
    switchSignIn,
    passwordValues,
    authValues,
    updateAuthValue,
    errors,
    signup,
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
          {!displaySignIn ? (
            <>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Adresse email'
                name='email'
                autoComplete='email'
                autoFocus={!onMobile}
                error={errors.email}
                helperText={errors.emailHelper}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='username'
                label="Nom d'utilisateur"
                name='username'
                error={errors.username}
                helperText={errors.usernameHelper}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='fullName'
                label='Nom complet'
                name='fullName'
              />
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                id='phone'
                label='Numéro de téléphone'
                name='phone'
                autoComplete='tel'
              />
              <SelectOption
                label='Collège'
                variant='outlined'
                fullWidth
                margin='normal'
              >
                <option value={1}>Saussure</option>
                <option value={2}>Andrée-Chavanne</option>
                <option value={3}>Sismondi</option>
              </SelectOption>
            </>
          ) : (
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='emailOrUsername'
              label="Adresse email ou nom d'utilisateur"
              name='emailOrUsername'
              autoComplete='email'
              autoFocus={!onMobile}
            />
          )}
          <PasswordField
            fullWidth
            variant='outlined'
            label='Mot de passe'
            labelWidth={110}
            margin='normal'
            {...passwordValues}
            password={authValues.password}
            handleChange={updateAuthValue('password')}
            error={errors.password}
            helperText={errors.passwordHelper}
          />
          {!displaySignIn && (
            <PasswordField
              fullWidth
              variant='outlined'
              label='Confirmer mot de passe'
              labelWidth={185}
              margin='normal'
              {...passwordValues}
              password={authValues.passwordConf}
              handleChange={updateAuthValue('passwordConf')}
              error={errors.password}
              helperText={errors.passwordHelper}
            />
          )}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={displaySignIn ? () => {} : signup}
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
