import { useState } from 'react';

const NavbarLogic = () => {
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const openNavDrawer = () => {
    setNavDrawerOpen(true);
  };
  const closeNavDrawer = () => {
    setNavDrawerOpen(false);
  };

  const loggedIn = localStorage.getItem('accessToken') !== null;

  const navLinksObj = [
    {
      title: 'Aide',
      icon: '❔',
      path: '/help',
      displayed: true,
    },
    {
      title: 'Contact',
      icon: '✉️',
      path: '/contact',
      displayed: true,
    },
    {
      title: 'Se connecter',
      icon: '👤',
      path: '/auth/login',
      displayed: !loggedIn,
    },
    {
      title: "S'inscrire",
      icon: '👥',
      path: '/auth/signup',
      displayed: !loggedIn,
    },
    {
      title: 'Paramètre',
      icon: '⚙️',
      path: '/accounts/edit',
      displayed: loggedIn,
    },
    {
      title: 'Mes annonces',
      icon: '💸',
      path: '/users/u',
      displayed: loggedIn,
    },
    {
      title: 'Vendre',
      icon: '💸',
      path: '/sell',
      outlined: true,
      displayed: true,
    },
  ];
  return { navDrawerOpen, openNavDrawer, closeNavDrawer, navLinksObj };
};

export default NavbarLogic;
