import React from 'react';
//import { Link } from 'react-router-dom';
import { Button, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../../components/Navbar/Navbar';
import FieldsGroup from '../../components/FieldsGroup/FieldsGroup';
import MobileContainer from '../../components/MobileContainer/MobileContainer';
import EmojiIcon from '../../components/EmojiIcon/EmojiIcon';

import SellLogic from './SellLogic';

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
  const { pageData, fieldsSchema, fieldsProps, formik, stepBack } =
    SellLogic(props);

  return (
    <>
      <Navbar />
      <MobileContainer arrowTopPosition={'64px'} goBackFunction={stepBack}>
        <Box className={classes.avatar}>
          <EmojiIcon icon={pageData.avatar} size={37} />
        </Box>
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
