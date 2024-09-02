import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import AllNotificationHeaderCard from './AllNotificationHeaderCard';

const AllNotificationHeaderSection = ({ allNotifications }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} sm={6}>
          <AllNotificationHeaderCard sx={{ boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }} title={'Total Notification'} stats={allNotifications?.notificationCount} icon={'tabler:user'} />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <AllNotificationHeaderCard
            sx={{ boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }}
            title={'Seen Notification'}
            stats={allNotifications?.readNotificationCount}
            avatarColor={'error'}
            icon={'tabler:user-plus'}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <AllNotificationHeaderCard
            sx={{ boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }}
            title={'Unseen Notification'}
            stats={allNotifications?.unReadNotificationCount}
            avatarColor={'success'}
            icon={'tabler:user-check'}
          />
        </Grid>
      </Grid>
    </>
  );
};

AllNotificationHeaderSection.propTypes = {
  allNotifications: PropTypes.any
};

export default AllNotificationHeaderSection;
