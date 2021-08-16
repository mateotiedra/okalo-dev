import { useState, useEffect, useRef } from 'react';

import axios from 'axios';

import AppConfig from '../../config/AppConfig';
import AxiosHelper from '../../helpers/AxiosHelper';

const Months = {
  '01': 'janvier',
  '02': 'février',
  '03': 'mars',
  '04': 'avril',
  '05': 'mai',
  '06': 'juin',
  '07': 'juillet',
  '08': 'août',
  '09': 'septembre',
  10: 'octobre',
  11: 'novembre',
  12: 'décembre',
};

const ProfileLogic = ({ history, match }) => {
  const { API_ORIGIN } = AppConfig();
  const { setInterceptors, getStatusCode } = AxiosHelper(axios, history);

  const profileUsername = useRef(match.params.username || 'u');
  const urlPageStatus = match.params.pageStatus;

  const [profileData, setProfileData] = useState();
  const [userHimself, setUserHimself] = useState(false);

  const hasFetchedData = useRef(false);
  const [pageStatus, setPageStatus] = useState('loading');

  const smsHref = profileData ? 'sms://' + profileData.phone : '';
  const emailHref = profileData ? 'mailto://' + profileData.email : '';
  const goToBids = () => {
    setPageStatus('bids');
  };

  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;

    setInterceptors();

    const getUserData = () => {
      axios
        .get(API_ORIGIN + '/api/user/u', {
          headers: {
            'x-access-token': localStorage.getItem('accessToken'),
          },
        })
        .then(({ data }) => {
          const user = data;
          if (
            user.username === profileUsername.current ||
            profileUsername.current === 'u'
          ) {
            history.replace('/users/' + user.username);
            setUserHimself(true);
            profileUsername.current = user.username;
          }
        })
        .catch((err) => {
          if (profileUsername.current === 'u') history.replace('/auth/login');
        })
        .finally(() => {
          getProfileData(profileUsername.current);
        });
    };

    const getProfileData = (username) => {
      axios
        .get(API_ORIGIN + '/api/user/' + username)
        .then(({ data }) => {
          const user = data;
          const date = user.createdAt.split('-');
          const dateSince = 'Membre depuis ' + Months[date[1]] + ' ' + date[0];
          setProfileData({ ...user, userSince: dateSince });
          console.log(user);
          setPageStatus(urlPageStatus || 'bids');
        })
        .catch((err) => {
          if (getStatusCode(err) === 404) {
            history.replace(history.location.pathname, {
              errorStatusCode: 404,
            });
          }
        });
    };

    // Starts here
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken || profileUsername.current === 'u') getUserData();
    else getProfileData();
  }, [
    API_ORIGIN,
    history,
    profileUsername,
    setInterceptors,
    getStatusCode,
    urlPageStatus,
  ]);

  return { profileData, userHimself, pageStatus, goToBids, smsHref, emailHref };
};

export default ProfileLogic;
