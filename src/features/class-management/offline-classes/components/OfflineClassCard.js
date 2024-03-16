import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { IconCalendar } from '@tabler/icons';
import Icon from 'components/icon';
import DeleteDialog from 'components/modal/DeleteModel';
import OptionsMenu from 'components/option-menu';
import { selectOfflineClasses } from '../redux/offlineClassSelectors';
import { getAllOfflineClasses } from '../redux/offlineClassThunks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OfflineClassEditModal from './edit-OfflineClass/OfflineClassEditModal';

const OfflineClassCard = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const offlineClasses = useSelector(selectOfflineClasses);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const dispatch = useDispatch();
  console.log(offlineClasses);
  useEffect(() => {
    const data = {
      type: 'offline',
      branch_id: selectedBranchId
    };
    dispatch(getAllOfflineClasses(data));
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
        {offlineClasses?.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ p: 3 }}>
              <Grid container direction="column" spacing={1}>
                <Grid item sx={{alignItems:"center", justifyContent: 'space-between', display: 'flex', mt: 1 }}>
                  <Box sx={{display:"flex",alignItems:"center"}}>
                    <Typography
                      sx={{
                        mb:0,
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
                          icon: <Icon icon="tabler:edit" />,
                          menuItemProps: {
                            onClick: () => {
                              handleEdit();
                            }
                          }
                        },
                        {
                          // to: `/apps/invoice/delete/${row.id}`,
                          text: 'Delete',
                          icon: <Icon icon="mdi:delete-outline" />,
                          menuItemProps: {
                            onClick: () => {
                              setDeleteDialogOpen(true);
                            }
                          }
                        }
                      ]}
                    />
                  </Box>
                </Grid>
                <Grid item sx={{ justifyContent: 'center', display: 'flex', mb: 2,mt:1 }}>
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
        <OfflineClassEditModal  selectedBranchId={selectedBranchId}
            offlineClasses={offlineClasses} open={isEditModalOpen} handleEditClose={handleEditClose} />
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

export default OfflineClassCard;
