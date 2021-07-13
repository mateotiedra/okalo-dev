import { useState, useEffect, useRef } from 'react';

import axios from 'axios';

import AppConfig from '../../config/AppConfig';
import AxiosHelper from '../../helpers/AxiosHelper';
import Helper from '../../helpers';

const BidLogic = ({ history, match }) => {
  const { API_ORIGIN } = AppConfig();
  const { setInterceptors, getStatusCode } = AxiosHelper(axios, history);
  const { readSince } = Helper();

  const bidUuid = match.params.uuid;
  const hasFetchedData = useRef(false);

  const [state, setState] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const [userRole, setUserRole] = useState('user');
  const [bidStatus, setBidStatus] = useState('no deal');

  const pageStatus = pageLoading ? 'loading' : userRole + ' ' + bidStatus;
  console.log(pageStatus);

  const handleCloseAlert = () => {
    setAlertData(false);
  };

  const alertsData = [
    {
      title: 'Demande envoyée',
      body: "La demande d'achat a bien été envoyé à l'annonceur. Tu seras informé dès qu'il l'aura accepté et la plateforme vous mettra en contact à ce moment là",
      buttons: [
        {
          text: 'Annuler la demande',
          action: () => {
            cancelAsk();
            handleCloseAlert();
          },
        },
        { text: 'Ok', action: handleCloseAlert },
      ],
    },
    {
      title: 'Demande annulée',
      body: "Ta demande d'achat a été annulé. L'annonceur ne verra plus que tu es intéressé par cette annonce.",
      buttons: [{ text: 'Ok', action: handleCloseAlert }],
    },
  ];

  const [alertData, setAlertData] = useState(false);

  const newAsk = () => {
    axios
      .post(
        API_ORIGIN + '/api/ask',
        {},
        {
          headers: {
            'x-access-token': localStorage.getItem('accessToken'),
            bidid: bidUuid,
          },
        }
      )
      .then(() => {
        setAlertData(alertsData[0]);
        setUserRole('asker');
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const cancelAsk = () => {
    axios
      .delete(API_ORIGIN + '/api/ask', {
        headers: {
          'x-access-token': localStorage.getItem('accessToken'),
          bidid: bidUuid,
        },
      })
      .then(() => {
        setAlertData(alertsData[1]);
        setUserRole('user');
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const cancelButton = {
    text: 'Annuler la demande',
    action: cancelAsk,
    variant: 'outlined',
  };

  const pageData = {
    'owner in deal': {
      buttons: [
        {
          text: 'Annuler le deal',
          action: () => {},
          variant: 'outlined',
        },
        {
          text: 'Livre vendu',
          action: () => {},
          variant: 'outlined',
        },
      ],
    },
    'owner no deal': {
      buttons: [
        {
          text: 'Voir les demandes',
          action: () => {
            history.push('/asks/' + bidUuid);
          },
        },
      ],
    },
    'user in deal': {
      buttons: [
        {
          text: 'Annuler le deal',
          action: () => {},
        },
        ,
      ],
    },
    'user no deal': {
      buttons: [
        {
          text: "Faire une demande d'achat",
          action: newAsk,
        },
      ],
    },
    'asker in deal': {
      buttons: [cancelButton],
    },
    'askerDealer in deal': {
      buttons: [
        {
          text: 'Annuler le deal',
          action: cancelAsk,
          variant: 'outlined',
        },
        {
          text: "Contacter l'annonceur",
          ctaFunction: () => {},
        },
      ],
    },
    'asker no deal': {
      buttons: [cancelButton],
    },
  }[pageStatus] || { buttons: [] };

  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;

    setInterceptors();

    axios
      .get(API_ORIGIN + '/api/bid/' + bidUuid, {
        headers: {
          'x-access-token': localStorage.getItem('accessToken'),
        },
      })
      .then(({ data }) => {
        data.bid.since = readSince(data.bid.createdAt, true);
        setState({
          ...state,
          bidData: data.bid,
          userHimself: data.bidOwner,
          username: data.username,
        });
        setUserRole(data.bidOwner ? 'owner' : data.bidAsker ? 'asker' : 'user');
        setBidStatus(data.bid.status);
        setPageLoading(false);
      })
      .catch((err) => {
        if (getStatusCode(err) === 404) {
          history.replace(history.location.pathname, {
            errorStatusCode: 404,
          });
        }
      });
  }, [API_ORIGIN, history, bidUuid, setInterceptors, getStatusCode, readSince]);

  return {
    bidData: state.bidData,
    userHimself: state.userHimself || false,
    username: state.username,
    pageStatus,
    editLink: `/bids/edit/${bidUuid}`,
    pageData,
    alertData,
    handleCloseAlert,
    cancelAsk,
    alertData,
  };
};

export default BidLogic;
