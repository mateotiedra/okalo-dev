import { useState, useEffect, useRef } from 'react';

//import Axios from 'axios';

import { useFormik } from 'formik';
import * as yup from 'yup';

//import AppConfig from '../../config/AppConfig';

const SellLogic = (props) => {
  //const { API_ORIGIN } = AppConfig();
  const history = props.history;
  const hasFetchedData = useRef(false);
  const newBidData = useRef({
    title: '',
    author: '',
    edition: '',
    condition: '',
    annotation: '',
    price: '',
  });
  const saveNewBidData = (values) => {
    newBidData.current = {
      ...newBidData.current,
      ...values,
    };
  };

  const [procedureStep, setProcedureStep] = useState(0);

  const stepBack = () => {
    if (procedureStep === 0) {
      history.push('/');
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
        .required("N'oublies pas de donner l'édition du livre"),
    }),
    yup.object({
      condition: yup
        .string()
        .required("N'oublies pas d'indiquer l'état du livre"),
      annotation: yup
        .string()
        .required("N'oublies pas d'indiquer à quel point le livre est annoté"),
      price: yup
        .number('')
        .typeError(
          'Prix incorrect (en cas de centimes remplacer "," par un ".")'
        )
        .min(0, 'Le prix ne peut pas être négatif')
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
      label: "Maison d'édition",
    },
    condition: {
      label: 'État',
      selectField: true,
      options: ['Neuf', 'En bon état', 'Abimé', 'Très abimé'],
    },
    annotation: {
      label: 'Annotation',
      selectField: true,
      options: ['Pas annoté', 'Peu annoté', 'Annoté', 'Très annoté'],
    },
    price: {
      label: 'Prix demandé (en francs)',
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
        price: '',
      },
      validationSchema: fieldsSchema,
      onSubmit: (values) => {
        saveNewBidData(values);
        console.log(newBidData.current);
      },
    }),
  ][procedureStep];

  const pageData = [
    {
      avatar: '📚',
      title: 'Informations sur le livre',
    },
    {
      avatar: '📙',
      title: 'État du livre',
      lastStep: true,
    },
  ][procedureStep];

  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;

    if (!localStorage.getItem('accessToken')) {
      history.push('/auth/login');
    }
  });

  return { pageData, fieldsSchema, fieldsProps, formik, stepBack };
};

export default SellLogic;
