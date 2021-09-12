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
  Badge,
} from '@material-ui/core';

import { BiSearch, BiMenu, BiBookmarks } from 'react-icons/bi';
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
    position: 'relative',
  },
  navLinks: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
    },
  },
  titleAndSearch: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    [theme.breakpoints.up('md')]: {
      flex: 1,
      marginRight: theme.spacing(5),
      maxWidth: theme.spacing(100),
    },
  },
  title: {
    fontWeight: 'bold',
  },
  searchBar: {
    flex: 1,
    marginLeft: theme.spacing(3),
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
    nbrSavedBids,
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
                  to={link.to}
                  key={link.title}
                  className={classes.listItem}
                >
                  <ListItemIcon>
                    {React.cloneElement(link.icon, { size: 20 })}
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

  const savedBidsButton = (className) => {
    return nbrSavedBids ? (
      <IconButton component={Link} to={'/bids/saved'} className={className}>
        <Badge badgeContent={nbrSavedBids} max={9} color='secondary'>
          <BiBookmarks color='black' />
        </Badge>
      </IconButton>
    ) : (
      <></>
    );
  };

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
          <div>
            {!hideSearchBar && (
              <IconButton
                edge='end'
                className={classes.menuButton}
                color='inherit'
                aria-label='menu'
                onClick={goToSearch}
              >
                <BiSearch />
              </IconButton>
            )}
            {savedBidsButton(classes.menuButton)}
          </div>
          <div className={classes.navLinks}>
            {savedBidsButton()}
            {navLinksObj.map((link) => {
              if (link.displayed) {
                return (
                  <Button
                    variant={link.outlined ? 'outlined' : 'text'}
                    component={Link}
                    to={link.to}
                    color='inherit'
                  >
                    {link.title}
                  </Button>
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
