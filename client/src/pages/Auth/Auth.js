import { BiUser, BiLogIn } from 'react-icons/bi';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Link, Grid, Box, Typography } from '@material-ui/core';
import FieldsGroup from '../../components/FieldsGroup/FieldsGroup';
import MobileContainer from '../../components/MobileContainer/MobileContainer';

import AuthLogic from './AuthLogic';
import FormHeader from '../../components/pageParts/FormHeader/BlobAvatar/FormHeader';
import AlertPage from '../../components/AlertPage/AlertPage';

import { BiConfused } from 'react-icons/bi';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formLink: {
    alignSelf: 'flex-end',
  },
  sectionContainer: {
    margin: theme.spacing(1, 0, 1),
  },
  sectionTitle: {
    color: 'grey',
    fontWeight: 'bold',
  },
  sectionBody: {
    color: 'grey',
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
    toggleMoreContact,
    displayMoreContact,
  } = AuthLogic(props);

  const moreContactLink = (
    <Link
      variant='body2'
      type='button'
      component={'button'}
      onClick={toggleMoreContact}
      className={classes.formLink}
    >
      + Ajouter d'autres moyens de contact
    </Link>
  );

  const contactSection = (
    <Box className={classes.sectionContainer}>
      <Typography component='h6' className={classes.sectionTitle}>
        Autres moyens de contact
      </Typography>
      <Typography variant='body2' className={classes.sectionBody}>
        L'adresse email est le moyen de contact acheteur/vendeur par défaut. Tu
        peux en ajouter d'autres si tu le souhaites.
      </Typography>
    </Box>
  );

  if (false) {
    return (
      <AlertPage
        icon={<BiConfused />}
        title='Server en maintenace...'
        body={`Vous avez été trop nombreux à vous connecter aujourd'hui et vous avez fait planter le server plus tôt dans l'aprem (déjà 500 livres en ligne !). Il n'est donc pas possible de se connecter pour le moment. Je suis actuellement entrain de réparer ça ; merci de revenir plus tard :)`}
        ctaButton={{
          children: "Retourner à l'acceuil",
          onClick: () => {
            props.history.push('/');
          },
        }}
      />
    );
  }

  return (
    <MobileContainer>
      <FormHeader
        icon={displaySignIn ? <BiLogIn /> : <BiUser />}
        title={displaySignIn ? 'Connexion' : 'Inscription'}
      />
      <Box noValidate className={classes.form}>
        <FieldsGroup
          fieldsSchema={fieldsSchema}
          fieldsProps={{
            ...fieldsProps,
            passwordConf: {
              ...fieldsProps.passwordConf,
              nextComponents: (
                <>
                  {contactSection}
                  {!displaySignIn && !displayMoreContact && moreContactLink}
                </>
              ),
            },
          }}
          formik={formik}
          className={classes.form}
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
