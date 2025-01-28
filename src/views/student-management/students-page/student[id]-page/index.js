import { Card, Grid, Box, Typography, Divider, Avatar, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { studentById } from 'features/student-management/students/services/studentService';
import UserViewLeft from '../../../../features/student-management/students/components/StudentViewLeft';
import UserViewRight from '../../../../features/student-management/students/components/StudentViewRight';

const UserView = () => {
  const [student, setStudent] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const studentID = location?.state?.id;

  useEffect(() => {
    getStudentData(studentID);
  }, [studentID]);

  const getStudentData = async (id) => {
    const data = { student_id: id };
    const result = await studentById(data);
    if (result.success) {
      setStudent(result.data);
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F3F4F6",
        padding: '32px',
        minHeight: '100vh',
      }}
    >
      <Grid container spacing={3}>
      

        <Grid item xs={12} md={12} lg={12}>
          <Card
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '30px',
              
              boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0px 16px 32px rgba(0, 0, 0, 0.2)', 
              },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                marginBottom: '24px',
                color: '#333',
              }}
            >
            
          <IconButton 
            onClick={handleBackClick} 
            sx={{ marginBottom: '16px', alignSelf: 'flex-start',marginTop:"10px" ,color:"#333",backgroundColor:"lightgrey",borderRadius:"20px",marginRight:"10px"}}
            
          >
            <ArrowBack />
          </IconButton>
        
              Personal Information
            </Typography>
            <Divider sx={{ marginBottom: '24px' }} />
            <UserViewLeft student={student} />
          </Card>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <Card
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '10px',
              boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0px 16px 32px rgba(0, 0, 0, 0.2)', 
              },
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '24px' }}>
              Additional Details
            </Typography>
            <Divider sx={{ marginBottom: '24px' }} />
            <UserViewRight student={student} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserView;
