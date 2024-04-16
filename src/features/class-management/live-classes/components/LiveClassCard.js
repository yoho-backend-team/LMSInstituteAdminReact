import FileCopyIcon from '@mui/icons-material/FileCopy';
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
import LiveClassDeleteModel from 'components/modal/DeleteModel';
import OptionsMenu from 'components/option-menu';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteLiveClass } from '../services/liveClassServices';
import LiveClassEditModal from './edit-LiveClass/LiveClassEditModal';

const LiveClassCard = ({ setRefetch, liveClasses }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [selectedClass, setSelectedClass] = useState('');
  const [liveclassDeleteModelOpen, setLiveclassDeleteModelOpen] = useState(false);
  const [selectedLiveclassDeleteId, setSelectedLiveclassDeleteId] = useState(null);

  const handleDelete = useCallback((itemId) => {
    setSelectedLiveclassDeleteId(itemId);
    setLiveclassDeleteModelOpen(true);
  }, []);

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

  const handleEditClose = () => {
    setEditModalOpen(false);
  };
  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
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
                      {card?.class_date} / {card?.start_time} to {card?.end_time}{' '}
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

LiveClassCard.propTypes = {
  refetch: PropTypes.any,
  setRefetch: PropTypes.any
};

export default LiveClassCard;
