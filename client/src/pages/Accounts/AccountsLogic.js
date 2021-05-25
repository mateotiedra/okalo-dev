import { useState, useEffect, useRef } from 'react';

import Axios from 'axios';

import { useFormik } from 'formik';
import * as yup from 'yup';

import AppConfig from '../../config/AppConfig';

const AccountsLogic = (props) => {
  const { API_ORIGIN } = AppConfig();
  const history = props.history;
  const [pageStatus, setPageStatus] = useState(
    props.match.params.what || 'general'
  );

  const hasFetchedData = useRef(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword && pageStatus === 'password');
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const saveNewValues = (values) => {
    console.log(values);
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
    phone: yup.string().min(7, 'Numéro de téléphone incorrect').nullable(),
    insta: yup.string().nullable(),
    snap: yup.string().nullable(),
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
    insta: {
      label: 'Compte instragram',
    },
    snap: {
      label: 'Compte snapchat',
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
            password: 'fgrewghfr',
            phone: '',
            insta: '',
            snap: '',
          },
    validationSchema: fieldsSchema,
    onSubmit: (values) => {
      saveNewValues(values);
    },
  });

  const generalPageData = {
    avatar: '⚙️',
    title: 'Modifier profile',
  };

  const passwordPageData = {
    avatar: '🔑',
    title: 'Nouveau mot de passe',
  };

  const pageData =
    pageStatus === 'password' ? passwordPageData : generalPageData;

  const disconnectUser = () => {
    localStorage.removeItem('accessToken');
    history.push('/');
  };

  const goToChangePassword = () => {
    formik.setFieldValue('password', '');
    history.push('/accounts/edit/password');
    setPageStatus('password');
  };

  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;

    // Get the user's data
    Axios.get(API_ORIGIN + '/api/user/u', {
      headers: {
        'x-access-token': localStorage.getItem('accessToken'),
      },
    })
      .then((res) => {
        for (const fieldName in res.data) {
          formik.setFieldValue(fieldName, res.data[fieldName]);
        }
        setPageLoaded(true);
      })
      .catch((err) => {
        localStorage.removeItem('accessToken');
        history.push('/auth/login');
      });
  }, [API_ORIGIN, history, formik]);

  return {
    fieldsSchema,
    fieldsProps,
    formik,
    pageData,
    pageLoaded,
    pageStatus,
    disconnectUser,
    goToChangePassword,
  };
};

export default AccountsLogic;
