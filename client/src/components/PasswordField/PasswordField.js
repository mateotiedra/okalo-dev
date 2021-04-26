import { useEffect } from 'react';
import {
  OutlinedInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default function PasswordField(props) {
  useEffect(() => {});

  return (
    <FormControl
      variant='outlined'
      fullWidth={props.fullWidth}
      margin={props.margin}
      required
      size={props.size}
    >
      <InputLabel htmlFor='outlined-adornment-password'>
        {props.label}
      </InputLabel>
      <OutlinedInput
        id='outlined-adornment-password'
        type={props.showPassword ? 'text' : 'password'}
        value={props.password}
        onChange={props.handleChange}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={props.handleClickShowPassword}
              onMouseDown={props.handleMouseDownPassword}
              edge='end'
            >
              {props.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={props.labelWidth}
      />
    </FormControl>
  );
}
