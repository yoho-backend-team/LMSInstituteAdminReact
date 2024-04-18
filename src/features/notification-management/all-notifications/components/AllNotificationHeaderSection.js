import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import AllNotificationHeaderCard from './AllNotificationHeaderCard';

const AllNotificationHeaderSection = ({ allNotifications }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} sm={6}>
          <AllNotificationHeaderCard title={'Total Notification'} stats={allNotifications?.notificationCount} icon={'tabler:user'} />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <AllNotificationHeaderCard
            title={'Seen Notification'}
            stats={allNotifications?.readNotificationCount}
            avatarColor={'error'}
            icon={'tabler:user-plus'}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <AllNotificationHeaderCard
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
