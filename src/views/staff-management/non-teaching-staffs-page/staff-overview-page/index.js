import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import StaffManagement from 'components/cards/Skeleton/StaffManagement';
import StatusChangeDialog from 'components/modal/DeleteModel';
import Avatar from 'components/mui/avatar';
import { selectNonTeachingStaffs } from 'features/staff-management/non-teaching-staffs/redux/nonTeachingStaffSelectors';
import { getAllNonTeachingStaffs } from 'features/staff-management/non-teaching-staffs/redux/nontTeachingStaffThunks';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TeacherFilter from 'features/staff-management/non-teaching-staffs/components/TeacherFilterCard';
import { useInstitute } from 'utils/get-institute-details';
import { nonteachstaffStatusChange } from 'features/staff-management/non-teaching-staffs/services/nonTeachingStaffServices';
import axios from 'axios';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);
    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const NonTeaching = () => {
  const [loading, setLoading] = useState(true);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState({});
  const [refetch, setRefetch] = useState(false);
  const nonTeachingStaffs = useSelector(selectNonTeachingStaffs);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      branchid: selectedBranchId,
      instituteId: useInstitute().getInstituteId(),
      page: '1'
    };


    dispatch(getAllNonTeachingStaffs(data));
  }, [dispatch, selectedBranchId, refetch]);

  useTimeout(() => {
    setLoading(false);
  }, 1000);

  const handleStatusValue = (event, staff) => {
    setStatusValue(staff);
    setStatusChangeDialogOpen(true);
  };

  const handleStatusChangeApi = async () => {
    try {

      if (!statusValue || !statusValue.uuid) {
        console.error('Status value or UUID is undefined');
        return;
      }

      const data = {
        is_active: statusValue.is_active === true ? false : true,
      };


      const response = await nonteachstaffStatusChange(statusValue.uuid, data);

      if (response.success) {
        toast.success(response.message);
        setRefetch((state) => !state); 
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Error in status change:', error);
    }
  };

  return (
    <>
      <TeacherFilter selectedBranchId={selectedBranchId} />
      {loading ? (
        <StaffManagement />
      ) : (
        <Grid>
          <Grid container spacing={2} mt={2}>
            {nonTeachingStaffs?.data?.map((item, i) => {
              console.log("Item:", item); // Debug log
              return (
                <Grid key={i} item xs={12} sm={6} md={4} justifyContent="center" px={1} mb={2}>
                  <Card sx={{ position: 'relative' }}>
                    <CardContent sx={{ pt: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Avatar
                          src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${item?.staff?.image}`}
                          sx={{ mb: 2, width: 70, height: 70 }}
                        />
                        <Typography variant="h4" sx={{ mb: 1 }}>
                          {item.username}
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 4 }}>
                          {item?.email}
                        </Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            textDecoration: 'none'
                          }}
                        >
                          <Grid>
                            <TextField
                              size="small"
                              select
                              label="Status"
                              SelectProps={{ value: item?.is_active, onChange: (e) => handleStatusValue(e, item) }} // Pass the whole item here
                              sx={{ width: 100 }}
                            >
                              <MenuItem value={true}>Active</MenuItem>
                              <MenuItem value={false}>Inactive</MenuItem>
                            </TextField>
                          </Grid>
                          <Box component={Link} to={`non-teaching-staffs/${item?.uuid.toString()}`} state={{ id: item?.uuid }}>
                            <Button size="medium" variant="tonal" sx={{ m: 0, px: 2 }}>
                              View Profile
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          {nonTeachingStaffs?.last_page !== 1 && (
            <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Pagination
                count={nonTeachingStaffs?.last_page}
                color="primary"
                onChange={(e, page) => {
                  dispatch(getAllNonTeachingStaffs({ branchid: selectedBranchId, page: page }));
                }}
              />
            </Grid>
          )}
        </Grid>
      )}
      {/* Status Change Modal */}
      <StatusChangeDialog
        open={statusChangeDialogOpen}
        setOpen={setStatusChangeDialogOpen}
        description="Are you sure you want to Change the Status"
        title="Status"
        handleSubmit={handleStatusChangeApi}
      />
    </>
  );
};

export default NonTeaching;
