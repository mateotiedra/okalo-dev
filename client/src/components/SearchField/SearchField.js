import {
  Input,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  FormHelperText,
  OutlinedInput,
} from '@material-ui/core';
import { BiSearch } from 'react-icons/bi';

export default function SearchField(props) {
  const inputProps = {
    id: props.name,
    type: 'text',
    value: props.value,
    onChange: props.onChange,
    ...props.InputProps,
    endAdornment: (
      <InputAdornment position='end'>
        {!props.noButton && (
          <IconButton
            aria-label='toggle search'
            onClick={props.handleSubmit}
            edge='end'
          >
            <BiSearch />
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
