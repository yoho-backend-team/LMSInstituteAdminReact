import Grid from '@mui/material/Grid';
import StaffManagementView from 'components/cards/Skeleton/StaffManagementView';
import { useEffect, useState } from 'react';
import UserViewLeft from '../../../../features/staff-management/teaching-staffs/components/StaffViewLeft';
import UserViewRight from '../../../../features/staff-management/teaching-staffs/components/StaffViewRight';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);
    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};
const UserView = ({ tab, invoiceData }) => {
  const [loading, setLoading] = useState(true);

  useTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <>
      {loading ? (
        <StaffManagementView />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <UserViewLeft />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <UserViewRight tab={tab} invoiceData={invoiceData} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default UserView;
