import { Box, Card, CardContent, Grid, MenuItem, TextField, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Icon from 'components/icon';
import { default as BranchDeleteModel, default as StatusChangeDialog } from 'components/modal/DeleteModel';
import OptionsMenu from 'components/option-menu';
import { deleteBranch, updateBranchStatus } from 'features/branch-management/services/branchServices';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import BranchEditModal from './BranchEditModal';
import CardBg from "../../../../assets/images/branch/card-bg4.jpg";

const BranchCard = ({ branch, setRefetchBranch }) => {
  const [branchDeleteModelOpen, setBranchDeleteModelOpen] = useState(false);
  const [selectedBranchDeleteId, setSelectedBranchDeleteId] = useState(null);
  const [branchEditModelOpen, setBranchEditModelOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('');

  const handleDelete = useCallback((itemId) => {
    setSelectedBranchDeleteId(itemId);
    setBranchDeleteModelOpen(true);
  }, []);

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
      is_active: !statusValue?.is_active,
      id: statusValue?.uuid
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
      <Card sx={{ position: 'relative', minHeight: 300, boxShadow: "0 .25rem .875rem 0 rgba(38,43,67,.16)", transition: "transform 0.3s ease", ":hover": { transform: "scale(0.9)"} }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            sx={{
              height: 140,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundImage: `url('${CardBg}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              zIndex: 0
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1
            }}
          >
            <img
              src={require('assets/images/avatar/map-pin.png')}
              alt="Branch"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </Box>
          <Box sx={{ position: 'absolute', top: 8, right: 8 , zIndex: 1000}}>
            <OptionsMenu
              menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
              iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
              options={[
                {
                  text: 'View',
                  icon: <Icon icon="tabler:eye" fontSize={20} />,
                  menuItemProps: {
                    component: Link,
                    to: `branches/${branch?.uuid}`,
                    state: { id: branch?.uuid }
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
                    onClick: () => handleDelete(branch?.uuid)
                  }
                }
              ]}
            />
          </Box>
        </Box>

        <CardContent>
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
            {branch?.branch_identity}
          </Typography>
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
            {branch?.contact_info?.address}, {branch?.contact_info?.city}, {branch?.contact_info?.state}, {branch?.contact_info?.pincode}
          </Typography>
          <Box sx={{ mt: 1.75 }}>
            <TextField
              size="small"
              select
              width={100}
              label="Status"
              SelectProps={{ value: branch?.is_active, onChange: (e) => handleStatusValue(e, branch) }}
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
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

BranchCard.propTypes = {
  branch: PropTypes.any,
  setRefetchBranch: PropTypes.any
};

export default BranchCard;
