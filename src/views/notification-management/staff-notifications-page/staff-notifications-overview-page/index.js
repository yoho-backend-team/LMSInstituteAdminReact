import { Pagination } from '@mui/material';
import Grid from '@mui/material/Grid';
import NotificationSkeleton from 'components/cards/Skeleton/NotificationSkeleton';
import StaffNotificationAddDrawer from 'features/notification-management/teaching-staff-notifications/components/StaffNotificationAddDrawer';
import StaffNotificationBodySection from 'features/notification-management/teaching-staff-notifications/components/StaffNotificationBodySection';
import StaffNotificationHeaderSection from 'features/notification-management/teaching-staff-notifications/components/StaffNotificationHeaderSection';
import StaffNotificationTableHeader from 'features/notification-management/teaching-staff-notifications/components/StaffNotificationTableHeader';
import {
  selectLoading,
  selectStaffNotifications
} from 'features/notification-management/teaching-staff-notifications/redux/staffNotificationSelectors';
import { getAllStaffNotifications } from 'features/notification-management/teaching-staff-notifications/redux/staffNotificationThunks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useInstitute } from 'utils/get-institute-details';
import { useNavigate } from 'react-router';

const StaffNotification = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const staffNotifications = useSelector(selectStaffNotifications);

  const staffLoading = useSelector(selectLoading);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const [staffNotificationRefetch, setStaffNotificationRefetch] = useState(false);

  useEffect(() => {
    const data = {
      institute : useInstitute().getInstituteId(),
      branch: selectedBranchId,
      page: '1'
    };
    dispatch(getAllStaffNotifications(data));
  }, [dispatch, selectedBranchId, staffNotificationRefetch]);

  const [addUserOpen, setAddUserOpen] = useState(false);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);
 
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StaffNotificationHeaderSection staffNotifications={staffNotifications?.data} />
        </Grid>
        <Grid item xs={12}>
          <StaffNotificationTableHeader toggle={toggleAddUserDrawer} />
        </Grid>
        <Grid item xs={12}>
          <Card
           sx={{ boxShadow: "0 .25rem .875rem 0 rgba(38,43,67,.16)"}}
          >
            {staffLoading ? (
              <NotificationSkeleton />
            ) : (
              <StaffNotificationBodySection
                staffNotifications={staffNotifications?.data}
                setStaffNotificationRefetch={setStaffNotificationRefetch}
                selectedBranchId={selectedBranchId}
              />
            )}
            {staffNotifications?.last_page !== 1 && (
              <CardContent>
                <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Pagination
                    count={staffNotifications?.last_page}
                    color="primary"
                    onChange={(e, page) => {
                      dispatch(getAllStaffNotifications({ branch: selectedBranchId, page: page,institute : useInstitute().getInstituteId() }));
                    }}
                  />
                </Grid>
              </CardContent>
            )}
          </Card>
        </Grid>
        <StaffNotificationAddDrawer
          open={addUserOpen}
          toggle={toggleAddUserDrawer}
          setStaffNotificationRefetch={setStaffNotificationRefetch}
        />
      </Grid>
    </>
  );
};

export default StaffNotification;
