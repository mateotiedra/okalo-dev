import { useEffect } from 'react';
import {
  OutlinedInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default function PasswordField(props) {
  return (
    <FormControl
      variant='outlined'
      fullWidth={props.fullWidth}
      margin={props.margin}
      required
      size={props.size}
      error={props.error}
    >
      <InputLabel htmlFor={'outlined-adornment' + props.name}>
        {props.label}
      </InputLabel>
      <OutlinedInput
        id={'outlined-adornment' + props.name}
        type={props.showPassword ? 'text' : 'password'}
        value={props.password}
        onChange={props.onChange}
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
      <FormHelperText id={props.name + '-helper-text'}>
        {props.helperText}
      </FormHelperText>
    </FormControl>
  );
}
