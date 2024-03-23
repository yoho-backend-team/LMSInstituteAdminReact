// ** React Imports
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
// ** Components Imports
import NotificationBodySection from 'features/notification-management/student-notifications/components/NotificationBodySection';
import NotificationHeaderSection from 'features/notification-management/student-notifications/components/NotificationHeaderSection';
import { useDispatch, useSelector } from 'react-redux';
import NotificationSkeleton from 'components/cards/Skeleton/NotificationSkeleton';
import { getAllStudentNotifications } from 'features/notification-management/student-notifications/redux/studentNotificationThunks';
import {
  selectLoading,
  selectStudentNotifications
} from 'features/notification-management/student-notifications/redux/studentNotificationSelectors';
import NotificationTableHeader from 'features/notification-management/student-notifications/components/NotificationTableHeader';
import NotificationAddDrawer from 'features/notification-management/student-notifications/components/NotificationAddDrawer';

const StudentNotification = () => {
  const dispatch = useDispatch();
  const studentNotifications = useSelector(selectStudentNotifications);
  const studentLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const [studentNotificationRefetch, setStudentNotificationRefetch] = useState(false);

  // Fetch course categories on component mount or when dependencies change
  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    dispatch(getAllStudentNotifications(data));
  }, [dispatch, selectedBranchId, studentNotificationRefetch]);

  const [addUserOpen, setAddUserOpen] = useState(false);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <NotificationHeaderSection studentNotifications={studentNotifications} />
        </Grid>
        <Grid item xs={12}>
          <NotificationTableHeader studentNotifications={studentNotifications} toggle={toggleAddUserDrawer} />
        </Grid>
        {studentLoading ? (
          <NotificationSkeleton />
        ) : (
          <Grid item xs={12}>
            <NotificationBodySection
              studentNotifications={studentNotifications}
              // setLoading={setLoading}
              setStudentNotificationRefetch={setStudentNotificationRefetch}
              selectedBranchId={selectedBranchId}
            />
          </Grid>
        )}
        <NotificationAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
      </Grid>
    </>
  );
};

export default StudentNotification;
