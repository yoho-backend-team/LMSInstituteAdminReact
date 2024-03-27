// ** MUI Imports
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from 'components/mui/avatar';
import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { getAllTeachingStaffAttendances } from '../redux/teachingStaffAttendanceThunks';
// import { selectTeachingStaffAttendances } from '../redux/teachingStaffAttendanceSelectors';

const TeachingStaffCard = ({ teachingStaffs }) => {
  return (
    <>
      <Grid>
        <Grid container xs={12} spacing={2} mt={2}>
          {teachingStaffs.map((item, i) => (
            <Grid key={i} item xs={12} sm={6} md={4}>
              <Card sx={{ position: 'relative', p: 1.5 }}>
                <CardContent sx={{ pt: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Avatar src={item.img} sx={{ mb: 3, width: 100, height: 100 }} />
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      {item.staff.staff_name}
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
                        <Typography variant="h4">40</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Present</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Typography variant="h4">15</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Absent</Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', mt: 1 }}
                    >
                      <Grid>
                        <Button
                          component={Link}
                          state={{ id: item.staff.staff_id }}
                          to={`teaching-staff-attendances/${item.staff.staff_id}`}
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

export default TeachingStaffCard;
