import Grid from '@mui/material/Grid';
import StaffNotificationHeaderCard from './StaffNotificationHeaderCard';

const StaffNotificationHeaderSection = ({ staffNotifications }) => {
  console.log(staffNotifications)
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} sm={6}>
          <StaffNotificationHeaderCard title={'Total Notification'} stats={staffNotifications?.NotificationCount} icon={'tabler:user'} />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <StaffNotificationHeaderCard title={'Seen Notification'} stats={staffNotifications?.readNotificationCount} avatarColor={'error'} icon={'tabler:user-plus'} />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <StaffNotificationHeaderCard title={'Unseen Notification'} stats={staffNotifications?.unReadNotificationCount} avatarColor={'success'} icon={'tabler:user-check'} />
        </Grid>
      </Grid>
    </>
  );
};

export default StaffNotificationHeaderSection;
