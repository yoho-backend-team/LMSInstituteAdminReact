// ** React Imports
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Icon from 'components/icon';
import { IconCalendar } from '@tabler/icons';
import { Button } from '@mui/material';
import OptionsMenu from 'components/option-menu';

const LiveClassCard = () => {
  const cardData = [
    // Add your card data here
    // For example:
    {
      class_name: 'Introduction to App',
      location: 'Kumbakonam',
      duration: '5hr',
      dateandtime: 'Sun Jun 26, 2024 / 10:00 am',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg', // Change the avatar URL here
      batch_class: {
        batch_student: [
          {
            first_name: 'John',
            avatar: 'https://randomuser.me/api/portraits/men/2.jpg' // Change the avatar URL for the student
          },
          {
            first_name: 'Jane',
            avatar: 'https://randomuser.me/api/portraits/women/3.jpg' // Change the avatar URL for the student
          }
          // Add more students as needed
        ]
      }
    },
    {
      class_name: 'Introduction to web',
      location: 'Kumbakonam',
      duration: '2hr',
      dateandtime: 'Sun Jun 26, 2024 / 10:00 am',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      batch_class: {
        batch_student: [
          {
            first_name: 'John',
            avatar: 'https://randomuser.me/api/portraits/men/2.jpg' // Change the avatar URL for the student
          },
          {
            first_name: 'Jane',
            avatar: 'https://randomuser.me/api/portraits/women/3.jpg' // Change the avatar URL for the student
          }
          // Add more students as needed
        ]
      }
    },
    {
      class_name: 'Block chain',
      location: 'Kumbakonam',
      duration: '3.5hr',
      dateandtime: 'Sun Jun 26, 2024 / 10:00 am',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      batch_class: {
        batch_student: [
          {
            first_name: 'John',
            avatar: 'https://randomuser.me/api/portraits/men/2.jpg' // Change the avatar URL for the student
          },
          {
            first_name: 'Jane',
            avatar: 'https://randomuser.me/api/portraits/women/3.jpg' // Change the avatar URL for the student
          }
          // Add more students as needed
        ]
      }
    },
    {
      class_name: 'Figma',
      location: 'Kumbakonam',
      duration: '5hr',
      dateandtime: 'Sun Jun 26, 2024 / 10:00 am',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      batch_class: {
        batch_student: [
          {
            first_name: 'John',
            avatar: 'https://randomuser.me/api/portraits/men/2.jpg' // Change the avatar URL for the student
          },
          {
            first_name: 'Jane',
            avatar: 'https://randomuser.me/api/portraits/women/3.jpg' // Change the avatar URL for the student
          }
          // Add more students as needed
        ]
      }
    },
    {
      class_name: 'Analysis',
      location: 'Kumbakonam',
      duration: '1hr',
      dateandtime: 'Sun Jun 26, 2024 / 10:00 am',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      batch_class: {
        batch_student: [
          {
            first_name: 'John',
            avatar: 'https://randomuser.me/api/portraits/men/2.jpg' // Change the avatar URL for the student
          },
          {
            first_name: 'Jane',
            avatar: 'https://randomuser.me/api/portraits/women/3.jpg' // Change the avatar URL for the student
          }
          // Add more students as needed
        ]
      }
    }
    // Add more card data as needed
  ];

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
    <Grid container spacing={6}>
      {cardData?.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ p: 3 }}>
            <Grid container direction="column" spacing={1}>
              <Grid item sx={{ alignItems: 'center', justifyContent: 'space-between', display: 'flex', mt: 1 }}>
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
                    {card?.class_name}
                  </Typography>
                </Box>
                <Box>
                  <OptionsMenu
                    menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
                    iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
                    options={[
                      {
                        // to: `/apps/invoice/edit/${row.id}`,
                        text: 'Edit',
                        icon: <Icon icon="tabler:edit" />
                        // menuItemProps: {
                        //   onClick: () => {
                        //     handleEdit();
                        //   }
                        // }
                      },
                      {
                        // to: `/apps/invoice/delete/${row.id}`,
                        text: 'Delete',
                        icon: <Icon icon="mdi:delete-outline" />
                        // menuItemProps: {
                        //   onClick: () => {
                        //     setDeleteDialogOpen(true);
                        //   }
                        // }
                      }
                    ]}
                  />
                </Box>
              </Grid>
              <Grid item sx={{ justifyContent: 'center', display: 'flex', mb: 2, mt: 1 }}>
                <AvatarGroup className="pull-up" max={4}>
                  {card?.batch_class?.batch_student?.map((student, studentIndex) => (
                    <Avatar key={studentIndex} src={student} alt={student?.first_name} />
                  ))}
                </AvatarGroup>
              </Grid>
              <Grid item justifyContent="center" display="flex">
                <Typography>8+ Students on this class</Typography>
              </Grid>
              <Grid item justifyContent="center" display="flex" mb={2}>
                <Typography variant="h6" sx={{ alignItems: 'center', display: 'flex' }}>
                  {' '}
                  <IconCalendar />
                  {card?.class_date} / {convertTo12HourFormat(card?.start_time)} to {convertTo12HourFormat(card?.end_time)}{' '}
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
      ))}
    </Grid>
  );
};

export default LiveClassCard;
