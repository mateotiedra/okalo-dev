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

  const openNavDrawer = () => {
    console.log('open');
    setNavDrawerOpen(true);
  };
  const closeNavDrawer = () => {
    setNavDrawerOpen(false);
  };

  const loggedIn = localStorage.getItem('accessToken') !== null;

  const navLinksObj = [
    {
      title: 'Aide & contact',
      icon: <BiQuestionMark />,
      path: '/contact',
      displayed: true,
    },
    {
      title: 'Se connecter',
      icon: <BiLogIn />,
      path: '/auth/login',
      displayed: !loggedIn,
    },
    {
      title: "S'inscrire",
      icon: <BiUser />,
      path: '/auth/signup',
      displayed: !loggedIn,
    },
    {
      title: 'Paramètres',
      icon: <BiCog />,
      path: '/accounts/edit',
      displayed: loggedIn,
    },
    {
      title: 'Mes annonces',
      icon: <BiNews />,
      path: '/users/u',
      displayed: loggedIn,
    },
    {
      title: 'Vendre',
      icon: <BiDollar />,
      path: '/sell',
      outlined: true,
      displayed: true,
    },
  ];

  const goToSearch = () => {
    history.push('/search');
  };

  const goTo = (pathTo) => () => {
    const rootLocation = history.location.pathname.split('/')[0];
    history.push(pathTo);
    if (rootLocation === pathTo.split('/')[0]) history.go(0);
  };

  return {
    navDrawerOpen,
    openNavDrawer,
    closeNavDrawer,
    defaultNavLinksObj: navLinksObj,
    history,
    goToSearch,
    goTo,
  };
};

export default NavbarLogic;
