import React from 'react';
import { TextField } from '@material-ui/core';

import PasswordField from '../PasswordField/PasswordField';
import SelectOption from '../SelectOption/SelectOption';

export default function Navbar(props) {
  const displayField = (field) => {
    if (!field.displayed) return <></>;
    if (field.selectOption) {
      return (
        <SelectOption
          variant='outlined'
          fullWidth
          margin='normal'
          label='Collège'
          name={field.name}
          id={field.id}
          error={field.error}
        >
          {field.options.map((option, index) => {
            return <option value={index}>{option}</option>;
          })}
        </SelectOption>
      );
    }
    if (field.passwordField) {
      return (
        <PasswordField
          fullWidth
          variant='outlined'
          margin='normal'
          {...field}
        />
      );
    }
    return (
      <TextField
        variant='outlined'
        margin='normal'
        fullWidth
        key={field.name}
        {...field}
      />
    );
  };

  return <>{props.fieldsObj.map((field) => displayField(field))}</>;
}
