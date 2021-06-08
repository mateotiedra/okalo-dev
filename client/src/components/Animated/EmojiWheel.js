import React from 'react';
//import clsx from 'clsx';
import { Box, makeStyles } from '@material-ui/core';
import EmojiIcon from '../EmojiIcon/EmojiIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    width: '100vw',
    height: '90vh',
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
    overflow: 'hidden',
  },
  emojiBox: {
    gridColumn: 1,
    gridRow: 1,
    display: 'block',
    margin: '30px',
    animation: '$spinAround var(--animationTime) linear infinite',
    //transformOrigin: '-200% 50%',
  },
  emoji: {
    display: 'block',
    margin: '0 auto',
    animation: '$spinCenter var(--animationTime) linear infinite',
  },

  '@keyframes spinAround': {
    from: {
      transform: ' rotate(0deg) translateX(var(--animRadius))',
    },
    to: {
      transform: 'rotate(360deg) translateX(var(--animRadius))',
    },
  },
  '@keyframes spinCenter': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(-360deg)',
    },
  },
}));

const EmojiWheel = (props) => {
  const classes = useStyles();
  const itemsList = props.list;
  const itemNumber = itemsList.length;

  return (
    <Box className={classes.root}>
      {itemsList.map((icon, index) => {
        const emojiStyle = {
          '--animationTime': props.animationTime * 1000 + 'ms',
          '--animRadius': props.animationRadius || '200px',
          animationDelay:
            (-props.animationTime / itemNumber) * (index + 1) + 's',
        };

        <Box className={classes.emojiBox} style={emojiStyle}>
          <Box className={classes.emoji} style={emojiStyle}>
            <EmojiIcon icon={icon} size={props.emojisSize || 50} />
          </Box>
        </Box>;
      })}
    </Box>
  );
};

export default EmojiWheel;
