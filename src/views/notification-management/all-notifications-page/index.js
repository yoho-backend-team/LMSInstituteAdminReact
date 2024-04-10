import Grid from '@mui/material/Grid';
import NotificationSkeleton from 'components/cards/Skeleton/NotificationSkeleton';
import AllNotificationAddDrawer from 'features/notification-management/all-notifications/components/AllNotificationAddDrawer';
import AllNotificationBodySection from 'features/notification-management/all-notifications/components/AllNotificationBodySection';
import AllNotificationHeaderSection from 'features/notification-management/all-notifications/components/AllNotificationHeaderSection';
import AllNotificationTableHeader from 'features/notification-management/all-notifications/components/AllNotificationTableHeader';
import { selectAllNotifications, selectLoading } from 'features/notification-management/all-notifications/redux/allNotificationSelectors';
import { getAllNotifications } from 'features/notification-management/all-notifications/redux/allNotificationThunks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AllNotification = () => {
  const dispatch = useDispatch();
  const allNotifications = useSelector(selectAllNotifications);
  const allNotificationsLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  console.log(selectedBranchId);
  const [allNotificationRefetch, setAllNotificationRefetch] = useState(false);

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    dispatch(getAllNotifications(data));
  }, [dispatch, selectedBranchId, allNotificationRefetch]);

  const [addUserOpen, setAddUserOpen] = useState(false);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AllNotificationHeaderSection allNotifications={allNotifications} />
        </Grid>
        <Grid item xs={12}>
          <AllNotificationTableHeader toggle={toggleAddUserDrawer} />
        </Grid>
        {allNotificationsLoading ? (
          <NotificationSkeleton />
        ) : (
          <Grid item xs={12}>
            <AllNotificationBodySection
              allNotifications={allNotifications?.data}
              setAllNotificationRefetch={setAllNotificationRefetch}
              selectedBranchId={selectedBranchId}
            />
          </Grid>
        )}
        <AllNotificationAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} setAllNotificationRefetch={setAllNotificationRefetch} />
      </Grid>
    </>
  );
};

export default AllNotification;
