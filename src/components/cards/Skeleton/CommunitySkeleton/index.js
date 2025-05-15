import React from 'react';
import { Grid, Box, Skeleton, useTheme } from '@mui/material';

const CommunitySkeleton = () => {
  const theme = useTheme();

  // Define custom skeleton styles
  const skeletonStyles = {
    backgroundColor: theme.palette.grey[200], // Lighter grey for better visibility
    borderRadius: '4px',
    // animation: 'wave 1.5s infinite ease-in-out', // Wave animation
    margin: '8px 0' // Adding margin for spacing
  };

  return (
    <Grid container spacing={2}>
      {/* Left Side Skeleton */}
      <Grid item xs={12} sm={4}>
        {Array.from({ length: 6 }, (_, index) => index + 1).map((cardIndex) => (
          <Box key={cardIndex} sx={{ mb: 2, p: 2, borderRadius: '8px', backgroundColor: "white" }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Skeleton variant="circular" width={45} height={45} sx={skeletonStyles} />
              <Box sx={{ ml: 1 }}>
                <Skeleton variant="text" width={110} sx={skeletonStyles} />
                <Skeleton variant="text" width={165} sx={skeletonStyles} />
              </Box>
            </Box>
          </Box>
        ))}
      </Grid>

      {/* Chat Skeleton */}
      <Grid item xs={12} sm={8}>
        <Box sx={{ mb: 2, height: '80vh', p: 2, borderRadius: '8px', backgroundColor: "white" }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Skeleton variant="circular" width={48} height={48} sx={skeletonStyles} />
            <Box sx={{ ml: 2 }}>
              <Skeleton variant="text" width={60} sx={skeletonStyles} />
            </Box>
          </Box>

          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
              <Skeleton variant="circular" width={50} height={50} sx={skeletonStyles} />
              <Box sx={{ mr: 1 }}>
                <Skeleton variant="text" width={220} height={50} sx={skeletonStyles} />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Skeleton variant="circular" width={50} height={50} sx={skeletonStyles} />
              <Box sx={{ ml: 1 }}>
                <Skeleton variant="text" width={160} height={50} sx={skeletonStyles} />
                <Skeleton variant="text" width={220} height={50} sx={skeletonStyles} />
                <Skeleton variant="text" width={200} height={50} sx={skeletonStyles} />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
              <Skeleton variant="circular" width={50} height={50} sx={skeletonStyles} />
              <Box sx={{ mr: 1 }}>
                <Skeleton variant="text" width={220} height={50} sx={skeletonStyles} />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
              <Skeleton variant="circular" width={50} height={50} sx={skeletonStyles} />
              <Box sx={{ ml: 1 }}>
                <Skeleton variant="text" width={230} height={50} sx={skeletonStyles} />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', mt: 2 }}>
              <Skeleton variant="circular" width={50} height={50} sx={skeletonStyles} />
              <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                <Skeleton variant="text" width={160} height={50} sx={skeletonStyles} />
                <Skeleton variant="text" width={220} height={50} sx={skeletonStyles} />
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 6 }}>
            <Skeleton variant="text" width="100%" height={85} sx={skeletonStyles} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CommunitySkeleton;
