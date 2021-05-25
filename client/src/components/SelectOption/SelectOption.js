import { useEffect } from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';

export default function PasswordField(props) {
  useEffect(() => {});
  var selectName = '';
  if (props.label) {
    selectName = props.label.toLowerCase();
  }

  return (
    <FormControl
      variant={props.variant}
      className={props.className}
      fullWidth={props.fullWidth}
      margin={props.margin}
      backgroundColor='transparent'
      size={props.size}
      key={props.key}
    >
      <InputLabel htmlFor='outlined-age-native-simple'>
        {props.label}
      </InputLabel>
      <Select
        native
        value={props.value}
        label={props.label}
        onChange={props.onChange}
        inputProps={{
          name: selectName,
          id: props.variant + '-' + selectName + '-native-simple',
        }}
      >
        <option aria-label='None' value='' />
        {props.children}
      </Select>
    </FormControl>
  );
}
