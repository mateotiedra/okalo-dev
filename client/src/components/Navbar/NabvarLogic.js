import { useState } from 'react';

const NavbarLogic = () => {
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const openNavDrawer = () => {
    setNavDrawerOpen(true);
  };
  const closeNavDrawer = () => {
    setNavDrawerOpen(false);
  };

  const navLinksObj = [
    { title: "S'inscrire", icon: '👤', path: '/auth', outlined: false },
    { title: 'Aide', icon: '❔', path: '/help', outlined: false },
    { title: 'Contact', icon: '✉️', path: '/contact', outlined: false },
    { title: 'Vendre', icon: '💸', path: '/sell', outlined: true },
  ];
  return { navDrawerOpen, openNavDrawer, closeNavDrawer, navLinksObj };
};

export default NavbarLogic;
