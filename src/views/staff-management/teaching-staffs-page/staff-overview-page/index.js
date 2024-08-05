import { TextField, Grid, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import StaffManagement from 'components/cards/Skeleton/StaffManagement';
import StatusChangeDialog from 'components/modal/DeleteModel';
import Avatar from 'components/mui/avatar';
import TeacherFilter from 'features/staff-management/teaching-staffs/components/TeacherFilterCard';
import { selectLoading, selectTeachingStaffs } from 'features/staff-management/teaching-staffs/redux/teachingStaffSelectors';
import { getAllTeachingStaffs } from 'features/staff-management/teaching-staffs/redux/teachingStaffThunks';
import { staffStatusChange } from 'features/staff-management/teaching-staffs/services/teachingStaffServices';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useInstitute } from 'utils/get-institute-details';
import { getImageUrl } from 'utils/imageUtils';
import { profilePlaceholder } from 'utils/placeholders';

const Teaching = () => {
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState({});
  const [page,setPage] = useState(1)
  const teachingStaffs = useSelector(selectTeachingStaffs);
  const loading = useSelector(selectLoading);
  const [refetch, setRefetch] = useState({});
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      page: '1',
      branchid: selectedBranchId,
      instituteId: useInstitute().getInstituteId(),
    };
    dispatch(getAllTeachingStaffs(data));
  }, [dispatch, selectedBranchId, refetch]);

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
        is_active: !statusValue.is_active,
        staff : statusValue?.uuid
      };
      console.log(statusValue,"statusValue")
      
      const response = await staffStatusChange(data);

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
  console.log(teachingStaffs,"teachingStaffs")
  return (
    <>
      <Grid sx={{ p: 1 }}>
        <TeacherFilter selectedBranchId={selectedBranchId} />
      </Grid>

      {loading ? (
        <StaffManagement />
      ) : (
        <Grid>
          <Grid container mt={1}>
            {teachingStaffs && teachingStaffs.data?.map((item, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} justifyContent="center" px={1}>
                <Card sx={{ position: 'relative', mb: 2 }}>
                  <CardContent sx={{ pt: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <Avatar
                        src={item?.image ? getImageUrl(item?.image) : profilePlaceholder}
                        sx={{ mb: 2, width: 70, height: 70 }}
                      />
                      <Typography variant="h4" sx={{ mb: 1 }}>
                        {item.fullname}
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
                          textDecoration: 'none',
                          gap: 2
                        }}
                      >
                        <Grid>
                        <TextField
                              size="small"
                              select
                              label="Status"
                              SelectProps={{ value: item?.is_active, onChange: (e) => handleStatusValue(e, item) }} 
                              sx={{ width: 100 }}
                            >
                            <MenuItem value={true}>Active</MenuItem>
                            <MenuItem value={false}>Inactive</MenuItem>
                          </TextField>
                        </Grid>
                        <Box component={Link} to={`teaching-staffs/${item?.uuid.toString()}`} state={{ id: item?.uuid }}>
                          <Button variant="tonal" size="medium" sx={{ m: 0, px: 2 }}>
                            View Profile
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {teachingStaffs?.last_page !== 1 && (
            <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Pagination
                count={teachingStaffs?.last_page}
                page={page}
                color="primary"
                onChange={(e, page) => {
                  setPage(page)
                  dispatch(getAllTeachingStaffs({ 
                    branchid: selectedBranchId, 
                    page: page,   
                    branchid: selectedBranchId,
                    instituteId: useInstitute().getInstituteId() 
                  }));
                }}
              />
            </Grid>
          )}
        </Grid>
      )}
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

export default Teaching;
