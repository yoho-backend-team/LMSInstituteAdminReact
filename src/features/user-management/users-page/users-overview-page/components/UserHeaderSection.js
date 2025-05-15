import Grid from '@mui/material/Grid';
import CardStatsHorizontal from 'components/cards/components/card-stats-horizontal';
import UserHeaderCard from 'features/user-management/users-page/users-overview-page/components/UserHeaderCard';
import PropTypes from 'prop-types';

const UserHeaderSection = ({ users, groups }) => {

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3} sm={6}>
        <UserHeaderCard title={'Total Users'} stats={users?.count ?? 0} icon={'tabler:user'} sx={{ minHeight: "102px", boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }} />
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <UserHeaderCard title={'Total Groups'} stats={groups?.count ?? 0} avatarColor={'error'} icon={'tabler:user-plus'} sx={{ minHeight: "102px", boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }} />
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <UserHeaderCard title={'Active Users'} stats={users?.activeUserCount ?? 0} avatarColor={'success'} icon={'tabler:user-check'} sx={{ minHeight: "102px", boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }} />
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <UserHeaderCard title={'Blocked Users'} stats={users?.inActiveUserCount ?? 0} avatarColor={'warning'} icon={'tabler:user-exclamation'} sx={{ minHeight: "102px", boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }} />
      </Grid>
    </Grid>
  );
};

UserHeaderSection.propTypes = {
  users: PropTypes.any,
  groups: PropTypes.any
};

export default UserHeaderSection;
