import { useEffect, useRef, useState } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import AppConfig from '../../config/AppConfig';
import AxiosHelper from '../../helpers/AxiosHelper';

const AuthLogic = ({ history, match }) => {
  const { API_ORIGIN } = AppConfig();
  const { setInterceptors, errorCodeEquals } = AxiosHelper(axios, history);

  const hasFetchedData = useRef(false);

  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;
    setInterceptors();
  }, [setInterceptors]);

  // Frontend
  const theme = useTheme();

  const displaySignIn = match.params.option === 'login';

  const switchSignIn = () => {
    history.push(`/auth/${displaySignIn ? 'signup' : 'login'}`);
    window.location.reload();
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Connection to the api
  const signup = (values) => {
    axios
      .post(API_ORIGIN + '/api/auth/signup', {
        email: values.email,
        username: values.username,
        school: values.school,
        password: values.password,
      })
      .then((res) => {
        values.emailOrUsername = values.email;
        signin(values);
      })
      .catch((err) => {
        if (errorCodeEquals(err, 400)) {
          if (!err.response.data.message) return;

          if (err.response.data.message.includes('Username')) {
            formik.setFieldError(
              'username',
              "Ce nom d'utilisateur est déjà utilisé"
            );
          } else if (err.response.data.message.includes('Email')) {
            formik.setFieldError(
              'email',
              'Cette adresse email est déjà utilisée'
            );
          }
        } else {
          console.log(err);
        }
      });
  };

  const signin = (values) => {
    const emailLogin = values.emailOrUsername.includes('@');

    var emailOrUsername = values.emailOrUsername;
    if (values.emailOrUsername.length < 1) {
      emailOrUsername = values.username;
    }

    axios
      .post(API_ORIGIN + '/api/auth/signin', {
        emailOrUsername: emailOrUsername,
        password: values.password,
      })
      .then((response) => {
        localStorage.setItem('accessToken', response.data.accessToken);
        history.push('/');
      })
      .catch((err) => {
        if (errorCodeEquals(err, 404)) {
          formik.setFieldError(
            'emailOrUsername',
            `${
              emailLogin
                ? "L'adresse email entrée"
                : "Le nom d'utilisateur entré"
            } n'appartient à aucun compte`
          );
        } else if (
          errorCodeEquals(err, 401) &&
          err.response.data.message.includes('Password')
        ) {
          formik.setFieldError('password', 'Mot de passe incorrect');
        } else if (
          errorCodeEquals(err, 401) &&
          err.response.data.message.includes('Email')
        ) {
          history.push({
            pathname: '/auth/confirm/pending',
            state: { email: err.response.data.destinationEmail },
          });
        }
      });
  };

  // Form managment
  const signupSchema = yup.object({
    email: yup
      .string('Entres ton adresse email')
      .email('Adresse email invalide')

      .required("N'oublies pas de donner ton adresse email"),
    username: yup
      .string("Entres ton nom d'utilisateur")
      .min(4, "Ton nom d'utilisateur doit avoir au minimum 4 caractères")
      .max(15, "Ton nom d'utilisateur peut avoir au maximum 15 caractères")
      .matches(
        /^[a-zA-Z0-9_.-]*$/,
        "Les espaces et les charactères spéciaux ne sont pas autorisés (sauf le point, l'underscore et le tiret)"
      )
      .required("N'oublies pas de donner ton nom d'utilisateur"),
    school: yup.string(),
    password: yup
      .string('Entres ton mot de passe')
      .matches(/[^ ]/, 'Ton mot de passe ne peut pas contenir despace')
      .min(6, 'Le mot de passe doit avoir au minimum 6 caractères')
      .max(20, 'Le mot de passe ne peut pas avoir plus de 20 caractères')
      .required("N'oublies pas de donner ton mot de passe"),
    passwordConf: yup
      .string()
      .oneOf(
        [yup.ref('password'), null],
        'Le mot de passe de confirmation ne correspond pas'
      )
      .required("N'oublies pas de confirmer ton mot de passe"),
  });

  const signinSchema = yup.object({
    emailOrUsername: yup
      .string()
      .matches(/^[a-zA-Z0-9_.-@]*$/, "Email ou nom d'utilisateur invalide")
      .required(
        "N'oublies pas de donner ton nom d'utilisateur ou ton adresse email"
      ),
    password: yup
      .string('Entres ton mot de passe')
      .min(6, 'Le mot de passe doit avoir au minimum 6 caractères')
      .required("N'oublies pas de donner ton mot de passe"),
  });

  const fieldsSchema = displaySignIn ? signinSchema : signupSchema;

  const formik = useFormik({
    initialValues: displaySignIn
      ? { emailOrUsername: '', password: '' }
      : { email: '', username: '', school: '', password: '', passwordConf: '' },
    validationSchema: fieldsSchema,
    onSubmit: (values) => {
      if (displaySignIn) {
        signin(values);
      } else {
        signup(values);
      }
    },
  });

  const fieldsProps = {
    email: {
      label: 'Adresse email',
      autoFocus: !onMobile,
      autoComplete: 'email',
    },
    username: {
      label: "Nom d'utilisateur",
    },
    emailOrUsername: {
      label: "Email ou nom d'utilisateur",
      autoComplete: 'email',
      autoFocus: !onMobile,
    },
    school: {
      label: 'Collège',
      selectField: true,
      options: ['De Saussure', 'Andrée Chavanne', 'Sismondi'],
    },
    password: {
      passwordField: true,
      label: 'Mot de passe',
      labelWidth: 110,
      showPassword: showPassword,
      handleClickShowPassword: handleClickShowPassword,
      handleMouseDownPassword: handleMouseDownPassword,
    },
    passwordConf: {
      passwordField: true,
      label: 'Confirmer mot de passe',
      labelWidth: 185,
      showPassword: showPassword,
      handleClickShowPassword: handleClickShowPassword,
      handleMouseDownPassword: handleMouseDownPassword,
    },
  };

  const goToResetPasswordPage = () => {
    history.push('/auth/resetpassword/sending');
  };

  return {
    fieldsSchema,
    fieldsProps,
    formik,
    displaySignIn,
    switchSignIn,
    signup,
    signin,
    goToResetPasswordPage,
  };
};

export default AuthLogic;
