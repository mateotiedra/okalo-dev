import React from 'react';
import { Link } from 'react-router-dom';
import { BiCog, BiTrash, BiPhone, BiMailSend } from 'react-icons/bi';
import { ReactComponent as BiInsta } from '../../assets/svgs/socials/biInsta.svg';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Link as MaterialLink } from '@material-ui/core';

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
    [theme.breakpoints.down('sm')]: { padding: theme.spacing(0, 1, 0, 1) },
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
  socialItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  socialItemIcon: {
    opacity: 0.7,
    width: '1.4em',
    height: '1.4em',
    margin: '0 0.5em 0 0.5em',
  },
}));

function Profile(props) {
  const classes = useStyles();
  const {
    profileData,
    userHimself,
    pageStatus,
    goToBids,
    smsHref,
    emailHref,
    instaHref,
  } = ProfileLogic(props);

  console.log(instaHref);

  const socialItem = (icon, text, href) => {
    return (
      <li className={classes.socialItem}>
        {icon}
        <MaterialLink href={href}>{text}</MaterialLink>
      </li>
    );
  };

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
      <MobileContainer maxWidth='md' noCenter responsiveFont noExtraPadding>
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
              <ul style={{ listStylType: 'none' }}>
                <li>{profileData.userSince}</li>
                <li>{'Étudiant au ' + profileData.school}</li>
                {!userHimself && (
                  <>
                    {profileData.email &&
                      socialItem(
                        <BiPhone className={classes.socialItemIcon} />,
                        profileData.email,
                        emailHref
                      )}
                    {profileData.phone &&
                      socialItem(
                        <BiMailSend className={classes.socialItemIcon} />,
                        profileData.phone,
                        smsHref
                      )}
                    {profileData.instaName &&
                      socialItem(
                        <BiInsta className={classes.socialItemIcon} />,
                        '@' + profileData.instaName,
                        instaHref
                      )}
                  </>
                )}
              </ul>
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
        <BidsCardContainer bids={profileData.bidsOwned} addable={userHimself} />
      </MobileContainer>
    </>
  );
}

export default Profile;
