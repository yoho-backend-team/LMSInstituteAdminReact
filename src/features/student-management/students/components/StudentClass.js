// ** React Imports
import { Button } from '@mui/material';
// import Avatar from '@mui/material/Avatar';
// import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { IconCalendar } from '@tabler/icons';

const LiveClassCard = ({student}) => {
  // const cardData = [
  //   // Add your card data here
  //   // For example:
  //   {
  //     class_name: 'Introduction to App',
  //     location: 'Kumbakonam',
  //     duration: '5hr',
  //     class_date: '2024-03-04',

  //     image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
  //     avatar: 'https://randomuser.me/api/portraits/men/1.jpg', // Change the avatar URL here
  //     batch_class: {
  //       batch_student: [
  //         {
  //           first_name: 'John',
  //           avatar: 'https://randomuser.me/api/portraits/men/2.jpg' // Change the avatar URL for the student
  //         },
  //         {
  //           first_name: 'Jane',
  //           avatar: 'https://randomuser.me/api/portraits/women/3.jpg' // Change the avatar URL for the student
  //         }
  //         // Add more students as needed
  //       ]
  //     }
  //   },
  //   {
  //     class_name: 'Introduction to web',
  //     location: 'Kumbakonam',
  //     duration: '2hr',
  //     class_date: '2024-03-04',
  //     image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
  //     avatar: '/images/avatars/1.png',
  //     batch_class: {
  //       batch_student: [
  //         {
  //           first_name: 'John',
  //           avatar: 'https://randomuser.me/api/portraits/men/2.jpg' // Change the avatar URL for the student
  //         },
  //         {
  //           first_name: 'Jane',
  //           avatar: 'https://randomuser.me/api/portraits/women/3.jpg' // Change the avatar URL for the student
  //         }
  //         // Add more students as needed
  //       ]
  //     }
  //   },
  //   {
  //     class_name: 'Block chain',
  //     location: 'Kumbakonam',
  //     duration: '3.5hr',
  //     class_date: '2024-03-04',
  //     image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
  //     avatar: '/images/avatars/1.png',
  //     batch_class: {
  //       batch_student: [
  //         {
  //           first_name: 'John',
  //           avatar: 'https://randomuser.me/api/portraits/men/2.jpg' // Change the avatar URL for the student
  //         },
  //         {
  //           first_name: 'Jane',
  //           avatar: 'https://randomuser.me/api/portraits/women/3.jpg' // Change the avatar URL for the student
  //         }
  //         // Add more students as needed
  //       ]
  //     }
  //   },
  //   {
  //     class_name: 'Figma',
  //     location: 'Kumbakonam',
  //     duration: '5hr',
  //     class_date: '2024-03-04',
  //     image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
  //     avatar: '/images/avatars/1.png',
  //     batch_class: {
  //       batch_student: [
  //         {
  //           first_name: 'John',
  //           avatar: 'https://randomuser.me/api/portraits/men/2.jpg' // Change the avatar URL for the student
  //         },
  //         {
  //           first_name: 'Jane',
  //           avatar: 'https://randomuser.me/api/portraits/women/3.jpg' // Change the avatar URL for the student
  //         }
  //         // Add more students as needed
  //       ]
  //     }
  //   },
  //   {
  //     class_name: 'Analysis',
  //     location: 'Kumbakonam',
  //     duration: '1hr',
  //     class_date: '2024-03-04',
  //     start_time:' 5:NaN AM',
  //     image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
  //     avatar: '/images/avatars/1.png',
  //     batch_class: {
  //       batch_student: [
  //         {
  //           first_name: 'John',
  //           avatar: 'https://randomuser.me/api/portraits/men/2.jpg' // Change the avatar URL for the student
  //         },
  //         {
  //           first_name: 'Jane',
  //           avatar: 'https://randomuser.me/api/portraits/women/3.jpg' // Change the avatar URL for the student
  //         }
  //         // Add more students as needed
  //       ]
  //     }
  //   }
  //   // Add more card data as needed
  // ];

  // const data:{student?.student_batch?.batch_class?.class}

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
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 3 }}>
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
                    {student?.student_batch?.batch_class?.class.class_name}
                  </Typography>
                </Box>
              </Grid>
              <Grid item sx={{ justifyContent: 'center', display: 'flex', mb: 2, mt: 1 }}>
                {/* <AvatarGroup className="pull-up" max={4}>
                  {item?.student?.student_batch?.map((student, studentIndex) => (
                    <Avatar key={studentIndex} src={student} alt={student?.first_name} />
                  ))}
                </AvatarGroup> */}
              </Grid>
              <Grid item justifyContent="center" display="flex">
                <Typography>8+ Students on this class</Typography>
              </Grid>
              <Grid item justifyContent="center" display="flex" mb={2}>
                <Typography variant="h6" sx={{ alignItems: 'center', display: 'flex' }}>
                  {' '}
                  <IconCalendar />
                  {student?.student_batch?.batch_class?.class.class_date} / {convertTo12HourFormat(student?.student_batch?.batch_class?.start_time)} to {convertTo12HourFormat(student?.student_batch?.batch_class?.end_time)}{' '}
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

    </Grid>
  );
};

export default LiveClassCard;
