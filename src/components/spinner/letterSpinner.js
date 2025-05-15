import React from 'react';
import { Box, keyframes } from '@mui/material';

const fillAnimation = keyframes`
  0% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
`;

const LetterFillSpinner = () => {
  return (
    <Box sx={styles.loadingSpinner}>
      <Box sx={{ ...styles.letter, ...styles.yo, animationDelay: '0s' }}>Y</Box>
      <Box sx={{ ...styles.letter, ...styles.yo, animationDelay: '0.5s' }}>O</Box>
      <Box sx={{ ...styles.letter, ...styles.ho, animationDelay: '1s' }}>H</Box>
      <Box sx={{ ...styles.letter, ...styles.ho, animationDelay: '1.5s' }}>O</Box>
    </Box>
  );
};

const styles = {
  loadingSpinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '100px',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
  },
  letter: {
    position: 'relative',
    color: 'transparent',
    WebkitTextStroke: '2px',
    background: 'linear-gradient(0deg, transparent 0%, currentColor 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    animation: `${fillAnimation} 3s ease-in-out infinite`,
    backgroundSize: '100% 200%',
  },
  yo: {
    WebkitTextStrokeColor: '#0CCE7F',
    color: '#0CCE7F',
  },
  ho: {
    WebkitTextStrokeColor: '#040407',
    color: '#040407',
  },
};

export default LetterFillSpinner;
