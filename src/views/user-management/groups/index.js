// ** Mui Components
import { Grid, Typography, Box, Card, CardContent, IconButton, Button, Avatar, AvatarGroup } from '@mui/material';

// ** React  Import
import React, { useState, useEffect } from 'react';

// ** Custom Components
import Icon from 'components/icon';
import Header from 'components/Header';
import GroupDeleteDialog from 'features/user-management/groups/components/GroupDeleteDialog';
import GroupSkeleton from 'components/cards/Skeleton/GroupSkeleton';

// ** React Router Import
import { Link } from 'react-router-dom';

// ** Axios Import
import { useNavigate } from 'react-router-dom';

// ** Toast Import
import toast from 'react-hot-toast';

import { useDispatch, useSelector } from 'react-redux';
import { getAllGroups } from 'features/user-management/groups/redux/groupThunks';
import { selectGroups, selectLoading as selectGroupLoading } from 'features/user-management/groups/redux/groupSelectors';
import { deleteGroup, searchGroups } from 'features/user-management/groups/services/groupService';
import { setGroups } from 'features/user-management/groups/redux/groupSlice';

const GroupManagement = () => {
  // ** Dialog State
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // ** SearchQuery State
  const [searchQuery, setSearchQuery] = useState('');

  // ** Selected State
  const [selectedDeleteGroupId, setSelectedDeleteGroupId] = useState('');

  const dispatch = useDispatch();
  const groups = useSelector(selectGroups);
  const groupLoading = useSelector(selectGroupLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const navigate = useNavigate();

  console.log(groups);
  useEffect(() => {
    dispatch(getAllGroups(selectedBranchId));
  }, [dispatch, selectedBranchId]);

  // ** Add Role Image
  const AddRoleAvatar = require('assets/images/avatar/add-role.png');

  const handleDeleteGroup = async () => {
    try {
      const result = await deleteGroup(selectedDeleteGroupId);

      if (result.success) {
        toast.success(result.message);
        dispatch(getAllGroups());
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Search Function
  const handleSearch = async (value) => {
    try {
      setSearchQuery(value);
      // Set loading to true while fetching data
      const result = await searchGroups(value);

      if (result.success) {
        console.log('Search results:', result.data);
        // Update the Redux state using the setGroups action
        dispatch(setGroups(result.data));
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Render Group Cards
  const renderCards = () => {
    return groups?.map((item, index) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ color: 'text.secondary' }}>{`Total ${item.users?.length} users`}</Typography>
              <AvatarGroup
                max={4}
                className="pull-up"
                sx={{
                  '& .MuiAvatar-root': { width: 32, height: 32, fontSize: (theme) => theme.typography.body2.fontSize }
                }}
              >
                {item?.users?.map((user, index) => (
                  <Avatar key={index} alt={item?.name} src={`${process.env.REACT_APP_PUBLIC_API_URL}/public/${user?.name}`} />
                ))}
              </AvatarGroup>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {item?.role?.name}
                </Typography>

                <Typography
                  component={Link}
                  to={`edit/${item.role.id}`}
                  state={{ id: item.role.id, name: item.role.name }}
                  sx={{ color: 'primary.main', textDecoration: 'none', boxShadow: 'none' }}
                >
                  Edit Role
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box component={Link} to={'view'} state={{ group: item }}>
                  <IconButton size="small" sx={{ color: 'dark.dark' }}>
                    <Icon icon="tabler:eye-filled" />
                  </IconButton>
                </Box>
                <IconButton
                  size="small"
                  sx={{ color: 'error.main' }}
                  onClick={() => {
                    setSelectedDeleteGroupId(item.id);
                    setDeleteDialogOpen(true);
                  }}
                >
                  <Icon icon="tabler:archive" />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  return (
    <>
      {groupLoading ? (
        <GroupSkeleton />
      ) : (
        <Grid>
          <Header title="Groups" handleSearch={handleSearch} searchQuery={searchQuery} />

          <Grid container spacing={2} className="match-height" sx={{ marginTop: 0 }}>
            <Grid item xs={12} sm={6} lg={4}>
              <Card sx={{ cursor: 'pointer' }} onClick={() => navigate('add')}>
                <Grid container sx={{ height: '100%' }}>
                  <Grid item xs={5}>
                    <Box
                      sx={{
                        height: '100%',
                        minHeight: 140,
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center'
                      }}
                    >
                      <img height={122} alt="add-role" src={AddRoleAvatar} />
                    </Box>
                  </Grid>
                  <Grid item xs={7}>
                    <CardContent sx={{ pl: 0, height: '100%' }}>
                      <Box sx={{ textAlign: 'right' }}>
                        <Button variant="contained" sx={{ mb: 3, whiteSpace: 'nowrap' }} onClick={() => navigate('add')}>
                          Add New Group
                        </Button>
                        <Typography sx={{ color: 'text.secondary' }}>Add group, if it doesnt exist.</Typography>
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            {renderCards()}
          </Grid>
          <GroupDeleteDialog open={deleteDialogOpen} setOpen={setDeleteDialogOpen} handleDeleteGroup={handleDeleteGroup} />
        </Grid>
      )}
    </>
  );
};
export default GroupManagement;
