import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  searchMessage: {
    fontWeight: 'bold',
    margin: theme.spacing(6, 0, 1, 0),
    textAlign: 'center',
  },
}));

const ResultMessage = ({ className, title, body }) => {
  const classes = useStyles();

  return (
    <div className={className}>
      <Typography component='h2' variant='h4' className={classes.searchMessage}>
        {title}
      </Typography>
      <Typography
        component='h3'
        variant='body1'
        style={{ textAlign: 'center' }}
      >
        {body}
      </Typography>
    </div>
  );
};

export default ResultMessage;
