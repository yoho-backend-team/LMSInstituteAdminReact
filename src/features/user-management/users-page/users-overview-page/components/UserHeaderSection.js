import Grid from '@mui/material/Grid';
import UserHeaderCard from 'features/user-management/users-page/users-overview-page/components/UserHeaderCard';
const UserHeaderSection = ({ users, groups }) => {
  console.log(users);
  // console.log(groups);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3} sm={6}>
        <UserHeaderCard title={'Total Users'} stats={users?.length} icon={'tabler:user'} />
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <UserHeaderCard title={'Total Groups'} stats={groups?.length} avatarColor={'error'} icon={'tabler:user-plus'} />
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <UserHeaderCard title={'Active Users'} stats={users?.data?.activeUserCount} avatarColor={'success'} icon={'tabler:user-check'} />
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <UserHeaderCard title={'Blocked Users'} stats={users?.data?.inActiveUserCount} avatarColor={'warning'} icon={'tabler:user-exclamation'} />
      </Grid>
    </Grid>
  );
};

export default UserHeaderSection;
