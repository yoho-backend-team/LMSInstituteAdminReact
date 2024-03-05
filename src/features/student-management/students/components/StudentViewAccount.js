import { useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Icon from 'components/icon';
import { Link } from 'react-router-dom';
// ** Custom Components
import CustomChip from 'components/mui/chip';
import { default as UserSubscriptionDialog, default as UserSuspendDialog } from './UserSubscriptionDialog';

const data = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  billing: 'Manual - Cash',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Teacher Profile',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/14.png'
};

const statusColors = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
};

const course = [
  {
    personName: 'Arun',
    learning_format: 'Online',
    course_categories: { course_category_name: 'Programming' },
    course_name: 'Introduction to React',
    image: 'https://repository-images.githubusercontent.com/294419498/1786062b-16a6-4231-b247-e774048c532d',
    studentCount: 10,
    course_price: 49.99,
    is_active: '1'
  },
  {
    personName: 'Arun',
    learning_format: 'Online',
    course_categories: { course_category_name: 'Programming' },
    course_name: 'Introduction to React',
    image: 'https://repository-images.githubusercontent.com/294419498/1786062b-16a6-4231-b247-e774048c532d',
    studentCount: 10,
    course_price: 49.99,
    is_active: '1'
  },
  {
    personName: 'Arun',
    learning_format: 'Online',
    course_categories: { course_category_name: 'Programming' },
    course_name: 'Introduction to React',
    image: 'https://repository-images.githubusercontent.com/294419498/1786062b-16a6-4231-b247-e774048c532d',
    studentCount: 10,
    course_price: 49.99,
    is_active: '1'
  },
  {
    personName: 'Arun',
    learning_format: 'Online',
    course_categories: { course_category_name: 'Programming' },
    course_name: 'Introduction to React',
    image: 'https://repository-images.githubusercontent.com/294419498/1786062b-16a6-4231-b247-e774048c532d',
    studentCount: 10,
    course_price: 49.99,
    is_active: '1'
  }
];

const UserViewAccount = () => {
  // ** States

  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);

  if (data) {
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
                  <Typography sx={{ color: 'text.secondary' }}>@{data.username}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Status:</Typography>
                  <CustomChip
                    rounded
                    skin="light"
                    size="small"
                    label={data.status}
                    color={statusColors[data.status]}
                    sx={{
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Role:</Typography>
                  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{data.role}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Tax ID:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>Tax-8894</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Contact:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>+1 {data.contact}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Language:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>English</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Country:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data.country}</Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: '' }}>
              <Button component={Link} to={'edit'} variant="contained" sx={{ mr: 2 }}>
                Edit
              </Button>
              <Button color="error" variant="tonal" onClick={() => setSuspendDialogOpen(true)}>
                Suspend
              </Button>
            </CardActions>

            <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
            <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {course.map((course, index) => (
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
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default UserViewAccount;
