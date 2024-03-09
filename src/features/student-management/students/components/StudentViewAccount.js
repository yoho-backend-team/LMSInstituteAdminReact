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


const UserViewAccount = ({ student }) => {
  // ** States

  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);

  if (student) {
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
                  <Typography sx={{ color: 'text.secondary' }}>@{student.username}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{student.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Status:</Typography>
                  <CustomChip
                    rounded
                    skin="light"
                    size="small"
                    label={student.is_active === '1' ? 'Active' : 'Inactive'}
                    color={student.is_active === '1' ? 'success' : 'error'}
                    sx={{
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Gender:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{student.gender}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>DOB:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{student.dob}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Qualification:</Typography>
                  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{student.education_qualification}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Contact:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>+91 {student.phone_no}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Alt Contact:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>+91 {student.alternate_number}</Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ mr: 2, mb: 1, fontWeight: 500, color: 'text.secondary' }}>Address:</Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 1 }}>
                    {student.address_line_1}, {student.address_line_2}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 1 }}>
                    {student.city}-{student.pincode}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 1 }}>{student.state}</Typography>
                </Box>
                {/* <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Country:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data.country}</Typography>
                </Box> */}
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
           
              <Grid item spacing={2}  xs={12} md={6}>
                <Card sx={{ mb: 2 }}>
                  <CardContent sx={{ pb: 0 }}>
                    <CardMedia
                      sx={{ position: 'relative', height: '12.5625rem', borderRadius: '5px', objectFit: 'contain' }}
                      image={student?.institute_student_courses?.image}
                    >
                      <CustomChip
                        sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
                        skin="light"
                        label={student?.institute_student_courses?.learning_format}
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
                        label={student?.institute_student_courses?.learning_format}
                        rounded
                        color="secondary"
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <Box sx={{ mr: 2, mt: 2, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h4">{student?.institute_student_courses?.course_name}</Typography>
                      <Typography variant="body2" sx={{ fontSize: '13px', pt: 0.7, fontWeight: '400', opacity: 0.9 }}>
                        {student?.institute_student_courses?.personName}
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
                        <Typography sx={{ color: 'text.secondary' }}>{student?.institute_student_courses?.studentCount} Modules</Typography>
                      </Grid>
                      <Grid>
                        <Typography sx={{ color: 'text.secondary' }}>₹ {student?.institute_student_courses?.course_price}</Typography>
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
                        label='Category'
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
          
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default UserViewAccount;
