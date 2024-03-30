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
// import DeleteDialog from 'components/modal/DeleteModel';
import Avatar from 'components/mui/avatar';
import StatusChangeDialog from 'components/modal/DeleteModel';

import { selectNonTeachingStaffs } from 'features/staff-management/non-teaching-staffs/redux/nonTeachingStaffSelectors';

import { getAllNonTeachingStaffs } from 'features/staff-management/non-teaching-staffs/redux/nontTeachingStaffThunks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TeacherFilter from '../../../../features/staff-management/non-teaching-staffs/components/TeacherFilterCard';
import { staffStatusChange } from 'features/staff-management/teaching-staffs/services/teachingStaffServices';
import toast from 'react-hot-toast';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);
    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const NonTeaching = () => {
  const [loading, setLoading] = useState(true);
  // const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('');
const [refetch,setRefetch]=useState('')
  const nonTeachingStaffs = useSelector(selectNonTeachingStaffs);


  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const dispatch = useDispatch();
  // const StaffId = nonTeachingStaffs?.staff?.id;
  // console.log('testIDStaff:', StaffId);
  useEffect(() => {
    const data = {
      type: 'non_teaching',
      branch_id: selectedBranchId
    };

    dispatch(getAllNonTeachingStaffs(data));
  }, [dispatch, selectedBranchId,refetch]);
  useTimeout(() => {
    setLoading(false);
  }, 1000);

  // const handleStatusChange = () => {
  //   setDeleteDialogOpen(true);
  // };
  const handleStatusChangeApi = async () => {
    console.log('entered', statusValue);
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

  console.log('Non-Teaching-Staff :', nonTeachingStaffs);
  return (
    <>
      <TeacherFilter selectedBranchId={selectedBranchId} />
      {loading ? (
        <StaffManagement />
      ) : (
        <Grid>
          <Grid container xs={12} mt={2}>
            {nonTeachingStaffs?.map((item, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} justifyContent="center" px={1} mb={2}>
                <Card sx={{ position: 'relative' }}>
                  <CardContent sx={{ pt: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <Avatar src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${item?.staff?.image}`} sx={{ mb: 2, width: 70, height: 70 }} />
                      <Typography variant="h4" sx={{ mb: 1 }}>
                        {item.staff?.staff_name}
                      </Typography>
                      <Typography variant="h5" sx={{ mb: 4 }}>
                        {item?.staff.email}
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
                            SelectProps={{ value: item?.staff?.is_active, onChange: (e) => handleStatusValue(e,item.staff) }}
                            sx={{ width: 100 }}
                          >
                            <MenuItem value="1">Active</MenuItem>
                            <MenuItem value="0">Inactive</MenuItem>
                          </TextField>
                        </Grid>
                        <Box component={Link} to={`non-teaching-staffs/${item?.staff?.id.toString()}`} state={{ id: item?.staff?.id }}>
                          <Button size="medium" variant="tonal" sx={{ m: 0, px: 2 }}>
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
      {/* Status Change Modal */}
      <StatusChangeDialog
        open={statusChangeDialogOpen}
        setOpen={setStatusChangeDialogOpen}
        description="Are you sure you want to Change the Status"
        title="Status"
        handleSubmit={handleStatusChangeApi}
      />

      {/* <DeleteDialog
        open={isDeleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        description="Are you sure you want to delete this item?"
        title="Delete"
      /> */}
    </>
  );
};

export default NonTeaching;
