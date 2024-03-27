// ** React Imports
import { Button } from '@mui/material';
// import Avatar from '@mui/material/Avatar';
// import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { IconCalendar } from '@tabler/icons';

const LiveClassCard = ({ staff }) => {
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
      {staff && staff.length > 0 ? (
        staff.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ p: 3, }}>
              <Grid container direction="column" spacing={1}>
                <Grid item sx={{ mt: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      sx={{
                        mb: 0,
                        flexShrink: 1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '230px'
                      }}
                      variant="h3"
                      gutterBottom
                      textAlign="center"
                    >
                      {item?.class?.class_name}
                    </Typography>
                  </Box>
                </Grid>
                {/* <Grid item sx={{ justifyContent: 'center', display: 'flex', mb: 2, mt: 1 }}>
              <AvatarGroup className="pull-up" max={4}>
                {card?.batch_class?.batch_student?.map((student, studentIndex) => (
                  <Avatar key={studentIndex} src={student} alt={student?.first_name} />
                ))}
              </AvatarGroup>
            </Grid> */}
                <Grid item justifyContent="center" display="flex">
                  <Typography>8+ Students on this class</Typography>
                </Grid>
                <Grid item justifyContent="center" display="flex" mb={2}>
                  <Typography variant="h6" sx={{ alignItems: 'center', display: 'flex' }}>
                    {' '}
                    <IconCalendar />
                    {item?.class.class_date} / {convertTo12HourFormat(item?.class?.start_time)} to{' '}
                    {convertTo12HourFormat(item?.class?.end_time)}{' '}
                  </Typography>
                </Grid>
                <Grid container p={2} justifyContent="center">
                  <Button variant="tonal" size="small" href="view">
                    View More
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Card sx={{ p: 3, justifyContent: 'center', display: 'flex' }}>
            <img src="https://t4.ftcdn.net/jpg/04/75/01/23/360_F_475012363_aNqXx8CrsoTfJP5KCf1rERd6G50K0hXw.jpg" alt="noData" />
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default LiveClassCard;
