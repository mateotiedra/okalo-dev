import React from 'react';
//import clsx from 'clsx';
import { Box, makeStyles } from '@material-ui/core';
import EmojiIcon from '../EmojiIcon/EmojiIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    width: '100vw',
    height: '100vh',
    zIndex: -1,
    overflow: 'hidden',
    opacity: '10%',
  },
  line: {
    overflow: 'hidden',
    display: 'grid',
    width: '100vw',
  },
  emojiBox: {
    gridColumn: 1,
    gridRow: 1,
    display: 'block',
    //width: 'var(--emojisSize)',
    //height: 'var(--emojisSize)',
    margin: '0 auto',
    animation: '$moveHorizontally var(--animationTime) linear infinite',
    position: 'relative',
    //transformOrigin: '-200% 50%',
  },

  '@keyframes moveHorizontally': {
    from: {
      transform: 'translateX(0)',
    },
    to: {
      transform: 'translateX(calc(100vw))',
    },
  },
}));

const EmojiRoute = (props) => {
  const classes = useStyles();
  const itemsList = props.list;
  const itemNumber = itemsList.length;

  const line = (
    <Box>
      {itemsList.map((icon, index) => {
        const emojiStyle = {
          '--animationTime': props.animationTime * 1000 + 'ms',
          '--emojiSize': props.emojisSize || '200px',
          animationDelay:
            (-props.animationTime / itemNumber) * (index + 1) + 's',
        };

        return (
          <Box className={classes.emojiBox} style={emojiStyle}>
            <EmojiIcon icon={icon} size={props.emojisSize || 50} />
          </Box>
        );
      })}
    </Box>
  );

  return <Box className={classes.root}>{line}</Box>;
};

export default EmojiRoute;
