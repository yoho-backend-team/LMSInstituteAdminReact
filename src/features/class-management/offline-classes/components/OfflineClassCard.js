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
import OfflineClassDeleteModal from 'components/modal/DeleteModel';
import OptionsMenu from 'components/option-menu';
import { selectLiveClasses } from 'features/class-management/live-classes/redux/liveClassSelectors';
import { getAllLiveClasses } from 'features/class-management/live-classes/redux/liveClassThunks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LiveClassEditModal from './edit-OfflineClass/OfflineClassEditModal';
import { deleteOfflineClass } from '../services/offlineClassServices';

const OfflineClassCard = () => {

   // Props
   const {  offline, setOfflineClassRefetch } = props;

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const liveClasses = useSelector(selectLiveClasses);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const dispatch = useDispatch();

  const [offlineClassDeleteModelOpen, setOfflineClassDeleteModelOpen] = useState(false);
  const [selectedOfflineClassDeleteId, setSelectedOfflineClassDeleteId] = useState(null);

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

    // Memoize the handleDelete function to prevent unnecessary re-renders
    const handleDelete = useCallback((itemId) => {
      setSelectedOfflineClassDeleteId(itemId);
      setOfflineClassDeleteModelOpen(true);
    }, []);

  // Handle branch deletion
  const handleOfflineClassDelete = async () => {
    const data = { id: selectedOfflineClassDeleteId };
    const result = await deleteOfflineClass(data);
    if (result.success) {
      toast.success(result.message);
      setOfflineClassRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };

   // Memoized variables
   const offlineLogoSrc = useMemo(() => `${process.env.REACT_APP_PUBLIC_API_URL}/storage/${offline?.logo}`, [offline]);

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
    <>
      <Grid container spacing={2}>

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
                      {offline?.class_name}
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
                            onClick: () => handleDelete(category?.id)
                          }
                        }
                      ]}
                    />
                  </Box>
                </Grid>
                <Grid item sx={{ justifyContent: 'center', display: 'flex', mb: 2,mt:1 }}>
                    {/* Offline Logo */}
                  <AvatarGroup className="pull-up" max={4}>
                      <Avatar src={offlineLogoSrc} alt={category?.first_name} />
                  </AvatarGroup>
                </Grid>
                <Grid item justifyContent="center" display="flex">
                  <Typography>8+ Students on this class</Typography>
                </Grid>
                <Grid item justifyContent="center" display="flex" mb={2}>
                  <Typography variant="h6" sx={{ alignItems: 'center', display: 'flex' }}>
                    {' '}
                    <IconCalendar />
                    {offline?.class_date} / {convertTo12HourFormat(card?.start_time)} to {convertTo12HourFormat(card?.end_time)}{' '}
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

        <LiveClassEditModal open={isEditModalOpen} handleEditClose={handleEditClose} />
        <OfflineClassDeleteModal
          open={offlineClassDeleteModelOpen}
          setOpen={setOfflineClassDeleteModelOpen}
          description="Are you sure you want to delete this item?"
          title="Delete"
          handleSubmit={handleOfflineClassDelete}
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
