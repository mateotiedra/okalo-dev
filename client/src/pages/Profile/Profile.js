// eslint-disable-next-line
import React, { useEffect } from 'react';
//import { useHistory } from 'react-router';
//import Axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

import ProfileLogic from './ProfileLogic';

import LoadingPage from '../../components/LoadingPage/LoadingPage';
import Navbar from '../../components/Navbar/Navbar';

const useStyles = makeStyles((theme) => ({}));

function Profile(props) {
  // eslint-disable-next-line
  const classes = useStyles();
  // eslint-disable-next-line
  const { displayedUserData, userHimself, pageStatus } = ProfileLogic(props);

  if (pageStatus === 'loading') return <LoadingPage />;
  return (
    <>
      <Navbar />
      <Container maxWidth='xs'>
        <Typography style={{ marginTop: '100px' }}>
          {JSON.stringify(displayedUserData.bids)}
        </Typography>
      </Container>
    </>
  );
}

export default Profile;
