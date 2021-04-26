import { createMuiTheme } from '@material-ui/core/styles';
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#247ba0',
    },
    secondary: {
      main: '#f25f5c',
    },
    background: {
      //default: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Segoe UI Emoji',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  shape: {
    borderRadius: 20,
  },
});
