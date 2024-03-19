import TimerIcon from '@mui/icons-material/Timer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CustomChip from 'components/mui/chip';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectStudentAttendances } from '../redux/studentAttendanceSelectors';
import { getAllStudentAttendances } from '../redux/studentAttendanceThunks';

const StudentAttendanceCard = () => {
  const dispatch = useDispatch();
  const studentAttendance = useSelector(selectStudentAttendances);
  console.log(studentAttendance);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  useEffect(() => {
    dispatch(getAllStudentAttendances(selectedBranchId));
  }, [dispatch, selectedBranchId]);

  return (
    <Grid container spacing={2}>
      {studentAttendance &&
        studentAttendance?.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                position: 'relative',
                borderTop: item.status === 'active' ? '4px solid green' : '4px solid #7cf2e1'
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    mt: 2.55,
                    mb: 1.85,
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h3">{item?.class_name}</Typography>
                    <Typography variant="body2">{item?.type}</Typography>
                  </Box>

                  <Box
                    sx={{
                      borderRadius: '10%',
                      border: '1px solid grey',
                      padding: '3px 9px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '& .MuiTypography-body2': {
                        margin: 0
                      }
                    }}
                  >
                    <Typography variant="body2">{item?.duration}</Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2.55, display: 'flex', alignItems: 'center' }}>
                  <TimerIcon sx={{ marginRight: 1 }} />
                  <Typography variant="body2">{item?.start_time}</Typography>
                </Box>
                <Box
                  sx={{
                    gap: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  {/* <AvatarGroup max={4} sx={{ width: 40, height: 40, '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                  {item.friends.map((friend, friendIndex) => (
                    <Avatar key={friendIndex} src={friend} alt={`Friend ${friendIndex + 1}`} />
                  ))}
                </AvatarGroup> */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CustomChip rounded size="small" skin="light" color={'secondary'} label={'BATPATID00001'} />
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', textDecoration: 'none' }}>
                  <Button component={Link} to={'1'} variant="tonal" sx={{ px: 2 }}>
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

export default StudentAttendanceCard;
