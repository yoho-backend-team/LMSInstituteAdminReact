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
  console.log(nonTeachingStaffs);
  return (
    <>
      <Grid>
        <Grid container xs={12} spacing={2} mt={2} sx={{ display: 'flex' }}>
          {nonTeachingStaffs?.map((item, i) => (
            <Grid key={i} item xs={12} sm={6} md={4}>
              <Card sx={{ position: 'relative', p: 1.5 }}>
                <CardContent sx={{ pt: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Avatar src={item.img} sx={{ mb: 3, width: 100, height: 100 }} />
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      {item.staff?.staff_name}
                    </Typography>
                    <Typography variant="h6">{item.staff.email}</Typography>

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
                        <Typography variant="h4">60</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Present</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Typography variant="h4">17</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Absent</Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', mt: 1 }}
                    >
                      <Grid>
                        <Button
                          component={Link}
                          state={{ staff: item.staff }}
                          to={`non-teaching-staff-attendances/${item.staff?.staff_id}`}
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
      </Grid>
    </>
  );
};

NonTeachingStaffCard.propTypes = {
  nonTeachingStaffs: PropTypes.any
};

export default NonTeachingStaffCard;
