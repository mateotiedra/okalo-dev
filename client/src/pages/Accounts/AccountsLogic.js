import { useState, useEffect, useRef } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import axios from 'axios';

import websiteData from '../../assets/data/website.json';

import AppConfig from '../../config/AppConfig';
import AxiosHelper from '../../helpers/AxiosHelper';

const AccountsLogic = ({ history, match }) => {
  const { API_ORIGIN } = AppConfig();
  const { setInterceptors } = AxiosHelper(axios, history);

  const [pageStatus, setPageStatus] = useState('loading');

  const hasFetchedData = useRef(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword && pageStatus === 'password');
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [changeSuccess, setChangeSuccess] = useState(false);

  const saveNewValues = (values) => {
    axios
      .post(
        API_ORIGIN + '/api/user/settings',
        {
          fullname: values.fullname,
          phone: values.phone,
          instaName: values.instaName,
          school: values.school,
        },
        {
          headers: {
            'x-access-token': localStorage.getItem('accessToken'),
          },
        }
      )
      .then((res) => {
        setChangeSuccess(true);
      })
      .catch((err) => {
        if (err.response.status && err.response.status === 304) {
        } else {
          console.log(err);
        }
      });
  };

  const saveNewPassword = (values) => {
    axios
      .post(
        API_ORIGIN + '/api/user/settings',
        {
          password: values.password,
        },
        {
          headers: {
            'x-access-token': localStorage.getItem('accessToken'),
          },
        }
      )
      .then((res) => {
        setChangeSuccess(true);
      })
      .catch((err) => {
        if (err.response.status && err.response.status === 304) {
        } else {
          console.log(err);
        }
      });
  };

  const profileSchema = yup.object({
    fullname: yup
      .string()
      .matches(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g, 'Nom complet incorrect')
      .nullable(),
    school: yup.string(),
    username: yup.string().nullable(),
    email: yup.string().nullable(),
    password: yup.string().nullable(),
    phone: yup
      .string('Tu peux renseigner ton numéro de téléphone.')
      .matches(
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
        'Numéro de téléphone incorrect'
      ),
    instaName: yup.string('Tu peux indiquer ton compte instagram'),
  });

  const passwordSchema = yup.object({
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

  const fieldsSchema =
    pageStatus === 'password' ? passwordSchema : profileSchema;

  const fieldsProps = {
    email: {
      label: 'Adresse email',
      InputProps: {
        readOnly: pageStatus !== 'email',
      },
    },
    username: {
      label: "Nom d'utilisateur",
      InputProps: {
        readOnly: true,
      },
    },
    fullname: {
      label: 'Nom complet',
    },
    phone: {
      label: 'Numéro de téléphone',
      previousComponents: <></>,
    },
    instaName: {
      label: 'Compte instagram',
    },
    school: {
      label: 'Établissement',
      selectField: true,
      options: websiteData.availableSchools,
    },
    password: {
      passwordField: true,
      label: 'Mot de passe',
      labelWidth: 110,
      InputProps: {
        readOnly: pageStatus !== 'password',
      },
      showPassword: showPassword && pageStatus === 'password',
      handleClickShowPassword: handleClickShowPassword,
      handleMouseDownPassword: handleMouseDownPassword,
    },
    passwordConf: {
      passwordField: true,
      label: 'Confirmer mot de passe',
      labelWidth: 185,
      showPassword: showPassword && pageStatus === 'password',
      handleClickShowPassword: handleClickShowPassword,
      handleMouseDownPassword: handleMouseDownPassword,
    },
  };

  const formik = useFormik({
    initialValues:
      pageStatus === 'password'
        ? { password: '', passwordConf: '' }
        : {
            fullname: '',
            school: '',
            username: '',
            email: '',
            password: match.params.what === 'password' ? '' : '123456',
            phone: '',
          },
    validationSchema: fieldsSchema,
    onSubmit: pageStatus === 'password' ? saveNewPassword : saveNewValues,
  });

  const disconnectUser = () => {
    localStorage.removeItem('accessToken');
    history.push('/');
  };

  const goToChangePassword = () => {
    formik.setFieldValue('password', '');
    history.push('/accounts/edit/password');
    setPageStatus('password');
  };

  const goToGeneralSettings = () => {
    formik.setFieldValue('password', '123456');
    setPageStatus('general');
    history.goBack();
  };

  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;

    setInterceptors();

    // Get the user's data
    axios
      .get(API_ORIGIN + '/api/user/u', {
        headers: {
          'x-access-token': localStorage.getItem('accessToken'),
        },
      })
      .then((res) => {
        for (const fieldName in res.data) {
          formik.setFieldValue(fieldName, res.data[fieldName]);
        }
        setPageStatus(match.params.what || 'general');
      })
      .catch((err) => {
        if (
          err.response &&
          (err.response.status === 403 || err.response.status === 404)
        ) {
          localStorage.removeItem('accessToken');
          history.replace('/auth/login');
        } else {
          console.log(err);
        }
      });
  }, [API_ORIGIN, history, formik, setInterceptors, match]);

  return {
    fieldsSchema,
    fieldsProps,
    formik,
    pageStatus,
    disconnectUser,
    goToChangePassword,
    goToGeneralSettings,
    setChangeSuccess,
    changeSuccess,
  };
};

export default AccountsLogic;
