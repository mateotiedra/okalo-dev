import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Box,
  Container,
  withWidth,
  Button,
  Divider,
} from '@material-ui/core';
//import EmojiIcon from '../../components/EmojiIcon/EmojiIcon';

import TopSectionLogic from './TopSectionLogic';
import BlobScene from '../../components/BlobScene/BlobScene';
import SearchBar from '../../components/pageParts/SearchBar/SearchBar';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '10vh',
    height: '100vh',
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
    width: '100%',
  },
  ctaContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(3),
    marginTop: theme.spacing(6),
  },
  testBox: {
    backgroundColor: 'coral',
    width: '100px',
    height: '100px',
    margin: 0,
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
    <BlobScene>
      {/*<EmojiWheel
          list={['📕','🖋️','🎒','🖊','📙','🖍️','➕','✏️','📗','💯','📔','🎓','📘','🖌️','📖','✨','📃','📂',
          ]}
          animationTime={100}
          animationRadius={wheelRadius}
          className={classes.emojiWheel}
          emojisSize={emojisSize}
        />*/}

      <Container maxWidth='sm' className={classes.root}>
        <Typography
          variant={typoVariant}
          component={'h1'}
          align='center'
          className={classes.topline}
        >
          La plateforme pour trouver tes livres pas chers.
        </Typography>
        <Box
          className={classes.ctaContainer}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <SearchBar
            history={props.history}
            className={classes.form}
            variant='outlined'
          />
          <Divider variant='middle' width='25%' />
          <Button variant='contained' color='primary' size='large' href='/sell'>
            Mettre un livre en vente
          </Button>
        </Box>
      </Container>
    </BlobScene>
  );
}

export default withWidth()(TopSection);
