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

  const [pageStatus, setPageStatus] = useState('loading');

  const [alertOpen, setAlertOpen] = useState(false);

  const deleteReasonOptions = [
    'Le livre a été vendu',
    'Je ne souhaite plus vendre ce livre',
  ];
  const [deleteReason, setDeleteReason] = useState(deleteReasonOptions[0]);

  const handleDeleteReasonChange = (event) => {
    setDeleteReason(event.target.value);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const deleteBid = () => {
    if (alertOpen) {
      setPageStatus('loading');
      axios
        .delete(API_ORIGIN + '/api/bid', {
          headers: {
            'x-access-token': localStorage.getItem('accessToken'),
            bidid: bidUuid,
            'bid-status': ['sold', 'deleted'][
              deleteReasonOptions.indexOf(deleteReason)
            ],
          },
        })
        .then((res) => {
          history.push('/users/u/biddeleted');
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } else {
      setAlertOpen(true);
    }
  };

  const pageData = {
    owner: {
      buttons: [
        {
          children: "Supprimer l'annonce",
          onClick: deleteBid,
        },
      ],
    },
    user: {
      buttons: [
        {
          children: "Contacter l'annonceur",
          onClick: () => {
            history.push('/users/' + state.seller.username);
          },
        },
        ,
      ],
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
          seller: { username: data.username, school: data.school },
        });
        setPageStatus(data.bidOwner ? 'owner' : 'user');
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
    seller: state.seller,
    pageStatus,
    editLink: `/bids/edit/${bidUuid}`,
    pageData,
    handleCloseAlert,
    alertOpen,
    deleteReason,
    handleDeleteReasonChange,
    deleteReasonOptions,
    deleteBid,
  };
};

export default BidLogic;
