import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from 'components/mui/avatar';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NonTeachingStaffCard = ({ nonTeachingStaffs }) => {
  const dummyNonTeachingStaffs = [
    {
      staff_id: 1,
      staff_name: 'John Doe',
      email: 'john.doe@example.com',
      img: 'john_doe.jpg',
      presentCount: 22,
      absentCount: 3
    },
    {
      staff_id: 2,
      staff_name: 'Jane Smith',
      email: 'jane.smith@example.com',
      img: 'jane_smith.jpg',
      presentCount: 20,
      absentCount: 5
    },
    {
      staff_id: 3,
      staff_name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      img: 'alice_johnson.jpg',
      presentCount: 18,
      absentCount: 7
    },
    {
      staff_id: 4,
      staff_name: 'Bob Brown',
      email: 'bob.brown@example.com',
      img: 'bob_brown.jpg',
      presentCount: 25,
      absentCount: 0
    },
    {
      staff_id: 5,
      staff_name: 'Charlie Williams',
      email: 'charlie.williams@example.com',
      img: 'charlie_williams.jpg',
      presentCount: 21,
      absentCount: 4
    }]  
  return (
    <>
      <Grid container spacing={2} sx={{ display: 'flex', mt: 2 }}>
        {  dummyNonTeachingStaffs?.map((item, i) => (
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
                        to={`non-teaching-staff-attendances/${item.staff_id}`}
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

NonTeachingStaffCard.propTypes = {
  nonTeachingStaffs: PropTypes.any
};

export default NonTeachingStaffCard;
