import React from 'react';
// ** MUI Imports
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
// import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

const TeachingStaffCard = () => {
  // Dummy data array
  const staffData = [
    {
      id: 1,
      profileImage:
        'https://www.shutterstock.com/shutterstock/photos/2071252046/display_1500/stock-photo-portrait-of-cheerful-male-international-indian-student-with-backpack-learning-accessories-standing-2071252046.jpg',
      presentCount: 25,
      absentCount: 20,
      rating: 100,
      name: 'Arunbalaji',
      email: 'arun.doe@example.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      id: 2,
      profileImage:
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
      presentCount: 25,
      absentCount: 20,
      rating: 100,
      name: 'Arunbalaji',
      email: 'arun.doe@example.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      id: 3,
      profileImage:
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
      presentCount: 25,
      absentCount: 20,
      rating: 100,
      name: 'Arunbalaji',
      email: 'arun.doe@example.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      id: 4,
      profileImage:
        'https://media.istockphoto.com/id/1301397300/photo/portrait-of-young-woman-stock-photo.jpg?s=612x612&w=0&k=20&c=Xvgo-k58_woBTuQaRNZ4JXP2SQsw_RSbrlSbt7XbQlU=',
      presentCount: 25,
      absentCount: 20,
      rating: 100,
      name: 'Arunbalaji',
      email: 'arun.doe@example.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
    // Add more staff data objects as needed
  ];
  return (
    <>

      <Grid container spacing={2}>
        {staffData.map((staff) => (
          <Grid key={staff.id} item xs={12} sm={6} md={4}>
            <Link  component={Link} to={'view'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card className="custom-card">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <CardMedia
                      component="img"
                      alt="Profile"
                      image={staff.profileImage}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 20
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" mb={1}>
                      Present
                    </Typography>
                    <Typography color="text.secondary"> {staff.presentCount}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" mb={1}>
                      Absent
                    </Typography>
                    <Typography color="text.secondary"> {staff.absentCount}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" mb={1}>
                      Rating
                    </Typography>
                    <Typography color="text.secondary"> {staff.rating}</Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="h4">{staff.name}</Typography>

                  <Typography variant="h5">{staff.email}</Typography>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">{staff.description}</Typography>
                </Box>
              </CardContent>
            </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TeachingStaffCard;
