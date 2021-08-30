import { useState, useRef } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import axios from 'axios';

import websiteData from '../../assets/data/website.json';

import AppConfig from '../../config/AppConfig';
import AxiosHelper from '../../helpers/AxiosHelper';

const SearchLogic = ({ history }) => {
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
    setPageStatus('loadingBooks');
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
    console.log(searchAuthor);
    axios
      .get(API_ORIGIN + '/api/bid/search', {
        params: {
          searchTitle: searchTitle && searchTitle.replace('-', ' ').trim(),
          searchAuthor: searchAuthor && searchAuthor.replace('-', ' ').trim(),
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
      style: moreFiltersStyle,
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

  if (!hasFetchedData.current) {
    hasFetchedData.current = true;

    setInterceptors();

    const locationSearchQuery =
      history.location.state && history.location.state.searchTitle;

    if (locationSearchQuery) {
      formik.setFieldValue('searchTitle', locationSearchQuery);
      search({ searchTitle: locationSearchQuery });
    } else {
      history.replace(history.location.pathname, {
        searchTitle: null,
        searchAuthor: null,
        searchEdition: null,
      });
      search({});
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
