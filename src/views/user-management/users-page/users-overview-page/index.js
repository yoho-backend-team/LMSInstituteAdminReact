import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { getAllGroups } from 'features/user-management/groups-page/services/groupService';
import { selectUsers } from 'features/user-management/users-page/redux/userSelectors';
import { getAllUsers } from 'features/user-management/users-page/redux/userThunks';
import UserAddDrawer from 'features/user-management/users-page/users-overview-page/components/UserAddDrawer';
import UserBodySection from 'features/user-management/users-page/users-overview-page/components/UserBodySection';
import UserFilterCard from 'features/user-management/users-page/users-overview-page/components/UserFilterCard';
import UserHeaderSection from 'features/user-management/users-page/users-overview-page/components/UserHeaderSection';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInstitute } from 'utils/get-institute-details';
import { useSpinner } from 'context/spinnerContext';
import LetterFillSpinner from 'components/spinner/letterSpinner';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [groups, setGroups] = useState([]);
  const { show, hide } = useSpinner();

  // Fetch groups when selectedBranchId changes
  useEffect(() => {
    getGroups();
  }, [dispatch, selectedBranchId]);

  const getGroups = async () => {
    show();
    const result = await getAllGroups({ institute_id: useInstitute().getInstituteId() });
    if (result) {
      setGroups(result);
    }
    hide();
  };

  // State for controlling the visibility of the Add User Drawer
  const [addUserOpen, setAddUserOpen] = useState(false);
  const toggleAddUserDrawer = useCallback(() => {
    setAddUserOpen((prev) => !prev);
  }, []);

  // State for controlling the visibility of the UserFilterCard grid
  const [isGridVisible, setGridVisible] = useState(false);

  const [userRefetch, setUserRefetch] = useState(false);

  useEffect(() => {
    show();
    dispatch(
      getAllUsers({
        branch_id: selectedBranchId,
        page: '1',
        institute_id: useInstitute().getInstituteId(),
      })
    );
    hide();
  }, [dispatch, selectedBranchId, userRefetch]);

  return (
    <>
  <Grid container spacing={3} sx={{ position: 'relative' }}>
  {/* User Header Section */}
  <Grid item xs={12}>
    <UserHeaderSection users={users} groups={groups} />
  </Grid>

  {/* Toggle Button for User Filter Card */}
  <Grid item xs={12} sx={{ zIndex: 20 }}>
    <Button
      variant="contained"
      color="primary"
      onClick={() => setGridVisible(!isGridVisible)}
      sx={{ marginBottom: '16px' }}
      startIcon={<FilterListIcon />}
    >
      {isGridVisible ? 'Hide' : 'Filter '}
    </Button>
  </Grid>

  {/* Conditionally render User Filter Card as an overlay */}
  {isGridVisible && (
    <Grid
      item
      xs={12}
      sx={{
        position: 'absolute',
        top: 180,
        left: 0,
        right: 0,
        zIndex: 10,  // Ensure it's above other content
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Optional, adds a slight background for visibility
        padding: '16px',
        boxSizing: 'border-box', // Ensure padding is considered inside the overlay
      }}
    >
      <UserFilterCard
        users={users}
        groups={groups}
        setUserRefetch={setUserRefetch}
        selectedBranchId={selectedBranchId}
        userRefetch={userRefetch}
        toggle={toggleAddUserDrawer}
      />
    </Grid>
  )}

  {/* Display Skeleton or User Body Section based on loading state */}
  <Grid item xs={12}>
    <UserBodySection
      groups={groups}
      users={users}
      setUserRefetch={setUserRefetch}
      selectedBranchId={selectedBranchId}
    />
  </Grid>

  {/* Add User Drawer */}
  <UserAddDrawer
    open={addUserOpen}
    toggle={toggleAddUserDrawer}
    groups={groups}
    branch_id={selectedBranchId}
  />
</Grid>


    </>
  );
};

export default UserList;
