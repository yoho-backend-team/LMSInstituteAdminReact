import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import StudentDeleteModel from 'components/modal/DeleteModel';
import CustomChip from 'components/mui/chip';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { deleteStudent } from '../services/studentService';
import { default as UserSubscriptionDialog, default as UserSuspendDialog } from './UserSubscriptionDialog';

const UserViewAccount = ({ student }) => {
  // ** States
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  const [studentDeleteModelOpen, setStudentDeleteModelOpen] = useState(false);
  const [selectedStudentDeleteId, setSelectedStudentDeleteId] = useState(null);

  const handleDelete = useCallback((itemId) => {
    setSelectedStudentDeleteId(itemId);
    setStudentDeleteModelOpen(true);
  }, []);

  // Handle branch deletion
  const handleStudentDelete = async () => {
    const data = { id: selectedStudentDeleteId };
    const result = await deleteStudent(data);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

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
                        label={student.is_active? 'Active' : 'Inactive'}
                        color={student.is_active? 'success' : 'error'}
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
                        {student.qualification}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Contact:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>+91 {student?.contact_info?.phone_number}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Alt Contact:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>+91 {student?.contact_info?.phone_number}</Typography>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <Typography sx={{ mr: 2, mb: 1, fontWeight: 500, color: 'text.secondary' }}>Address:</Typography>
                      <Typography sx={{ color: 'text.secondary', mb: 1 }}>
                        {student.contact_info.addres1}, {student?.contact_info?.address2}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', mb: 1 }}>
                        {student.city}-{student?.contact_info?.pincode}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', mb: 1 }}>{student?.contact_info?.state}</Typography>
                    </Box>
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
              <Button color="error" variant="tonal" onClick={() => handleDelete(student?.id)}>
                Delete
              </Button>
            </CardActions>

            <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
            <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
            <StudentDeleteModel
              open={studentDeleteModelOpen}
              setOpen={setStudentDeleteModelOpen}
              description="Are you sure you want to delete this Student? "
              title="Delete"
              handleSubmit={handleStudentDelete}
            />
          </Card>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

UserViewAccount.propTypes = {
  student: PropTypes.any
};
export default UserViewAccount;
