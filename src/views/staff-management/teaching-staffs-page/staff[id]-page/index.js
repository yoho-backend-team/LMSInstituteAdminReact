import Grid from '@mui/material/Grid';
import StaffManagementView from 'components/cards/Skeleton/StaffManagementView';
import UserViewLeft from 'features/staff-management/teaching-staffs/components/StaffViewLeft';
import UserViewRight from 'features/staff-management/teaching-staffs/components/StaffViewRight';
import { TeachingStaffById } from 'features/staff-management/teaching-staffs/services/teachingStaffServices';
import { useEffect, useState } from 'react';
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
    setLoading(true);
    const data = { id: staffID };
    const result = await TeachingStaffById(data);
    if (result.success) {
      setStaff(result.data);
      setLoading(false);
    }
    setLoading(false);
  };

  function formattedDate(inputDate) {
    const [day, month, year] = inputDate.split('/');

    const dateObject = new Date(`${month}/${day}/${year}`);

    if (isNaN(dateObject)) {
      return 'Invalid Date';
    }

    const formattedDay = String(dateObject.getDate()).padStart(2, '0');
    const formattedMonth = String(dateObject.getMonth() + 1).padStart(2, '0');
    const formattedYear = dateObject.getFullYear();

    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
  }

  return (
    <>
      {loading ? (
        <StaffManagementView />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <UserViewLeft staff={staff} formattedDate={formattedDate} />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <UserViewRight staff={staff} staffID={staffID} formattedDate={formattedDate} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default UserView;
