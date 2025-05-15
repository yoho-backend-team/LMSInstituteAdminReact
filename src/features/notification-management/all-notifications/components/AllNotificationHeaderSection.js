import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import AllNotificationHeaderCard from './AllNotificationHeaderCard';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';
import { IconArrowLeft } from '@tabler/icons-react';

const AllNotificationHeaderSection = ({ allNotifications }) => {
  const navigate = useNavigate();
  return (
    <>
      <Button variant="contained" sx={{ my: 2 }} onClick={() => navigate('/notification-management/staff-notifications')}>
        <IconArrowLeft stroke={2} />
      </Button>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} sm={6}>
          <AllNotificationHeaderCard
            sx={{ boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)' }}
            title={'Total Notification'}
            stats={allNotifications?.notificationCount}
            icon={'tabler:bell'}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <AllNotificationHeaderCard
            sx={{ boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)' }}
            title={'Seen Notification'}
            stats={allNotifications?.readNotificationCount}
            avatarColor={'error'}
            icon={'tabler:bell-minus'}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <AllNotificationHeaderCard
            sx={{ boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)' }}
            title={'Unseen Notification'}
            stats={allNotifications?.unReadNotificationCount}
            avatarColor={'success'}
            icon={'tabler:bell-ringing'}
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
