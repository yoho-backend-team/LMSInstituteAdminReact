import { Grid, Typography, Box, Paper } from '@mui/material';
import { getBranchById } from 'features/branch-management/services/branchServices';
import Earningscard from 'features/branch-management/view-branch/components/Earningscard';
import Coursescard from 'features/branch-management/view-branch/components/headerCards/Coursescard';
import StudentsCard from 'features/branch-management/view-branch/components/headerCards/studentsCard';
import PaymentsCard from 'features/branch-management/view-branch/components/headerCards/payments';
import CardHorizondalClasses from 'features/branch-management/view-branch/components/horizondalCards/CardHorizondalClasses';
import CardHorizondalCourses from 'features/branch-management/view-branch/components/horizondalCards/CardHorizondalCourses';
import CardHorizondalUsers from 'features/branch-management/view-branch/components/horizondalCards/CardHorizondalUsers';
import CardStudentAndTeachers from 'features/branch-management/view-branch/components/horizondalCards/CardStudentandTeacher';
import SupportTicket from 'features/branch-management/view-branch/components/supportTickets';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { gridSpacing } from 'store/constant';
import AllActivity from 'views/dashboard/Default/card/Allactivity';
import toast from 'react-hot-toast';

const BranchViewPage = () => {
  const location = useLocation();
  const branchId = location.state.id;

  const [branchData, setBranchData] = useState([]);

  useEffect(() => {
    const data = {
      branch_id: branchId,
    };

    getBranchData(data);
  }, [branchId]);

  const getBranchData = async (data) => {
    try {
      const result = await getBranchById(data);
      if (result.success) {
        setBranchData(result.data);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <Grid container spacing={4}>
        {/* Left Column: Main Content */}
        <Grid item xs={12} md={8}>
          {/* Page Header */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 4, color: '#333' }}
          >
            Branch Overview
          </Typography>

          {/* Key Metrics Section */}
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              marginBottom: 4,
              backgroundColor: '#fff',
              borderRadius: 2,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
              '&:hover': {
                transform: 'scale(1.03)', 
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', 
              },
              
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', marginBottom: 3, color: '#555' }}
            >
              Key Metrics
            </Typography>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={4}>
                <PaymentsCard branchData={branchData} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Coursescard branchData={branchData} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <StudentsCard branchData={branchData} />
              </Grid>
            </Grid>
          </Paper>

          {/* Statistics Section */}
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              marginBottom: 4,
              backgroundColor: '#fff',
              borderRadius: 2,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
              '&:hover': {
                transform: 'scale(1.03)', 
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', 
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', marginBottom: 3, color: '#555' }}
            >
              Statistics
            </Typography>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={12}>
                <Earningscard />
              </Grid>
            </Grid>
          </Paper>

          {/* Detailed Insights Section */}
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              marginBottom: 4,
              backgroundColor: '#fff',
              borderRadius: 2,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
              '&:hover': {
                transform: 'scale(1.03)', 
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', 
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', marginBottom: 3, color: '#555' }}
            >
              Detailed Insights
            </Typography>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
                <CardHorizondalCourses branchData={branchData} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CardHorizondalClasses branchData={branchData} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CardHorizondalUsers branchData={branchData} />
              </Grid>
            </Grid>
          </Paper>

          {/* Support Tickets Section */}
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              backgroundColor: '#fff',
              borderRadius: 2,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
              '&:hover': {
                transform: 'scale(1.03)', 
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', 
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', marginBottom: 3, color: '#555' }}
            >
              Support Tickets
            </Typography>
            <SupportTicket branchData={branchData} />
          </Paper>
        </Grid>

        {/* Right Column: Recent Activities */}
        <Grid item xs={12} md={4} sx={{ marginTop: '38px' }}>
          <Paper
            elevation={3}
            sx={{
              position: 'relative',
              top: 15,
              padding: 4,
              backgroundColor: '#fff',
              borderRadius: 2,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              height: '45%',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
              '&:hover': {
                transform: 'scale(1.03)', 
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', 
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', marginBottom: 3, color: '#555' }}
            >
              Recent Activities
            </Typography>
            <AllActivity />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BranchViewPage;
