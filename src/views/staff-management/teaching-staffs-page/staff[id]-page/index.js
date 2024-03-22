import Grid from '@mui/material/Grid';
import StaffManagementView from 'components/cards/Skeleton/StaffManagementView';
import { useEffect, useState } from 'react';
import UserViewLeft from 'features/staff-management/teaching-staffs/components/StaffViewLeft';
import UserViewRight from 'features/staff-management/teaching-staffs/components/StaffViewRight';
import { TeachingStaffById } from 'features/staff-management/teaching-staffs/services/teachingStaffServices';
import { useLocation } from 'react-router';


const UserView = () => {
  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState({});
  const location = useLocation();
  const staffID = location.state.id;


  useEffect(() => {
    getStaffData(staffID);
  
  }, [staffID]);

  const getStaffData = async (staffID) => {
    setLoading(true)
    const data = { id: staffID };
    const result = await TeachingStaffById(data);
    if (result.success) {
      setStaff(result.data);
      setLoading(false)
    }
    setLoading(false)
  };
  console.log('staff:',staff);
  return (
    <>
      {loading ? (
        <StaffManagementView />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <UserViewLeft staff={staff} />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <UserViewRight staff={staff} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default UserView;
