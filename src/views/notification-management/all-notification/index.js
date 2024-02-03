// ** React Imports
import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';

import UserSkeleton from 'components/cards/Skeleton//UserSkeleton';

// ** Components Imports

import AllNotificationHeaderSection from 'features/notification-management/all-notifications/components/AllNotificationHeaderSection';
import AllNotificationBodySection from 'features/notification-management/all-notifications/components/AllNotificationBodySection';

import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from 'features/user-management/users/redux/userThunks';
import { selectUsers, selectLoading as selectUserLoading } from 'features/user-management/users/redux/userSelectors';
import { getAllActiveGroups } from 'features/user-management/users/services/userServices';

const AllNotification = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const userLoading = useSelector(selectUserLoading);

  useEffect(() => {
    getAllGroups();
  }, []);

  const getAllGroups = async () => {
    try {
      // Set loading to true while fetching data
      const result = await getAllActiveGroups();

      if (result.success) {
        console.log('Search results:', result.data);
        // Update the Redux state using the setGroups action
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
            <AllNotificationHeaderSection />
          </Grid>
          <Grid item xs={12}>
            <AllNotificationBodySection groups={groups} users={users} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default AllNotification;
