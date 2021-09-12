import { useState, useEffect, useRef } from 'react';

import axios from 'axios';

import AppConfig from '../../config/AppConfig';
import AxiosHelper from '../../helpers/AxiosHelper';

const SavedLogic = ({ history, match }) => {
  const { API_ORIGIN } = AppConfig();
  const { setInterceptors, getStatusCode } = AxiosHelper(axios, history);

  const hasFetchedData = useRef(false);
  const [pageStatus, setPageStatus] = useState('loading');

  const [savedBids, setSavedBids] = useState([]);

  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;

    setInterceptors();

    // const getProfileData = (username) => {
    //   axios
    //     .get(API_ORIGIN + '/api/user/' + username)
    //     .then(({ data }) => {
    //       const user = data;
    //       const date = user.createdAt.split('-');
    //       const dateSince = 'Membre depuis ' + Months[date[1]] + ' ' + date[0];
    //       setProfileData({ ...user, userSince: dateSince });
    //       setPageStatus(urlPageStatus || 'bids');
    //     })
    //     .catch((err) => {
    //       if (getStatusCode(err) === 404) {
    //         history.replace(history.location.pathname, {
    //           errorStatusCode: 404,
    //         });
    //       }
    //     });
    // };
    setSavedBids(JSON.parse(localStorage.getItem('savedBids')) || []);
    setPageStatus('active');
  }, [API_ORIGIN, history, setInterceptors, getStatusCode, pageStatus]);

  return {
    pageStatus,
    savedBids,
  };
};

export default SavedLogic;
