import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from 'components/mui/avatar';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TeachingStaffCard = ({ teachingStaffs }) => {
  const dummyTeachingStaffs = [
    {
      staff_id: 1,
      staff_name: 'Emily Clark',
      email: 'emily.clark@example.com',
      img: 'emily_clark.jpg',
      presentCount: 20,
      absentCount: 2
    },
    {
      staff_id: 2,
      staff_name: 'Michael Brown',
      email: 'michael.brown@example.com',
      img: 'michael_brown.jpg',
      presentCount: 22,
      absentCount: 1
    },
    {
      staff_id: 3,
      staff_name: 'Sophia Wilson',
      email: 'sophia.wilson@example.com',
      img: 'sophia_wilson.jpg',
      presentCount: 19,
      absentCount: 3
    },
    {
      staff_id: 4,
      staff_name: 'James Anderson',
      email: 'james.anderson@example.com',
      img: 'james_anderson.jpg',
      presentCount: 18,
      absentCount: 4
    },
    {
      staff_id: 5,
      staff_name: 'Olivia Martinez',
      email: 'olivia.martinez@example.com',
      img: 'olivia_martinez.jpg',
      presentCount: 21,
      absentCount: 2
    },
    {
      staff_id: 6,
      staff_name: 'Benjamin Garcia',
      email: 'benjamin.garcia@example.com',
      img: 'benjamin_garcia.jpg',
      presentCount: 23,
      absentCount: 1
    },
    {
      staff_id: 7,
      staff_name: 'Emma Rodriguez',
      email: 'emma.rodriguez@example.com',
      img: 'emma_rodriguez.jpg',
      presentCount: 17,
      absentCount: 5
    },
    {
      staff_id: 8,
      staff_name: 'Lucas Lee',
      email: 'lucas.lee@example.com',
      img: 'lucas_lee.jpg',
      presentCount: 24,
      absentCount: 0
    },
    {
      staff_id: 9,
      staff_name: 'Ava Walker',
      email: 'ava.walker@example.com',
      img: 'ava_walker.jpg',
      presentCount: 20,
      absentCount: 2
    },
    {
      staff_id: 10,
      staff_name: 'Ethan Hall',
      email: 'ethan.hall@example.com',
      img: 'ethan_hall.jpg',
      presentCount: 19,
      absentCount: 3
    }
  ];
    
  return (
    <>
      <Grid container spacing={2} mt={2}>
        {dummyTeachingStaffs?.map((item, i) => (
          <Grid key={i} item xs={12} sm={6} md={4}>
            <Card sx={{ position: 'relative', p: 1.5 }}>
              <CardContent sx={{ pt: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <Avatar src={item.img} sx={{ mb: 3, width: 100, height: 100 }} />
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    {item.staff_name}
                  </Typography>
                  <Typography variant="h6">{item.email}</Typography>

                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      gap: 2,
                      width: '100%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-around'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <Typography variant="h4">{item?.presentCount}</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>Present</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <Typography variant="h4">{item?.absentCount}</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>Absent</Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', mt: 1 }}
                  >
                    <Grid>
                      <Button
                        component={Link}
                        state={{ staff: item }}
                        to={`teaching-staff-attendances/${item.staff_id}`}
                        variant="tonal"
                        sx={{ px: 4 }}
                      >
                        View Attendance
                      </Button>
                    </Grid>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

TeachingStaffCard.propTypes = {
  teachingStaffs: PropTypes.any
};

export default TeachingStaffCard;
