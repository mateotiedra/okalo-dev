import React from 'react';
import { Link } from 'react-router-dom';
import { BiCog } from 'react-icons/bi';

import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Box,
  Fab,
  Link as MaterialLink,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';

import BidLogic from './BidLogic';

import LoadingPage from '../../components/LoadingPage/LoadingPage';
import MobileContainer from '../../components/MobileContainer/MobileContainer';
import BidCard from '../../components/BidCard/BidCard';
import Navbar from '../../components/Navbar/Navbar';
import Helper from '../../helpers';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: theme.spacing(4),
    },
  },
  bidCardContainer: {
    height: '100%',
    margin: theme.spacing(0, 4),
    [theme.breakpoints.down('xs')]: {
      width: '50%',
      margin: theme.spacing(0, 3, 1, 3),
      maxWidth: '200px',
    },
  },
  bidCard: {
    marginBottom: theme.spacing(1),
  },
  bidCardCaption: {
    textAlign: 'center',
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: theme.spacing(1),
    margin: theme.spacing(2, 0),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 3, 0, 3),
      maxWidth: '50%',
    },
  },
  infoText: {
    textOverflow: 'hidden',
    wordBreak: 'break-word',
  },
  capitalized: {
    textTransform: 'capitalize',
  },
  stateInfo: {
    marginTop: theme.spacing(3),
  },
  price: {
    textTransform: 'lowercase',
    marginTop: theme.spacing(3),
    fontWeight: 'bold',
  },
  floatingContactButton: {
    position: 'fixed',
    bottom: 0,
    margin: theme.spacing(2),
    [theme.breakpoints.up('sm')]: { display: 'none' },
  },
  ctaContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
    gap: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      position: 'fixed',
      bottom: 0,
      margin: theme.spacing(2),
    },
  },
  settingsButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: theme.spacing(1),
  },
}));

function Bid(props) {
  const classes = useStyles();
  const {
    bidData,
    userHimself,
    pageStatus,
    editLink,
    pageData,
    username,
    alertData,
    handleCloseAlert,
    cancelAsk,
  } = BidLogic(props);

  const { sentence } = Helper();

  const infoBox = (preWord, value) => {
    return (
      <Typography
        component='h3'
        variant='h6'
        className={classes.infoText + ' ' + classes.capitalized}
      >
        {preWord.length > 0 && (
          <Typography component='span' variant='h6' style={{ opacity: 0.8 }}>
            {preWord}&nbsp;
          </Typography>
        )}
        {value}
      </Typography>
    );
  };

  if (pageStatus === 'loading') return <LoadingPage />;

  return (
    <>
      <Navbar />
      <MobileContainer maxWidth='lg' noCenter responsiveFont>
        <div className={classes.pageContainer}>
          <Box className={classes.bidCardContainer}>
            <BidCard className={classes.bidCard} {...bidData} />
            <Typography variant='body2' className={classes.bidCardCaption}>
              {`Posté ${bidData.since} par `}
              <MaterialLink
                variant='inherit'
                component={Link}
                to={'/users/' + username}
              >
                {username}
              </MaterialLink>
            </Typography>
          </Box>
          <Box className={classes.infoContainer}>
            <Box className={classes.infoBox}>
              <Typography
                component='h1'
                variant='h5'
                style={{ fontWeight: 'bold' }}
                className={classes.infoText + ' ' + classes.capitalized}
              >
                {bidData.title}
              </Typography>
            </Box>
            {infoBox('édition', bidData.edition)}
            {infoBox('de', bidData.author)}
            <Typography
              component='h4'
              variant='h6'
              className={classes.stateInfo + ' ' + classes.sentenceText}
            >
              {sentence(bidData.annotation, true)}
              <Typography
                component='span'
                variant='h6'
                style={{ opacity: 0.8 }}
              >
                {' et '}
              </Typography>
              {bidData.condition.toLowerCase()}
            </Typography>
            <Typography
              component='h4'
              variant='h6'
              className={classes.sentenceText}
            >
              {sentence(bidData.note)}
            </Typography>
            <Typography
              component='h4'
              variant='h5'
              className={classes.infoText + ' ' + classes.price}
            >
              {bidData.price} francs
            </Typography>
          </Box>
          {userHimself && (
            <Link to={editLink}>
              <BiCog
                size={50}
                opacity={0.7}
                className={classes.settingsButton}
              />
            </Link>
          )}
        </div>
        <div className={classes.ctaContainer}>
          {pageStatus === 'in deal' && (
            <Button color='primary' variant='outlined'>
              Annuler le deal
            </Button>
          )}
          <Button
            color='primary'
            variant={pageData.ctaVariant || 'contained'}
            onClick={pageData.ctaFunction}
          >
            {pageData.ctaText}
          </Button>
        </div>
      </MobileContainer>
      {Boolean(alertData) && (
        <Dialog
          open={Boolean(alertData)}
          onClose={handleCloseAlert}
          aria-labelledby='delete-bid'
          aria-describedby='delete-bid'
        >
          <DialogTitle id='delete-bid'>{alertData.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id='delete-bid'>
              {alertData.body}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={alertData.buttons[0].action} color='primary'>
              {alertData.buttons[0].text}
            </Button>
            {alertData.buttons.length > 1 && (
              <Button
                onClick={alertData.buttons[1].action}
                color='primary'
                autoFocus
              >
                {alertData.buttons[1].text}
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default Bid;
