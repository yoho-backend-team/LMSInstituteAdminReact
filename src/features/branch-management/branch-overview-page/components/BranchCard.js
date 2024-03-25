import React, { useState, useCallback } from 'react';
import { Card, CardContent, Grid, Typography, Box, TextField, MenuItem } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Icon from 'components/icon';
import BranchDeleteModel from 'components/modal/DeleteModel';
import StatusChangeDialog from 'components/modal/DeleteModel';
import BranchEditModal from './BranchEditModal';
import OptionsMenu from 'components/option-menu';
import { Link } from 'react-router-dom';
import { deleteBranch } from 'features/branch-management/services/branchServices';
import toast from 'react-hot-toast';
import { updateBranchStatus } from 'features/branch-management/services/branchServices';

const BranchCard = ({ branch, setRefetchBranch }) => {
  // State variables
  const [branchDeleteModelOpen, setBranchDeleteModelOpen] = useState(false);
  const [selectedBranchDeleteId, setSelectedBranchDeleteId] = useState(null);
  const [branchEditModelOpen, setBranchEditModelOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('');

  // Memoize the handleDelete function to prevent unnecessary re-renders
  const handleDelete = useCallback((itemId) => {
    setSelectedBranchDeleteId(itemId);
    setBranchDeleteModelOpen(true);
  }, []);

  // Handle branch deletion
  const handleBranchDelete = async () => {
    const data = { id: selectedBranchDeleteId };
    const result = await deleteBranch(data);
    if (result.success) {
      toast.success(result.message);
      setRefetchBranch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };

  const handleStatusChangeApi = async () => {
    const data = {
      status: statusValue?.is_active === '1' ? '0' : '1',
      id: statusValue?.id
    };
    const response = await updateBranchStatus(data);
    if (response.success) {
      toast.success(response.message);
      setRefetchBranch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };

  const handleStatusValue = (event, branch) => {
    setStatusChangeDialogOpen(true);
    setStatusValue(branch);
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ position: 'relative', minHeight: 300 }}>
        {/* Options menu */}
        <Grid
          sx={{
            position: 'absolute',
            top: 5,
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
                  to: `branches/${branch?.branch_id}`,
                  state: { id: branch?.branch_id }
                }
              },
              {
                text: 'Edit',

                icon: <Icon color="primary" icon="tabler:edit" fontSize={20} />,
                menuItemProps: {
                  onClick: () => {
                    if (branch) {
                      setSelectedBranch(branch);
                      setBranchEditModelOpen(true);
                    }
                  }
                }
              },
              {
                text: 'Delete',
                icon: <Icon color="error" icon="mdi:delete-outline" fontSize={20} />,
                menuItemProps: {
                  onClick: () => handleDelete(branch?.id)
                }
              }
            ]}
          />
        </Grid>
        {/* Branch image */}
        <CardMedia
          sx={{
            height: 100,
            width: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 3,
            mx: 'auto'
          }}
          image={require('assets/images/avatar/map-pin.png')}
        />
        <CardContent>
          {/* Branch name */}
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis'
            }}
          >
            {branch?.branch_name}
          </Typography>
          {/* Branch address */}
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis'
            }}
          >
            {branch?.address}, {branch?.city}, {branch?.state}, {branch?.pin_code}
          </Typography>

          <Box sx={{ mt: 1.75 }}>
            <TextField
              size="small"
              select
              width={100}
              label="Status"
              SelectProps={{ value: branch?.is_active, onChange: (e) => handleStatusValue(e, branch) }}
            >
              <MenuItem value="1">Active</MenuItem>
              <MenuItem value="0">Inactive</MenuItem>
            </TextField>
          </Box>
        </CardContent>
      </Card>

      {/* Status Change Modal */}
      <StatusChangeDialog
        open={statusChangeDialogOpen}
        setOpen={setStatusChangeDialogOpen}
        description="Are you sure you want to Change the Status"
        title="Status"
        handleSubmit={handleStatusChangeApi}
      />

      {/* Edit branch modal */}
      <BranchEditModal
        open={branchEditModelOpen}
        handleEditClose={() => setBranchEditModelOpen(false)}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
        setRefetchBranch={setRefetchBranch}
      />
      {/* Delete branch modal */}
      <BranchDeleteModel
        open={branchDeleteModelOpen}
        setOpen={setBranchDeleteModelOpen}
        description="Are you sure you want to delete this branch?"
        title="Delete"
        handleSubmit={handleBranchDelete}
      />
    </Grid>
  );
};

export default BranchCard;
