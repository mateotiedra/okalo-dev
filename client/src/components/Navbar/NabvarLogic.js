import { useState } from 'react';
import {
  BiQuestionMark,
  BiEnvelope,
  BiLogIn,
  BiUser,
  BiCog,
  BiNews,
  BiDollar,
} from 'react-icons/bi';

const NavbarLogic = () => {
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
      title: 'Aide',
      icon: <BiQuestionMark />,
      path: '/help',
      displayed: true,
    },
    {
      title: 'Contact',
      icon: <BiEnvelope />,
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
  return {
    navDrawerOpen,
    openNavDrawer,
    closeNavDrawer,
    defaultNavLinksObj: navLinksObj,
  };
};

export default NavbarLogic;
