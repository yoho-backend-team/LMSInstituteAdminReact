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
  const [groupList,setGroupList] = useState([])
  const {show,hide} = useSpinner()
  const [search,setSearch]= useState(false)


  // Redux
  const dispatch = useDispatch();
  const groups = useSelector(selectGroups);
  const groupLoading = useSelector(selectGroupLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const AddRoleAvatar = require('assets/images/avatar/add-role.png');

  // Fetch groups when selectedBranchId changes
  useEffect(() => {
    dispatch(getAllGroups({ institute_id: useInstitute().getInstituteId(), page: '1' }));
   
  }, [dispatch, selectedBranchId]);

  useEffect(() => {
    if(groups&&groupList.length===0){
      setGroupList(groups)
    }
  },[groupList])

  // Memoized callback for deleting a group
  const handleDeleteGroup = useCallback(async () => {
    try {
      const result = await deleteGroup(selectedDeleteGroupId);
      if (result.success) {
        toast.success(result.message);
        dispatch(getAllGroups({institute_id:useInstitute().getInstituteId()}));
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
      dispatch(getAllGroups({ branch_id: selectedBranchId,institute_id:useInstitute().getInstituteId() }));
    } else {
      toast.error(response.message);
    }
  }, [dispatch, selectedBranchId, statusValue]);
  
  const handleSearchKeyChange = (value) => {
    if(value.length === 0 ){
      setSearch(false)
    }
    setSearchQuery(value)
  }

  // Callback for handling search
  const handleSearch = useCallback(
    async (value) => {
      try {
        if(groups){
          hide()
          const data = groups?.data?.filter((group)=>group.identity.toLowerCase().includes(value))

          if(data){
            setSearch(true)
            dispatch(setGroups({data:data}))
          }
        }else if(groups?.data?.length===0 && groupList?.data?.length === 0 ){
          
          show()
          const data = await client.group.getAll({ branch_id: selectedBranchId,institute_id:useInstitute().getInstituteId() })
          const filterGroups = data?.data?.filter((group)=>group.identity.toLowerCase().includes(value))
          setGroupList(data)
          
          if(filterGroups){
            setSearch(true)
            dispatch(setGroups({data:filterGroups}))
          }
         
          hide()
         }else if(groupList){
          const filterGroups = groupList?.data?.filter((group)=>group.identity.toLowerCase().includes(value))
          if(filterGroups){
            setSearch(true)
            dispatch(setGroups({data:filterGroups}))
          }
         }
      } catch (error) {
        setSearch(false)
        console.log(error);
      }
    },
    [dispatch]
  );

  const renderCards = useMemo(() => {
    return groups?.data?.map((item, index) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        {/* Card content here */}
        <Card sx={{ minHeight: 175 }}>
          <CardContent>
            <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 32 }}>
              <Typography sx={{ color: 'text.secondary' }}>{`Total ${item.users?.length} users`}</Typography>
              <AvatarGroup
                max={4}
                className="pull-up"
                sx={{
                  '& .MuiAvatar-root': { width: 32, height: 32, fontSize: (theme) => theme.typography.body2.fontSize }
                }}
              >
              {item?.users?.map((user, index) => (
                  <Tooltip key={index} title={user?.name}>
                    <Avatar alt={item?.name} src={`${user?.image?getImageUrl(user?.image):imagePlaceholder}`} />
                  </Tooltip>
              ))}
              </AvatarGroup>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography variant="h4" sx={{ mb: 1 }}>
                {item?.identity}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <TextField
                size="small"
                select
                width={100}
                label="Status"
                SelectProps={{ value: item?.is_active, onChange: (e) => handleStatusValue(e, item) }}
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </TextField>

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
          </CardContent>
        </Card>
      </Grid>
    ));
  }, [groups?.data, handleStatusValue]);

  return (
    <Grid>
      <Header title="Groups" search={search} setSearch={setSearch} handleSearch={handleSearch} handleSearchKeyChange={handleSearchKeyChange} searchQuery={searchQuery} />

      {groupLoading ? (
        <GroupSkeleton />
      ) : (
        <Grid container spacing={2} className="match-height" sx={{ marginTop: 0 }}>
          <Grid item xs={12} sm={6} lg={4}>
            <Card sx={{ cursor: 'pointer' }}>
              <Grid container sx={{ height: '100%' }}>
                <Grid item xs={5}>
                  <Box
                    sx={{
                      height: '100%',
                      minHeight: 175,
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
                      <Button variant="contained" component={Link} to={'groups/add'} sx={{ mb: 3, whiteSpace: 'nowrap' }}>
                        Add New Group
                      </Button>
                      <Typography sx={{ color: 'text.secondary' }}>Add group, if it doesnt exist.</Typography>
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
                onChange={(e, page) => dispatch(getAllGroups({ institute_id:useInstitute().getInstituteId(),branch_id: selectedBranchId, page }))}
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
