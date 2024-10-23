import React from 'react';
import { Box, Typography } from '@mui/material';

const HoverButton = () => {
  return (
    <Box
      component="a"
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        '&:hover .wrap, &:hover .text:before': {
          width: '100%', // The width will expand on hover
        },
      }}
    >
      <Box
        className="wrap"
        sx={{
          position: 'relative',
          display: 'inline-block',
          padding: '5px 20px',
          cursor: 'pointer',
          '&:before': {
            content: '""',
            width: '0%', // Initial width of background
            height: '100%',
            position: 'absolute',
            background: '#2980b9', // Background color on hover
            right: 0,
            top: 0,
            transition: 'width 0.6s ease', // Smooth transition of background width
          },
        }}
      >
        <Typography
          className="text"
          data-text="Effect"
          sx={{
            position: 'relative',
            color: '#34495e', // Initial text color
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '24px',
            fontWeight: '900',
            textTransform: 'uppercase',
            '&:before': {
              content: 'attr(data-text)', // Duplicate text for the hover effect
              position: 'absolute',
              color: '#fff', // Text color during the transition
              width: '0', // Initially hidden
              overflow: 'hidden',
              transition: 'width 0.6s ease', // Smooth transition for text
            },
          }}
        >
          Effect
        </Typography>
      </Box>
    </Box>
  );
};

export default HoverButton;
