// ** Mui Components
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
// ** React  Import
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// ** Custom Components
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import BatchSkeleton from 'components/cards/Skeleton/BatchSkeleton';
import Icon from 'components/icon';
import DeleteDialog from 'components/modal/DeleteModel';
import OptionsMenu from 'components/option-menu';
import BatchFilterCard from 'features/batch-management/batches/components/BatchFilterCard';
import BatchEditModal from 'features/batch-management/batches/components/edit-Batch/BatchEditModal';
import { selectBatches, selectLoading } from 'features/batch-management/batches/redux/batchSelectors';
import { getAllBatches } from 'features/batch-management/batches/redux/batchThunks';
import { useDispatch, useSelector } from 'react-redux';

// ** Toast Import
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 5,
  [`& .${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.primary.main
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.main
  }
}));
const Batch = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('');

  const handleStatusValue = (event) => {
    setStatusValue(event.target.value);
    setDeleteDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
  };
  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  console.log(deletingItemId);

  const handleDelete = (itemId) => {
    console.log('Delete clicked for item ID:', itemId);
    setDeletingItemId(itemId);
    setDeleteDialogOpen(true);
  };

  const dispatch = useDispatch();
  const batches = useSelector(selectBatches);
  const batchLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  console.log(batches);

  useEffect(() => {
    dispatch(getAllBatches(selectedBranchId));
  }, [dispatch, selectedBranchId]);

  // const groups = [
  //   {
  //     extraMembers: 25,
  //     title: 'React Developers',
  //     avatar: '/images/icons/project-icons/react-label.png',
  //     avatarGroup: [
  //       { avatar: '/images/avatars/1.png', name: 'Vinnie Mostowy' },
  //       { avatar: '/images/avatars/2.png', name: 'Allen Rieske' },
  //       { avatar: '/images/avatars/3.png', name: 'Julee Rossignol' },
  //       { avatar: '/images/avatars/4.png', name: 'George Burrill' }
  //     ],
  //     description: 'We don’t make assumptions about the rest of your technology stack, so you can develop new features in React.',
  //     chips: [
  //       {
  //         title: 'React',
  //         color: 'primary'
  //       },
  //       {
  //         title: 'MUI',
  //         color: 'info'
  //       }
  //     ]
  //   },
  //   {
  //     extraMembers: 15,
  //     title: 'Vue.js Dev Team',
  //     avatar: '/images/icons/project-icons/vue-label.png',
  //     avatarGroup: [
  //       { avatar: '/images/avatars/5.png', name: "Kaith D'souza" },
  //       { avatar: '/images/avatars/6.png', name: 'John Doe' },
  //       { avatar: '/images/avatars/7.png', name: 'Alan Walker' },
  //       { avatar: '/images/avatars/8.png', name: 'Calvin Middleton' }
  //     ],
  //     description:
  //       'The development of Vue and its ecosystem is guided by an international team, some of whom have chosen to be featured below.',
  //     chips: [
  //       {
  //         title: 'Vuejs',
  //         color: 'success'
  //       },
  //       {
  //         color: 'error',
  //         title: 'Developer'
  //       }
  //     ]
  //   },
  //   {
  //     extraMembers: 55,
  //     title: 'Creative Designers',
  //     avatar: '/images/icons/project-icons/xd-label.png',
  //     avatarGroup: [
  //       { avatar: '/images/avatars/9.png', name: 'Jimmy Ressula' },
  //       { avatar: '/images/avatars/10.png', name: 'Kristi Lawker' },
  //       { avatar: '/images/avatars/11.png', name: 'Danny Paul' },
  //       { avatar: '/images/avatars/12.png', name: 'Alicia Littleton' }
  //     ],
  //     description: 'A design or product team is more than just the people on it. A team includes the people, the roles they play.',
  //     chips: [
  //       {
  //         title: 'Sketch',
  //         color: 'warning'
  //       },
  //       {
  //         title: 'XD',
  //         color: 'error'
  //       }
  //     ]
  //   },
  //   {
  //     extraMembers: 35,
  //     title: 'Support Team',
  //     avatar: '/images/icons/project-icons/support-label.png',
  //     avatarGroup: [
  //       { avatar: '/images/avatars/5.png', name: 'Andrew Tye' },
  //       { avatar: '/images/avatars/12.png', name: 'Rishi Swaat' },
  //       { avatar: '/images/avatars/7.png', name: 'Rossie Kim' },
  //       { avatar: '/images/avatars/8.png', name: 'Mary Hunter' }
  //     ],
  //     description: 'Support your team. Your customer support team is fielding the good, the bad, and the ugly day in and day out.',
  //     chips: [
  //       {
  //         color: 'info',
  //         title: 'Zendesk'
  //       }
  //     ]
  //   },
  //   {
  //     extraMembers: 19,
  //     title: 'Digital Marketing',
  //     avatar: '/images/icons/project-icons/social-label.png',
  //     avatarGroup: [
  //       { avatar: '/images/avatars/13.png', name: 'Kim Merchent' },
  //       { avatar: '/images/avatars/12.png', name: "Sam D'souza" },
  //       { avatar: '/images/avatars/11.png', name: 'Nurvi Karlos' },
  //       { avatar: '/images/avatars/10.png', name: 'Margorie Whitmire' }
  //     ],
  //     description: 'Digital marketing refers to advertising delivered through digital channels such as search engines, websites…',
  //     chips: [
  //       {
  //         color: 'primary',
  //         title: 'Twitter'
  //       },
  //       {
  //         title: 'Email',
  //         color: 'success'
  //       }
  //     ]
  //   },
  //   {
  //     title: 'Event',
  //     extraMembers: 55,
  //     avatar: '/images/icons/project-icons/event-label.png',
  //     avatarGroup: [
  //       { avatar: '/images/avatars/6.png', name: 'Vinnie Mostowy' },
  //       { avatar: '/images/avatars/5.png', name: 'Allen Rieske' },
  //       { avatar: '/images/avatars/4.png', name: 'Julee Rossignol' },
  //       { avatar: '/images/avatars/7.png', name: 'Daniel Long' }
  //     ],
  //     description: 'Event is defined as a particular contest which is part of a program of contests. An example of an event is the long…',
  //     chips: [
  //       {
  //         title: 'Hubilo',
  //         color: 'success'
  //       }
  //     ]
  //   },
  //   {
  //     extraMembers: 45,
  //     title: 'Figma Resources',
  //     avatar: '/images/icons/project-icons/figma-label.png',
  //     avatarGroup: [
  //       { avatar: '/images/avatars/8.png', name: 'Andrew Mostowy' },
  //       { avatar: '/images/avatars/1.png', name: 'Micky Ressula' },
  //       { avatar: '/images/avatars/3.png', name: 'Michel Pal' },
  //       { avatar: '/images/avatars/12.png', name: 'Herman Lockard' }
  //     ],
  //     description:
  //       'Explore, install, use, and remix thousands of plugins and files published to the Figma Community by designers and developers.',
  //     chips: [
  //       {
  //         title: 'UI/UX',
  //         color: 'success'
  //       },
  //       {
  //         title: 'Figma',
  //         color: 'secondary'
  //       }
  //     ]
  //   },
  //   {
  //     extraMembers: 50,
  //     title: 'Only Beginners',
  //     avatar: '/images/icons/project-icons/html-label.png',
  //     avatarGroup: [
  //       { avatar: '/images/avatars/11.png', name: 'Kim Karlos' },
  //       { avatar: '/images/avatars/10.png', name: 'Katy Turner' },
  //       { avatar: '/images/avatars/9.png', name: 'Peter Adward' },
  //       { avatar: '/images/avatars/6.png', name: 'Leona Miller' }
  //     ],
  //     description: 'Learn the basics of how websites work, front-end vs back-end, and using a code editor. Learn basic HTML, CSS, and…',
  //     chips: [
  //       {
  //         title: 'CSS',
  //         color: 'info'
  //       },
  //       {
  //         title: 'HTML',
  //         color: 'warning'
  //       }
  //     ]
  //   }
  // ];

  // Render Group Cards

  const renderCards = () => {
    return batches?.map((item, index) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Card sx={{ position: 'relative' }}>
          <CardContent>
            <Grid container>
              <Grid
                item
                sx={{
                  position: 'absolute',
                  top: 15,
                  right: 3
                }}
              >
                <OptionsMenu
                  menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
                  iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
                  options={[
                    {
                      text: 'View',
                      icon: <Icon icon="tabler:eye" fontSize={20} />,
                      menuItemProps: {
                        component: Link,
                        to: `view`
                      }
                    },
                    {
                      text: 'Edit',

                      icon: <Icon color="primary" icon="tabler:edit" fontSize={20} />,
                      menuItemProps: {
                        onClick: () => {
                          handleEdit();
                        }
                      }
                    },
                    {
                      text: 'Delete',

                      icon: <Icon color="primary" icon="tabler:archive-filled" fontSize={20} />,
                      menuItemProps: {
                        onClick: () => {
                          handleDelete();
                        }
                      }
                    }
                  ]}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 0,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {item?.batch?.batch_name}
                </Typography>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
              <Icon fontSize="1.25rem" icon="tabler:book" />

              <Typography sx={{ ml: 1 }} variant="h5">
                {item?.batch?.batch_name}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Icon fontSize="1.25rem" icon="tabler:calendar-month" />
              <Box sx={{ alignItems: 'center', mr: 3 }}>
                <Typography sx={{ ml: 1 }} variant="h5">
                  Start Date
                </Typography>
                <Typography sx={{ color: 'text.secondary', ml: 1 }}>{item?.batch?.start_date}</Typography>
              </Box>
              <Icon fontSize="1.25rem" icon="tabler:calendar-month" />
              <Box sx={{ alignItems: 'center' }}>
                <Typography sx={{ ml: 1 }} variant="h5">
                  End Date
                </Typography>
                <Typography sx={{ color: 'text.secondary', ml: 1 }}>{item?.batch?.end_date}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Icon fontSize="1.25rem" icon="tabler:users" />
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                <Typography sx={{ my: 2, ml: 1 }} variant="h5">
                  50
                </Typography>
                <Typography sx={{ ml: 0.5, color: 'text.secondary' }}>Students</Typography>
              </Box>
              <Icon fontSize="1.25rem" icon="tabler:clock" />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ my: 2, ml: 1 }} variant="h5">
                  3
                </Typography>
                <Typography sx={{ ml: 0.5, color: 'text.secondary' }}>Months</Typography>
              </Box>
            </Box>

            <BorderLinearProgress variant="determinate" value={70} />
            <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  size="small"
                  select
                  fullWidth
                  label="Status"
                  SelectProps={{ value: statusValue, onChange: (e) => handleStatusValue(e) }}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Deactive">Deactive</MenuItem>
                </TextField>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  return (
    <>
      <Grid>
        <Grid spacing={1} className="match-height">
          {batchLoading ? (
            <BatchSkeleton />
          ) : (
            <Grid>
              <BatchFilterCard />
              <Grid container spacing={2} className="match-height" sx={{ marginTop: 0 }}>
                {renderCards()}
              </Grid>
              <Grid sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <div className="demo-space-y">
                  <Pagination count={10} color="primary" />
                </div>
              </Grid>
              <BatchEditModal open={isEditModalOpen} handleEditClose={handleEditClose} />
              <DeleteDialog
                open={isDeleteDialogOpen}
                setOpen={setDeleteDialogOpen}
                description="Are you sure you want to delete this item?"
                title="Delete"
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default Batch;
