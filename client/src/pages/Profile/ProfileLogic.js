import Axios from 'axios';
import { useState, useEffect, useRef } from 'react';

import AppConfig from '../../config/AppConfig';

const ProfileLogic = (props) => {
  const { API_ORIGIN } = AppConfig();
  const history = props.history;
  const profileUsername = props.match.params.username;

  const [displayedUserData, setDisplayedUserData] = useState();
  const [userHimself, setUserHimself] = useState(false);

  const hasFetchedData = useRef(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;

    const getUserData = (next) => {
      Axios.get(API_ORIGIN + '/api/user/u', {
        headers: {
          'x-access-token': localStorage.getItem('accessToken'),
        },
      })
        .then((res) => {
          console.log(res.data);
          next(res.data);
        })
        .catch((err) => {
          console.log(err);
          if (profileUsername === 'u') history.push('/auth/login');
          next(false);
        });
    };

    const getDisplayedUserData = () => {
      Axios.get(+'/api/user/' + profileUsername)
        .then((res) => {
          setPageLoaded(true);
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
        history.push('/users/' + userData.username);
        setDisplayedUserData(userData);
        setUserHimself(true);
        setPageLoaded(true);
      } else setDisplayedUserData(getDisplayedUserData());
    });
  }, [API_ORIGIN, history, profileUsername]);

  return { displayedUserData, userHimself, pageLoaded };
};

export default ProfileLogic;
