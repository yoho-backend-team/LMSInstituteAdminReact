import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const WaveSkeleton = styled(Box)(({ reverse }) => ({
  position: 'relative',
  overflow: 'hidden',
  background: '#e0e0e0', 
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: reverse
      ? 'linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%)'
      : 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%)',
    animation: 'wave 1.5s infinite ease-in-out',
  },
  '@keyframes wave': {
    '0%': {
      transform: 'translateX(-100%)',
    },
    '100%': {
      transform: 'translateX(100%)',
    },
  },
}));

const CustomWaveSkeleton = ({ variant = 'rectangular', width, height, reverse = false, ...props }) => {
  return (
    <WaveSkeleton
      reverse={reverse}
      sx={{
        width,
        height,
        borderRadius: variant === 'circular' ? '50%' : '4px',
      }}
      {...props}
    />
  );
};

export default CustomWaveSkeleton;
