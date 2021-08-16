import React from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import FieldsGroup from '../../FieldsGroup/FieldsGroup';

const SearchBar = ({ history, className, variant }) => {
  const search = (values) => {
    history.push({
      pathname: '/search',
      state: {
        searchTitle: values.searchQuery,
      },
    });
  };

  const fieldsSchema = yup.object({
    searchQuery: yup.string(),
  });

  const fieldsProps = {
    searchQuery: {
      label: 'Chercher un livre',
      searchField: true,
      labelWidth: 125,
    },
  };

  const formik = useFormik({
    initialValues: {
      searchQuery: '',
    },
    validationSchema: fieldsSchema,
    onSubmit: search,
  });

  return (
    <FieldsGroup
      fieldsSchema={fieldsSchema}
      fieldsProps={{
        ...fieldsProps,
      }}
      formik={formik}
      fieldsVariant={variant || 'standard'}
      className={className}
      noSpace
    />
  );
};

export default SearchBar;
