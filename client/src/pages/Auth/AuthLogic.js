import { useState } from 'react';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const NavbarLogic = () => {
  // Frontend
  const theme = useTheme();

  const [displaySignIn, setDisplaySignIn] = useState(true);
  const switchSignIn = () => {
    setDisplaySignIn(!displaySignIn);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const passwordValues = {
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
  };

  const onMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fields = [
    {
      name: 'email',
      id: 'email',
      label: 'Adresse email',
      autoComplete: 'email',
      autoFocus: !onMobile,
      error: errors.email,
      helperText: errors.emailHelper,
      displaySignIn: false,
      displayAlways: false,
    },
  ];

  // API
  const [authValues, setAuthValues] = useState({
    email: '',
    username: '',
    fullname: '',
    school: '',
    phone: '',
    password: '',
    passwordConf: '',
  });

  const updateAuthValue = (prop) => (event) => {
    setAuthValues({ ...authValues, [prop]: event.target.value });
  };

  const [errors, setErrors] = useState({
    email: false,
    emailHelper: '',
    username: false,
    usernameHelper: '',
    fullname: false,
    password: false,
    passwordHelper: '',
  });

  const updateError = (errorName, newMess, newState = true) => {
    setErrors({
      ...errors,
      [errorName]: newState,
      [errorName + 'Helper']: newMess,
    });
  };

  const signup = () => {
    if (checkAuthValues()) {
      console.log('Sign up');
    } else {
      console.log('Sign up failed');
    }
  };

  const checkAuthValues = () => {
    var allGood = true;
    allGood = authValues.password.length == 0 || true;

    // Check if any field is empty
    for (const fieldName in authValues) {
      if (authValues[fieldName].length === 0) {
        console.log(fieldName, errors[fieldName]);
      }
    }

    if (authValues.password !== authValues.passwordConf) {
      updateError(
        'password',
        'Le mot de passe de confirmation ne correspond pas'
      );

      allGood = false;
    }
    if (
      (!authValues.email.includes('@') || !authValues.email.includes('.')) &&
      false
    ) {
      updateError('email', "L'adresse email est invalide");
      allGood = false;
    }

    return allGood;
  };

  /*const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [school, setSchool] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  Axios.defaults.withCredentials = true;

  const signup = () => {
    if (password === passwordConf) {
      Axios.post('http://localhost:8080/api/signup', {
        email: email,
        fullname: fullname,
        username: username,
        school: school,
        phone: phone,
        password: password,
      }).then((response) => {
        console.log(response.data);
      });
    } else {
      console.log('Mal conf');
    }
  };

  const login = () => {
    Axios.post('http://localhost:8080/api/login', {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.auth) {
        localStorage.setItem('token', response.data.token);
      }
      console.log(response.data.message);
    });
  };

  const userAuthenticated = () => {
    Axios.get('http://localhost:8080/userAuthenticated', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    }).then((response) => {
      if (response.data.auth) {
        history.push('/');
      }
    });
  };*/

  return {
    onMobile,
    displaySignIn,
    switchSignIn,
    passwordValues,
    authValues,
    updateAuthValue,
    errors,
    updateError,
    signup,
  };
};

export default NavbarLogic;
