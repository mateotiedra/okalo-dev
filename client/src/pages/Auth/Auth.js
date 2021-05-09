// eslint-disable-next-line
//import { useHistory } from 'react-router';
//import Axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core';
import EmojiIcon from '../../components/EmojiIcon/EmojiIcon';
import FieldsGroup from '../../components/FieldsGroup/FieldsGroup';
import MobileContainer from '../../components/MobileContainer/MobileContainer';

import AuthLogic from './AuthLogic';

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

function Auth(props) {
  const classes = useStyles();

  const { fieldsObj, displaySignIn, switchSignIn, signup, signin } = AuthLogic(
    props
  );

  return (
    <MobileContainer>
      <Box className={classes.avatar}>
        <EmojiIcon icon={displaySignIn ? '👤' : '👥'} size={37} />
      </Box>
      <Typography component='h1' variant='h5'>
        {displaySignIn ? 'Connexion' : 'Inscription'}
      </Typography>
      <Box noValidate className={classes.form}>
        <FieldsGroup fieldsObj={fieldsObj} />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
          onClick={displaySignIn ? signin : signup}
        >
          {displaySignIn ? 'Se connecter' : "S'inscrire"}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href='#' variant='body2'>
              Mot de passe oublié ?
            </Link>
          </Grid>
          <Grid item>
            <Link
              href='#'
              variant='body2'
              component={'button'}
              onClick={switchSignIn}
            >
              {displaySignIn ? "S'inscrire" : 'Se connecter'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </MobileContainer>
  );
}

export default Auth;
