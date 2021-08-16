import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';

import PasswordField from '../PasswordField/PasswordField';
import SearchField from '../SearchField/SearchField';
import SelectOption from '../SelectOption/SelectOption';

const useStyles = makeStyles((theme) => ({
  root: {},

  hasPreviousComponents: {
    marginTop: 0,
  },
  noSpace: {
    '& *': {
      margin: 0,
    },
  },
}));

export default function FieldsGroup(props) {
  const classes = useStyles();
  const fieldsProps = props.fieldsProps || false;
  const formik = props.formik || false;
  if (!formik || !fieldsProps) return <></>;

  const displayField = (fieldRef, index) => {
    const field = {
      ...props.fieldsSchema.fields[fieldRef],
      props: {
        ...fieldsProps[fieldRef],
        fullWidth: true,
        variant: props.fieldsVariant || 'outlined',
        margin: 'normal',
        name: fieldRef,
        id: fieldRef,
        key: fieldRef + '-' + index,
        required:
          props.fieldsSchema.fields[fieldRef].spec.presence === 'required',
        value: formik.values[fieldRef],
        error: formik.touched[fieldRef] && Boolean(formik.errors[fieldRef]),
        helperText: formik.touched[fieldRef] && formik.errors[fieldRef],
        onChange: formik.handleChange,
        className:
          fieldsProps[fieldRef].previousComponents &&
          classes.hasPreviousComponents,
      },
    };

    if (field.props.selectField && field.props.options) {
      return (
        <SelectOption
          {...field.props}
          keyName={field.props.key}
          onChange={(event) => {
            formik.setFieldValue(fieldRef, event.target.value);
          }}
        >
          {field.props.options.map((option) => {
            return <option value={option}>{option}</option>;
          })}
        </SelectOption>
      );
    }
    if (field.props.passwordField) {
      return <PasswordField {...field.props} keyName={field.props.key} />;
    }
    if (field.props.searchField) {
      return (
        <SearchField
          {...field.props}
          keyName={field.props.key}
          handleSubmit={formik.handleSubmit}
        />
      );
    }

    return <TextField {...field.props} />;
  };

  const displayPreviousComponents = (fieldRef) => {
    return fieldsProps[fieldRef].previousComponents;
  };

  const displayNextComponents = (fieldRef) => {
    return fieldsProps[fieldRef].nextComponents;
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      className={`${classes.root} ${props.className} ${
        props.noSpace ? classes.noSpace : ''
      }`}
    >
      {props.fieldsSchema._nodes
        .map((fieldRef, index) => {
          return (
            <React.Fragment key={fieldRef + '-' + index}>
              {displayPreviousComponents(fieldRef)}
              {displayField(fieldRef, index)}
              {displayNextComponents(fieldRef)}
            </React.Fragment>
          );
        })
        .reverse()}

      {props.children}
    </form>
  );
}
