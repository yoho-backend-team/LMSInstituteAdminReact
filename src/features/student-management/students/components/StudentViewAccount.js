import { useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
// ** Custom Components
import CustomChip from 'components/mui/chip';
import { default as UserSubscriptionDialog, default as UserSuspendDialog } from './UserSubscriptionDialog';

const UserViewAccount = ({ student }) => {
  // ** States
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  console.log('students Course :', student);

  if (student) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent sx={{ pb: 4 }}>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
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
                      <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                        {student.education_qualification}
                      </Typography>
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
                </Grid>
                <Grid item md={6} xs={12}>
                  <Typography variant="body2" sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                    Course Details
                  </Typography>
                  <Box sx={{ pt: 4 }}>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Course Id :</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{student?.institute_student_courses?.course_id}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Course Name :</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{student?.institute_student_courses?.course_name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Course Duration :</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{student?.institute_student_courses?.course_duration}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Course Price :</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{student?.institute_student_courses?.course_price}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Learning Format :</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{student?.institute_student_courses?.learning_format}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: '' }}>
              <Button
                component={Link}
                state={{ student: student }}
                to={`students/${student?.student_id}/edit`}
                variant="contained"
                sx={{ mr: 2 }}
              >
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
      </Grid>
    );
  } else {
    return null;
  }
};

export default UserViewAccount;
