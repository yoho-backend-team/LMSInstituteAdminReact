import React from 'react';
import Grid from '@mui/material/Grid';
// import UserHeaderCard from 'features/user-management/users/components/UserHeaderCard';
import StaffNotificationHeaderCard from './StaffNotificationHeaderCard';


const StaffNotificationHeaderSection = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3} sm={6}>
        <StaffNotificationHeaderCard title={'Total Users'} stats={10} icon={'tabler:user'} />
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <StaffNotificationHeaderCard title={'Total Groups'} stats={20} avatarColor={'error'} icon={'tabler:user-plus'} />
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <StaffNotificationHeaderCard title={'Active Users'} stats={30} avatarColor={'success'} icon={'tabler:user-check'} />
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <StaffNotificationHeaderCard title={'Blocked Users'} stats={55} avatarColor={'warning'} icon={'tabler:user-exclamation'} />
      </Grid>
    </Grid>
  );
};

export default StaffNotificationHeaderSection;
