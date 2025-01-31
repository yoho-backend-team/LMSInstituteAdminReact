import { Avatar, AvatarGroup, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { IconCalendar } from '@tabler/icons';
import CustomChip from 'components/mui/chip';
import { Link } from 'react-router-dom';
import { getImageUrl } from 'utils/imageUtils';
import { imagePlaceholder, profilePlaceholder } from 'utils/placeholders';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { formatStudentsCount } from 'utils/format';


const StudentAttendanceCard = ({ studentAttendance }) => {
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

  const dummyStudentAttendance = [
    {
      class_id: 1,
      class_name: 'Mathematics 101',
      status: 'completed',
      class_date: '2024-05-25',
      start_time: '2024-05-25T08:00:00Z',
      end_time: '2024-05-25T09:00:00Z',
      type: 'Lecture',
      batch_class: {
        batch: {
          institute_batch_student: [
            { id: 1, student: { first_name: 'John', last_name: 'Doe', image: 'john_doe.jpg' } },
            { id: 2, student: { first_name: 'Jane', last_name: 'Smith', image: 'jane_smith.jpg' } },
            // ... add more students as needed
          ]
        }
      }
    },
    {
      class_id: 2,
      class_name: 'Physics 202',
      status: 'pending',
      class_date: '2024-05-26',
      start_time: '2024-05-26T10:00:00Z',
      end_time: '2024-05-26T11:00:00Z',
      type: 'Lab',
      batch_class: {
        batch: {
          institute_batch_student: [
            { id: 3, student: { first_name: 'Alice', last_name: 'Johnson', image: 'alice_johnson.jpg' } },
            { id: 4, student: { first_name: 'Bob', last_name: 'Brown', image: 'bob_brown.jpg' } },
            // ... add more students as needed
          ]
        }
      }
    },
    {
      class_id: 3,
      class_name: 'Chemistry 303',
      status: 'completed',
      class_date: '2024-05-27',
      start_time: '2024-05-27T12:00:00Z',
      end_time: '2024-05-27T13:00:00Z',
      type: 'Lecture',
      batch_class: {
        batch: {
          institute_batch_student: [
            { id: 5, student: { first_name: 'Charlie', last_name: 'Williams', image: 'charlie_williams.jpg' } },
            { id: 6, student: { first_name: 'Dana', last_name: 'Davis', image: 'dana_davis.jpg' } },
            // ... add more students as needed
          ]
        }
      }
    },
    {
      class_id: 4,
      class_name: 'Biology 404',
      status: 'pending',
      class_date: '2024-05-28',
      start_time: '2024-05-28T14:00:00Z',
      end_time: '2024-05-28T15:00:00Z',
      type: 'Seminar',
      batch_class: {
        batch: {
          institute_batch_student: [
            { id: 7, student: { first_name: 'Eve', last_name: 'Miller', image: 'eve_miller.jpg' } },
            { id: 8, student: { first_name: 'Frank', last_name: 'Garcia', image: 'frank_garcia.jpg' } },
            // ... add more students as needed
          ]
        }
      }
    },
    {
      class_id: 5,
      class_name: 'History 505',
      status: 'completed',
      class_date: '2024-05-29',
      start_time: '2024-05-29T16:00:00Z',
      end_time: '2024-05-29T17:00:00Z',
      type: 'Discussion',
      batch_class: {
        batch: {
          institute_batch_student: [
            { id: 9, student: { first_name: 'Grace', last_name: 'Martinez', image: 'grace_martinez.jpg' } },
            { id: 10, student: { first_name: 'Hank', last_name: 'Lopez', image: 'hank_lopez.jpg' } },
            // ... add more students as needed
          ]
        }
      }
    },
    // Add 5 more classes to make a total of 10
    {
      class_id: 6,
      class_name: 'Geography 606',
      status: 'completed',
      class_date: '2024-05-30',
      start_time: '2024-05-30T18:00:00Z',
      end_time: '2024-05-30T19:00:00Z',
      type: 'Lecture',
      batch_class: {
        batch: {
          institute_batch_student: [
            { id: 11, student: { first_name: 'Ivy', last_name: 'Clark', image: 'ivy_clark.jpg' } },
            { id: 12, student: { first_name: 'Jack', last_name: 'Lewis', image: 'jack_lewis.jpg' } },
            // ... add more students as needed
          ]
        }
      }
    },
    {
      class_id: 7,
      class_name: 'Computer Science 707',
      status: 'pending',
      class_date: '2024-05-31',
      start_time: '2024-05-31T20:00:00Z',
      end_time: '2024-05-31T21:00:00Z',
      type: 'Workshop',
      batch_class: {
        batch: {
          institute_batch_student: [
            { id: 13, student: { first_name: 'Karen', last_name: 'Walker', image: 'karen_walker.jpg' } },
            { id: 14, student: { first_name: 'Leo', last_name: 'Hall', image: 'leo_hall.jpg' } },
            // ... add more students as needed
          ]
        }
      }
    },
    {
      class_id: 8,
      class_name: 'Literature 808',
      status: 'completed',
      class_date: '2024-06-01',
      start_time: '2024-06-01T22:00:00Z',
      end_time: '2024-06-01T23:00:00Z',
      type: 'Lecture',
      batch_class: {
        batch: {
          institute_batch_student: [
            { id: 15, student: { first_name: 'Mona', last_name: 'Allen', image: 'mona_allen.jpg' } },
            { id: 16, student: { first_name: 'Nate', last_name: 'Young', image: 'nate_young.jpg' } },
            // ... add more students as needed
          ]
        }
      }
    },
    {
      class_id: 9,
      class_name: 'Philosophy 909',
      status: 'pending',
      class_date: '2024-06-02',
      start_time: '2024-06-02T00:00:00Z',
      end_time: '2024-06-02T01:00:00Z',
      type: 'Discussion',
      batch_class: {
        batch: {
          institute_batch_student: [
            { id: 17, student: { first_name: 'Olivia', last_name: 'King', image: 'olivia_king.jpg' } },
            { id: 18, student: { first_name: 'Paul', last_name: 'Wright', image: 'paul_wright.jpg' } },
            // ... add more students as needed
          ]
        }
      }
    },
    {
      class_id: 10,
      class_name: 'Economics 1010',
      status: 'completed',
      class_date: '2024-06-03',
      start_time: '2024-06-03T02:00:00Z',
      end_time: '2024-06-03T03:00:00Z',
      type: 'Lecture',
      batch_class: {
        batch: {
          institute_batch_student: [
            { id: 19, student: { first_name: 'Quinn', last_name: 'Scott', image: 'quinn_scott.jpg' } },
            { id: 20, student: { first_name: 'Rachel', last_name: 'Adams', image: 'rachel_adams.jpg' } },
            // ... add more students as needed
          ]
        }
      }
    }
  ];
  
  
  console.log(studentAttendance,"studentAttendance")
  return (
    <Grid container spacing={2}>
      {studentAttendance?.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ p: 3, position: 'relative', borderTop: card.status === 'pending' ? '4px solid green' : '4px solid #7cf2e1', boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)", minHeight: "267px",
             transition: 'transform 0.3s, box-shadow 0.3s',
             '&:hover': {
               transform: 'translateY(-10px)',
               boxShadow: "0 0.5rem 1.5rem rgba(38,43,67,.2)"
             },
             background:'linear-gradient(to right, #5f2c82, ##49a09d )'
           }}>
            <Grid container direction="column" spacing={1}>
              <Grid item sx={{ alignItems: 'center', display: 'flex', mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "flex-start", width: "100%"}}>
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
                    {card?.student_class?.class_name} - class
                  </Typography>
                  
                </Box>
              </Grid>

              <Grid item sx={{ justifyContent: "space-between", display: 'flex', mb: 2, mt: 2 }}>
                <AvatarGroup className="pull-up" max={3}>
                  {card?.student_class?.batch?.student.length !==0 ? card?.student_class?.batch?.student?.map((student) => {
                    return (
                      <Avatar
                        key={student.id}
                        src={`${student?.image ? getImageUrl(student?.image):profilePlaceholder}`}
                        alt={`${student?.full_name}`}
                      />
                    );
                  } )
                :
                <Avatar src={undefined} alt="User Avatar" >
                  N/A
                </Avatar>
                }
                </AvatarGroup>
                <Typography sx={{ fontWeight: '500' }}>
                  { formatStudentsCount(card?.student_class?.batch?.student?.length)}
                </Typography>
              </Grid>

              {/* <Grid item justifyContent="center" display="flex">
                <Typography sx={{ fontWeight: '500' }}>
                  { formatStudentsCount(card?.student_class?.batch?.student?.length)}
                </Typography>
              </Grid> */}
             
              <Grid item justifyContent="space-between" alignItems="center" sx={{ verticalAlign: 'center' }} display="flex" mb={2}>
                  <Tooltip title="start date" >
                    <Box sx={{  display: 'flex', flexDirection: "row", gap: "3px" }}>
                      <IconCalendar />
                      <Typography variant="h6" sx={{ alignItems: 'center', display: 'flex', fontWeight: 'bold' }}>
                      {new Date(card?.student_class?.start_date).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Tooltip>

                  <Typography sx={{ fontWeight: "bold"}} > - </Typography>

                  <Tooltip title="Start time" >
                    <Box sx={{ display: 'flex', gap: "3px", alignItems: "center"}} >
                      <ScheduleIcon />
                      <Typography variant="h6" sx={{ fontWeight: "bold"}} >
                      {new Date(card?.student_class?.start_time).toLocaleTimeString()}
                      </Typography>
                    </Box>
                  </Tooltip>

                  <Typography sx={{ fontWeight: "bold"}} >to</Typography>

                  <Tooltip title="End time" >
                    <Box sx={{ display: "flex", gap: "3px", alignItems: "center"}} >
                        <ScheduleIcon />
                        <Typography variant="h6" sx={{ fontWeight: "bold"}} >
                         {new Date(card?.student_class?.end_time).toLocaleTimeString()}
                        </Typography>
                    </Box>
                  </Tooltip>

                </Grid>
              <Grid container p={1} justifyContent="space-between">
                <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%"}}>
                  <Button
                    sx={{ px: 2 }}
                    variant="contained"
                    size="medium"
                    component={Link}
                    state={{ id: card?.uuid }}
                    to={`student-attendances/${card?.uuid}`}
                  >
                    View Attendance
                  </Button>
                </Box>
                {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomChip rounded size="medium" skin="light" color={'secondary'} label={card?.type} />
                </Box> */}
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StudentAttendanceCard;
