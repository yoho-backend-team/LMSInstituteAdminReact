import Grid from '@mui/material/Grid';
import { getAllGroups } from 'features/user-management/groups-page/services/groupService';
import { selectUsers } from 'features/user-management/users-page/redux/userSelectors';
import { getAllUsers } from 'features/user-management/users-page/redux/userThunks';
import UserAddDrawer from 'features/user-management/users-page/users-overview-page/components/UserAddDrawer';
import UserBodySection from 'features/user-management/users-page/users-overview-page/components/UserBodySection';
import UserFilterCard from 'features/user-management/users-page/users-overview-page/components/UserFilterCard';
import UserHeaderSection from 'features/user-management/users-page/users-overview-page/components/UserHeaderSection';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInstitute } from 'utils/get-institute-details';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [groups, setGroups] = useState([]);

  // Fetch groups when selectedBranchId changes
  useEffect(() => {
    getGroups();
  }, [dispatch, selectedBranchId]);

  const getGroups = async () => {
    const result = await getAllGroups({institute_id:useInstitute().getInstituteId()});
    console.log(result,"result")
    if (result.data) {
      setGroups(result.data);
    }
  };

  // State for controlling the visibility of the Add User Drawer
  const [addUserOpen, setAddUserOpen] = useState(false);
  const toggleAddUserDrawer = useCallback(() => {
    setAddUserOpen((prev) => !prev);
  }, []);

  // State for triggering user data refetch
  const [userRefetch, setUserRefetch] = useState(false);

  // Fetch users when selectedBranchId or userRefetch changes
  useEffect(() => {
    dispatch(getAllUsers({ branch_id: selectedBranchId, page: '1',institute_id:useInstitute().getInstituteId() }));
  }, [dispatch, selectedBranchId, userRefetch]);
  console.log(users,"users")
  return (
    <>
      <Grid container spacing={3}>
        {/* User Header Section */}
        <Grid item xs={12}>
          <UserHeaderSection users={users?.data} groups={groups} />
        </Grid>

        {/* User Filter Card */}
        <Grid item xs={12}>
          <UserFilterCard
            users={users}
            groups={groups}
            setUserRefetch={setUserRefetch}
            selectedBranchId={selectedBranchId}
            toggle={toggleAddUserDrawer}
          />
        </Grid>

        {/* Display Skeleton or User Body Section based on loading state */}

        <Grid item xs={12}>
          <UserBodySection groups={groups} users={users} setUserRefetch={setUserRefetch} selectedBranchId={selectedBranchId} />
        </Grid>

        {/* Add User Drawer */}
        <UserAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} groups={groups} />
      </Grid>
    </>
  );
};

export default UserList;
