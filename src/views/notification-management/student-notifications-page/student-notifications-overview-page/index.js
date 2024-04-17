import Grid from '@mui/material/Grid';
import NotificationSkeleton from 'components/cards/Skeleton/NotificationSkeleton';
import NotificationAddDrawer from 'features/notification-management/student-notifications/components/NotificationAddDrawer';
import NotificationBodySection from 'features/notification-management/student-notifications/components/NotificationBodySection';
import NotificationHeaderSection from 'features/notification-management/student-notifications/components/NotificationHeaderSection';
import NotificationTableHeader from 'features/notification-management/student-notifications/components/NotificationTableHeader';
import {
  selectLoading,
  selectStudentNotifications
} from 'features/notification-management/student-notifications/redux/studentNotificationSelectors';
import { getAllStudentNotifications } from 'features/notification-management/student-notifications/redux/studentNotificationThunks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const StudentNotification = () => {
  const dispatch = useDispatch();
  const studentNotifications = useSelector(selectStudentNotifications);
  const studentLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const [studentNotificationRefetch, setStudentNotificationRefetch] = useState(false);

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
              studentNotifications={studentNotifications?.data}
              setStudentNotificationRefetch={setStudentNotificationRefetch}
              selectedBranchId={selectedBranchId}
            />
          </Grid>
        )}
        {/* Add Drawer */}
        <NotificationAddDrawer
          open={addUserOpen}
          toggle={toggleAddUserDrawer}
          setStudentNotificationRefetch={setStudentNotificationRefetch}
        />
      </Grid>
    </>
  );
};

export default StudentNotification;
