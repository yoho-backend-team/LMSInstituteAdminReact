import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import BatchSkeleton from 'components/cards/Skeleton/BatchSkeleton';
import Icon from 'components/icon';
import StatusChangeDialog from 'components/modal/DeleteModel';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BatchDeleteModel from 'components/modal/DeleteModel';
import OptionsMenu from 'components/option-menu';
import BatchFilterCard from 'features/batch-management/batches/components/BatchFilterCard';
import BatchEditModal from 'features/batch-management/batches/components/edit-Batch/BatchEditModal';
import { selectBatches, selectLoading } from 'features/batch-management/batches/redux/batchSelectors';
import { getAllBatches } from 'features/batch-management/batches/redux/batchThunks';
import { deleteBatch, updateBatchStatus } from 'features/batch-management/batches/services/batchServices';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

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
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('');
  const [batchDeleteModelOpen, setBatchDeleteModelOpen] = useState(false);
  const [selectedBatchDeleteId, setSelectedBatchDeleteId] = useState(null);

  console.log(batches);

  useEffect(() => {
    dispatch(getAllBatches({ branch_id: selectedBranchId }));
  }, [dispatch, selectedBranchId, batchRefetch]);

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
    console.log('getAllBatches', response);
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

  const handleDelete = useCallback((itemId) => {
    setSelectedBatchDeleteId(itemId);
    setBatchDeleteModelOpen(true);
  }, []);

  const handleBatchDelete = async () => {
    const data = { id: selectedBatchDeleteId };
    const result = await deleteBatch(data);
    if (result.success) {
      toast.success(result.message);
      setBatchRefetch((state) => !state);
      setBatchDeleteModelOpen(false);
    } else {
      toast.error(result.message);
    }
  };

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
                        to: `batches/${item?.batch?.batch_id}`,
                        state: { id: item?.batch?.batch_id }
                      }
                    },
                    {
                      text: 'Edit',
                      icon: <Icon color="primary" icon="tabler:edit" fontSize={20} />,
                      menuItemProps: {
                        onClick: () => {
                          setSelectedBatch(item);
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

              <Typography
                variant="h5"
                sx={{
                  mb: 0,
                  ml: 1,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis'
                }}
              >
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
              <BatchEditModal
                open={isEditModalOpen}
                handleEditClose={handleEditClose}
                setBatchRefetch={setBatchRefetch}
                selectedBatch={selectedBatch}
              />

              <StatusChangeDialog
                open={statusChangeDialogOpen}
                setOpen={setStatusChangeDialogOpen}
                description="Are you sure you want to Change Status"
                title="Change Status"
                handleSubmit={handleStatusChangeApi}
              />
              <BatchDeleteModel
                open={batchDeleteModelOpen}
                setOpen={setBatchDeleteModelOpen}
                description="Are you sure you want to delete this Batch?"
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
