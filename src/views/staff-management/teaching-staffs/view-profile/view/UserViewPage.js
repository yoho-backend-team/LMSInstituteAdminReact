// ** MUI Imports
import Grid from '@mui/material/Grid';

// ** Demo Components Imports
// import UserViewLeft from 'src/views/apps/user/view/UserViewLeft'
// import UserViewRight from 'src/views/apps/user/view/UserViewRight'
import UserViewLeft from './UserViewLeft';
import UserViewRight from './UserViewRight';

const UserView = ({ tab, invoiceData }) => {
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} md={12} lg={12}>
          <UserViewLeft />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <UserViewRight tab={tab} invoiceData={invoiceData} />
        </Grid>
      </Grid>
    </>
  );
};

export default UserView;
