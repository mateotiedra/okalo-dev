import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  BiQuestionMark,
  BiLogIn,
  BiUser,
  BiCog,
  BiNews,
  BiDollar,
} from 'react-icons/bi';

const NavbarLogic = () => {
  let history = useHistory();
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const openNavDrawer = () => {
    setNavDrawerOpen(true);
  };
  const closeNavDrawer = () => {
    setNavDrawerOpen(false);
  };

  const loggedIn = localStorage.getItem('accessToken') !== null;

  const savedBids = localStorage.getItem('savedBids');
  const nbrSavedBids = savedBids
    ? JSON.parse(localStorage.getItem('savedBids')).length
    : 0;

  const navLinksObj = [
    {
      title: 'Aide & contact',
      icon: <BiQuestionMark />,
      to: '/contact',
      displayed: true,
    },
    {
      title: 'Se connecter',
      icon: <BiLogIn />,
      to: '/auth/login',
      displayed: !loggedIn,
    },
    {
      title: "S'inscrire",
      icon: <BiUser />,
      to: '/auth/signup',
      displayed: !loggedIn,
    },
    {
      title: 'Paramètres',
      icon: <BiCog />,
      to: '/accounts/edit',
      displayed: loggedIn,
    },
    {
      title: 'Mes annonces',
      icon: <BiNews />,
      to: {
        pathname: '/users/u',
        state: { isActive: true },
      },
      displayed: loggedIn,
    },
    {
      title: 'Vendre',
      icon: <BiDollar />,
      to: '/sell',
      outlined: true,
      displayed: true,
    },
  ];

  const goToSearch = () => {
    history.push('/search');
  };

  const goTo = (pathTo) => () => {
    const rootLocation = history.location.pathname.split('/')[1];
    if (rootLocation === pathTo.split('/')[1]) {
      setRefresh(!refresh);
    }
  };

  return {
    navDrawerOpen,
    openNavDrawer,
    closeNavDrawer,
    defaultNavLinksObj: navLinksObj,
    history,
    goToSearch,
    goTo,
    nbrSavedBids,
  };
};

export default NavbarLogic;
