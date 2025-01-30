import { CardContent, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
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

const renderClient = (row) => {
  if (row?.image) {
    return (
      <CustomAvatar
        src={getImageUrl(row?.image)}
        sx={{ mr: 2.5, width: 50, height: 50, borderRadius: '12px' }}
      />
    );
  } else {
    return (
      <CustomAvatar
        skin="light"
        sx={{
          mr: 2.5,
          width: 50,
          height: 50,
          fontWeight: 500,
          fontSize: (theme) => theme.typography.body1.fontSize
        }}
      >
        {getInitials(row?.name || 'Mohammed Thasthakir')}
      </CustomAvatar>
    );
  }
};

const UserBodySection = ({ users, setUserRefetch, selectedBranchId }) => {
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('');

  const [userDeleteModelOpen, setUserDeleteModelOpen] = useState(false);
  const [selectedUserDeleteId, setSelectedUserDeleteId] = useState(null);

  const dispatch = useDispatch();
  const instituteId = useInstitute().getInstituteId();

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

  const RowOptions = ({ id }) => {
    return (
      <OptionsMenu
        menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
        iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
        options={[
          {
            text: 'View',
            icon: <Icon icon="tabler:eye" fontSize={20} />,
            menuItemProps: {
              component: Link,
              to: `admin-users/${id}`,
              state: { id: id }
            }
          },
          {
            text: 'Delete',
            icon: <Icon color="error" icon="mdi:delete-outline" fontSize={20} />,
            menuItemProps: {
              onClick: () => handleDelete(id)
            }
          }
        ]}
      />
    );
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {users?.data?.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user?.uuid}>
            <Card sx={{ boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)', borderRadius: 2 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: 3 }}>
                {/* Avatar and User Info Section */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {renderClient(user)}
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      noWrap
                      sx={{
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        color: 'text.primary',
                        '&:hover': { color: 'primary.main' }
                      }}
                    >
                      {`${user?.first_name} ${user?.last_name}`}
                    </Typography>
                    <Typography noWrap variant="body2" sx={{ color: 'text.secondary' }}>
                      {user?.email}
                    </Typography>
                  </Box>
                </Box>

                {/* Phone Section */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                    Phone
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.primary' }}>
                    {user?.phone_number || 'Not available'}
                  </Typography>
                </Box>

                {/* Role Section */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                    Role
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.primary' }}>
                    {user?.role?.identity || 'No role assigned'}
                  </Typography>
                </Box>

                {/* Status Section */}
                <Box sx={{ mt: 2 }}>
                  <TextField
                    size="small"
                    select
                    value={user?.is_active}
                    label="Status"
                    onChange={(e) => handleStatusValue(e, user)}
                    fullWidth
                    sx={{ marginBottom: 1 }}
                  >
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Inactive</MenuItem>
                  </TextField>
                </Box>

                {/* Divider */}
                <Divider sx={{ my: 2 }} />

                {/* Actions Section */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <RowOptions id={user?.uuid} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <StatusChangeDialog
        open={statusChangeDialogOpen}
        setOpen={setStatusChangeDialogOpen}
        description="Are you sure you want to change status?"
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

      {users?.last_page > 1 && (
        <CardContent>
          <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination
              count={users?.last_page}
              color="primary"
              onChange={(e, page) => {
                const data = {
                  branch_id: selectedBranchId,
                  institute_id: instituteId,
                  page
                };
                dispatch(getAllUsers(data));
              }}
            />
          </Grid>
        </CardContent>
      )}
    </Box>
  );
};

UserBodySection.propTypes = {
  setUserRefetch: PropTypes.func,
  users: PropTypes.object.isRequired,
  selectedBranchId: PropTypes.string
};

export default UserBodySection;
