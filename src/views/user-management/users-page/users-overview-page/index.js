import Grid from '@mui/material/Grid';
import UserSkeleton from 'components/cards/Skeleton//UserSkeleton';
import { selectGroups } from 'features/user-management/groups-page/redux/groupSelectors';
import { getAllGroups } from 'features/user-management/groups-page/redux/groupThunks';
import UserBodySection from 'features/user-management/users-page/users-overview-page/components/UserBodySection';
import UserHeaderSection from 'features/user-management/users-page/users-overview-page/components/UserHeaderSection';
import { selectLoading as selectUserLoading, selectUsers } from 'features/user-management/users-page/redux/userSelectors';
import { getAllUsers } from 'features/user-management/users-page/redux/userThunks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserTableHeader from 'features/user-management/users-page/users-overview-page/components/UserTableHeader';
import UserAddDrawer from 'features/user-management/users-page/users-overview-page/components/UserAddDrawer';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const userLoading = useSelector(selectUserLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const groups = useSelector(selectGroups);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllGroups(selectedBranchId));
  }, [selectedBranchId]);

  const [addUserOpen, setAddUserOpen] = useState(false);
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);
  // Local state
  const [userRefetch, setUserRefetch] = useState(false);

  // Fetch course categories on component mount or when dependencies change
  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    dispatch(getAllUsers(data));
  }, [dispatch, selectedBranchId, userRefetch, loading]);

  console.log(users);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <UserHeaderSection users={users} groups={groups} setLoading={setLoading} />
        </Grid>
        <Grid item xs={12}>
          <UserTableHeader setUserRefetch={setUserRefetch} toggle={toggleAddUserDrawer} />
        </Grid>
        {userLoading ? (
          <UserSkeleton />
        ) : (
          <Grid item xs={12}>
            <UserBodySection groups={groups} users={users} setLoading={setLoading} setUserRefetch={setUserRefetch} />
          </Grid>
        )}

        <UserAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} groups={groups} setLoading={setLoading} />
      </Grid>
    </>
  );
};

export default UserList;
