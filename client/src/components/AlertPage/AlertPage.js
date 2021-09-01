import React from 'react';
import { Box, Button, Typography, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MobileContainer from '../../components/MobileContainer/MobileContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
  },
  title: {
    marginBottom: theme.spacing(3),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  body: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  submit: {
    marginBottom: theme.spacing(2),
  },
  backgroundIcon: {
    position: 'absolute',
    transform: 'translateX(-50%) translateY(-50%)',
    overflow: 'hidden',
    zIndex: -5,
    opacity: 0.1,
  },
  backgroundIconTop: {
    top: '20%',
    left: '90%',
  },
  backgroundIconBottom: {
    top: '80%',
    left: '10%',
  },
}));

export default function AlertPage(props) {
  const classes = useStyles();
  const theme = useTheme();

  const ctaButtons = props.ctaButton.length
    ? props.ctaButton
    : props.ctaButton
    ? [props.ctaButton]
    : false;

  const backgroundIcon = props.icon
    ? React.cloneElement(props.icon, {
        size: 300,
        color: theme.palette.secondary.main,
      })
    : undefined;

  return (
    <Box className={classes.root}>
      <Box className={`${classes.backgroundIconTop} ${classes.backgroundIcon}`}>
        {backgroundIcon}
      </Box>
      <Box
        className={`${classes.backgroundIconBottom} ${classes.backgroundIcon}`}
      >
        {backgroundIcon}
      </Box>
      <MobileContainer
        maxWidth='xs'
        goBackLink={props.goBackLink}
        goBackFunction={props.goBackFunction}
        noNavBar
        noGoBackArrow={props.noGoBackArrow}
      >
        {props.title && (
          <Typography component='h1' variant='h4' className={classes.title}>
            {props.title}
          </Typography>
        )}
        {props.body &&
          props.body.split('<br />').map((text, index) => {
            return (
              <Typography key={index} className={classes.body}>
                {text}
              </Typography>
            );
          })}
        {props.children}
        {ctaButtons &&
          ctaButtons.map((ctaButton) => {
            return (
              <Button
                variant='contained'
                color='primary'
                fullWidth
                className={classes.submit}
                {...ctaButton}
              />
            );
          })}
      </MobileContainer>
    </Box>
  );
}
