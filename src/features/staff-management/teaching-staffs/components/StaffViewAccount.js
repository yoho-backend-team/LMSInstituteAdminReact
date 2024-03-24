import { useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import Icon from 'components/icon';
import { Link } from 'react-router-dom';
// import CustomChip from 'components/mui/chip';

import { default as UserSubscriptionDialog, default as UserSuspendDialog } from './UserSubscriptionDialog';

const UserViewAccount = ({ staff }) => {
  // ** States
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  console.log('staffID:', staff.id);
  // dateFormat
  function formattedDate(inputDate) {
    const dateObject = new Date(inputDate);
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();
    return `${day}/${month}/${year}`;
  }

  if (staff) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ pb: 4 }}>
              <Typography variant="body2" sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Details
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Username:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{staff?.username}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{staff?.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Role:</Typography>
                  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{staff?.designation}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Gender:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{staff?.gender}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>DOB:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{formattedDate(`${staff?.dob}`)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Number:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>+91 {staff?.phone_number}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Alt Number:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>+91 {staff?.alternate_number}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Qualification:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{staff?.education_qualification}</Typography>
                </Box>
                <Box>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Address:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {staff?.address_line_1}, {staff?.address_line_2}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{staff?.city}</Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: '' }}>
              <Box component={Link} to={`teaching-staffs/${staff?.staff_id}/edit`} state={{ staff: staff, id: staff.id }}>
                <Button variant="contained" sx={{ mr: 2 }}>
                  Edit
                </Button>
              </Box>
              <Box>
                <Button color="error" variant="tonal" onClick={() => setSuspendDialogOpen(true)}>
                  Suspend
                </Button>
              </Box>
            </CardActions>

            <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
            <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
          </Card>
        </Grid>

        {/* <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {staff.staff.course.map((course, index) => (
              <Grid item spacing={2} key={index} xs={12} md={6}>
                <Card sx={{ mb: 2 }}>
                  <CardContent sx={{ pb: 0 }}>
                    <CardMedia
                      sx={{ position: 'relative', height: '12.5625rem', borderRadius: '5px', objectFit: 'contain' }}
                      image={course.image}
                    >
                      <CustomChip
                        sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
                        skin="light"
                        label={course?.learning_format}
                        rounded
                        color="primary"
                        size="small"
                        variant="outlined"
                      />
                    </CardMedia>
                  </CardContent>
                  <CardContent>
                    <Box>
                      <CustomChip
                        skin="light"
                        label={course?.course_categories?.course_category_name}
                        rounded
                        color="secondary"
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <Box sx={{ mr: 2, mt: 2, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h4">{course?.course_name}</Typography>
                      <Typography variant="body2" sx={{ fontSize: '13px', pt: 0.7, fontWeight: '400', opacity: 0.9 }}>
                        {course.personName}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        mt: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Grid
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          '& svg': { color: 'primary.main', mr: 0.5 }
                        }}
                      >
                        <Icon icon="ic:twotone-person" fontSize={20} />
                        <Typography sx={{ color: 'text.secondary' }}>{course?.studentCount} Modules</Typography>
                      </Grid>
                      <Grid>
                        <Typography sx={{ color: 'text.secondary' }}>₹ {course?.course_price}</Typography>
                      </Grid>
                    </Box>
                  </CardContent>
                  <CardActions
                    className="demo-space-x"
                    sx={{ pt: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Box>
                      <CustomChip
                        skin="light"
                        label={course?.course_categories?.course_category_name}
                        rounded
                        color="secondary"
                        size="medium"
                        variant="outlined"
                      />
                    </Box>
                    <Button component={Link} to="view " size="medium" variant="contained" color="primary">
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid> */}
      </Grid>
    );
  } else {
    return null;
  }
};

export default UserViewAccount;
