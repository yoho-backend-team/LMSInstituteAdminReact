import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import NotificationHeaderCard from './NotificationHeaderCard';

const NotificationHeaderSection = ({ studentNotifications }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} sm={6}>
          <NotificationHeaderCard title={'Total Notification'} stats={studentNotifications?.NotificationCount} icon={'tabler:user'} />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <NotificationHeaderCard
            title={'Seen Notification'}
            stats={studentNotifications?.readNotificationCount}
            avatarColor={'error'}
            icon={'tabler:user-plus'}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <NotificationHeaderCard
            title={'Unseen Notification'}
            stats={studentNotifications?.unReadNotificationCount}
            avatarColor={'success'}
            icon={'tabler:user-check'}
          />
        </Grid>
      </Grid>
    </>
  );
};

NotificationHeaderSection.propTypes = {
  studentNotifications: PropTypes.any
};

export default NotificationHeaderSection;
