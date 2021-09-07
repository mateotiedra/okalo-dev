import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { Box, Container, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  makeStyles,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';

import { theme } from '../../themes/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: { padding: theme.spacing(2, 1, 2, 1) },
    padding: theme.spacing(2, 0, 2, 0),
  },
  noCenter: {
    minHeight: 0,
    justifyContent: 'flex-start',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(6),
    },
  },
  noExtraPadding: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  navBarSpace: {
    [theme.breakpoints.down('xs')]: { height: theme.spacing(7) },
    height: theme.spacing(8),
  },
  goBackButton: {
    position: 'absolute',
    margin: theme.spacing(1),
  },
  notUnderNav: {
    marginTop: theme.spacing(9),
    [theme.breakpoints.down('xs')]: { margin: theme.spacing(7, 0, 0, 0) },
  },
}));

export default function MobileContainer({
  goBackFunction,
  goBackLink,
  arrowTopPosition,
  arrowLeftPosition,
  maxWidth,
  noNavBar,
  noExtraPadding,
  className,
  responsiveFont,
  children,
  noCenter,
  noGoBackArrow,
  style,
}) {
  useEffect(() => {});

  const classes = useStyles();
  const history = useHistory();

  const goBack = () => {
    if (goBackFunction) {
      goBackFunction();
    } else if (goBackLink) {
      history.push(goBackLink);
      history.go(0);
    } else history.goBack();
  };
  const goBackArrowStyle = {
    top: arrowTopPosition || 0,
    left: arrowLeftPosition || 0,
  };

  let responsiveTheme = responsiveFontSizes(theme);

  return (
    <Container maxWidth={maxWidth || 'xs'}>
      {!noNavBar && noCenter && <Box className={classes.navBarSpace} />}
      <Box
        className={`${classes.root} ${className} ${
          noCenter ? classes.noCenter : ''
        } ${noExtraPadding ? classes.noExtraPadding : ''}`}
        style={style}
      >
        {!noGoBackArrow && (
          <IconButton
            aria-label='back'
            className={`${classes.goBackButton} ${
              noCenter && classes.notUnderNav
            }`}
            style={goBackArrowStyle}
            size='medium'
            onClick={goBack}
          >
            <ArrowBackIcon fontSize='large' />
          </IconButton>
        )}
        {responsiveFont ? (
          <ThemeProvider style={{ width: '100%' }} theme={responsiveTheme}>
            {children}
          </ThemeProvider>
        ) : (
          children
        )}
      </Box>
    </Container>
  );
}
