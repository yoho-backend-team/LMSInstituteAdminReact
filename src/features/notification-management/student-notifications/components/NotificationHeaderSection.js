import React from 'react';
import Grid from '@mui/material/Grid';
// import UserHeaderCard from 'features/user-management/users/components/UserHeaderCard';
import NotificationHeaderCard from './NotificationHeaderCard';
const NotificationHeaderSection = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3} sm={6}>
        <NotificationHeaderCard title={'Total Users'} stats={0} icon={'tabler:user'} />
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <NotificationHeaderCard title={'Total Groups'} stats={0} avatarColor={'error'} icon={'tabler:user-plus'} />
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <NotificationHeaderCard title={'Active Users'} stats={0} avatarColor={'success'} icon={'tabler:user-check'} />
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <NotificationHeaderCard title={'Blocked Users'} stats={1} avatarColor={'warning'} icon={'tabler:user-exclamation'} />
      </Grid>
    </Grid>
  );
};

export default NotificationHeaderSection;
