import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';

import PasswordField from '../PasswordField/PasswordField';
import SelectOption from '../SelectOption/SelectOption';

const useStyles = makeStyles((theme) => ({
  hasPreviousComponents: {
    marginTop: 0,
  },
}));

export default function FieldsGroup(props) {
  const classes = useStyles();
  const fieldsProps = props.fieldsProps || false;
  const formik = props.formik || false;
  if (!formik || !fieldsProps) return <></>;

  const displayField = (fieldRef) => {
    const field = {
      ...props.fieldsSchema.fields[fieldRef],
      props: {
        ...fieldsProps[fieldRef],
        fullWidth: true,
        variant: props.fieldsVariant || 'outlined',
        margin: 'normal',
        name: fieldRef,
        id: fieldRef,
        key: fieldRef,
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
          onChange={(event) => {
            formik.setFieldValue('school', event.target.value);
          }}
        >
          {field.props.options.map((option, index) => {
            return <option value={option}>{option}</option>;
          })}
        </SelectOption>
      );
    }
    if (field.props.passwordField) {
      return <PasswordField {...field.props} />;
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
    <form onSubmit={formik.handleSubmit} noValidate className={props.className}>
      {props.fieldsSchema._nodes
        .map((fieldRef) => {
          return (
            <>
              {displayPreviousComponents(fieldRef)}
              {displayField(fieldRef)}
              {displayNextComponents(fieldRef)}
            </>
          );
        })
        .reverse()}
      {props.children}
    </form>
  );
}
