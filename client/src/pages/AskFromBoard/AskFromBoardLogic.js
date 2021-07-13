import { useState, useEffect, useRef } from 'react';

import axios from 'axios';

import AppConfig from '../../config/AppConfig';
import AxiosHelper from '../../helpers/AxiosHelper';

const AskFromBoardLogic = ({ history, match }) => {
  const { API_ORIGIN } = AppConfig();
  const { setInterceptors, getStatusCode } = AxiosHelper(axios, history);

  const askFilter = useRef(match.params.askFilter);

  const [asksData, setAsksData] = useState();

  const hasFetchedData = useRef(false);
  const [pageStatus, setPageStatus] = useState('loading');

  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;

    setInterceptors();

    const accessToken = localStorage.getItem('accessToken');

    axios
      .get(API_ORIGIN + '/api/ask', {
        headers: {
          'x-access-token': accessToken,
          bidid: askFilter,
        },
      })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {});
  }, [API_ORIGIN, history, setInterceptors, getStatusCode]);

  return { asksData, pageStatus };
};

export default AskFromBoardLogic;
