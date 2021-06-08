import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Box,
  Container,
  TextField,
  withWidth,
  Button,
} from '@material-ui/core';
//import EmojiIcon from '../../components/EmojiIcon/EmojiIcon';

import TopSectionLogic from './TopSectionLogic';
//import EmojiWheel from '../../components/Animated/EmojiWheel';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10vh',
    height: '90vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topline: {
    fontWeight: 'bold',
    minWidth: '300px',
    maxWidth: '50vw',
  },
  form: {
    margin: theme.spacing(6, 2, 0, 2),
  },
  sellButton: {
    marginTop: theme.spacing(3),
  },
  emojiWheel: {
    width: 540,
    [theme.breakpoints.up('sm')]: { width: 800 },
  },
}));

function TopSection(props) {
  const classes = useStyles();

  const { typoVariant } = TopSectionLogic(props);

  return (
    <Box className={classes.root}>
      {/*<EmojiWheel
          list={['📕','🖋️','🎒','🖊','📙','🖍️','➕','✏️','📗','💯','📔','🎓','📘','🖌️','📖','✨','📃','📂',
          ]}
          animationTime={100}
          animationRadius={wheelRadius}
          className={classes.emojiWheel}
          emojisSize={emojisSize}
        />*/}
      <Typography
        variant={typoVariant}
        component={'h1'}
        align='center'
        className={classes.topline}
      >
        La plateforme pour trouver tes livres pas chers.
      </Typography>
      <Container maxWidth='sm' justifyContent='center'>
        <form noValidate className={classes.form}>
          <TextField
            variant='outlined'
            margin='none'
            fullWidth
            id='research'
            label='Titre ou auteur du livre'
            name='search'
            type='search'
          />
        </form>
      </Container>

      <Button
        variant='contained'
        color='primary'
        size='large'
        href='/sell'
        className={classes.sellButton}
      >
        Mettre un livre en vente
      </Button>
    </Box>
  );
}

export default withWidth()(TopSection);
