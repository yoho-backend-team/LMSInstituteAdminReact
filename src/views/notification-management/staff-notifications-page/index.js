// ** React Imports
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import UserSkeleton from 'components/cards/Skeleton//UserSkeleton';
// ** Components Imports
import StaffNotificationHeaderSection from 'features/notification-management/teaching-staff-notifications/components/StaffNotificationHeaderSection';
import StaffNotificationBodySection from 'features/notification-management/teaching-staff-notifications/components/StaffNotificationBodySection';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from 'features/user-management/users/redux/userThunks';
import { selectUsers, selectLoading as selectUserLoading } from 'features/user-management/users/redux/userSelectors';
import { getAllActiveGroups } from 'features/user-management/users/services/userServices';

const StaffNotification = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const userLoading = useSelector(selectUserLoading);

  useEffect(() => {
    getAllGroups();
  }, []);

  const getAllGroups = async () => {
    try {
      const result = await getAllActiveGroups();

      if (result.success) {
        console.log('Search results:', result.data);
        setGroups(result.data);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const [groups, setGroups] = useState([]);

  return (
    <>
      {userLoading ? (
        <UserSkeleton />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StaffNotificationHeaderSection />
          </Grid>
          <Grid item xs={12}>
            <StaffNotificationBodySection groups={groups} users={users} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default StaffNotification;
