import { CardContent, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Icon from 'components/icon';
import { default as StatusChangeDialog, default as UserDeleteModel } from 'components/modal/DeleteModel';
import CustomAvatar from 'components/mui/avatar';
import OptionsMenu from 'components/option-menu';
import { deleteUsers, updateUserStatus } from 'features/user-management/users-page/services/userServices';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { getInitials } from 'utils/get-initials';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import { getAllUsers } from '../../redux/userThunks';
import { useDispatch } from 'react-redux';
import { useInstitute } from 'utils/get-institute-details';
import { getImageUrl } from 'utils/imageUtils';

const userStatusObj = {
  true: 'success',
  false: 'error'
};

const UserBodySection = ({ users, setUserRefetch, selectedBranchId }) => {
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('');
  const [userDeleteModelOpen, setUserDeleteModelOpen] = useState(false);
  const [selectedUserDeleteId, setSelectedUserDeleteId] = useState(null);

  const dispatch = useDispatch();

  const handleStatusChangeApi = async () => {
    const data = {
      is_active: !statusValue?.is_active,
      userId: statusValue?.uuid
    };
    const response = await updateUserStatus(data);
    if (response.success) {
      toast.success(response.message);
      setUserRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };

  const handleStatusValue = (event, users) => {
    setStatusChangeDialogOpen(true);
    setStatusValue(users);
  };

  const handleDelete = useCallback((itemId) => {
    setSelectedUserDeleteId(itemId);
    setUserDeleteModelOpen(true);
  }, []);

  const handleUserDelete = async () => {
    const result = await deleteUsers(selectedUserDeleteId);
    if (result.success) {
      toast.success(result.message);
      setUserRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };

  const renderClient = (row) => {
    if (row?.image) {
      return (
        <CustomAvatar
          src={`${getImageUrl(row?.image)}`}
          sx={{ width: 60, height: 60, mb: 1 }}
        />
      );
    } else {
      return (
        <CustomAvatar
          skin="light"
          sx={{ width: 60, height: 60, mb: 1, fontWeight: 500 }}
        >
          {getInitials(row?.name ? row?.name : 'Mohammed Thasthakir')}
        </CustomAvatar>
      );
    }
  };

  return (
    <Box>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 4, 
        justifyContent: 'flex-start',
         
      }}
    >
      {users?.data?.map((user) => (
        <Card
          key={user?.uuid}
          sx={{
            width: 270,
            p: 2, 
            boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column', 
            justifyContent: 'space-around', 
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {renderClient(user)}
            <Typography variant="h6" noWrap sx={{ fontWeight: 500, textAlign: 'center' }}>
              {user?.first_name + ' ' + user?.last_name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.disabled', textAlign: 'center' }}>
              {user?.email}
            </Typography>
          </Box>
  
          <Divider sx={{ my: 2 }} />
  
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Role:</strong> {user?.role?.identity}
          </Typography>
          <TextField
            size="small"
            select
            value={user?.is_active}
            label="Status"
            id="custom-select"
            sx={{
              color: userStatusObj[user?.is_active],
              mb: 2,
            }}
            onChange={(e) => handleStatusValue(e, user)}
            SelectProps={{
              sx: {
                borderColor: user?.is_active ? 'success' : 'error',
                color: userStatusObj[user?.is_active],
              },
            }}
          >
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Inactive</MenuItem>
          </TextField>
  
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Link to={`admin-users/${user?.uuid}`} style={{ textDecoration: 'none' }}>
              <Typography variant="body2" sx={{ color: 'primary.main' }}>
                View
              </Typography>
            </Link>
            <Typography
              variant="body2"
              sx={{ color: 'error.main', cursor: 'pointer' }}
              onClick={() => handleDelete(user?.uuid)}
            >
              Delete
            </Typography>
          </Box>
        </Card>
      ))}
    </Box>
  
    <StatusChangeDialog
      open={statusChangeDialogOpen}
      setOpen={setStatusChangeDialogOpen}
      description="Are you sure you want to Change Status"
      title="Change Status"
      handleSubmit={handleStatusChangeApi}
    />
  
    <UserDeleteModel
      open={userDeleteModelOpen}
      setOpen={setUserDeleteModelOpen}
      description="Are you sure you want to delete this user?"
      title="Delete"
      handleSubmit={handleUserDelete}
    />
  
    {users?.last_page !== 1 && (
      <Grid sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination
          count={users?.last_page}
          color="primary"
          onChange={(e, page) => {
            const data = {
              branch_id: selectedBranchId,
              institute_id: useInstitute().getInstituteId(),
              page: page,
            };
            dispatch(getAllUsers(data));
          }}
        />
      </Grid>
    )}
  </Box>
  
  );
};

UserBodySection.propTypes = {
  setUserRefetch: PropTypes.func,
  users: PropTypes.array.isRequired,
  selectedBranchId: PropTypes.string
};

export default UserBodySection;

