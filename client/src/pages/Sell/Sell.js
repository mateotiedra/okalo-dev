import React from 'react';
//import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BiRocket } from 'react-icons/bi';

import Navbar from '../../components/Navbar/Navbar';
import FieldsGroup from '../../components/FieldsGroup/FieldsGroup';
import MobileContainer from '../../components/MobileContainer/MobileContainer';
import LoadingPage from '../../components/LoadingPage/LoadingPage';
import AlertPage from '../../components/AlertPage/AlertPage';
import { BiBook } from 'react-icons/bi';

import SellLogic from './SellLogic';
import BlobAvatar from '../../components/BlobAvatar/BlobAvatar';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Sell(props) {
  const classes = useStyles();
  const {
    pageStatus,
    pageData,
    fieldsSchema,
    fieldsProps,
    formik,
    stepBack,
    goToBids,
    goToParam,
  } = SellLogic(props);

  if (pageStatus === 'loading') return <LoadingPage />;
  else if (pageStatus === 'success')
    return (
      <AlertPage
        icon={<BiRocket />}
        title={'Annonce publiée !'}
        body={`À partir de maintenant des personnes intéressées peuvent te contacter par les moyens de contact que tu as indiquer sur ton profile (email, téléphone et/ou insta).`}
        ctaButton={[
          {
            children: 'Modifier mes moyens de contact',
            onClick: goToParam,
          },
          {
            children: 'Voir mes annonces',
            onClick: goToBids,
          },
        ]}
      />
    );
  return (
    <>
      <Navbar />
      <MobileContainer arrowTopPosition={'64px'} goBackFunction={stepBack}>
        <BlobAvatar className={classes.avatar}>
          <BiBook size={45} color='white' />
        </BlobAvatar>
        <Typography component='h1' variant='h5'>
          {pageData.title}
        </Typography>
        <FieldsGroup
          fieldsSchema={fieldsSchema}
          fieldsProps={fieldsProps}
          formik={formik}
        >
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {pageData.lastStep ? 'Terminer' : 'Suivant'}
          </Button>
        </FieldsGroup>
      </MobileContainer>
    </>
  );
}

export default Sell;
