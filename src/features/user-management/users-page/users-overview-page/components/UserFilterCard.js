import { TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { role } from '_mock/role';
import { getAllUsers } from 'features/user-management/users-page/redux/userThunks';
import UserTableHeader from 'features/user-management/users-page/users-overview-page/components/UserTableHeader';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useInstitute } from 'utils/get-institute-details';
import { useSpinner } from 'context/spinnerContext';

const UserFilterCard = ({ selectedBranchId, groups, toggle, setUserRefetch ,users,userRefetch}) => {
  const [role, setRole] = useState('');
  const {show ,hide} = useSpinner()
  
  const [filterstatusValue, setFilterStatusValue] = useState('');
  
  const dispatch = useDispatch();
  const handleRoleChange = useCallback(
    async (e) => {
      try {
        show()
        setRole(e.target.value);
        const role = {role:e.target.value ? e.target.value :null,is_active:filterstatusValue?filterstatusValue:null }
        const data = { ...role, branch_id: selectedBranchId,institute_id:useInstitute().getInstituteId() };
        dispatch(getAllUsers(data));
        hide()
      } catch (error) {
        hide()
        console.log(error);
      }
    },
    [dispatch]
  );

  const handleFilterByStatus = (e) => {
    show()
    setFilterStatusValue(e.target.value);
    const filteRole = {role:role?role:null ,is_active:e.target.value ? e.target?.value:null}
    const data = { ...filteRole,branch_id: selectedBranchId ,institute_id:useInstitute().getInstituteId()};
    dispatch(getAllUsers(data));
    hide()
  };

  return (
    <>
      <Card>
        <CardHeader title="Admin Users" />
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
                {groups?.data?.map((group, index) => (
                  <MenuItem key={index} value={group?._id}>
                    {group?.identity}
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
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <UserTableHeader setUserRefetch={setUserRefetch} toggle={toggle} selectedBranchId={selectedBranchId} users={users?.data} userRefetch={userRefetch} />
        </CardContent>
      </Card>
    </>
  );
};

UserFilterCard.propTypes = {
  selectedBranchId: PropTypes.any,
  groups: PropTypes.any,
  toggle: PropTypes.any,
  setUserRefetch: PropTypes.any
};

export default UserFilterCard;
