//Mui Imports
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
  Pagination
} from '@mui/material';

// Groups Header Import Search Input and Add Button
import Header from 'components/Header';

//Group Card Skeleton Import
import GroupSkeleton from 'components/cards/Skeleton/GroupSkeleton';

//Dialogs Import
import GroupStatusChangeDialog from 'components/modal/DeleteModel';
import GroupDeleteDialog from 'features/user-management/groups-page/components/GroupDeleteDialog';

//Redux Imports
import { selectLoading as selectGroupLoading, selectGroups } from 'features/user-management/groups-page/redux/groupSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroups } from 'features/user-management/groups-page/redux/groupThunks';

//Services Import
import { deleteGroup, updateStatus } from 'features/user-management/groups-page/services/groupService';

//Hooks Import
import { useCallback, useEffect, useMemo, useState } from 'react';

//Component Import
import OptionsMenu from 'components/option-menu';

//Toast Import
import toast from 'react-hot-toast';

//React Router Import
import { Link } from 'react-router-dom';
import { useInstitute } from 'utils/get-institute-details';
import { useSpinner } from 'context/spinnerContext';
import { getImageUrl } from 'utils/imageUtils';
import { imagePlaceholder } from 'utils/placeholders';
import { setGroups } from 'features/user-management/groups-page/redux/groupSlice';
import client from 'api/client';
import { set } from 'nprogress';

// Imports...

const GroupManagement = () => {
  // State variables
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeleteGroupId, setSelectedDeleteGroupId] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [groupList, setGroupList] = useState([]);
  const { show, hide } = useSpinner();
  const [search, setSearch] = useState(false);

  // Redux
  const dispatch = useDispatch();
  const groups = useSelector(selectGroups);
  const groupLoading = useSelector(selectGroupLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const AddRoleAvatar = require('assets/images/avatar/add-role.png');

  // console.log('group datasssssssssssssssssssss:' + JSON.stringify(groups, null, 2));

  // Fetch groups when selectedBranchId changes
  useEffect(() => {
    dispatch(getAllGroups({ institute_id: useInstitute().getInstituteId(), page: '1' }));
  }, [dispatch, selectedBranchId]);

  useEffect(() => {
    if (groups && groupList.length === 0) {
      setGroupList(groups);
    }
  }, [groupList]);

  // Memoized callback for deleting a group
  const handleDeleteGroup = useCallback(async () => {
    try {
      const result = await deleteGroup(selectedDeleteGroupId);
      if (result.success) {
        toast.success(result.message);
        dispatch(getAllGroups({ institute_id: useInstitute().getInstituteId() }));
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, selectedDeleteGroupId]);

  // Callback for handling status value change
  const handleStatusValue = useCallback((event, item) => {
    setStatusChangeDialogOpen(true);
    setStatusValue(item);
  }, []);

  // Callback for handling status change via API
  const handleStatusChangeApi = useCallback(async () => {
    const data = {
      is_active: !statusValue?.is_active,
      id: statusValue?.id
    };
    const response = await updateStatus(data);
    if (response.success) {
      toast.success(response.message);
      dispatch(getAllGroups({ branch_id: selectedBranchId, institute_id: useInstitute().getInstituteId() }));
    } else {
      toast.error(response.message);
    }
  }, [dispatch, selectedBranchId, statusValue]);

  const handleSearchKeyChange = (value) => {
    if (value.length === 0) {
      setSearch(false);
    }
    setSearchQuery(value);
  };

  // Callback for handling search
  const handleSearch = useCallback(
    async (value) => {
      try {
        if (groups) {
          hide();
          const data = groups?.data?.filter((group) => group.identity.toLowerCase().includes(value));

          if (data) {
            setSearch(true);
            dispatch(setGroups({ data: data }));
          }
        } else if (groups?.data?.length === 0 && groupList?.data?.length === 0) {
          show();
          const data = await client.group.getAll({ branch_id: selectedBranchId, institute_id: useInstitute().getInstituteId() });
          const filterGroups = data?.data?.filter((group) => group.identity.toLowerCase().includes(value));
          setGroupList(data);

          if (filterGroups) {
            setSearch(true);
            dispatch(setGroups({ data: filterGroups }));
          }

          hide();
        } else if (groupList) {
          const filterGroups = groupList?.data?.filter((group) => group.identity.toLowerCase().includes(value));
          if (filterGroups) {
            setSearch(true);
            dispatch(setGroups({ data: filterGroups }));
          }
        }
      } catch (error) {
        setSearch(false);
        console.log(error);
      }
    },
    [dispatch]
  );

  const renderCards = useMemo(() => {
    return groups?.data?.map((item, index) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        {/* Card content here */}
        <Card
          sx={{
            minHeight: 185,
            boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)',
            borderRadius: '15px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: '0 .45rem 1.25rem 0 rgba(38,43,67,.20)',
              transform: 'scale(1.02)'
            }
          }}
        >
          <CardContent>
            {/* Card Header */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 2,
                backgroundColor: '#f5f5f5',
                borderRadius: '12px 12px 0 0',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Card Title */}
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
                {item?.identity}
              </Typography>

              {/* Avatar Group with Tooltip */}
              <AvatarGroup
                max={4}
                sx={{
                  '& .MuiAvatar-root': {
                    width: 36,
                    height: 36,
                    border: '2px solid #fff',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.15)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                    }
                  }
                }}
              >
                {item?.users?.map((user, index) => (
                  <Tooltip key={index} title={<Typography variant="body2">{`${user?.first_name} ${user?.last_name}`}</Typography>} arrow>
                    <Avatar
                      alt={user?.name}
                      src={user.image ? getImageUrl(user?.image) : 'https://docs.material-tailwind.com/img/face-2.jpg'}
                    />
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Box>

            {/* Card Body */}
            <Box
              sx={{
                padding: 2,
                backgroundColor: '#ffffff',
                borderRadius: '0 0 12px 12px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                marginTop: 1
              }}
            >
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, marginBottom: 2 }}>
                {`Total ${item.users?.length} users`}
              </Typography>
              <Box
                sx={{
                  display: 'flex',

                  justifyContent: 'space-between'
                }}
              >
                {/* Status Dropdown */}
                <TextField
                  size="small"
                  select
                  SelectProps={{
                    value: item?.is_active,
                    onChange: (e) => handleStatusValue(e, item)
                  }}
                  sx={{
                    width: 140,
                    backgroundColor: item?.is_active ? '#0eff9d' : '#eaf2ff',
                    fontWeight: '50px',
                    borderRadius: '20px',
                    border: 'none',
                    boxShadow: 'none',

                    '& .MuiInputBase-root': {
                      fontSize: '0.875rem',
                      borderRadius: '20px'
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none' // Remove the outline border
                    }
                  }}
                >
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </TextField>

                {/* Options Menu */}
                <OptionsMenu
                  menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
                  iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
                  options={[
                    {
                      text: 'View',
                      menuItemProps: {
                        component: Link,
                        to: 'groups/view',
                        state: { group: item }
                      }
                    },
                    {
                      text: 'Delete',
                      menuItemProps: {
                        onClick: () => {
                          setSelectedDeleteGroupId(item?.uuid);
                          setDeleteDialogOpen(true);
                        }
                      }
                    },
                    {
                      text: 'Edit',
                      menuItemProps: {
                        component: Link,
                        to: `groups/${item?.id}/edit`,
                        state: { id: item?.id, name: item?.identity }
                      }
                    }
                  ]}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ));
  }, [groups?.data, handleStatusValue]);

  return (
    <Grid>
      <Header
        title="Groups"
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        handleSearchKeyChange={handleSearchKeyChange}
        searchQuery={searchQuery}
      />

      {groupLoading ? (
        <GroupSkeleton />
      ) : (
        <Grid container spacing={2} className="match-height" sx={{ marginTop: 0 }}>
          <Grid item xs={12} sm={6} lg={4}>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                minHeight: '230px',
                '&:hover': {
                  boxShadow: '0 .45rem 1.25rem 0 rgba(38,43,67,.20)',
                  transform: 'scale(1.02)'
                }
              }}
            >
              <Grid container sx={{ height: '100%' }}>
                {/* Image Section */}
                <Grid item xs={5}>
                  <Box
                    sx={{
                      height: '100%',
                      minHeight: 175,
                      display: 'flex',
                      mt: 2,
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      transition: 'transform 0.3s ease',
                      '&:hover img': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  >
                    <img height={140} alt="add-role" src={AddRoleAvatar} style={{ transition: 'transform 0.3s ease' }} />
                  </Box>
                </Grid>

                {/* Content Section */}
                <Grid item xs={7}>
                  <CardContent
                    sx={{
                      pl: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'end',
                      height: '100%'
                    }}
                  >
                    <Box sx={{ textAlign: 'right' }}>
                      {/* Typography */}
                      <Typography
                        sx={{
                          color: 'text.secondary',
                          textAlign: 'center',
                          fontWeight: 500, // Slightly bold
                          transition: 'color 0.3s ease',
                          '&:hover': { color: 'text.primary' } // Change color on hover
                        }}
                      >
                        Add group, if it doesn't exist.
                      </Typography>
                      <Button
                        variant="contained"
                        component={Link}
                        to={'groups/add'}
                        sx={{
                          mt: 3,
                          mr: 2,
                          whiteSpace: 'nowrap',
                          transition: 'background-color 0.3s ease',
                          '&:hover': { backgroundColor: '#5A67D8' } // Customize hover color here
                        }}
                      >
                        Add New Group
                      </Button>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          {renderCards}
          {groups?.last_page !== 1 && (
            <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Pagination
                count={groups?.last_page}
                color="primary"
                onChange={(e, page) =>
                  dispatch(getAllGroups({ institute_id: useInstitute().getInstituteId(), branch_id: selectedBranchId, page }))
                }
              />
            </Grid>
          )}
        </Grid>
      )}

      <GroupDeleteDialog open={deleteDialogOpen} setOpen={setDeleteDialogOpen} handleDeleteGroup={handleDeleteGroup} />

      <GroupStatusChangeDialog
        open={statusChangeDialogOpen}
        setOpen={setStatusChangeDialogOpen}
        description="Are you sure you want to Change Status"
        title="Change Status"
        successDescription="Group status changed successfully"
        failureDescription="Failed to change group status"
        handleSubmit={handleStatusChangeApi}
      />
    </Grid>
  );
};

export default GroupManagement;
