// ** MUI Imports
import Grid from '@mui/material/Grid';

import UserViewLeft from '../../../../features/student-management/students/components/StudentViewLeft';
import UserViewRight from '../../../../features/student-management/students/components/StudentViewRight';

const UserView = ({ tab, invoiceData }) => {
  return (
    <>
      <Grid container spacing={2}>
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
