import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    textAlign: 'center',
  },
}));

export default function PasswordField() {
  const classes = useStyles();
  return (
    <Typography component={'small'} variant='body2' className={classes.root}>
      &copy; Copyright 2021, Mateo Tiedra, All Rights Reserved
    </Typography>
  );
}
