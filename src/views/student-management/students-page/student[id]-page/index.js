import { Card, Grid, Box, Typography, Divider, Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { studentById } from 'features/student-management/students/services/studentService';
import UserViewLeft from '../../../../features/student-management/students/components/StudentViewLeft';
import UserViewRight from '../../../../features/student-management/students/components/StudentViewRight';

const UserView = () => {
  const [student, setStudent] = useState({});
  const location = useLocation();
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

  return (
    <Box
      sx={{
        backgroundColor: "#FAF3E0",
        padding: '0px 16px',
      }}
    >
      {/* Header Section with a large avatar and title */}
      

      {/* Main Content Section - Stack Left and Right Sections vertically */}
      <Grid container spacing={3}>
        {/* Personal Information Section */}
        <Grid item xs={7} sx={{display:"flex",alignItems:"center"}}  >
          <Card
            sx={{
             
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)', 
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: '600',
                marginBottom: '16px',
                color: '#333',
              }}
            >
              Personal Information
            </Typography>
            <Divider sx={{ marginBottom: '20px' }} />
            {/* Left side personal info content */}
            <UserViewLeft student={student} />
          </Card>
        </Grid>

        {/* Additional Details Section */}
        <Grid item xs={11}>
          <Card
            sx={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
              Additional Details
            </Typography>
            <Divider sx={{ marginBottom: '16px' }} />
            <UserViewRight student={student} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserView;
