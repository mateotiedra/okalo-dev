import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Container, TextField } from '@material-ui/core';
//import EmojiIcon from '../../components/EmojiIcon/EmojiIcon';

import TopSectionLogic from './TopSectionLogic';

const useStyles = makeStyles((theme) => ({
  root: {},
  titleContainer: {
    height: '55vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  topline: {
    fontWeight: 'bold',
    minWidth: '300px',
    maxWidth: '50vw',
    [theme.breakpoints.up('sm')]: {},
  },
  paper: { backgroundColor: 'red', width: '100%', height: '100%' },
  form: {
    margin: theme.spacing(10, 2, 0, 2),
  },
}));

export default function TopSection() {
  const classes = useStyles();

  const { TypoVariant } = TopSectionLogic();

  return (
    <Box className={classes.root}>
      <Box className={classes.titleContainer}>
        <Typography
          variant={TypoVariant}
          component={'h1'}
          align='center'
          className={classes.topline}
        >
          La plateforme pour trouver tes livres pas chers.
        </Typography>
      </Box>
      <Container maxWidth='sm' justifyContent='center'>
        <form noValidate className={classes.form}>
          <TextField
            variant='outlined'
            margin='none'
            fullWidth
            id='research'
            label='Titre ou auteur du livre'
            name='search'
          />
        </form>
      </Container>
    </Box>
  );
}
