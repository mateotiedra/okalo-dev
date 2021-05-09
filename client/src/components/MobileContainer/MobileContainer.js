import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { Container, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: { padding: theme.spacing(0, 2, 0, 2) },
  },
  goBackButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: theme.spacing(2),
  },
}));

export default function MobileContainer(props) {
  useEffect(() => {});

  const classes = useStyles();
  const history = useHistory();

  const goBack = () => {
    history.push(props.backRoute || '/');
  };

  return (
    <Container maxWidth='xs'>
      <div className={classes.root}>
        <IconButton
          aria-label='back'
          className={classes.goBackButton}
          size='large'
          onClick={goBack}
        >
          <ArrowBackIcon fontSize='large' />
        </IconButton>
        {props.children}
      </div>
    </Container>
  );
}