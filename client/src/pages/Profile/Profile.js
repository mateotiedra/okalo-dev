// eslint-disable-next-line
import React, { useEffect } from 'react';
//import { useHistory } from 'react-router';
//import Axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import ProfileLogic from './ProfileLogic';

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

function Profile() {
  const classes = useStyles();
  const { userData } = ProfileLogic();

  return <Container maxWidth='xs'></Container>;
}

export default Profile;
