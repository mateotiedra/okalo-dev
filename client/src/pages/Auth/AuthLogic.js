import { useState } from 'react';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Axios from 'axios';

import FormHelper from '../../helpers/FormHelper';

const AuthLogic = (props) => {
  // Frontend
  const theme = useTheme();

  const history = props.history;

  const [displaySignIn, setDisplaySignIn] = useState(
    props.match.params.option === 'login'
  );

  const switchSignIn = () => {
    history.push(`/auth/${displaySignIn ? 'signup' : 'login'}`);
    setErrors(defaultErrors);
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

  // Logic
  const [authValues, setAuthValues] = useState({
    email: '',
    username: '',
    fullname: '',
    school: '',
    phone: '',
    password: '',
    passwordConf: '',
    emailOrUsername: '',
  });

  const updateAuthValue = (prop) => (event) => {
    setAuthValues({ ...authValues, [prop]: event.target.value });
  };

  const defaultErrors = {
    email: false,
    emailHelper: '',
    username: false,
    usernameHelper: '',
    fullname: false,
    fullnameHelper: '',
    password: false,
    passwordHelper: '',
    passwordConf: false,
    passwordConfHelper: '',
    emailOrUsername: false,
    emailOrUsernameHelper: '',
  };

  const [errors, setErrors] = useState(defaultErrors);

  const updateError = (errorName, newMess, newState = true) => {
    setErrors({
      ...errors,
      [errorName]: newState,
      [errorName + 'Helper']: newMess,
    });
  };

  const signup = () => {
    if (checkAuthValues()) {
      Axios.post('http://localhost:8080/api/auth/signup', {
        email: authValues.email,
        fullname: authValues.fullname,
        username: authValues.username,
        school: authValues.school,
        phone: authValues.phone,
        password: authValues.password,
      })
        .then((res) => {
          signin();
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            var newErrors = errors;
            if (!err.response.data.message) return;

            if (err.response.data.message.includes('Username')) {
              newErrors['username'] = true;
              newErrors['usernameHelper'] =
                "Ce nom d'utilisateur est déjà utilisé";
            }
            if (err.response.data.message.includes('Email')) {
              newErrors['email'] = true;
              newErrors['emailHelper'] =
                'Cette adresse email est déjà utilisée';
            }
            setErrors(newErrors);
          } else {
            console.log(err);
          }
        });
    }
  };

  const signin = () => {
    if (checkAuthValues()) {
      const emailLogin = isEmail(authValues.emailOrUsername);

      var emailOrUsername = authValues.emailOrUsername;
      if (authValues.emailOrUsername.length < 1) {
        emailOrUsername = authValues.username;
      }

      Axios.post('http://localhost:8080/api/auth/signin', {
        emailOrUsername: emailOrUsername,
        password: authValues.password,
      })
        .then((response) => {
          localStorage.setItem('accessToken', response.data.accessToken);
          history.push('/');
        })
        .catch((err) => {
          if (err.response.status === 404) {
            updateError(
              'emailOrUsername',
              `${
                emailLogin
                  ? "L'adresse email entrée"
                  : "Le nom d'utilisateur entré"
              } n'appartient à aucun compte`
            );
          } else if (
            err.response.status === 401 &&
            err.response.data.message.includes('Password')
          ) {
            updateError('password', 'Mot de passe incorrect');
          } else if (
            err.response.status === 401 &&
            err.response.data.message.includes('Email')
          ) {
            history.push({
              pathname: '/auth/confirm/pending',
              state: { email: err.response.data.destinationEmail },
            });
          }
        });
    }
  };

  const { isEmail } = FormHelper();

  const checkAuthValues = () => {
    var allGood = true;

    // Check if any field is empty
    var newErrors = errors;

    fieldsObj.forEach((field) => {
      if (
        field.required &&
        field.displayed &&
        authValues[field.name] !== undefined
      ) {
        if (authValues[field.name].length === 0) {
          // Check if the field is empty
          newErrors[field.name] = true;
          newErrors[field.name + 'Helper'] = '';
          allGood = false;
        } else if (
          // If The field has another error
          newErrors[field.name] &&
          newErrors[field.name + 'Helper'].length > 0 &&
          !newErrors[field.name + 'Helper'].includes('utilisé')
        ) {
          allGood = false;
        } else {
          // Otherwise it removes the error
          newErrors[field.name] = false;
          newErrors[field.name + 'Helper'] = '';
        }
      } else {
        newErrors[field.name] = false;
      }
    });

    // If the page is on signup mode
    if (!displaySignIn) {
      // Basic check of the email
      if (!newErrors.email && !isEmail(authValues.email)) {
        newErrors.email = true;
        newErrors.emailHelper = "L'adresse email est invalide";
        allGood = false;
      } else if (!newErrors.email) {
        newErrors.email = false;
        newErrors.emailHelper = '';
      }
    }

    setErrors({
      ...newErrors,
    });

    return allGood;
  };

  const checkPasswordValidity = ({ password, passwordConf }) => {
    var newErrors = errors;

    if (password === passwordConf) {
      newErrors.passwordConf = false;
      newErrors.passwordConfHelper = '';
    } else {
      newErrors.passwordConf = true;
      newErrors.passwordConfHelper =
        'La confirmation ne correspond pas au mot de passe';
    }

    // Check password
    if (!password.match('^[a-zA-Z0-9_.-]*$')) {
      newErrors.password = true;
      newErrors.passwordHelper =
        "Les espaces et les charactères spéciaux ne sont pas autorisés (sauf le point, l'underscore et le tiret)";
    } else if (password.length < 6) {
      newErrors.password = true;
      newErrors.passwordHelper =
        'Le mot de passe doit contenir au moins 6 charactères';
    } else {
      newErrors.password = false;
      newErrors.passwordHelper = '';
    }

    setErrors(newErrors);
  };

  const updatePassword = (prop) => (event) => {
    var passwordValus = {
      password: authValues.password,
      passwordConf: authValues.passwordConf,
    };
    passwordValus[prop] = event.target.value;
    checkPasswordValidity(passwordValus);
    setAuthValues({ ...authValues, [prop]: event.target.value });
  };

  // The fieldsObj
  const fieldsObj = [
    {
      name: 'email',
      id: 'email',
      label: 'Adresse email',
      autoComplete: 'email',
      value: authValues.email,
      autoFocus: !onMobile,
      error: errors.email,
      helperText: errors.emailHelper,
      required: true,
      displayed: !displaySignIn,
      onChange: updateAuthValue('email'),
    },
    {
      name: 'username',
      id: 'username',
      label: "Nom d'utilisateur",
      value: authValues.username,
      error: errors.username,
      helperText: errors.usernameHelper,
      required: true,
      displayed: !displaySignIn,
      onChange: updateAuthValue('username'),
    },
    {
      name: 'emailOrUsername',
      id: 'emailOrUsername',
      label: "Adresse email ou nom d'utilisateur",
      autoComplete: 'email',
      value: authValues.emailOrUsername,
      error: errors.emailOrUsername,
      helperText: errors.emailOrUsernameHelper,
      autoFocus: !onMobile,
      required: true,
      displayed: displaySignIn,
      onChange: updateAuthValue('emailOrUsername'),
    },
    {
      name: 'fullname',
      id: 'fullname',
      label: 'Nom complet',
      autoComplete: 'name',
      value: authValues.fullname,
      error: errors.fullname,
      helperText: errors.fullnameHelper,
      required: true,
      displayed: !displaySignIn,
      onChange: updateAuthValue('fullname'),
    },
    {
      name: 'phone',
      id: 'phone',
      label: 'Numéro de téléphone',
      autoComplete: 'tel',
      value: authValues.phone,
      error: errors.phone,
      displayed: !displaySignIn,
      onChange: updateAuthValue('phone'),
    },
    {
      name: 'school',
      selectOption: true,
      id: 'school',
      label: 'Collège',
      value: authValues.school,
      error: errors.school,
      autoComplete: 'tel',
      options: ['Saussure', 'Andrée-Chavanne', 'Sismondi'],
      displayed: !displaySignIn,
      onChange: updateAuthValue('school'),
    },
    {
      name: 'password',
      passwordField: true,
      id: 'password',
      label: 'Mot de passe',
      labelWidth: 110,
      showPassword: showPassword,
      handleClickShowPassword: handleClickShowPassword,
      handleMouseDownPassword: handleMouseDownPassword,
      password: authValues.password,
      value: authValues.password,
      onChange: updatePassword('password'),
      error: errors.password,
      helperText: errors.passwordHelper,
      required: true,
      displayed: true,
    },
    {
      name: 'passwordConf',
      passwordField: true,
      id: 'passwordConf',
      label: 'Confirmer mot de passe',
      labelWidth: 185,
      showPassword: showPassword,
      handleClickShowPassword: handleClickShowPassword,
      handleMouseDownPassword: handleMouseDownPassword,
      password: authValues.passwordConf,
      onChange: updatePassword('passwordConf'),
      value: authValues.passwordConf,
      error: errors.passwordConf,
      helperText: errors.passwordConfHelper,
      required: true,
      displayed: !displaySignIn,
    },
  ];

  return { fieldsObj, displaySignIn, switchSignIn, signup, signin };
};

export default AuthLogic;
