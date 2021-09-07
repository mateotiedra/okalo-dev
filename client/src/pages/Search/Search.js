import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress, Link, Paper } from '@material-ui/core';
//import EmojiIcon from '../../components/EmojiIcon/EmojiIcon';

import SearchLogic from './SearchLogic';
import LoadingPage from '../../components/LoadingPage/LoadingPage';
import MobileContainer from '../../components/MobileContainer/MobileContainer';
import Navbar from '../../components/Navbar/Navbar';
import BidsCardContainer from '../../components/BidsCardContainer/BidsCardContainer';
import FieldsGroup from '../../components/FieldsGroup/FieldsGroup';
import ResultMessage from '../../components/pageParts/ResultMessage/ResultMessage';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    padding: theme.spacing(2),
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loadingAnim: {
    margin: theme.spacing(6, 2, 2, 2),
  },
  formLink: {
    alignSelf: 'flex-end',
  },
}));

function Search(props) {
  const classes = useStyles();
  const {
    pageStatus,
    bids,
    fieldsSchema,
    fieldsProps,
    formik,
    toggleFilters,
    displayFilters,
  } = SearchLogic(props);

  const filtersLink = (
    <Link
      variant='body2'
      type='button'
      component={'button'}
      onClick={toggleFilters}
      className={classes.formLink}
    >
      {displayFilters ? '- Moins de filtres' : '+ Plus de filtres'}
    </Link>
  );

  if (pageStatus === 'loading') return <LoadingPage />;

  return (
    <>
      <Navbar hideSearchBar />
      <MobileContainer
        arrowTopPosition={'64px'}
        noCenter
        responsiveFont
        maxWidth='md'
        noGoBackArrow
      >
        <Paper className={classes.formContainer}>
          <FieldsGroup
            fieldsSchema={fieldsSchema}
            fieldsProps={{
              ...fieldsProps,
              searchSchool: {
                ...fieldsProps.searchSchool,

                nextComponents: !displayFilters && filtersLink,
              },
            }}
            formik={formik}
            className={classes.form}
            fieldsVariant='standard'
          >
            {displayFilters && filtersLink}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Chercher
            </Button>
          </FieldsGroup>
        </Paper>
        {pageStatus === 'loadingBooks' ? (
          <CircularProgress className={classes.loadingAnim} />
        ) : bids === 'notfound' ? (
          <ResultMessage
            title='Aucun résultat'
            body="Essaie de vérifier l'orthographe ou de réduire le nombre de filtres"
          />
        ) : bids.length ? (
          <BidsCardContainer bids={bids} displayUsers />
        ) : (
          <ResultMessage
            title='Chercher un livre'
            body={
              'Tu peux trouver ton livre grâce à son titre. Pour être plus précis tu peux utiliser l\'option "Plus de filtres".'
            }
          />
        )}
      </MobileContainer>
    </>
  );
}

export default Search;
