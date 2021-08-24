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

import { BiSearch, BiMenu } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import NavbarLogic from './NavbarLogic';
import SearchBar from '../pageParts/SearchBar/SearchBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  navLinks: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      gap: theme.spacing(1),
    },
  },
  titleAndSearch: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(3),
      flex: 1,
      marginRight: theme.spacing(5),
      maxWidth: theme.spacing(100),
    },
  },
  title: {
    fontWeight: 'bold',
    [theme.breakpoints.up('md')]: {},
  },
  searchBar: {
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  list: { width: '75vw' },
  listItem: { padding: theme.spacing(3) },
}));

export default function Navbar({ title, persoNavLinksObj, hideSearchBar }) {
  const classes = useStyles();

  const {
    navDrawerOpen,
    openNavDrawer,
    closeNavDrawer,
    defaultNavLinksObj,
    history,
    goToSearch,
  } = NavbarLogic();

  const navLinksObj = persoNavLinksObj || defaultNavLinksObj;

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
            <BiMenu />
          </IconButton>
          <div className={classes.titleAndSearch}>
            <Typography
              variant='h5'
              className={classes.title}
              component={Link}
              color='inherit'
              to={'/'}
            >
              {title || 'okalo'}
            </Typography>
            {!hideSearchBar && (
              <SearchBar history={history} className={classes.searchBar} />
            )}
          </div>
          <IconButton
            edge='end'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={goToSearch}
          >
            <BiSearch />
          </IconButton>
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
