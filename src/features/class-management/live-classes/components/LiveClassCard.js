import FileCopyIcon from '@mui/icons-material/FileCopy';
import { useCallback } from 'react';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { IconCalendar } from '@tabler/icons';
import Icon from 'components/icon';
import OptionsMenu from 'components/option-menu';
import toast from 'react-hot-toast';
import { selectLiveClasses } from 'features/class-management/live-classes/redux/liveClassSelectors';
import { getAllLiveClasses } from 'features/class-management/live-classes/redux/liveClassThunks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LiveClassEditModal from './edit-LiveClass/LiveClassEditModal';
import { deleteLiveClass } from '../services/liveClassServices';
import { Link } from 'react-router-dom';
import LiveClassDeleteModel from 'components/modal/DeleteModel';

const LiveClassCard = ({ refetch, setRefetch }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const liveClasses = useSelector(selectLiveClasses);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [selectedClass, setSelectedClass] = useState('');

  const [liveclassDeleteModelOpen, setLiveclassDeleteModelOpen] = useState(false);
  const [selectedLiveclassDeleteId, setSelectedLiveclassDeleteId] = useState(null);

  const dispatch = useDispatch();
  console.log(liveClasses);

  // Memoize the handleDelete function to prevent unnecessary re-renders
  const handleDelete = useCallback((itemId) => {
    setSelectedLiveclassDeleteId(itemId);
    setLiveclassDeleteModelOpen(true);
  }, []);

  // Handle branch deletion
  const handleLiveclassDelete = async () => {
    const data = { class_id: selectedLiveclassDeleteId };
    const result = await deleteLiveClass(data);
    if (result.success) {
      toast.success(result.message);
      setRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };

  useEffect(() => {
    const data = {
      type: 'live',
      branch_id: selectedBranchId
    };
    dispatch(getAllLiveClasses(data));
  }, [dispatch, selectedBranchId, refetch]);

  const handleEditClose = () => {
    setEditModalOpen(false);
  };
  const handleEdit = () => {
    setEditModalOpen(true);
  };


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
  console.log(selectedClass);

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    console.log(`Link copied for card at index ${text}`);
    toast.success('Link copied to clipboard');
  };

  return (
    <>
      <Grid container spacing={2}>
        {liveClasses?.map((card, index) => (
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
                        // textOverflow: 'ellipsis',
                        // maxWidth: '230px'
                        // display: 'flex',
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
                <Grid item sx={{ justifyContent: 'center', display: 'flex', mb: 2, mt: 1 }}>
                  <AvatarGroup className="pull-up" max={4}>
                    {card?.batch_class?.batch_student?.map((student, studentIndex) => {
                      return (
                        <Avatar
                          key={studentIndex}
                          src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${student?.student?.image}`}
                          alt={student?.student?.first_name}
                        />
                      );
                    })}
                  </AvatarGroup>
                </Grid>

                <Grid item justifyContent="center" display="flex">
                  <Typography sx={{ fontWeight: '500' }}>{card?.batch_class?.batch_student?.length ?? 0} Students on this class</Typography>
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

                <Grid sx={{ mb: 1 }}>
                  <Box sx={{ alignItems: 'center', display: 'flex' }}>
                    <IconButton onClick={() => handleCopyText(card.class_link)} sx={{ color: 'primary.main' }} aria-label="copy-link">
                      <FileCopyIcon />
                    </IconButton>
                    <Typography>{card?.class_link}</Typography>
                  </Box>
                </Grid>

                <Grid container p={1} justifyContent="space-between" alignItems={'center'}>
                  <Box>
                    <Button
                      variant="contained"
                      size="medium"
                      component={Link}
                      state={{ id: card?.class_id }}
                      to={`live-classes/${card?.class_id}`}
                    >
                      View More
                    </Button>
                  </Box>
                  <Box>
                    <OptionsMenu
                      menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
                      iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
                      options={[
                        {
                          text: 'View',
                          icon: <Icon icon="tabler:eye" fontSize={20} />,
                          menuItemProps: {
                            component: Link,
                            to: `live-classes/view`,
                            state: { id: card?.class_id }
                          }
                        },
                        {
                          // to: `/apps/invoice/edit/${row.id}`,
                          text: 'Edit',
                          icon: <Icon icon="tabler:edit" />,
                          menuItemProps: {
                            onClick: () => {
                              setSelectedClass(card);
                              handleEdit();
                            }
                          }
                        },
                        {
                          // to: `/apps/invoice/delete/${row.id}`,
                          text: 'Delete',
                          icon: <Icon icon="mdi:delete-outline" />,
                          menuItemProps: {
                            onClick: () => handleDelete(card?.class_id)
                          }
                        }
                      ]}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
        <LiveClassEditModal
          // liveClasses={liveClasses}
          selectedBranchId={selectedBranchId}
          liveClasses={selectedClass}
          open={isEditModalOpen}
          handleEditClose={handleEditClose}
          setRefetch={setRefetch}
        />
        <LiveClassDeleteModel
          open={liveclassDeleteModelOpen}
          setOpen={setLiveclassDeleteModelOpen}
          description="Are you sure you want to delete this Live Class? "
          title="Delete"
          handleSubmit={handleLiveclassDelete}
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
