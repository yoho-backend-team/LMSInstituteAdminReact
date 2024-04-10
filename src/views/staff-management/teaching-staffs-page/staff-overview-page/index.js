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
import TeacherFilter from 'features/staff-management/teaching-staffs/components/TeacherFilterCard';
import { selectLoading, selectTeachingStaffs } from 'features/staff-management/teaching-staffs/redux/teachingStaffSelectors';
import { getAllTeachingStaffs } from 'features/staff-management/teaching-staffs/redux/teachingStaffThunks';
import { staffStatusChange } from 'features/staff-management/teaching-staffs/services/teachingStaffServices';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Teaching = () => {
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('');
  const teachingStaffs = useSelector(selectTeachingStaffs);
  const loading = useSelector(selectLoading);
  const [refetch, setRefetch] = useState({});
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      type: 'teaching',
      branch_id: selectedBranchId
    };
    dispatch(getAllTeachingStaffs(data));
  }, [dispatch, selectedBranchId, refetch]);

  const handleStatusChangeApi = async () => {
    const data = {
      status: statusValue?.is_active === '1' ? '0' : '1',
      id: statusValue.id
    };
    const response = await staffStatusChange(data);
    if (response.success) {
      toast.success(response.message);
      setRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };

  const handleStatusValue = (event, staff) => {
    setStatusChangeDialogOpen(true);
    setStatusValue(staff);
  };

  return (
    <>
      <Grid sx={{ p: 1 }}>
        <TeacherFilter selectedBranchId={selectedBranchId} />
      </Grid>

      {loading ? (
        <StaffManagement />
      ) : (
        <Grid>
          <Grid container>
            {teachingStaffs &&
              teachingStaffs?.map((item, i) => (
                <Grid key={i} item xs={12} sm={6} md={4} justifyContent="center" px={1}>
                  <Card sx={{ position: 'relative', mb: 2 }}>
                    <CardContent sx={{ pt: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Avatar
                          src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${item?.staff?.image}`}
                          sx={{ mb: 2, width: 70, height: 70 }}
                        />
                        <Typography variant="h4" sx={{ mb: 1 }}>
                          {item.staff?.staff_name}
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 4 }}>
                          {item?.staff?.email}
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
                              defaultValue={item.staff?.is_active}
                              label={item?.staff?.is_active == '1' ? 'Active' : 'Inactive'}
                              SelectProps={{ onChange: (e) => handleStatusValue(e, item?.staff) }}
                              sx={{ width: 100 }}
                            >
                              <MenuItem value="1">Active</MenuItem>
                              <MenuItem value="0">Inactive</MenuItem>
                            </TextField>
                          </Grid>
                          <Box component={Link} to={`teaching-staffs/${item?.staff?.id?.toString()}`} state={{ id: item?.staff?.id }}>
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
          <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination count={10} color="primary" />
          </Grid>
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
