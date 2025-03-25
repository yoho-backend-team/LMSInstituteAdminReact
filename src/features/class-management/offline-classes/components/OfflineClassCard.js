import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import { IconCalendar } from '@tabler/icons';
import Icon from 'components/icon';
import OfflineClassDeleteModel from 'components/modal/DeleteModel';
import OptionsMenu from 'components/option-menu';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteOfflineClass } from '../services/offlineClassServices';
import OfflineClassEditModal from './edit-OfflineClass/OfflineClassEditModal';
import { useSpinner } from 'context/spinnerContext';

const OfflineClassCard = ({ offlineClasses, setofflineClassRefetch, setRefetch }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState({});
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const { show, hide } = useSpinner();

  const [offlineClassDeleteModelOpen, setOfflineClassDeleteModelOpen] = useState(false);

  const [selectedOfflineClassDeleteId, setSelectedOfflineClassDeleteId] = useState(null);

  const handleEditClose = () => {
    setEditModalOpen(false);
  };
  const handleEdit = (data) => {
    setSelectedClass(data);
    setEditModalOpen(true);
  };

  const handleDelete = useCallback((itemId) => {
    setSelectedOfflineClassDeleteId(itemId);
    setOfflineClassDeleteModelOpen(true);
  }, []);

  const handleOfflineClassDelete = async () => {
    show();
    const data = { uuid: selectedOfflineClassDeleteId };
    const result = await deleteOfflineClass(data);
    if (result.success) {
      hide();
      toast.success(result.message);
      setRefetch((state) => !state);
    } else {
      hide();
      console.log('delete error', result.message);
      // toast.error(result.message);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        {offlineClasses?.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                p: 3,
                position: 'relative',
                borderTop: card.status === 'pending' ? '4px solid green' : '4px solid #7cf2e1',
                boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)',
                borderRadius: 2,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05) translateY(-4px)',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <Grid container direction="column" spacing={1}>
                <Grid item sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', mt: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography
                      sx={{
                        mb: 0,
                        flexShrink: 2,
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

                <Grid item sx={{ justifyContent: 'center', display: 'flex', mb: 2, mt: 1 }}>
                  <AvatarGroup className="pull-up" max={4}>
                    {card?.batch?.student?.map((student, studentIndex) => {
                      return (
                        <Avatar
                          key={studentIndex}
                          src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${student?.student?.image}`}
                          alt={student?.full_name}
                        />
                      );
                    })}
                  </AvatarGroup>
                </Grid>

                <Grid item justifyContent="center" display="flex">
                  <Typography sx={{ fontWeight: '500' }}>{card?.batch?.student?.length ?? 0} Students on this class</Typography>
                </Grid>
                <Grid item justifyContent="center" alignItems="center" sx={{ verticalAlign: 'center' }} display="flex" mb={2}>
                  <Box>
                    <IconCalendar />
                  </Box>
                  <Box sx={{ ml: 1 }}>
                    <Typography variant="h6" sx={{ alignItems: 'center', display: 'flex', fontWeight: 'bold' }}>
                      {/* {card?.start_date} / {card?.start_time} to {card?.end_time}{' '} */}
                      {card?.start_date
                        ? new Date(card.start_date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })
                        : 'Invalid Date'}

                      {' | '}

                      {card?.start_time
                        ? new Date(card.start_time).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })
                        : 'Invalid Time'}

                      {' - '}

                      {card?.end_time
                        ? new Date(card.end_time).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })
                        : 'Invalid Time'}
                    </Typography>
                  </Box>
                </Grid>

                <Grid container p={1} justifyContent="space-between" alignItems={'center'}>
                  <Box>
                    <Button
                      variant="contained"
                      size="medium"
                      component={Link}
                      state={{ id: card?.uuid }}
                      to={`offline-classes/${card?.uuid}`}
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
                            to: `offline-classes/view`,
                            state: { id: card?.uuid }
                          }
                        },
                        {
                          text: 'Edit',
                          icon: <Icon icon="tabler:edit" />,
                          menuItemProps: {
                            onClick: () => {
                              handleEdit(card);
                            }
                          }
                        },
                        {
                          text: 'Delete',
                          icon: <Icon icon="mdi:delete-outline" />,
                          menuItemProps: {
                            onClick: () => handleDelete(card?.uuid)
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
        <OfflineClassEditModal
          setRefetch={setRefetch}
          selectedBranchId={selectedBranchId}
          offlineClasses={selectedClass}
          open={isEditModalOpen}
          handleEditClose={handleEditClose}
        />
        <OfflineClassDeleteModel
          open={offlineClassDeleteModelOpen}
          setOpen={setOfflineClassDeleteModelOpen}
          description="Are you sure you want to delete this item?"
          title="Delete"
          handleSubmit={handleOfflineClassDelete}
          setRefetch={setRefetch}
        />
      </Grid>
    </>
  );
};

OfflineClassCard.propTypes = {
  refetch: PropTypes.any,
  setRefetch: PropTypes.any
};

export default OfflineClassCard;
