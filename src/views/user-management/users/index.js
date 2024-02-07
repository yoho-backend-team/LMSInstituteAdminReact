// ** React Imports
import { useEffect } from 'react';

import Grid from '@mui/material/Grid';

import UserSkeleton from 'components/cards/Skeleton//UserSkeleton';

// ** Components Imports

import UserHeaderSection from 'features/user-management/users/components/UserHeaderSection';
import UserBodySection from 'features/user-management/users/components/UserBodySection';

import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from 'features/user-management/users/redux/userThunks';
import { selectUsers, selectLoading as selectUserLoading } from 'features/user-management/users/redux/userSelectors';
// import { getAllActiveGroups } from 'features/user-management/users/services/userServices';
import { getAllGroups } from 'features/user-management/groups/redux/groupThunks';

import { selectGroups } from 'features/user-management/groups/redux/groupSelectors';
import { useState } from 'react';
const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const userLoading = useSelector(selectUserLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const groups = useSelector(selectGroups);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(getAllGroups(selectedBranchId));
  }, [selectedBranchId]);

  useEffect(() => {
    dispatch(getAllUsers(selectedBranchId));
  }, [dispatch, selectedBranchId, loading]);

  console.log(users);

  return (
    <>
      {userLoading ? (
        <UserSkeleton />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <UserHeaderSection users={users} groups={groups} setLoading={setLoading} />
          </Grid>
          <Grid item xs={12}>
            <UserBodySection groups={groups} users={users} setLoading={setLoading} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default UserList;
