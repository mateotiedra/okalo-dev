import React from 'react';
import { Link } from 'react-router-dom';
import { BiCog, BiTrash } from 'react-icons/bi';

import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Box,
  Container,
  Link as MaterialLink,
} from '@material-ui/core';

import ProfileLogic from './ProfileLogic';

import LoadingPage from '../../components/LoadingPage/LoadingPage';
import AlertPage from '../../components/AlertPage/AlertPage';
import MobileContainer from '../../components/MobileContainer/MobileContainer';
import BidsCardContainer from '../../components/BidsCardContainer/BidsCardContainer';
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
  const { profileData, userHimself, pageStatus, goToBids, smsHref, emailHref } =
    ProfileLogic(props);

  if (pageStatus === 'loading') return <LoadingPage />;
  else if (pageStatus === 'biddeleted')
    return (
      <AlertPage
        icon={<BiTrash />}
        title={'Annonce supprimée !'}
        body={`Ton annonce a bien été supprimée !`}
        ctaButton={{
          children: 'Voir mes annonces',
          onClick: goToBids,
        }}
      />
    );
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
              {'Étudiant au ' + profileData.school}
              <br />
              {!userHimself && (
                <>
                  {profileData.email && (
                    <>
                      <MaterialLink href={emailHref}>
                        {profileData.email}
                      </MaterialLink>
                      <br />
                    </>
                  )}
                  {profileData.phone && (
                    <MaterialLink href={smsHref}>
                      {profileData.phone}
                    </MaterialLink>
                  )}
                </>
              )}
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
      <BidsCardContainer bids={profileData.bidsOwned} addable={userHimself} />
    </>
  );
}

export default Profile;
