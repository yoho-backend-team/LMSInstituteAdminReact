import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SuccessMessage = ({ message }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        bgcolor: '#eafaf1',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CheckCircleIcon
        sx={{
          fontSize: 60,
          color: '#4caf50',
          marginBottom: '16px',
        }}
      />
      <Typography variant="h4" sx={{ marginBottom: '8px' }}>
        Success!
      </Typography>
      <Typography variant="body1">{message}</Typography>
    </Box>
  );
};

export default SuccessMessage;
