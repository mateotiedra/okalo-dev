import {
  Input,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  FormHelperText,
  OutlinedInput,
} from '@material-ui/core';
import { BiShow, BiHide } from 'react-icons/bi';

export default function PasswordField(props) {
  const inputProps = {
    id: props.name,
    type: props.showPassword ? 'text' : 'password',
    value: props.value,
    onChange: props.onChange,
    ...props.InputProps,
    endAdornment: (
      <InputAdornment position='end'>
        {props.variant === 'outlined' && (
          <IconButton
            aria-label='toggle password visibility'
            onClick={props.handleClickShowPassword}
            onMouseDown={props.handleMouseDownPassword}
            edge='end'
          >
            {props.showPassword ? <BiShow /> : <BiHide />}
          </IconButton>
        )}
      </InputAdornment>
    ),
  };

  return (
    <FormControl
      variant={props.variant || 'outlined'}
      fullWidth={props.fullWidth}
      margin={props.margin}
      required={props.required}
      size={props.size}
      error={props.error}
      key={props.keyName}
    >
      <InputLabel htmlFor={'outlined-adornment' + props.name}>
        {props.label}
      </InputLabel>
      {props.variant === 'outlined' ? (
        <OutlinedInput {...inputProps} labelWidth={props.labelWidth} />
      ) : (
        <Input {...inputProps} />
      )}
      <FormHelperText id={props.name + '-helper-text'}>
        {props.helperText}
      </FormHelperText>
    </FormControl>
  );
}
