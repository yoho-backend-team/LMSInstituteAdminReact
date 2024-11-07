import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button, Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ScheduleIcon from '@mui/icons-material/Schedule';

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
import { useSpinner } from 'context/spinnerContext';
import DummyImage from "../../../../assets/images/dummy.jpg"
import { getImageUrl } from 'utils/imageUtils';

const LiveClassCard = ({ setRefetch, liveClasses }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [selectedClass, setSelectedClass] = useState('');
  const [liveclassDeleteModelOpen, setLiveclassDeleteModelOpen] = useState(false);
  const [selectedLiveclassDeleteId, setSelectedLiveclassDeleteId] = useState(null);
  const {show,hide} = useSpinner()

  const handleDelete = useCallback((itemId) => {
    setSelectedLiveclassDeleteId(itemId);
    setLiveclassDeleteModelOpen(true);
  }, []);

  const handleLiveclassDelete = async () => {
    show()
    const data = { id: selectedLiveclassDeleteId };
    const result = await deleteLiveClass(data);
    if (result.success) {
      hide()
      toast.success(result.message);
      setRefetch((state) => !state);
    } else {
      hide()
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
  console.log(liveClasses)
  return (
    <>
      <Grid container spacing={2}>
        {liveClasses?.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}  >
            <Card sx={{ p: 3, position: 'relative', borderTop: card.status === 'pending' ? '4px solid green' : '4px solid #07edc9', backgroundImage: `url(${DummyImage})`, backgroundPosition: "right" , boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)"}}>
              <Grid container direction="column" spacing={1}>
                <Grid item sx={{ alignItems: 'center', justifyContent: "flex-start", display: 'flex', mt: 1 }}>
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
                <Grid item sx={{ justifyContent: "space-between", display: 'flex', mb: 2, mt: 1 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: "5px", justifyContent: "center"}} >
                    <Typography variant="h5" >{card?.batch?.student?.length} Students</Typography>
                    <AvatarGroup className="pull-up" max={4} sx={{ justifyContent: "center"}} >
                      {card?.batch?.student?.map((student, studentIndex) => {
                        return (
                          <Tooltip title={student?.full_name} >
                            <Avatar
                              key={student?._id}
                              src={getImageUrl(student?.image)}
                              alt={student?.first_name}
                            />
                          </Tooltip>
                        );
                      })}
                    </AvatarGroup>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: "5px", justifyContent: "center"}} >
                     <Typography variant="h5" >{card?.instructors?.length} Instructors</Typography>
                     <AvatarGroup max={2} sx={{ justifyContent: "center"}} >
                       {
                        card?.instructors?.map((instructor,index) => {
                          return(
                            <Tooltip title={instructor?.full_name} >
                               <Avatar 
                                key={instructor?._id}
                                src={getImageUrl(instructor?.image)}
                                alt={instructor?.full_name}
                               />
                            </Tooltip>
                          )
                        }) 
                       }
                     </AvatarGroup>
                  </Box>
                </Grid>

                <Grid item justifyContent="center" display="none">
                  <Typography sx={{ fontWeight: '500' }}>{card?.batch?.student?.length ?? 0} Students on this class</Typography>
                </Grid>
                <Grid sx={{ display: "none", justifyContent: "space-between",ml:1}} >
                   <Box>
                     <Typography variant="h4" >Start Date</Typography>
                   </Box>
                   <Box>
                     <Typography variant="h4" >Start Time</Typography>
                   </Box>
                   <Box>
                     <Typography variant="h4" >End Time</Typography>
                   </Box>
                </Grid>
                <Grid item justifyContent="space-between" alignItems="center" sx={{ verticalAlign: 'center' }} display="flex" mb={2}>
                  <Tooltip title="start date" >
                    <Box sx={{  display: 'flex', flexDirection: "row", gap: "3px" }}>
                      <IconCalendar />
                      <Typography variant="h6" sx={{ alignItems: 'center', display: 'flex', fontWeight: 'bold' }}>
                      {new Date(card?.start_date).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Tooltip>

                  <Typography sx={{ fontWeight: "bold"}} > - </Typography>

                  <Tooltip title="Start time" >
                    <Box sx={{ display: 'flex', gap: "3px", alignItems: "center"}} >
                      <ScheduleIcon />
                      <Typography variant="h6" sx={{ fontWeight: "bold"}} >
                      {new Date(card?.start_time).toLocaleTimeString()}
                      </Typography>
                    </Box>
                  </Tooltip>

                  <Typography sx={{ fontWeight: "bold"}} >to</Typography>

                  <Tooltip title="End time" >
                    <Box sx={{ display: "flex", gap: "3px", alignItems: "center"}} >
                        <ScheduleIcon />
                        <Typography variant="h6" sx={{ fontWeight: "bold"}} >
                         {new Date(card?.end_time).toLocaleTimeString()}
                        </Typography>
                    </Box>
                  </Tooltip>

                </Grid>

                <Grid sx={{ mb: 1 }}>
                  <Box sx={{ alignItems: 'center', display: 'flex' }}>
                    <IconButton onClick={() => handleCopyText(card.class_link)} sx={{ color: 'primary.main' }} aria-label="copy-link">
                      <InsertLinkIcon />
                    </IconButton>
                    <Typography>{card?.video_url}</Typography>
                  </Box>
                </Grid>

                <Grid container p={1} justifyContent="space-between" alignItems={'center'}>
                  <Box>
                    <Button
                      variant="contained"
                      size="medium"
                      component={Link}
                      state={{ id: card?.uuid }}
                      to={`live-classes/${card?.uuid}`}
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
                            state: { id: card?.uuid }
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
    </>
  );
};

LiveClassCard.propTypes = {
  refetch: PropTypes.any,
  setRefetch: PropTypes.any
};

export default LiveClassCard;
