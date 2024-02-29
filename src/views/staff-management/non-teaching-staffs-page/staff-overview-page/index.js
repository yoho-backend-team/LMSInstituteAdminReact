import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import TeacherFilter from '../../../../features/staff-management/non-teaching-staffs/components/TeacherFilterCard';
import Pagination from '@mui/material/Pagination';
import Avatar from 'components/mui/avatar';
import StaffManagement from 'components/cards/Skeleton/StaffManagement';
import { useState } from 'react';
import { useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectTeachingStaffs } from 'features/staff-management/teaching-staffs/redux/teachingStaffSelectors';
import { getAllTeachingStaffs } from 'features/staff-management/teaching-staffs/redux/teachingStaffThunks';
import DeleteDialog from 'components/modal/DeleteModel';

// const data = [
//   {
//     id: '1',
//     name: 'John',
//     email: 'demo@gmail.com',
//     rating: '3',
//     reviews: '100',
//     img: 'https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA?rs=1&pid=ImgDetMain',
//     isConnected: '0'
//   },
//   {
//     id: '2',
//     name: 'Doe',
//     email: 'demo@gmail.com',
//     rating: '4',
//     reviews: '150',
//     img: 'https://sm.askmen.com/t/askmen_in/article/f/facebook-p/facebook-profile-picture-affects-chances-of-gettin_fr3n.1200.jpg',
//     isConnected: '1'
//   },
//   {
//     id: '3',
//     name: 'Alex Fransis',
//     email: 'demo@gmail.com',
//     rating: '5',
//     reviews: '160',
//     img: 'https://i1.wp.com/essentiallypop.com/epop/wp-content/uploads/2017/03/Alex-Francis-1.png?fit=1126%2C1130&ssl=1',
//     isConnected: '0'
//   },
//   {
//     id: '4',
//     name: 'Mark Zuckerberg',
//     email: 'demo@gmail.com',
//     rating: '5',
//     reviews: '200',
//     img: 'https://th.bing.com/th/id/OIP.2E3Y6iZbN-18fnzwBpX__wExDM?rs=1&pid=ImgDetMain',
//     isConnected: '1'
//   },
//   {
//     id: '4',
//     name: 'Elon Musk',
//     email: 'demo@gmail.com',
//     rating: '5',
//     reviews: '100',
//     img: 'https://i1.wp.com/pagesix.com/wp-content/uploads/sites/3/2016/03/471769884.jpg?quality=90&strip=all&ssl=1',
//     isConnected: '0'
//   },
//   {
//     id: '6',
//     name: 'Jeff Bezos',
//     email: 'demo@gmail.com',
//     rating: '4',
//     reviews: '70',
//     img: 'https://crooksandliars.com/files/primary_image/19/02/gettyimages-1079533948_copy.jpeg',
//     isConnected: '1'
//   },
//   {
//     id: '7',
//     name: 'Bill Gates',
//     email: 'demo@gmail.com',
//     rating: '3',
//     reviews: '700',
//     img: 'https://www.rollingstone.com/wp-content/uploads/2021/02/Gates_thumb_clean.jpg',
//     isConnected: '1'
//   },
//   {
//     id: '8',
//     name: 'Larry Page',
//     email: 'demo@gmail.com',
//     rating: '4',
//     reviews: '900',
//     img: 'https://th.bing.com/th/id/R.928fbc6429d99bb33e5d3387d331d994?rik=eiZ1vn1%2bvpr7Zg&riu=http%3a%2f%2fcrowdforthink.com%2fassets%2fuploads%2fstories%2fada9c87f4bb7fc4b55c927ac678a74bb.jpeg&ehk=RPx6fS4SVklzSA%2fQQCWMZ4%2fIUKRbAevxTx0tk3Vh1v0%3d&risl=&pid=ImgRaw&r=0',
//     isConnected: '1'
//   },
//   {
//     id: '9',
//     name: 'Sundar Pichai',
//     email: 'demo@gmail.com',
//     rating: '5',
//     reviews: '1000',
//     img: 'https://images.newindianexpress.com/uploads/user/imagelibrary/2015/8/11/7/original/sunder-pichai-twitter.JPG',
//     isConnected: '1'
//   },
//   {
//     id: '10',
//     name: 'Satya Nadella',
//     email: 'demo@gmail.com',
//     rating: '3.5',
//     reviews: '6600',
//     img: 'https://pawantech12.github.io/timeshop/images/image1.jpg',
//     isConnected: '1'
//   }
// ];

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);
    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const NonTeaching = () => {
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const nonTeachingStaffs = useSelector(selectTeachingStaffs);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      type: 'non_teaching',
      branch_id: selectedBranchId
    };
    dispatch(getAllTeachingStaffs(data));
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
          <TeacherFilter />
          <Grid container xs={12} spacing={2} mt={2}>
            {nonTeachingStaffs.map((item, i) => (
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
                          <TextField size="small" select fullWidth label="Status" SelectProps={{ onChange: (e) => handleStatusChange(e) }}>
                            <MenuItem value="1">Active</MenuItem>
                            <MenuItem value="0">Inactive</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid>
                          <Button component={Link} to={'1'} variant="tonal" sx={{ px: 4 }}>
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

export default NonTeaching;
