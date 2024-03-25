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
import DeleteDialog from 'components/modal/DeleteModel';
import Avatar from 'components/mui/avatar';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TeacherFilter from 'features/staff-management/teaching-staffs/components/TeacherFilterCard';
import { useDispatch, useSelector } from 'react-redux';
import { selectTeachingStaffs, selectLoading } from 'features/staff-management/teaching-staffs/redux/teachingStaffSelectors';
import { getAllTeachingStaffs } from 'features/staff-management/teaching-staffs/redux/teachingStaffThunks';

const Teaching = () => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const teachingStaffs = useSelector(selectTeachingStaffs);
  const loading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      type: 'teaching',
      branch_id: selectedBranchId
    };
    dispatch(getAllTeachingStaffs(data));
  }, [dispatch, selectedBranchId]);

  const handleStatusChange = () => {
    setDeleteDialogOpen(true);
  };

  console.log('overview-teachingstaffs:',teachingStaffs);

  return (
    <>
       <TeacherFilter selectedBranchId={selectedBranchId} />
      {loading ? (
        <StaffManagement />
        
      ) : (
        <Grid>
       
          <Grid container xs={12} spacing={2} mt={2}>
            {teachingStaffs &&
              teachingStaffs?.map((item, i) => (
                <Grid key={i} item xs={12} sm={6} md={4}>
                  <Card sx={{ position: 'relative' }}>
                    <CardContent sx={{ pt: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Avatar src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${item?.staff?.image}`} sx={{ mb: 2, width: 100, height: 100 }} />
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
                            textDecoration: 'none'
                          }}
                        >
                          <Grid>
                            <TextField
                              size="small"
                              select
                              fullWidth
                              label="Status"
                              SelectProps={{ onChange: (e) => handleStatusChange(e) }}
                            >
                              <MenuItem value="1">Active</MenuItem>
                              <MenuItem value="0">Inactive</MenuItem>
                            </TextField>
                          </Grid>
                          <Box component={Link} to={item?.staff?.id.toString()} state={{ id: item?.staff?.id }}>
                            {/* <Link to ={item?.staff?.id} state={{id:item?.staff?.id}}> */}
                            <Button variant="tonal" sx={{ p: 1.05 }}>
                              View Profile
                            </Button>
                            {/* </Link> */}
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
      <DeleteDialog
        open={isDeleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        description="Are you sure you want to delete this item?"
        title="Delete"
      />
    </>
  );
};

export default Teaching;
