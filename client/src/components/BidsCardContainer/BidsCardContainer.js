import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import ResultMessage from '../../components/pageParts/ResultMessage/ResultMessage';
import BidCard from '../../components/BidCard/BidCard';

const useStyles = makeStyles((theme) => ({
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

function BidsCardContainer({ bids, addable, noBookFound }) {
  const classes = useStyles();

  return (
    <Container maxWidth='md' className={classes.bidsContainer}>
      {bids.map((bid) => {
        return (
          <BidCard
            displayPrice
            className={classes.bidCard}
            key={bid.uuid}
            {...bid}
          />
        );
      })}
      {bids.length === 0 && !addable && (
        <ResultMessage
          title='Aucune annonce postée'
          body="Cet utilisateur n'a pas encore posté d'annonce"
        />
      )}
      {addable && <BidCard className={classes.bidCard} addBidCover />}
      {noBookFound && <BidCard className={classes.bidCard} notFoundCover />}
    </Container>
  );
}

export default BidsCardContainer;
