import React from 'react';
import Grid from '@mui/material/Grid';
import AllNotificationHeaderCard from './AllNotificationHeaderCard';

const AllNotificationHeaderSection = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3} sm={6}>
        <AllNotificationHeaderCard title={'Total Users'} stats={55} icon={'tabler:user'} />
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <AllNotificationHeaderCard title={'Total Groups'} stats={5} avatarColor={'error'} icon={'tabler:user-plus'} />
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <AllNotificationHeaderCard title={'Active Users'} stats={5} avatarColor={'success'} icon={'tabler:user-check'} />
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <AllNotificationHeaderCard title={'Blocked Users'} stats={6} avatarColor={'warning'} icon={'tabler:user-exclamation'} />
      </Grid>
    </Grid>
  );
};

export default AllNotificationHeaderSection;
