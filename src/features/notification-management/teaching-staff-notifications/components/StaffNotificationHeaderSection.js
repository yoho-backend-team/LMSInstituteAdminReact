import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import StaffNotificationHeaderCard from './StaffNotificationHeaderCard';

const StaffNotificationHeaderSection = ({ staffNotifications }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} sm={6}>
          <StaffNotificationHeaderCard sx={{ boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }} title={'Total Notification'} stats={staffNotifications?.NotificationCount} icon={'tabler:user'} />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <StaffNotificationHeaderCard
            sx={{ boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }}
            title={'Seen Notification'}
            stats={staffNotifications?.readNotificationCount}
            avatarColor={'error'}
            icon={'tabler:user-plus'}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <StaffNotificationHeaderCard
            sx={{ boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }}
            title={'Unseen Notification'}
            stats={staffNotifications?.unReadNotificationCount}
            avatarColor={'success'}
            icon={'tabler:user-check'}
          />
        </Grid>
      </Grid>
    </>
  );
};

StaffNotificationHeaderSection.propTypes = {
  staffNotifications: PropTypes.any
};

export default StaffNotificationHeaderSection;
