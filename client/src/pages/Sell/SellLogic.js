import { useState, useEffect, useRef } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import axios from 'axios';

import AppConfig from '../../config/AppConfig';
import AxiosHelper from '../../helpers/AxiosHelper';
import Helper from '../../helpers';

const SellLogic = ({ history }) => {
  const { API_ORIGIN } = AppConfig();
  const { setInterceptors, getStatusCode } = AxiosHelper(axios, history);
  const { sentence, clean } = Helper();

  const hasFetchedData = useRef(false);
  const [pageStatus, setPageStatus] = useState('loading');
  const newBidData = useRef({
    title: '',
    author: '',
    edition: '',
    condition: '',
    annotation: '',
    note: '',
    price: '',
  });

  const goToBids = () => {
    history.push('/users/u');
  };

  const goToParam = () => {
    history.push('/accounts/edit');
  };

  const saveNewBidData = (values, sendData = false) => {
    newBidData.current = {
      ...newBidData.current,
      ...values,
    };

    if (sendData) {
      sendBidData(newBidData.current);
    }
  };

  const sendBidData = (values) => {
    axios
      .post(
        API_ORIGIN + '/api/bid/new',
        {
          title: clean(values.title),
          author: clean(values.author),
          edition: clean(values.edition),
          condition: sentence(values.condition),
          annotation: sentence(values.annotation),
          note: sentence(values.note),
          price: values.price,
        },
        {
          headers: {
            'x-access-token': localStorage.getItem('accessToken'),
          },
        }
      )
      .then((res) => {
        setPageStatus('success');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [procedureStep, setProcedureStep] = useState(0);

  const stepBack = () => {
    if (procedureStep === 0) {
      history.goBack();
    } else {
      setProcedureStep(procedureStep - 1);
    }
  };

  const fieldsSchema = [
    yup.object({
      title: yup.string().required("N'oublies pas de donner le titre du livre"),
      author: yup
        .string()
        .required("N'oublies pas de donner l'auteur du livre"),
      edition: yup
        .string()
        .required("N'oublies pas de donner l'??dition du livre"),
    }),
    yup.object({
      condition: yup
        .string()
        .required("N'oublies pas d'indiquer l'??tat du livre"),
      annotation: yup
        .string()
        .required("N'oublies pas d'indiquer ?? quel point le livre est annot??"),
      note: yup.string().nullable(),
      price: yup
        .number('')
        .typeError(
          'Prix incorrect (il n\'est pas n??cessaire d\'indiquer la devise et en cas de centimes remplacer "," par un ".")'
        )
        .min(0, 'Le prix ne peut pas ??tre n??gatif')
        .required("N'oublies pas de choisir un prix de vente pour ton livre"),
    }),
  ][procedureStep];

  const fieldsProps = {
    title: {
      label: 'Titre',
      autoFocus: true,
    },
    author: {
      label: 'Auteur',
    },
    edition: {
      label: "Maison d'??dition",
    },
    condition: {
      label: '??tat',
      selectField: true,
      options: ['Neuf', 'En bon ??tat', 'Abim??', 'Tr??s abim??'],
    },
    annotation: {
      label: 'Annotation',
      selectField: true,
      options: ['Pas annot??', 'Peu annot??', 'Annot??', 'Tr??s annot??'],
    },
    note: {
      label: 'Remarque',
      multiline: true,
    },
    price: {
      label: 'Prix demand?? (en francs)',
    },
  };

  const formik = [
    useFormik({
      initialValues: { title: '', author: '', edition: '' },
      validationSchema: fieldsSchema,
      onSubmit: (values) => {
        saveNewBidData(values);
        setProcedureStep(procedureStep + 1);
      },
    }),
    useFormik({
      initialValues: {
        condition: '',
        annotation: '',
        note: '',
        price: '',
      },
      validationSchema: fieldsSchema,
      onSubmit: (values) => {
        setPageStatus('loading');
        saveNewBidData(values, true);
      },
    }),
  ][procedureStep];

  const pageData = [
    {
      avatar: '????',
      title: 'Informations sur le livre',
    },
    {
      avatar: '????',
      title: '??tat du livre',
      lastStep: true,
    },
  ][procedureStep];

  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;

    setInterceptors();

    axios
      .get(API_ORIGIN + '/api/user/u', {
        headers: {
          'x-access-token': localStorage.getItem('accessToken'),
        },
      })
      .then(() => {
        setPageStatus('form');
      })
      .catch((err) => {
        history.replace('/auth/login');
      });
  }, [API_ORIGIN, history, setInterceptors, getStatusCode]);

  return {
    pageStatus,
    pageData,
    fieldsSchema,
    fieldsProps,
    formik,
    stepBack,
    goToBids,
    goToParam,
  };
};

export default SellLogic;
