import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MobileContainer from '../../components/MobileContainer/MobileContainer';
import EmojiIcon from '../EmojiIcon/EmojiIcon';

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginBottom: theme.spacing(4),
  },
  avatarSmallerSpace: {
    marginBottom: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(3),
    fontWeight: 'bold',
    textAlign: 'left',
  },
  body: {
    textAlign: 'left',
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },
}));

export default function FormPage(props) {
  const classes = useStyles();

  const avatarSize = props.avatarSize || (props.longAlert ? 37 : 100);

  return (
    <MobileContainer
      maxWidth='xs'
      goBackLink={props.goBackLink}
      goBackFunction={props.goBackFunction}
    >
      {props.avatar && (
        <Box
          className={
            props.longAlert ? classes.avatarSmallerSpace : classes.avatar
          }
        >
          <EmojiIcon icon={props.avatar} size={avatarSize} />
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
