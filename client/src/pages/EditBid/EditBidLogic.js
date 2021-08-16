import { useState, useEffect, useRef } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import axios from 'axios';

import AppConfig from '../../config/AppConfig';
import AxiosHelper from '../../helpers/AxiosHelper';

const EditBidLogic = ({ history, match }) => {
  const { API_ORIGIN } = AppConfig();
  const { setInterceptors, getStatusCode } = AxiosHelper(axios, history);

  const [pageStatus, setPageStatus] = useState('loading');

  const hasFetchedData = useRef(false);
  const bidUuid = match.params.uuid;

  const [changeSuccess, setChangeSuccess] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const goToBids = () => {
    history.push('/users/u');
  };

  const deleteBid = () => {
    if (openDelete) {
      setPageStatus('loading');
      console.log(bidUuid);
      axios
        .delete(API_ORIGIN + '/api/bid', {
          headers: {
            'x-access-token': localStorage.getItem('accessToken'),
            bidid: bidUuid,
          },
        })
        .then((res) => {
          history.push('/users/u/biddeleted');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setOpenDelete(true);
    }
  };

  const saveNewValues = (values) => {
    axios
      .post(
        API_ORIGIN + '/api/bid/update',
        {
          title: values.title,
          author: values.author,
          edition: values.edition,
          condition: values.condition,
          annotation: values.annotation,
          note: values.note,
          price: values.price,
        },
        {
          headers: {
            'x-access-token': localStorage.getItem('accessToken'),
            bidid: bidUuid,
          },
        }
      )
      .then((res) => {
        setChangeSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fieldsSchema = yup.object({
    title: yup.string().required("N'oublies pas de donner le titre du livre"),
    author: yup.string().required("N'oublies pas de donner l'auteur du livre"),
    edition: yup
      .string()
      .required("N'oublies pas de donner l'édition du livre"),
    condition: yup
      .string()
      .required("N'oublies pas d'indiquer l'état du livre"),
    annotation: yup
      .string()
      .required("N'oublies pas d'indiquer à quel point le livre est annoté"),
    note: yup.string().nullable(),
    price: yup
      .number('')
      .typeError(
        'Prix incorrect (il n\'est pas nécessaire d\'indiquer la devise et en cas de centimes remplacer "," par un ".")'
      )
      .min(0, 'Le prix ne peut pas être négatif')
      .required("N'oublies pas de choisir un prix de vente pour ton livre"),
  });

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
    note: {
      label: 'Remarque',
      multiline: true,
      options: ['Pas annoté', 'Peu annoté', 'Annoté', 'Très annoté'],
    },
    price: {
      label: 'Prix demandé (en francs)',
    },
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      edition: '',
      condition: '',
      annotation: '',
      note: '',
      price: '',
    },
    validationSchema: fieldsSchema,
    onSubmit: saveNewValues,
  });

  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;

    setInterceptors();

    // Get the user's data
    axios
      .get(API_ORIGIN + '/api/bid/' + bidUuid, {
        headers: {
          'x-access-token': localStorage.getItem('accessToken'),
        },
      })
      .then(({ data }) => {
        if (!data.bidOwner)
          history.replace(history.location.pathname, {
            errorStatusCode: 401,
          });

        console.log(data);
        for (const fieldName in data.bid) {
          formik.setFieldValue(fieldName, data.bid[fieldName]);
        }
        setPageStatus('active');
      })
      .catch((err) => {
        if (getStatusCode(err) === 404) {
          history.replace(history.location.pathname, {
            errorStatusCode: 404,
          });
        }
      });
  }, [API_ORIGIN, history, formik, setInterceptors, bidUuid, getStatusCode]);

  return {
    fieldsSchema,
    fieldsProps,
    formik,
    pageStatus,
    setChangeSuccess,
    changeSuccess,
    deleteBid,

    handleCloseDelete,
    openDelete,
    goToBids,
  };
};

export default EditBidLogic;
