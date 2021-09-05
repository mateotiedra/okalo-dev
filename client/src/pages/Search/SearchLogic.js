import { useState, useRef } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import axios from 'axios';

import websiteData from '../../assets/data/website.json';

import AppConfig from '../../config/AppConfig';
import AxiosHelper from '../../helpers/AxiosHelper';
import Helper from '../../helpers';

const SearchLogic = ({ history }) => {
  const { normalize } = Helper();
  const { API_ORIGIN } = AppConfig();
  const { setInterceptors, getStatusCode } = AxiosHelper(axios, history);

  const [pageStatus, setPageStatus] = useState('loading');
  const [bids, setBids] = useState([]);
  const [displayFilters, setDisplayFilters] = useState(false);

  const toggleFilters = () => {
    setDisplayFilters(!displayFilters);
  };

  const hasFetchedData = useRef(false);

  const search = (query) => {
    if (pageStatus !== 'loading') setPageStatus('loadingBooks');
    const { searchTitle, searchAuthor, searchEdition, searchSchool } = query;
    history.replace(history.location.pathname, { ...query });
    // if (
    //   !searchTitle.length &&
    //   !searchAuthor.length &&
    //   !searchEdition.length &&
    //   !searchSchool.length
    // ) {
    //   setBids([]);
    //   setPageStatus('active');
    //   return;
    // }

    axios
      .get(API_ORIGIN + '/api/bid/search', {
        params: {
          searchTitle: searchTitle && normalize(searchTitle).replace('-', ' '),
          searchAuthor:
            searchAuthor && normalize(searchAuthor).replace('-', ' '),
          searchEdition,
          searchSchool,
        },
      })
      .then(({ data }) => {
        setBids(data);
      })
      .catch((err) => {
        if (getStatusCode(err) === 404) {
          setBids('notfound');
        }
      })
      .finally(() => {
        setPageStatus('active');
      });
  };

  const fieldsSchema = yup.object({
    searchTitle: yup.string(),
    searchAuthor: yup.string(),
    searchEdition: yup.string(),
    searchSchool: yup.string(),
  });

  const moreFiltersStyle = {
    display: displayFilters ? 'block' : 'none',
  };

  const fieldsProps = {
    searchTitle: {
      label: 'Titre',
      style: { marginTop: 0 },
    },
    searchAuthor: {
      label: 'Auteur',
      style: moreFiltersStyle,
    },
    searchEdition: {
      label: 'Edition',
      style: moreFiltersStyle,
    },
    searchSchool: {
      label: 'Lieu de vente',
      selectField: true,
      options: websiteData.availableSchools,
    },
  };

  const formik = useFormik({
    initialValues: {
      searchTitle:
        (history.location.state && history.location.state.searchTitle) || '',
      searchAuthor:
        (history.location.state && history.location.state.searchAuthor) || '',
      searchEdition:
        (history.location.state && history.location.state.searchEdition) || '',
      searchSchool:
        (history.location.state && history.location.state.searchSchool) || '',
    },
    validationSchema: fieldsSchema,
    onSubmit: search,
  });

  const getUserData = (accessToken) => {
    axios
      .get(API_ORIGIN + '/api/user/u', {
        headers: {
          'x-access-token': accessToken,
        },
      })
      .then(({ data }) => {
        const user = data;
        formik.setFieldValue('searchSchool', user.school);
        firstQuery(user.school);
      })
      .catch((err) => {})
      .finally((data) => {
        setPageStatus('loadingBooks');
      });
  };

  const firstQuery = (searchSchoolQuery) => {
    const locationSearchQuery =
      history.location.state && history.location.state.searchTitle;

    if (locationSearchQuery) {
      formik.setFieldValue('searchTitle', locationSearchQuery);
      search({
        searchTitle: locationSearchQuery,
        searchSchool: searchSchoolQuery,
      });
    } else {
      history.replace(history.location.pathname, {
        searchTitle: null,
        searchAuthor: null,
        searchEdition: null,
      });
      search({});
    }
  };

  if (!hasFetchedData.current) {
    hasFetchedData.current = true;

    setInterceptors();

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) getUserData(accessToken);
    else {
      firstQuery();
      setPageStatus('loadingBooks');
    }
  }

  return {
    fieldsSchema,
    fieldsProps,
    formik,
    pageStatus,
    bids,
    toggleFilters,
    displayFilters,
  };
};

export default SearchLogic;
