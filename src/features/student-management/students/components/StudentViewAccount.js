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
  console.log("student details in front page",student);
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
    const data = { uuid: selectedStudentDeleteId };
    const result = await deleteStudent(data);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  console.log("student details in front page",student)

  if (student&&Object.keys(student).length!==0) {
    return (
      <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Card>
          <CardContent sx={{ pb: 4 }}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <Typography variant="h3" sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                  Details
                </Typography>
                <Box sx={{ pt: 4 }}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 600, color:  '#444444' }}>Username:</Typography>
                    <Typography sx={{ color: '#000000', fontWeight: 500, fontSize: '1rem',mt:"-2px",ml:"37px" }}>
                      {student.full_name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 600, color: '#444444' }}>Email:</Typography>
                    <Typography sx={{ color: '#000000',fontWeight: 500 , fontSize: '1rem',mt:"-2px",ml:8}}>{student.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                    <Typography sx={{ mr: 2, fontWeight: 600, color: '#444444'  }}>Status:</Typography>
                    <CustomChip
                      rounded
                      skin="light"
                      size="small"
                      label={student.is_active ? 'Active' : 'Inactive'}
                      color={student.is_active ? 'success' : 'error'}
                      sx={{ textTransform: 'capitalize',ml:7 }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 600, color: '#444444'  }}>Gender:</Typography>
                    <Typography sx={{ color: '#000000', fontWeight: 500, fontSize: '1rem',mt:"-2px",ml:7 }}>{student.gender}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 600, color: '#444444'  }}>DOB:</Typography>
                    <Typography sx={{ color: '#000000' , fontWeight: 500, fontSize: '1rem',mt:"-2px",ml:9}}>{student.dob}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 600, color: '#444444'  }}>Qualification:</Typography>
                    <Typography sx={{ color: '#000000', fontWeight: 500, fontSize: '1rem' ,mt:"-2px",textTransform: 'capitalize',ml:"20px" }}>
                      {student.qualification}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 600, color: '#444444'  }}>Contact: </Typography>
                    <Typography sx={{ color: '#000000', fontWeight: 500,ml:6}}>  {student?.contact_info?.phone_number}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 600, color: '#444444'  }}>Alt Contact:</Typography>
                    <Typography sx={{ color: '#000000', fontWeight: 500  ,marginLeft:"27px"}}> &nbsp; {student?.contact_info?.alternate_phone_number}</Typography>
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Typography sx={{ mr: 2, mb: 1, fontWeight: 600, color: '#444444'  }}>Address:</Typography>
                    <Typography sx={{ color:'#000000' , fontWeight: 500,fontSize:"1rem", mb: 1,mt:"-28px",ml:"117px" }}>
                      {student.contact_info.address1}, {student?.contact_info?.address2}
                    </Typography>
                    <Typography sx={{ color: '#000000',fontWeight: 500,fontSize:"1rem", mb: 1,mt:"-2px",ml:"113px" }}>
                      {student.city}-{student?.contact_info?.pincode}
                    </Typography>
                    <Typography sx={{ color: '#000000',fontWeight:500,fontSize:"1rem", mb: 1,mt:"-2px",marginLeft:"117px" }}>{student?.contact_info?.state}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography variant="h3" sx={{ color: 'text.disabled' , textTransform: 'uppercase' }}>
                  Course Details
                </Typography>
                <Box sx={{ pt: 4 }}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 600, color: '#444444'  }}>Course Id :</Typography>
                    <Typography sx={{ color: '#000000' , fontWeight: 500, fontSize: '1rem',mt:"-2px",ml:"40px"}}>{student?.userDetail?.course?.id}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 600, color: '#444444'  }}>Course Name :</Typography>
                    <Typography sx={{ color: '#000000', fontWeight: 500, fontSize: '1rem',mt:"-2px",ml:"15px" }}>{student?.userDetail?.course?.course_name}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 600, color: '#444444'  }}>Course Duration :</Typography>
                    <Typography sx={{ color: '#000000', fontWeight: 500, fontSize: '1rem',mt:"-2px" ,ml:"-2px"}}>{student?.userDetail?.course?.duration}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 600, color: '#444444'  }}>Course Price :</Typography>
                    <Typography sx={{ color: '#000000', fontWeight: 500, fontSize: '1rem',marginLeft:"20px"}}>{student?.userDetail?.course?.price}10$</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 600, color: '#444444'  }}>Learning Format :</Typography>
                    <Typography sx={{ color: '#000000', fontWeight: 500, fontSize: '1rem',mt:"-2px"}}>{student?.userDetail?.course?.class_type[0]}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'end', alignItems:"end" }}>
            <Button
              component={Link}
              state={{ student: student }}
              to={`students/${student?.uuid}/edit`}
              variant="contained"
              sx={{ mr: 2 }}
            >
              Edit
            </Button>
            <Button color="error" variant="tonal" onClick={() => handleDelete(student?.uuid)}>
              Delete
            </Button>
          </CardActions>
          <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
          <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
          <StudentDeleteModel
            open={studentDeleteModelOpen}
            setOpen={setStudentDeleteModelOpen}
            description="Are you sure you want to delete this Student?"
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
