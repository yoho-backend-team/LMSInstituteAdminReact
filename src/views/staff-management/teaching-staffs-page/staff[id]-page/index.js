import Grid from '@mui/material/Grid';
import StaffManagementView from 'components/cards/Skeleton/StaffManagementView';
import { useEffect, useState } from 'react';
import UserViewLeft from 'features/staff-management/teaching-staffs/components/StaffViewLeft';
import UserViewRight from 'features/staff-management/teaching-staffs/components/StaffViewRight';
import { TeachingStaffById } from 'features/staff-management/teaching-staffs/services/teachingStaffServices';
import { useLocation } from 'react-router';

const UserView = ({ setRefetch }) => {
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
  console.log('nonteaching:', staff);
  // console.log('staffid:',staffID);
  // Handle staff deletion

  // dateFormat
  function formattedDate(inputDate) {
    // Split the input date string into day, month, and year
    const [day, month, year] = inputDate.split('/');

    // Construct a new Date object using the parsed components
    const dateObject = new Date(`${month}/${day}/${year}`);

    // Check if the dateObject is a valid date
    if (isNaN(dateObject)) {
      return 'Invalid Date';
    }

    // Format the date components into 'DD/MM/YYYY' format
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
            <UserViewRight staff={staff} staffID={staffID} formattedDate={formattedDate} setRefetch={setRefetch} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default UserView;
