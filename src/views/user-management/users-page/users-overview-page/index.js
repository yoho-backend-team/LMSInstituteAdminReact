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
import Icon from 'components/icon';

import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInstitute } from 'utils/get-institute-details';
import { useSpinner } from 'context/spinnerContext';
import { useEffect } from 'react';

const UserList = () => {
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [groups, setGroups] = useState([]);
  const { show, hide } = useSpinner();

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

  const [addUserOpen, setAddUserOpen] = useState(false);
  const toggleAddUserDrawer = useCallback(() => {
    setAddUserOpen((prev) => !prev);
  }, []);

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
    <Grid  container spacing={3} sx={{ position: 'relative' }}>
      <Grid item xs={12}>
        <UserHeaderSection users={users} groups={groups} />
       
       
   
      </Grid>

      <Grid item xs={12} sx={{ zIndex: 20 , display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',}}>
       <Grid alignItems="center">
  <Button
    variant="contained"
    color="primary"
    onClick={() => setGridVisible(!isGridVisible)}
    sx={{ marginBottom: '10px' }}
    startIcon={<FilterListIcon />}
  >
    {isGridVisible ? 'Hide Filter' : 'Show Filter '}
  </Button>
  <span
    style={{
      mt:-3,
      fontSize:"20px",
      padding: '4px 8px',
      borderRadius: '4px',
      fontWeight: 'bold',
    }}
  >
    Admin User
  </span>
</Grid>

        <Button
          onClick={toggleAddUserDrawer}  
          variant="contained"
          sx={{
           
            backgroundColor: '#0CCE7F',
            '&:hover': {
              backgroundColor: '#0AA865',
            },
            width: 'fit-content',
            mb:"10px"
           
          }}
        >
          <Icon fontSize="1rem" icon="tabler:plus" />
          <span style={{ marginLeft: '8px' }}>Add User</span>
        </Button>
      </Grid>

      {isGridVisible && (
       <Grid
       item
       xs={12}
      
       sx={{
         position: 'relative',
         maxWidth: '220px',
         left: 0,
         mb: 2, 
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

     
        <UserBodySection
          groups={groups}
          users={users}
          setUserRefetch={setUserRefetch}
          selectedBranchId={selectedBranchId}
        />
    

      <UserAddDrawer
        open={addUserOpen}
        toggle={toggleAddUserDrawer}
        groups={groups}
        branch_id={selectedBranchId}
      />
    </Grid>
  );
};

export default UserList;
