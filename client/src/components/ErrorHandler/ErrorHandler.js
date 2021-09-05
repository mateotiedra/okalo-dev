import Page500 from '../../pages/errors/ServerError';
import Page404 from '../../pages/errors/NotFoundError';
import Page401 from '../../pages/errors/UnauthorizedError';
import LoadingPage from '../../components/LoadingPage/LoadingPage';

import React from 'react';
import { useLocation } from 'react-router-dom';

// The top level component that will wrap our app's core features
const ErrorHandler = ({ children }) => {
  const location = useLocation();

  const errorStatusCode = location.state ? location.state.errorStatusCode : 200;
  const loadingPage = location.state ? location.state.loading : false;

  if (loadingPage) return <LoadingPage />;

  if (errorStatusCode > 500) return <Page500 />;

  switch (errorStatusCode) {
    case 404:
      return <Page404 />;

    case 401:
      return <Page401 />;

    default:
      return children;
  }
};

// A custom hook to quickly read the context's value. It's
// only here to allow quick imports
export default ErrorHandler;
