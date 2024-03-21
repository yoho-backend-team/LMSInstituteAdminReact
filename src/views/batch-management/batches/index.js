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
import StatusChangeDialog from 'components/modal/DeleteModel';

import OptionsMenu from 'components/option-menu';
import BatchFilterCard from 'features/batch-management/batches/components/BatchFilterCard';
import BatchEditModal from 'features/batch-management/batches/components/edit-Batch/BatchEditModal';
import { selectBatches, selectLoading } from 'features/batch-management/batches/redux/batchSelectors';
import { getAllBatches } from 'features/batch-management/batches/redux/batchThunks';
import { useDispatch, useSelector } from 'react-redux';
// import { updateBatch } from 'features/batch-management/batches/services/batchServices';
import { updateBatchStatus } from 'features/batch-management/batches/services/batchServices';
// ** Toast Import
import BatchDeleteModel from 'components/modal/DeleteModel';
import { deleteBatch } from 'features/batch-management/batches/services/batchServices';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

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
  const dispatch = useDispatch();
  const batches = useSelector(selectBatches);
  const batchLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [batchRefetch, setBatchRefetch] = useState(false);


  const [selectedBatch, setSelectedBatch] =  useState(null);

  console.log(batches);

  useEffect(() => {
    dispatch(getAllBatches({ branch_id: selectedBranchId }));
  }, [dispatch, selectedBranchId, batchRefetch]);

// console.log('getAllBatches:',getAllBatches)

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('');

  const handleStatusChangeApi = async () => {
    const data = {
      status: statusValue?.is_active === '1' ? '0' : '1',
      id: statusValue?.id
    };
    const response = await updateBatchStatus(data);
    if (response.success) {
      toast.success(response.message);
      setBatchRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
    console.log('getAllBatches',response);
  };

  const handleStatusValue = (event, batch) => {
    setStatusChangeDialogOpen(true);
    setStatusValue(batch);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
  };
  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const [batchDeleteModelOpen, setBatchDeleteModelOpen] = useState(false);

  const [selectedBatchDeleteId, setSelectedBatchDeleteId] = useState(null);

  // Memoize the handleDelete function to prevent unnecessary re-renders
  const handleDelete = useCallback((itemId) => {
    setSelectedBatchDeleteId(itemId);
    setBatchDeleteModelOpen(true);
  }, []);

  // Handle branch deletion
  const handleBatchDelete = async () => {
    const data = { id: selectedBatchDeleteId };
    const result = await deleteBatch(data);
    if (result.success) {
      toast.success(result.message);
      setBatchRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };

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
                        to: `${item?.batch?.batch_id}`,
                        state: { id: item?.batch?.batch_id }
                      }
                    },
                    {
                      text: 'Edit',
                      icon: <Icon color="primary" icon="tabler:edit" fontSize={20} />,
                      menuItemProps: {
                        onClick: () => {
                          setSelectedBatch(item)
                          handleEdit();
                        }
                      }
                    },
                    {
                      text: 'Delete',
                      icon: <Icon color="primary" icon="tabler:archive-filled" fontSize={20} />,
                      menuItemProps: {
                        onClick: () => handleDelete(item.batch?.id)
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
                {/* {item?.batch?.course_name} */}
                {item?.batch?.institute_course?.institute_course_branch?.course_name}
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
                  {item?.students?.length}
                </Typography>
                <Typography sx={{ ml: 0.5, color: 'text.secondary' }}>Students</Typography>
              </Box>
              <Icon fontSize="1.25rem" icon="tabler:clock" />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ my: 2, ml: 1 }} variant="h5">
                  {item.totalDays}
                </Typography>
                <Typography sx={{ ml: 0.5, color: 'text.secondary' }}>Days</Typography>
              </Box>
            </Box>

            <BorderLinearProgress variant="determinate" value={70} />
            <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  size="small"
                  select
                  width={100}
                  label="Status"
                  SelectProps={{ value: item.batch?.is_active, onChange: (e) => handleStatusValue(e, item.batch) }}
                >
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="0">Inactive</MenuItem>
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
          <Grid>
            <BatchFilterCard selectedBranchId={selectedBranchId} setBatchRefetch={setBatchRefetch} />
          </Grid>
          {batchLoading ? (
            <BatchSkeleton />
          ) : (
            <Grid>
              <Grid container spacing={2} className="match-height" sx={{ marginTop: 0 }}>
                {renderCards()}
              </Grid>
              <Grid sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <div className="demo-space-y">
                  <Pagination count={10} color="primary" />
                </div>
              </Grid>

              {/* BatchEditModal  Modal */}
              <BatchEditModal
                open={isEditModalOpen}
                handleEditClose={handleEditClose}
                setBatchRefetch={setBatchRefetch}
                selectedBatch ={selectedBatch}
              />

              {/* Status Change Modal */}
              <StatusChangeDialog
                open={statusChangeDialogOpen}
                setOpen={setStatusChangeDialogOpen}
                description="Are you sure you want to Change Status"
                title="Status"
                handleSubmit={handleStatusChangeApi}
              />

              {/* DeleteDialog  Modal */}
              <BatchDeleteModel
                open={batchDeleteModelOpen}
                setOpen={setBatchDeleteModelOpen}
                description="Are you sure you want to delete this item?"
                title="Delete"
                handleSubmit={handleBatchDelete}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default Batch;
