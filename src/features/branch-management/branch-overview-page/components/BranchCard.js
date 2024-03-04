import React, { useState, useCallback } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Icon from 'components/icon';
import BranchDeleteModel from 'components/modal/DeleteModel';
import BranchEditModal from './edit-Branch/BranchEditModal';
import OptionsMenu from 'components/option-menu';
import { Link } from 'react-router-dom';
import { deleteBranch } from 'features/branch-management/services/branchServices';
import toast from 'react-hot-toast';

const BranchCard = ({ branch, setRefetchBranch }) => {
  // State variables
  const [branchDeleteModelOpen, setBranchDeleteModelOpen] = useState(false);
  const [selectedBranchDeleteId, setSelectedBranchDeleteId] = useState(null);
  const [branchEditModelOpen, setBranchEditModelOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

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

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ position: 'relative' }}>
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
                  to: `${branch?.branch_id}`
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
        </CardContent>
      </Card>
      {/* Delete branch modal */}
      <BranchDeleteModel
        open={branchDeleteModelOpen}
        setOpen={setBranchDeleteModelOpen}
        description="Are you sure you want to delete this item?"
        title="Delete"
        handleSubmit={handleBranchDelete}
      />
      {/* Edit branch modal */}
      <BranchEditModal
        open={branchEditModelOpen}
        handleEditClose={() => setBranchEditModelOpen(false)}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
        setRefetchBranch={setRefetchBranch}
      />
    </Grid>
  );
};

export default BranchCard;
