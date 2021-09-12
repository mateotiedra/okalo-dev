import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';

import SavedLogic from './SavedLogic';

import LoadingPage from '../../components/LoadingPage/LoadingPage';
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
}));

function Saved(props) {
  const classes = useStyles();
  const { savedBids, pageStatus } = SavedLogic(props);

  if (pageStatus === 'loading') return <LoadingPage />;
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
            Annonces sauvegardées
          </Typography>
        </Box>
        <BidsCardContainer bids={savedBids} savedContainer displayUsers />
      </MobileContainer>
    </>
  );
}

export default Saved;
