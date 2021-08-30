import React from 'react';

import { Typography, Link as MaterialLink } from '@material-ui/core';
import Navbar from '../../components/Navbar/Navbar';
import MobileContainer from '../../components/MobileContainer/MobileContainer';
import Footer from '../../components/pageParts/Footer/Footer';

function Faq() {
  return (
    <>
      <Navbar />
      <MobileContainer responsiveFont maxWidth='md'>
        <Typography>
          {'Tu as trouvé un bug sur le site ?'}
          <br />
          {"Tu as besoin s'aide ?"}
          <br />
          {'Ou alors des suggestions pour améliorer la plateforme ?'}
          <br />
          {
            "N'hésites pas à contacter notre équipe à l'adresse mail suivante : "
          }
          <MaterialLink href='mailto:contact@okalo.ch'>
            contact@okalo.ch
          </MaterialLink>
          <br />
        </Typography>
      </MobileContainer>
      <Footer />
    </>
  );
}

export default Faq;
