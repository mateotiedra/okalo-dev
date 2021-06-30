import { CircularProgress, Box } from '@material-ui/core';
import React from 'react';

function Loading(props) {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      style={{ width: '100%', height: '100vh' }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loading;
