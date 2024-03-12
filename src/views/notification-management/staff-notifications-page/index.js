// ** React Imports
import Grid from '@mui/material/Grid';
import UserSkeleton from 'components/cards/Skeleton//UserSkeleton';
import { useEffect, useState } from 'react';

// ** Components Imports
import StaffNotificationBodySection from 'features/notification-management/teaching-staff-notifications/components/StaffNotificationBodySection';
import StaffNotificationHeaderSection from 'features/notification-management/teaching-staff-notifications/components/StaffNotificationHeaderSection';
import { useDispatch, useSelector } from 'react-redux';

import { getAllStaffNotifications } from 'features/notification-management/teaching-staff-notifications/redux/staffNotificationThunks';

import {
  selectLoading,
  selectStaffNotifications
} from 'features/notification-management/teaching-staff-notifications/redux/staffNotificationSelectors';

const StaffNotification = () => {
  const dispatch = useDispatch();
  const staffNotifications = useSelector(selectStaffNotifications);

  const staffLoading = useSelector(selectLoading);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const [staffNotificationRefetch, setStaffNotificationRefetch] = useState(false);

  // Fetch course categories on component mount or when dependencies change
  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    dispatch(getAllStaffNotifications(data));
  }, [dispatch, selectedBranchId, staffNotificationRefetch]);

  console.log(staffNotifications);
  console.log(setStaffNotificationRefetch);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StaffNotificationHeaderSection />
        </Grid>
        {staffLoading ? (
          <UserSkeleton />
        ) : (
          <Grid item xs={12}>
            <StaffNotificationBodySection
              staffNotifications={staffNotifications}
              // setLoading={setLoading}
              setStaffNotificationRefetch={setStaffNotificationRefetch}
              selectedBranchId={selectedBranchId}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default StaffNotification;
