import React, { useState } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
  },
  text: {
    marginTop: theme.spacing(2),
  },
}));

function Loading(props) {
  const classes = useStyles();

  const [seconds, setSeconds] = useState(3);
  const [displayMessage, setDisplayMessage] = useState(false);

  React.useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setDisplayMessage(true);
    }
  }, [setDisplayMessage, seconds]);

  return (
    <div
      className={classes.container}
      display='flex'
      justifyContent='center'
      alignItems='center'
      style={{ width: '100%', height: '100vh' }}
    >
      <CircularProgress />
      {displayMessage && (
        <Typography className={classes.text} variant='body1'>
          Merci de patienter... tout va bien !
        </Typography>
      )}
    </div>
  );
}

export default Loading;
