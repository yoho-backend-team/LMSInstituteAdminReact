import { Avatar, AvatarGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { IconCalendar } from '@tabler/icons';
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

  function convertTo12HourFormat(timestamp) {
    // Create a new Date object from the timestamp string
    const date = new Date(timestamp);

    // Extract hours and minutes from the Date object
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();

    // Convert hours to 12-hour format and determine AM/PM
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert midnight (0) to 12

    // Pad minutes with leading zero if needed
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Return the formatted time string
    return hours + ':' + minutes + ' ' + meridiem;
  }

  return (
    <Grid container spacing={2}>
      {studentAttendance?.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ p: 3, position: 'relative', borderTop: card.status === 'pending' ? '4px solid green' : '4px solid #7cf2e1' }}>
            <Grid container direction="column" spacing={1}>
              <Grid item sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography
                    sx={{
                      mb: 0,
                      flexShrink: 2,
                      // whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      textAlign: 'center'
                    }}
                    variant="h3"
                    gutterBottom
                    textAlign="center"
                  >
                    {card?.class_name}
                  </Typography>
                </Box>
              </Grid>

              <Grid item sx={{ justifyContent: 'center', display: 'flex', mb: 2, mt: 2 }}>
                <AvatarGroup className="pull-up" max={4}>
                  {card?.batch_class?.batch?.institute_batch_student?.map((student) => {
                    return (
                      <Avatar
                        key={student.id}
                        src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${student?.student?.image}`}
                        alt={`${student?.student?.first_name} ${student?.student?.last_name}`}
                      />
                    );
                  })}
                </AvatarGroup>
              </Grid>

              <Grid item justifyContent="center" display="flex">
                <Typography sx={{ fontWeight: '500' }}>
                  {card?.batch_class?.batch?.institute_batch_student?.length ?? 0} Students on this class
                </Typography>
              </Grid>
              <Grid item justifyContent="center" alignItems="center" sx={{ verticalAlign: 'center' }} display="flex" mb={2}>
                <Box>
                  <IconCalendar />
                </Box>
                <Box sx={{ ml: 1 }}>
                  <Typography variant="h6" sx={{ alignItems: 'center', display: 'flex', fontWeight: 'bold' }}>
                    {card?.class_date} / {convertTo12HourFormat(card?.start_time)} to {convertTo12HourFormat(card?.end_time)}{' '}
                  </Typography>
                </Box>
              </Grid>
              <Grid container p={1} justifyContent="space-between">
                <Box>
                  <Button
                    sx={{ px: 2 }}
                    variant="contained"
                    size="medium"
                    component={Link}
                    state={{ id: card?.class_id }}
                    to={`student-attendances/${card?.class_id}`}
                  >
                    View Attendance
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomChip rounded size="medium" skin="light" color={'secondary'} label={card?.type} />
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StudentAttendanceCard;
