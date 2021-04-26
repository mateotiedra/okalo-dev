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
import EmojiIcon from '../EmojiIcon/EmojiIcon';

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
      justifyContent: 'space-between',
      width: 400,
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
  listIcon: { color: 'black' },
}));

export default function Navbar() {
  const classes = useStyles();

  const {
    navDrawerOpen,
    openNavDrawer,
    closeNavDrawer,
    navLinksObj,
  } = NavbarLogic();

  const navDrawer = (
    <SwipeableDrawer
      disableSwipeToOpen
      open={navDrawerOpen}
      onClose={closeNavDrawer}
    >
      <div
        onClick={closeNavDrawer}
        onKeyDown={closeNavDrawer}
        className={classes.list}
      >
        <List>
          {navLinksObj.map((link) => (
            <ListItem
              button
              component={Link}
              to={link.path}
              key={link.title}
              className={classes.listItem}
            >
              <ListItemIcon className={classes.listIcon}>
                <EmojiIcon icon={link.icon} />
              </ListItemIcon>
              <ListItemText primary={link.title} />
            </ListItem>
          ))}
          <Divider />
        </List>
      </div>
    </SwipeableDrawer>
  );
  return (
    <div className={classes.root}>
      <AppBar position='fixed' color='inherit' elevation={2} vari>
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
          <Typography variant='h5' className={classes.title}>
            okalo <EmojiIcon icon='📖' />
          </Typography>
          <div className={classes.navLinks}>
            {navLinksObj.map((link) => (
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
            ))}
          </div>
        </Toolbar>
      </AppBar>
      {navDrawer}
    </div>
  );
}
