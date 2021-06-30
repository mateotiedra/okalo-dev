import React from 'react';
import { Box, Typography } from '@material-ui/core';
import BlobAvatar from '../../../BlobAvatar/BlobAvatar';

const FormHeader = ({ className, icon, title }) => {
  const avatarIcon = icon
    ? React.cloneElement(icon, {
        size: 45,
        color: 'white',
      })
    : undefined;

  return (
    <Box
      className={className}
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <BlobAvatar>{avatarIcon}</BlobAvatar>
      <Typography component='h1' variant='h5'>
        {title}
      </Typography>
    </Box>
  );
};

export default FormHeader;
