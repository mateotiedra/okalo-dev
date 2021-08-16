import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  CircularProgress,
  Link,
  Typography,
  Divider,
  Paper,
} from '@material-ui/core';
//import EmojiIcon from '../../components/EmojiIcon/EmojiIcon';

import SearchLogic from './SearchLogic';
import LoadingPage from '../../components/LoadingPage/LoadingPage';
import MobileContainer from '../../components/MobileContainer/MobileContainer';
import Navbar from '../../components/Navbar/Navbar';
import BidsCardContainer from '../../components/BidsCardContainer/BidsCardContainer';
import FieldsGroup from '../../components/FieldsGroup/FieldsGroup';

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
  searchMessage: {
    fontWeight: 'bold',
    margin: theme.spacing(6, 0, 1, 0),
    textAlign: 'center',
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

  const searchMessage = (title, body) => {
    return (
      <>
        <Typography
          component='h2'
          variant='h4'
          className={classes.searchMessage}
        >
          {title}
        </Typography>
        <Typography
          component='h3'
          variant='body1'
          style={{ textAlign: 'center' }}
        >
          {body}
        </Typography>
      </>
    );
  };

  if (pageStatus === 'loading') return <LoadingPage />;

  return (
    <>
      <Navbar hideSearchBar />
      <MobileContainer noCenter responsiveFont maxWidth='md'>
        <Paper className={classes.formContainer}>
          <FieldsGroup
            fieldsSchema={fieldsSchema}
            fieldsProps={{
              ...fieldsProps,
              searchTitle: {
                ...fieldsProps.searchTitle,
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
          searchMessage(
            'Aucun résultat',
            "Essaie de vérifier l'orthographe ou de réduire le nombre de filtres"
          )
        ) : bids.length ? (
          <BidsCardContainer bids={bids} />
        ) : (
          searchMessage(
            'Chercher un livre',
            'Tu peux trouver ton livre grâce à son titre. Pour être plus précis tu peux utiliser l\'option "Plus de filtres".'
          )
        )}
      </MobileContainer>
    </>
  );
}

export default Search;
