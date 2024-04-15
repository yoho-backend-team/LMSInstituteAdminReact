import Grid from '@mui/material/Grid';
import UserHeaderCard from 'features/user-management/users-page/users-overview-page/components/UserHeaderCard';
import PropTypes from 'prop-types';

const UserHeaderSection = ({ users, groups }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3} sm={6}>
        <UserHeaderCard title={'Total Users'} stats={users?.users?.length} icon={'tabler:user'} />
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <UserHeaderCard title={'Total Groups'} stats={groups?.length} avatarColor={'error'} icon={'tabler:user-plus'} />
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <UserHeaderCard title={'Active Users'} stats={users?.activeUserCount} avatarColor={'success'} icon={'tabler:user-check'} />
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <UserHeaderCard title={'Blocked Users'} stats={users?.inActiveUserCount} avatarColor={'warning'} icon={'tabler:user-exclamation'} />
      </Grid>
    </Grid>
  );
};

UserHeaderSection.propTypes = {
  users: PropTypes.any,
  groups: PropTypes.any
};

export default UserHeaderSection;
