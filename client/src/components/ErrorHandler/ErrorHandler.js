import Page500 from '../../pages/errors/ServerError';
import LoadingPage from '../../components/LoadingPage/LoadingPage';

import React from 'react';
import { useLocation } from 'react-router-dom';

// The top level component that will wrap our app's core features
const ErrorHandler = ({ children }) => {
  const location = useLocation();

  const errorStatusCode = location.state ? location.state.errorStatusCode : 200;
  const loadingPage = location.state ? location.state.loading : false;

  if (loadingPage) return <LoadingPage />;

  switch (errorStatusCode) {
    case 500:
      return <Page500 />;

    default:
      return children;
  }
};

// A custom hook to quickly read the context's value. It's
// only here to allow quick imports
export default ErrorHandler;
