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

import { selectNonTeachingStaffs } from 'features/staff-management/non-teaching-staffs/redux/nonTeachingStaffSelectors';

import { getAllNonTeachingStaffs } from 'features/staff-management/non-teaching-staffs/redux/nontTeachingStaffThunks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TeacherFilter from '../../../../features/staff-management/non-teaching-staffs/components/TeacherFilterCard';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);
    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const NonTeaching = () => {
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const nonTeachingStaffs = useSelector(selectNonTeachingStaffs);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      type: 'non_teaching',
      branch_id: selectedBranchId
    };
    dispatch(getAllNonTeachingStaffs(data));
  }, [dispatch, selectedBranchId]);

  useTimeout(() => {
    setLoading(false);
  }, 1000);

  const handleStatusChange = () => {
    setDeleteDialogOpen(true);
  };

  return (
    <>
      {loading ? (
        <StaffManagement />
      ) : (
        <Grid>
          <TeacherFilter selectedBranchId={selectedBranchId} />
          <Grid container xs={12} spacing={2} mt={2}>
            {nonTeachingStaffs?.map((item, i) => (
              <Grid key={i} item xs={12} sm={6} md={4}>
                <Card sx={{ position: 'relative' }}>
                  <CardContent sx={{ pt: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <Avatar
                        src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${item.image}`}
                        sx={{ mb: 2, width: 100, height: 100 }}
                      />
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
                          <TextField size="small" select label="Status" SelectProps={{ onChange: (e) => handleStatusChange(e) }}>
                            <MenuItem value="1">Active</MenuItem>
                            <MenuItem value="0">Inactive</MenuItem>
                          </TextField>
                        </Grid>
                        <Box component={Link} to={`non-teaching-staffs/${item?.staff?.id.toString()}`} state={{ id: item?.staff?.id }}>
                          <Button size='medium' sx={{m:0,p:1,px:2}}
                          >View Profile</Button>
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

export default NonTeaching;
