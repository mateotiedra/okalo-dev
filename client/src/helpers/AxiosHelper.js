const AxiosConfig = (axios, history) => {
  const setInterceptors = () => {
    axios.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data

        return response;
      },
      function (err) {

        if (!err.response || err.response.status >= 500) {
          history.replace(history.location.pathname, {
            errorStatusCode: 500,
          });
        } else {
          return Promise.reject(err);
        }
      }
    );
  };

  const errorCodeEquals = (err, statusCode) => {
    return (
      err &&
      err.response &&
      err.response.status &&
      err.response.status === statusCode
    );
  };

  const getStatusCode = (err) => {
    if (err && err.response && err.response.status) return err.response.status;
    return NaN;
  };

  return { setInterceptors, errorCodeEquals, getStatusCode };
};

export default AxiosConfig;
