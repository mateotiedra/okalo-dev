// eslint-disable-next-line
import React from 'react';
import { BiCog, BiTrash } from 'react-icons/bi';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  Link,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import EditBidLogic from './EditBidLogic';

import MobileContainer from '../../components/MobileContainer/MobileContainer';
import FieldsGroup from '../../components/FieldsGroup/FieldsGroup';
import LoadingPage from '../../components/LoadingPage/LoadingPage';
import AlertPage from '../../components/AlertPage/AlertPage';
import FormHeader from '../../components/pageParts/FormHeader/BlobAvatar/FormHeader';

const useStyles = makeStyles((theme) => ({
  sectionContainer: {
    margin: theme.spacing(2, 0, 3),
  },
  sectionTitle: {
    color: 'grey',
    fontWeight: 'bold',
  },
  sectionBody: {
    color: 'grey',
  },
  submit: {
    margin: theme.spacing(1, 0, 3),
  },
  submitChange: {
    margin: theme.spacing(3, 0, 2),
  },
  changeLink: {
    alignSelf: 'flex-end',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
}));

function EditBid(props) {
  const classes = useStyles();
  const {
    fieldsSchema,
    fieldsProps,
    formik,
    pageStatus,
    setChangeSuccess,
    changeSuccess,
    deleteBid,
    handleCloseDelete,
    openDelete,
  } = EditBidLogic(props);

  const successAlert = (
    <Collapse in={changeSuccess}>
      <Alert>Changements sauvegardés !</Alert>
    </Collapse>
  );

  const saveButton = (
    <Button
      type='submit'
      fullWidth
      variant='contained'
      color='primary'
      className={classes.submitChange}
      onBlur={() => {
        setChangeSuccess(false);
      }}
    >
      Enregistrer
    </Button>
  );

  if (pageStatus === 'loading') return <LoadingPage />;

  return (
    <MobileContainer>
      <FormHeader icon={<BiCog />} title="Modifier l'annonce" />
      <FieldsGroup
        fieldsSchema={fieldsSchema}
        fieldsProps={{
          ...fieldsProps,
        }}
        formik={formik}
        fieldsVariant='standard'
        className={classes.form}
      >
        {successAlert}
        {saveButton}
      </FieldsGroup>
      <Grid container>
        <Grid item xs>
          <Link
            variant='body2'
            type='button'
            component={'button'}
            onClick={deleteBid}
          >
            Supprimer l'annonce
          </Link>
        </Grid>
      </Grid>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby='delete-bid'
        aria-describedby='delete-bid'
      >
        <DialogTitle id='delete-bid'>{"Supprimer l'annonce ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='delete-bid'>
            Les autres utilisateurs ainsi que toi même ne pourront plus voir
            cette annonce. Elle sera définitevement supprimée.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color='primary'>
            Annuler
          </Button>
          <Button
            onClick={() => {
              handleCloseDelete();
              deleteBid();
            }}
            color='primary'
            autoFocus
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </MobileContainer>
  );
}

export default EditBid;
