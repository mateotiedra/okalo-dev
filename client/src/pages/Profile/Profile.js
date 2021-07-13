import React from 'react';
import { Link } from 'react-router-dom';
import { BiCog } from 'react-icons/bi';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Container } from '@material-ui/core';

import ProfileLogic from './ProfileLogic';

import LoadingPage from '../../components/LoadingPage/LoadingPage';
import MobileContainer from '../../components/MobileContainer/MobileContainer';
import BidCard from '../../components/BidCard/BidCard';
import Navbar from '../../components/Navbar/Navbar';

const useStyles = makeStyles((theme) => ({
  profileHeader: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    rowGap: theme.spacing(0),
    columnGap: theme.spacing(5),
  },
  usernameTitle: { fontWeight: 'bold' },
  infoContainer: { paddingRight: theme.spacing(5) },
  settingsButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: theme.spacing(1),
  },
  bidsContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      gap: theme.spacing(2),
    },
  },
  bidCard: {
    width: '47%',
    minWidth: '125px',
    maxWidth: '200px',
  },
}));

function Profile(props) {
  const classes = useStyles();
  const { profileData, userHimself, pageStatus } = ProfileLogic(props);

  if (pageStatus === 'loading') return <LoadingPage />;

  return (
    <>
      <Navbar />
      <MobileContainer maxWidth='md' noCenter responsiveFont>
        <Box className={classes.profileHeader}>
          <Typography
            component='h1'
            variant='h2'
            className={classes.usernameTitle}
          >
            {profileData.username}
          </Typography>
          <Box className={classes.infoContainer}>
            <Typography variant='body'>
              {profileData.userSince}
              <br />
              {profileData.sales} ventes
            </Typography>
          </Box>
          {userHimself && (
            <Link to='/accounts/edit'>
              <BiCog
                size={50}
                className={classes.settingsButton}
                opacity={0.7}
              />
            </Link>
          )}
        </Box>
      </MobileContainer>
      <Container maxWidth='md' className={classes.bidsContainer}>
        {profileData.bidsOwned.map((bid) => {
          return <BidCard displayPrice className={classes.bidCard} {...bid} />;
        })}
        <BidCard className={classes.bidCard} addBidCover />
      </Container>
    </>
  );
}

export default Profile;
