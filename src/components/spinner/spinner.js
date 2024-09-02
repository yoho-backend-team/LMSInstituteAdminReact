import React from 'react';
import { Box, CircularProgress ,Backdrop} from '@mui/material';
import LetterFillSpinner from './letterSpinner';

const Spinner = ({ show }) => {
  if (!show) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 9999,
      }}
    >
      <CircularProgress />
      <LetterFillSpinner />
    </Box>
  );
};

export default Spinner;
