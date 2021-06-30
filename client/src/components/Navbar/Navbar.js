import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  SwipeableDrawer,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

import NavbarLogic from './NabvarLogic';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  navLinks: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      gap: theme.spacing(1),
    },
  },
  navContainer: {
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {},
  },
  list: { width: '75vw' },
  listItem: { padding: theme.spacing(3) },
}));

export default function Navbar() {
  const classes = useStyles();

  const { navDrawerOpen, openNavDrawer, closeNavDrawer, navLinksObj } =
    NavbarLogic();

  const navDrawer = (
    <SwipeableDrawer
      disableSwipeToOpen
      open={navDrawerOpen}
      onOpen={openNavDrawer}
      onClose={closeNavDrawer}
    >
      <div
        onClick={closeNavDrawer}
        onKeyDown={closeNavDrawer}
        className={classes.list}
      >
        <List>
          {navLinksObj.map((link) => {
            if (link.displayed) {
              return (
                <ListItem
                  button
                  component={Link}
                  to={link.path}
                  key={link.title}
                  className={classes.listItem}
                >
                  <ListItemIcon>
                    {React.cloneElement(link.icon, { size: 15 })}
                  </ListItemIcon>
                  <ListItemText primary={link.title} />
                </ListItem>
              );
            }
            return <React.Fragment key={link.title}></React.Fragment>;
          })}
          <Divider />
        </List>
      </div>
    </SwipeableDrawer>
  );
  return (
    <div className={classes.root}>
      <AppBar position='fixed' color='inherit' elevation={2}>
        <Toolbar className={classes.navContainer}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={openNavDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h5'
            className={classes.title}
            component={Link}
            color='inherit'
            to={'/'}
          >
            okalo
          </Typography>
          <div className={classes.navLinks}>
            {navLinksObj.map((link) => {
              if (link.displayed) {
                return (
                  <React.Fragment key={link.title}>
                    <Button
                      variant={link.outlined ? 'outlined' : 'text'}
                      component={Link}
                      to={link.path}
                      color='inherit'
                    >
                      {link.title}
                    </Button>
                  </React.Fragment>
                );
              }
              return <React.Fragment key={link.title}></React.Fragment>;
            })}
          </div>
        </Toolbar>
      </AppBar>
      {navDrawer}
    </div>
  );
}
