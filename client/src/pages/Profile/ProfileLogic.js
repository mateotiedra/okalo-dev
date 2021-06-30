import { useState, useEffect, useRef } from 'react';

import axios from 'axios';

import AppConfig from '../../config/AppConfig';
import AxiosHelper from '../../helpers/AxiosHelper';

const ProfileLogic = ({ history, match }) => {
  const { API_ORIGIN } = AppConfig();
  const { setInterceptors, getStatusCode } = AxiosHelper(axios, history);

  const profileUsername = match.params.username;

  const [displayedUserData, setDisplayedUserData] = useState();
  const [userHimself, setUserHimself] = useState(false);

  const hasFetchedData = useRef(false);
  const [pageStatus, setPageStatus] = useState('loading');

  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;

    setInterceptors();

    const getUserData = (next) => {
      axios
        .get(API_ORIGIN + '/api/user/u', {
          headers: {
            'x-access-token': localStorage.getItem('accessToken'),
          },
        })
        .then((res) => {
          console.log(res.data);
          next(res.data);
        })
        .catch((err) => {
          if (profileUsername === 'u' && getStatusCode(err) === 401)
            history.push('/auth/login');
          next(false);
        });
    };

    const getDisplayedUserData = () => {
      axios
        .get(API_ORIGIN + '/api/user/' + profileUsername)
        .then((res) => {
          setPageStatus('default');
          return { ...res.data };
        })
        .catch((err) => {
          console.log(err);
          return {};
        });
    };

    getUserData((userData) => {
      if (
        userData &&
        (profileUsername === 'u' || userData.username === profileUsername)
      ) {
        setDisplayedUserData(userData);
        setUserHimself(true);
        setPageStatus('default');
      } else setDisplayedUserData(getDisplayedUserData());
    });
  }, [API_ORIGIN, history, profileUsername, setInterceptors, getStatusCode]);

  return { displayedUserData, userHimself, pageStatus };
};

export default ProfileLogic;
