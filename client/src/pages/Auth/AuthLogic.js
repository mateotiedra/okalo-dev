import { useState } from 'react';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Axios from 'axios';

const NavbarLogic = () => {
  // Frontend
  const theme = useTheme();

  const [displaySignIn, setDisplaySignIn] = useState(true);

  const switchSignIn = () => {
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
    username: false,
    fullname: false,
    password: false,
    passwordConf: false,
    emailHelper: '',
    usernameHelper: '',
    passwordHelper: '',
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
      Axios.post('http://localhost:8080/api/signup', {
        email: authValues.email,
        fullname: authValues.fullname,
        username: authValues.username,
        school: authValues.school,
        phone: authValues.phone,
        password: authValues.password,
      }).then((response) => {
        console.log(response.data);
      });
    } else {
      console.log('Sign up failed');
    }
  };

  const signin = () => {
    if (checkAuthValues()) {
      if (isEmail(authValues.emailOrUsername)) {
        Axios.post('http://localhost:8080/api/login/email', {
          email: authValues.emailOrUsername,
          password: authValues.password,
        }).then((response) => {
          console.log(response.status);
        });
      } else {
        Axios.post('http://localhost:8080/api/login/username', {
          username: authValues.emailOrUsername,
          password: authValues.password,
        }).then((response) => {
          console.log(response.status);
        });
      }
    }
  };

  const isEmail = (email) => {
    return email.includes('@') && email.includes('.');
  };

  const checkAuthValues = () => {
    var allGood = true;

    // Check if any field is empty
    var newErrors = errors;

    fieldsObj.forEach((field) => {
      if (
        field.required &&
        field.displayed &&
        authValues[field.name] !== undefined &&
        authValues[field.name].length === 0
      ) {
        newErrors[field.name] = true;
        allGood = false;
      } else {
        newErrors[field.name] = false;
      }
      newErrors[field.name + 'Helper'] = '';
    });
    setErrors({
      ...newErrors,
    });

    if (!displaySignIn) {
      // Basic check of the email
      if (!newErrors.email && !isEmail(authValues.email)) {
        updateError('email', "L'adresse email est invalide");
        allGood = false;
      }

      // Basci check of the password
      if (
        !newErrors.password &&
        authValues.password !== authValues.passwordConf
      ) {
        updateError(
          'password',
          'Le mot de passe de confirmation ne correspond pas'
        );
        allGood = false;
      }
    }

    return allGood;
  };

  // Api

  // The fieldsObj
  const fieldsObj = [
    {
      name: 'email',
      id: 'email',
      label: 'Adresse email',
      autoComplete: 'email',
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
      error: errors.emailOrUsername,
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
      error: errors.phone,
      displayed: !displaySignIn,
      onChange: updateAuthValue('phone'),
    },
    {
      name: 'school',
      selectOption: true,
      id: 'school',
      label: 'Collège',
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
      onChange: updateAuthValue('password'),
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
      onChange: updateAuthValue('passwordConf'),
      error: errors.password,
      helperText: errors.passwordHelper,
      required: true,
      displayed: !displaySignIn,
    },
  ];

  return { fieldsObj, displaySignIn, switchSignIn, signup, signin };
};

export default NavbarLogic;
