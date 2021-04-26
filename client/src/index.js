import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './themes';
import './index.css';

ReactDOM.render(
  <>
    <link
      rel='stylesheet'
      href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
    />
    <link
      href='https://fonts.googleapis.com/css2?family=Orelega+One&display=swap'
      rel='stylesheet'
    ></link>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </>,
  document.getElementById('root')
);
