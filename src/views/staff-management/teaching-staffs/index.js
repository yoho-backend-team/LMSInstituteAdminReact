import { Chip as CustomChip, TextField } from '@mui/material';
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
import TeacherFilter from './TeacherFilterCard';
import { useDispatch,useSelector  } from 'react-redux';
import { selectTeachingStaffs } from 'features/staff-management/teaching-staffs/redux/teachingStaffSelectors';
import { getAllTeachingStaffs } from 'features/staff-management/teaching-staffs/redux/teachingStaffThunks';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const Teaching = () => {
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const teachingStaffs = useSelector(selectTeachingStaffs);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const data ={
      type:"TeachingStaffs",
      branch_id:selectedBranchId
    }
    dispatch(getAllTeachingStaffs(data));
  }, [dispatch,selectedBranchId]);

  const handleStatusChange = () => {
    setDeleteDialogOpen(true);
  };

  useTimeout(() => {
    setLoading(false);
  }, 1000);
console.log(teachingStaffs);

  return (
    <>
      {loading ? (
        <StaffManagement />
      ) : (
        <Grid>
          <TeacherFilter />
          <Grid container xs={12} spacing={2} mt={2}>
            {teachingStaffs.map((item, i) => (
              <Grid key={i} item xs={12} sm={6} md={4}>
                <Card sx={{ position: 'relative' }}>
                  <CardContent sx={{ pt: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <Avatar src={item.img} sx={{ mb: 2, width: 100, height: 100 }} />
                      <Typography variant="h4" sx={{ mb: 2 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="h6">{item.email}</Typography>
                      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                        {item.chips &&
                          item.chips.map((chip, index) => (
                            <Box
                              href="/"
                              key={index}
                              component={Link}
                              onClick={(e) => e.preventDefault()}
                              sx={{
                                textDecoration: 'none',
                                '&:not(:last-of-type)': { mr: 2.5 },
                                '& .MuiChip-root': { cursor: 'pointer' }
                              }}
                            >
                              <CustomChip rounded size="small" skin="light" color={chip.color} label={chip.title} />
                            </Box>
                          ))}
                      </Box>
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
                          <TextField size="small" select fullWidth label="Status" SelectProps={{ onChange: (e) => handleStatusChange(e) }}>
                            <MenuItem value="1">Active</MenuItem>
                            <MenuItem value="0">Inactive</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid>
                          <Button component={Link} to={item.id} variant="tonal" sx={{ px: 4 }}>
                            View Profile
                          </Button>
                        </Grid>
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
