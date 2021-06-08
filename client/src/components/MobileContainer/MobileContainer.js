import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { Box, Container, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: { padding: theme.spacing(7, 2, 2, 2) },
    padding: theme.spacing(5, 0, 2, 0),
  },
  goBackButton: {
    position: 'absolute',
    margin: theme.spacing(1),
  },
}));

export default function MobileContainer(props) {
  useEffect(() => {});

  const classes = useStyles();
  const history = useHistory();

  const goBack = () => {
    if (props.goBackFunction) {
      props.goBackFunction();
    } else if (props.goBackLink) {
      history.push(props.goBackLink);
      history.go(0);
    } else history.push('/');
  };

  const goBackArrowStyle = {
    top: props.arrowTopPosition || 0,
    left: props.arrowLeftPosition || 0,
  };

  return (
    <Container maxWidth='xs'>
      <Box className={classes.root}>
        <IconButton
          aria-label='back'
          className={classes.goBackButton}
          style={goBackArrowStyle}
          size='medium'
          onClick={goBack}
        >
          <ArrowBackIcon fontSize='large' />
        </IconButton>
        {props.children}
      </Box>
    </Container>
  );
}
