import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import BatchSkeleton from 'components/cards/Skeleton/BatchSkeleton';
import Icon from 'components/icon';
import { default as BatchDeleteModel, default as StatusChangeDialog } from 'components/modal/DeleteModel';
import OptionsMenu from 'components/option-menu';
import BatchFilterCard from 'features/batch-management/batches/components/BatchFilterCard';
import BatchEditModal from 'features/batch-management/batches/components/edit-Batch/BatchEditModal';
import { selectBatches, selectLoading } from 'features/batch-management/batches/redux/batchSelectors';
import { getAllBatches } from 'features/batch-management/batches/redux/batchThunks';
import { deleteBatch, updateBatchStatus } from 'features/batch-management/batches/services/batchServices';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomChip from 'components/mui/chip';

const CardStyle = styled(Card)(({ theme }) => ({
  border: '2px dotted',
  borderColor: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.main,
  background: theme.palette.mode === 'light' ? theme.palette.secondary.light : theme.palette.dark.main,
  marginTop: '16px',
  marginBottom: '16px',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '200px',
    height: '200px',
    border: '100px solid ',
    borderColor: theme.palette.primary.main,
    borderRadius: '50%',
    top: '215px',
    right: '-120px'
  }
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 5,
  [`& .${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.primary.main
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.success.main
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

  useEffect(() => {
    dispatch(getAllBatches({ branch_id: selectedBranchId, page: '1' }));
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
        <CardStyle sx={{ position: 'relative' }}>
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
                      // icon: <Icon icon="tabler:eye" fontSize={20} />,
                      menuItemProps: {
                        component: Link,
                        to: `batches/${item?.uuid}`,
                        state: { id: item?.uuid }
                      }
                    },
                    {
                      text: 'Edit',
                      // icon: <Icon color="primary" icon="tabler:edit" fontSize={20} />,
                      menuItemProps: {
                        onClick: () => {
                          setSelectedBatch(item);
                          handleEdit();
                        }
                      }
                    },
                    {
                      text: 'Delete',
                      // icon: <Icon color="primary" icon="tabler:archive-filled" fontSize={20} />,
                      menuItemProps: {
                        onClick: () => handleDelete(item.uuid)
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
                  {item?.batch_name}
                </Typography>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
              <Icon fontSize="1.25rem" icon="tabler:books" />

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
                {item?.course?.course_name}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, justifyContent: 'space-around' }}>
              <CustomChip label={item?.start_date} size="small" color="secondary" variant="tonal" skin="dark" rounded />
              <div className="connect" />
              <CustomChip label={item?.end_date} size="small" color="secondary" variant="tonal" skin="dark" rounded />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                <Icon fontSize="1.25rem" icon="tabler:user-square" color="primary" />
                <Typography sx={{ my: 2, ml: 1 }} variant="h5">
                  {item?.student?.length}
                </Typography>
                <Typography variant="h5" sx={{ ml: 0.5, color: 'text.secondary' }}>
                  {item?.student?.length > 1 ? 'Students' : 'Student'}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Icon fontSize="1.25rem" icon="tabler:clock-filled" />
                <Typography sx={{ my: 2, ml: 1 }} variant="h5">
                  {item.duration}
                </Typography>
                <Typography variant="h5" sx={{ ml: 0.5, color: 'text.secondary' }}>
                  Days
                </Typography>
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
                  SelectProps={{ value: item?.is_active, onChange: (e) => handleStatusValue(e, item.batch) }}
                >
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </TextField>
              </Box>
            </Box>
          </CardContent>
        </CardStyle>
      </Grid>
    ));
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <BatchFilterCard selectedBranchId={selectedBranchId} batches={batches} setBatchRefetch={setBatchRefetch} />
        </Grid>
        <Grid item xs={12}>
          {batchLoading ? (
            <BatchSkeleton />
          ) : (
            <Grid container spacing={2} className="match-height" sx={{ marginTop: 0 }}>
              {renderCards()}
            </Grid>
          )}
        </Grid>
        {batches?.last_page !== 1 && (
          <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination
              count={batches?.last_page}
              color="primary"
              onChange={(e, page) => {
                dispatch(getAllBatches({ branch_id: selectedBranchId, page: page }));
              }}
            />
          </Grid>
        )}
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
    </>
  );
};
export default Batch;
