import React from 'react';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';
import Card from '@mui/material/Card';
// import { setUsers } from 'features/user-management/users-page/redux/userSlices';
import { getAllUsers } from 'features/user-management/users-page/redux/userThunks';
import { FilterUsersByRole } from 'features/user-management/users-page/services/userServices';
import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
// import { FilterUsersByStatus } from 'features/user-management/users-page/services/userServices';

const UserFilterCard = ({ selectedBranchId, groups }) => {
  const [role, setRole] = useState('');

  const [filterstatusValue, setFilterStatusValue] = useState('');

  const dispatch = useDispatch();
  const handleRoleChange = useCallback(
    async (e) => {
      try {
        setRole(e.target.value);
        const result = await FilterUsersByRole(e.target.value);
        if (result.success) {
          console.log('Search results:', result.data);
          dispatch(getAllUsers(result.data));
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  const handleFilterByStatus = (e) => {
    setFilterStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllUsers(data));
  };

  return (
    <>
      <Card>
        <CardHeader title="Search Filters" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <TextField
                select
                fullWidth
                defaultValue="Select Role"
                SelectProps={{
                  value: role,
                  displayEmpty: true,
                  onChange: (e) => handleRoleChange(e)
                }}
              >
                <MenuItem value="">Select Role</MenuItem>
                {groups?.map((group, index) => (
                  <MenuItem key={index} value={group?.role?.id}>
                    {group?.role?.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                select
                fullWidth
                label="Status"
                defaultValue={''}
                SelectProps={{ value: filterstatusValue, onChange: (e) => handleFilterByStatus(e) }}
              >
                <MenuItem value="">Select Status</MenuItem>
                <MenuItem value="1">Active</MenuItem>
                <MenuItem value="0">Inactive</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default UserFilterCard;
