require('dotenv').config();

const AppConfig = () => {
  const API_ORIGIN = process.env.REACT_APP_API_ORIGIN;

  return { API_ORIGIN: API_ORIGIN };
};

export default AppConfig;
