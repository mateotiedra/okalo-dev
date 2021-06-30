import { BiUser, BiLogIn } from 'react-icons/bi';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Link, Grid, Box } from '@material-ui/core';
import FieldsGroup from '../../components/FieldsGroup/FieldsGroup';
import MobileContainer from '../../components/MobileContainer/MobileContainer';

import AuthLogic from './AuthLogic';
import FormHeader from '../../components/pageParts/FormHeader/BlobAvatar/FormHeader';

const useStyles = makeStyles((theme) => ({
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

  const {
    fieldsSchema,
    fieldsProps,
    formik,
    displaySignIn,
    switchSignIn,
    goToResetPasswordPage,
  } = AuthLogic(props);

  return (
    <MobileContainer>
      <FormHeader
        icon={displaySignIn ? <BiLogIn /> : <BiUser />}
        title={displaySignIn ? 'Connexion' : 'Inscription'}
      />
      <Box noValidate className={classes.form}>
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
            {displaySignIn ? 'Se connecter' : "S'inscrire"}
          </Button>
        </FieldsGroup>

        <Grid container>
          <Grid item xs>
            {displaySignIn && (
              <Link variant='body2' onClick={goToResetPasswordPage}>
                Mot de passe oublié ?
              </Link>
            )}
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
