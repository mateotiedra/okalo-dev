import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MobileContainer from '../../components/MobileContainer/MobileContainer';
import EmojiIcon from '../EmojiIcon/EmojiIcon';

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginBottom: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(3),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  body: {
    textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },
}));

export default function AlertPage(props) {
  const classes = useStyles();

  return (
    <MobileContainer maxWidth='xs'>
      {props.avatar && (
        <Box className={classes.avatar}>
          <EmojiIcon icon={props.avatar} size={100} />
        </Box>
      )}
      {props.title && (
        <Typography component='h1' variant='h4' className={classes.title}>
          {props.title}
        </Typography>
      )}
      {props.body && (
        <Typography component='body' className={classes.body}>
          {props.body}
        </Typography>
      )}
      {props.children}
      {props.ctaButton && (
        <Button
          variant='contained'
          color='primary'
          className={classes.submit}
          {...props.ctaButton}
        />
      )}
    </MobileContainer>
  );
}
