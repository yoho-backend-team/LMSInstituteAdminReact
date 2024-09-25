// CustomWaveSkeleton.js
import React from 'react';
import './customSkelton.css';

const CustomWaveSkeleton = ({ variant, width, height, reverse = false, ...props }) => {
  return (
    <div
      className={`custom-wave-skeleton ${reverse ? 'reverse-wave' : ''}`}
      style={{ width, height }}
      {...props}
    />
  );
};

export default CustomWaveSkeleton;
