// ** React Imports
import Grid from '@mui/material/Grid';
import UserSkeleton from 'components/cards/Skeleton//UserSkeleton';
import { useEffect, useState } from 'react';
// ** Components Imports
import NotificationBodySection from 'features/notification-management/student-notifications/components/NotificationBodySection';
import NotificationHeaderSection from 'features/notification-management/student-notifications/components/NotificationHeaderSection';
import { useDispatch, useSelector } from 'react-redux';

import { getAllStudentNotifications } from 'features/notification-management/student-notifications/redux/studentNotificationThunks';
import {
  selectLoading,
  selectStudentNotifications
} from 'features/notification-management/student-notifications/redux/studentNotificationSelectors';

const StudentNotification = () => {
  const dispatch = useDispatch();
  const studentNotifications = useSelector(selectStudentNotifications);
  const studentLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const [studentNotificationRefetch, setStudentNotificationRefetch] = useState(false);

  const [loading, setLoading] = useState(false);

  // Fetch course categories on component mount or when dependencies change
  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    dispatch(getAllStudentNotifications(data));
  }, [dispatch, selectedBranchId, studentNotificationRefetch, loading]);

  console.log(studentNotifications);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <NotificationHeaderSection />
        </Grid>
        {studentLoading ? (
          <UserSkeleton />
        ) : (
          <Grid item xs={12}>
            <NotificationBodySection
              setLoading={setLoading}
              setStudentNotificationRefetch={setStudentNotificationRefetch}
              selectedBranchId={selectedBranchId}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default StudentNotification;
