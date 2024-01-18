import React from 'react'
import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Box, Grid, Card, Button, Avatar, Typography } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

ProfileFollowers.propTypes = {
  followers: PropTypes.array,
};


const index = () => {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Followers
      </Typography>

      <Grid container spacing={3}>
        {followers.map((follower) => (
          <Grid key={follower.id} item xs={12} md={4}>
            <FollowerCard follower={follower} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default index