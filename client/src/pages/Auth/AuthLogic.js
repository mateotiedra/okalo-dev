import { useEffect, useRef, useState } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import axios from 'axios';

import websiteData from '../../assets/data/website.json';

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

  const [displaySignIn, setDisplaySignIn] = useState(
    match.params.option === 'login'
  );
  const [displayMoreContact, setDisplayMoreContact] = useState(false);

  const toggleMoreContact = () => {
    setDisplayMoreContact(!displayMoreContact);
  };

  const switchSignIn = () => {
    history.replace(`/auth/${displaySignIn ? 'signup' : 'login'}`);
    setDisplaySignIn(!displaySignIn);
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
        ...values,
        username: values.username.toLowerCase(),
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
              "Ce nom d'utilisateur est d??j?? utilis??"
            );
          } else if (err.response.data.message.includes('Email')) {
            formik.setFieldError(
              'email',
              'Cette adresse email est d??j?? utilis??e'
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
        history.push('/users/u');
      })
      .catch((err) => {
        if (errorCodeEquals(err, 404)) {
          formik.setFieldError(
            'emailOrUsername',
            `${
              emailLogin
                ? "L'adresse email entr??e"
                : "Le nom d'utilisateur entr??"
            } n'appartient ?? aucun compte`
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
          history.replace({
            pathname: '/auth/confirm/pending',
            state: { email: err.response.data.destinationEmail },
          });
        }
      });
  };

  // Form managment
  const signupSchema = yup.object({
    username: yup
      .string("Entres ton nom d'utilisateur")
      .min(4, "Ton nom d'utilisateur doit avoir au minimum 4 caract??res")
      .max(15, "Ton nom d'utilisateur peut avoir au maximum 15 caract??res")
      .matches(
        /^[a-zA-Z0-9_.-]*$/,
        "Les espaces et les charact??res sp??ciaux ne sont pas autoris??s (sauf le point, l'underscore et le tiret)"
      )
      .required("N'oublies pas de donner ton nom d'utilisateur"),
    email: yup
      .string('Entres ton adresse email')
      .email('Adresse email invalide')
      .required("N'oublies pas de donner ton adresse email"),

    school: yup
      .string()
      .required("N'oublies pas de renseigner ton ??tablissement"),
    password: yup
      .string('Entres ton mot de passe')
      .matches(/[^ ]/, 'Ton mot de passe ne peut pas contenir despace')
      .min(6, 'Le mot de passe doit avoir au minimum 6 caract??res')
      .max(20, 'Le mot de passe ne peut pas avoir plus de 20 caract??res')
      .required("N'oublies pas de donner ton mot de passe"),
    passwordConf: yup
      .string()
      .oneOf(
        [yup.ref('password'), null],
        'Le mot de passe de confirmation ne correspond pas'
      )
      .required("N'oublies pas de confirmer ton mot de passe"),
    phone: yup
      .string('Entres ton num??ro de t??l??phone')
      .matches(
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
        'Num??ro de t??l??phone incorrect'
      ),
    instaName: yup.string('Entres le nom de ton compte instagram'),
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
      .min(6, 'Le mot de passe doit avoir au minimum 6 caract??res')
      .required("N'oublies pas de donner ton mot de passe"),
  });

  const fieldsSchema = displaySignIn ? signinSchema : signupSchema;

  const signinFormik = useFormik({
    initialValues: { emailOrUsername: '', password: '' },
    validationSchema: signinSchema,
    onSubmit: (values) => {
      signin(values);
    },
  });

  const signupFormik = useFormik({
    initialValues: {
      email: '',
      username: '',
      phone: '',
      school: '',
      instaName: '',
      password: '',
      passwordConf: '',
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      signup(values);
    },
  });

  const formik = displaySignIn ? signinFormik : signupFormik;

  const moreContactStyle = {
    display: displayMoreContact ? 'block' : 'none',
  };

  const fieldsProps = {
    email: {
      label: 'Adresse email',
      autoComplete: 'email',
    },
    username: {
      label: "Nom d'utilisateur",
      autoFocus: !onMobile,
    },
    phone: {
      label: 'Num??ro de t??l??phone ',
      autoComplete: 'phone',
      style: moreContactStyle,
      autoFocus: displayMoreContact,
    },
    instaName: {
      label: 'Compte instagram',
      autoComplete: 'phone',
      style: moreContactStyle,
    },
    emailOrUsername: {
      label: "Email ou nom d'utilisateur",
      autoComplete: 'email',
      autoFocus: !onMobile,
    },
    school: {
      label: '??tablissement *',
      selectField: true,
      options: websiteData.availableSchools,
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
    toggleMoreContact,
    displayMoreContact,
  };
};

export default AuthLogic;
