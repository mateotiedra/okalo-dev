import React from 'react';
import { Link } from 'react-router-dom';
import { BiCog } from 'react-icons/bi';

import { makeStyles } from '@material-ui/core/styles';

import AskFromBoardLogic from './AskFromBoardLogic';

import LoadingPage from '../../components/LoadingPage/LoadingPage';
import MobileContainer from '../../components/MobileContainer/MobileContainer';
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

function AskFromBoard(props) {
  const classes = useStyles();
  const { asksData, pageStatus } = AskFromBoardLogic(props);

  if (pageStatus === 'loading') return <LoadingPage />;

  console.log(asksData);
  return (
    <>
      <Navbar />
      <MobileContainer maxWidth='md' noCenter responsiveFont></MobileContainer>
    </>
  );
}

export default AskFromBoard;
