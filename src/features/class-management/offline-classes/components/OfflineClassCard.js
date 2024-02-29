import TimerIcon from '@mui/icons-material/Timer';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Icon from 'components/icon';
import DeleteDialog from 'components/modal/DeleteModel';
import CustomChip from 'components/mui/chip';
import { useState } from 'react';
import LiveClassEditModal from './edit-OfflineClass/OfflineClassEditModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectLiveClasses } from 'features/class-management/live-classes/redux/liveClassSelectors';
import { getAllLiveClasses } from 'features/class-management/live-classes/redux/liveClassThunks';
import { useEffect } from 'react';

const LiveClassCard = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const liveClasses = useSelector(selectLiveClasses);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const dispatch = useDispatch();
  console.log(liveClasses);
  useEffect(() => {
    const data = {
      type: 'offline',
      branch_id: selectedBranchId
    };
    dispatch(getAllLiveClasses(data));
  }, [dispatch, selectedBranchId]);

  const handleEditClose = () => {
    setEditModalOpen(false);
  };
  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

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

  // function calculateDuration(startTimestamp, endTimestamp) {
  //   // Convert the timestamps to Date objects
  //   const startDate = new Date(startTimestamp);
  //   const endDate = new Date(endTimestamp);

  //   // Calculate the difference in milliseconds
  //   const durationInMilliseconds = endDate - startDate;

  //   // Convert milliseconds to days, hours, minutes, and seconds
  //   const millisecondsPerSecond = 1000;
  //   const millisecondsPerMinute = millisecondsPerSecond * 60;
  //   const millisecondsPerHour = millisecondsPerMinute * 60;
  //   const millisecondsPerDay = millisecondsPerHour * 24;

  //   // const days = Math.floor(durationInMilliseconds / millisecondsPerDay);
  //   const hours = Math.floor((durationInMilliseconds % millisecondsPerDay) / millisecondsPerHour);
  //   const minutes = Math.floor((durationInMilliseconds % millisecondsPerHour) / millisecondsPerMinute);
  //   // const seconds = Math.floor((durationInMilliseconds % millisecondsPerMinute) / millisecondsPerSecond);

  //   // Return the duration as an object
  //   return hours + ' HR ' + minutes + ' MIN';

  // }

  return (
    <>
      <Grid container spacing={2}>
        {liveClasses?.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                position: 'relative',
                borderTop: card?.status === 'completed' ? '4px solid green' : '4px solid #7cf2e1'
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    mt: 2.55,
                    mb: 1.85,
                    display: 'flex',
                    // flexWrap: 'wrap',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h3" sx={{ flexShrink: 1 }}>
                      {card?.class_name}
                    </Typography>
                    <Typography variant="body2">{card?.location}</Typography>
                  </Box>

                  {/* <Box
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
                    <Typography variant="body2">{calculateDuration(card?.start_time, card?.end_time)}</Typography>
                  </Box> */}
                </Box>

                <Box sx={{ mb: 2.55, display: 'flex', alignItems: 'center' }}>
                  <TimerIcon sx={{ marginRight: 1 }} />
                  <Typography variant="body2">
                    {card?.class_date} / {convertTo12HourFormat(card?.start_time)} to {convertTo12HourFormat(card?.end_time)}{' '}
                  </Typography>
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
                  <AvatarGroup max={4} sx={{ width: 40, height: 40, '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                    {card?.batch_class?.batch_student?.map((student, studentIndex) => (
                      <Avatar key={studentIndex} src={student} alt={student?.first_name} />
                    ))}
                  </AvatarGroup>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CustomChip rounded size="small" skin="light" color={'secondary'} label={card.class_id} />
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />

                <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', mt: 2 }}>
                  <IconButton aria-label="capture screenshot" color="primary" sx={{ ml: 1 }} href="view">
                    <Icon icon="tabler:eye" />
                  </IconButton>
                  <IconButton onClick={() => handleEdit()} aria-label="capture screenshot" color="secondary" sx={{ ml: 1 }}>
                    <Icon icon="tabler:edit" />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setDeleteDialogOpen(true);
                    }}
                    aria-label="capture screenshot"
                    color="error"
                  >
                    <Icon icon="tabler:archive-filled" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <LiveClassEditModal open={isEditModalOpen} handleEditClose={handleEditClose} />
        <DeleteDialog
          open={isDeleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          description="Are you sure you want to delete this item?"
          title="Delete"
        />
      </Grid>
      <Grid container justifyContent="flex-end" mt={2}>
        <div className="demo-space-y">
          <Pagination count={10} color="primary" />
        </div>
      </Grid>
    </>
  );
};

export default LiveClassCard;
