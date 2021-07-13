import { createMuiTheme } from '@material-ui/core/styles';
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0496FF',
    },
    secondary: {
      main: '#0D3B66',
    },
    background: {
      default: '#fff',
    },
    error: {
      main: '#FB3640',
    },
    success: {
      main: '#7BC950',
    },
    warning: {
      main: '#FFC600',
    },
  },
  typography: {
    fontFamily: [
      'Ubuntu',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  shape: {
    borderRadius: 10,
  },
});
