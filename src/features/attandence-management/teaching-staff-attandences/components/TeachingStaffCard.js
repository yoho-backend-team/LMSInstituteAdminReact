import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from 'components/mui/avatar';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cardBg from "../../../../assets/images/attendance/attendence_bg.jpg"
import { getImageUrl } from 'utils/imageUtils';

const TeachingStaffCard = ({ teachingStaffs }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
  }, []);
  console.log(teachingStaffs,"teachingStaffs")
  return (
    <Grid container spacing={2} mt={2}>
      {teachingStaffs?.map((item, i) => (
        <Grid key={i} item xs={12} sm={6} md={4}>
          <Card
            sx={{
              position: 'relative',
              p: 1.5,
              overflow: 'hidden',
              boxShadow: "0 .25rem .875rem 0 rgba(38,43,67,.16)",
              opacity: fade ? 1 : 0,
              transform: fade ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease'
            }}
          >
            <Box
              sx={{
                height: '120px',
                width: '100%',
                backgroundImage: `url(${cardBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                borderRadius: '8px 8px 0 0'
              }}
            />

            <CardContent sx={{ pt: 0, mt: '-50px' }}>
              {/* Avatar with Overlay on Background */}
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar
                  src={ getImageUrl(item.img)}
                  sx={{
                    width: 100,
                    height: 100,
                    border: '3px solid white',
                    mb: 2
                  }}
                />
              </Box>

              {/* User Information */}
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {item.staff_name}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  {item.email}
                </Typography>
              </Box>

              {/* Attendance Info */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  mb: 2,
                  backgroundColor: '#f4f0f0',
                  borderRadius: '8px',
                  p: 1
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">
                    {item.presentCount}
                  </Typography>
                  <Typography variant="h4" color="text.secondary">
                    Present
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main">
                    {item.absentCount}
                  </Typography>
                  <Typography variant="h4" color="text.secondary">
                    Absent
                  </Typography>
                </Box>
              </Box>

              {/* Button to View Attendance */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                  component={Link}
                  state={{ staff: item }}
                  to={`teaching-staff-attendances/${item.staff}`}
                  variant="contained"
                  sx={{ px: 4, borderRadius: '8px', textTransform: 'none' }}
                >
                  View Attendance
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

TeachingStaffCard.propTypes = {
  teachingStaffs: PropTypes.any
};

export default TeachingStaffCard;