import Axios from 'axios';
import { useHistory } from 'react-router';
import { useState } from 'react';

const ProfileLogic = () => {
  const history = useHistory();

  const getUserData = () => {
    Axios.get('http://localhost:8080/api/user/profile', {
      headers: {
        'x-access-token': localStorage.getItem('accessToken'),
      },
    })
      .then((res) => {
        console.log(res.data);
        return res.data.user;
      })
      .catch((err) => {
        console.log(err);
        history.push('/auth');
        return {};
      });
  };

  const [userData, setUserData] = useState(() => {
    const initialState = getUserData();
    return initialState;
  });

  return { userData, setUserData };
};

export default ProfileLogic;
