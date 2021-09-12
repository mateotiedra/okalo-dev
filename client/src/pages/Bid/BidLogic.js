import { useState, useRef } from 'react';

import axios from 'axios';

import AppConfig from '../../config/AppConfig';
import AxiosHelper from '../../helpers/AxiosHelper';
import Helper from '../../helpers';

import { BiBookmarks } from 'react-icons/bi';
import { useTheme } from '@material-ui/core/styles';
import { ReactComponent as BiBookmarksSolid } from '../../assets/svgs/bi/solid-bookmarks.svg';

const BidLogic = ({ history, match }) => {
  const { API_ORIGIN } = AppConfig();
  const { setInterceptors, getStatusCode } = AxiosHelper(axios, history);
  const { readSince } = Helper();
  const theme = useTheme();

  const bidUuid = match.params.uuid;
  const hasFetchedData = useRef(false);

  let savedBids = JSON.parse(localStorage.getItem('savedBids'));
  const [state, setState] = useState({
    bidSaved:
      savedBids &&
      savedBids.filter((savedBid) => savedBid.uuid === bidUuid).length > 0,
  });

  const [pageStatus, setPageStatus] = useState('loading');

  const [alertOpen, setAlertOpen] = useState(false);

  const deleteReasonOptions = [
    'Le livre a été vendu',
    'Je ne souhaite plus vendre ce livre',
  ];
  const [deleteReason, setDeleteReason] = useState(' ');

  const handleDeleteReasonChange = (event) => {
    setDeleteReason(event.target.value);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  // Called when user save/unsave bid
  const toggleSave = () => {
    var savedBids = JSON.parse(localStorage.getItem('savedBids')) || [];

    if (state.bidSaved) {
      setState((s) => {
        return {
          ...s,
          bidSaved: false,
        };
      });

      savedBids.splice(savedBids.indexOf(bidUuid), 1);
    } else {
      setState((s) => {
        return {
          ...s,
          bidSaved: true,
        };
      });

      savedBids.push({
        ...state.bidData,
      });
    }
    localStorage.setItem('savedBids', JSON.stringify(savedBids));
  };

  const goBackToHome = () => {
    history.push('/');
  };

  const deleteBid = () => {
    console.log(deleteReasonOptions, deleteReason);
    if (alertOpen && deleteReasonOptions.includes(deleteReason)) {
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
          history.replace('/users/u/biddeleted');
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
        {
          variant: 'outlined',
          children: state.bidSaved ? (
            <BiBookmarksSolid size={24} fill={theme.palette.primary.main} />
          ) : (
            <BiBookmarks size={24} />
          ),
          onClick: toggleSave,
        },
      ],
    },
  }[pageStatus] || { buttons: [] };

  if (!hasFetchedData.current) {
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
        data.bid.sellerUsername = data.username;
        setState((s) => {
          return {
            ...s,
            bidData: data.bid,
            userHimself: data.bidOwner,
            seller: { username: data.username, school: data.school },
          };
        });
        setPageStatus(data.bidOwner ? 'owner' : 'user');
      })
      .catch((err) => {
        if (getStatusCode(err) === 404) {
          setPageStatus('notFound');
          if (state.bidSaved) toggleSave();
        }
      });
  }

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
    goBackToHome,
  };
};

export default BidLogic;
