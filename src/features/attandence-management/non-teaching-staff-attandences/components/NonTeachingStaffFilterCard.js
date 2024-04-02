// ** React Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
// ** Third Party Imports
import TextField from '@mui/material/TextField';
import { getAllNonTeachingStaffs } from 'features/staff-management/non-teaching-staffs/redux/nontTeachingStaffThunks';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';

const NonTeachingStaffFilterCard = (props) => {
  const { selectedBranchId } = props;
  // ** State
  const [statusValue, setStatusValue] = useState('');
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  console.log(selectedBranchId);

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId, type: 'non-teaching' };
    dispatch(getAllNonTeachingStaffs(data));
  };

  // Callback function to handle search
  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllNonTeachingStaffs({ search: searchInput, branch_id: selectedBranchId, type: 'non-teaching' }));
      setSearchValue(searchInput);
      // Dispatch action to fetch branches with search input
    },
    [dispatch]
  );

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Non-Teaching Staff Attendance" />
            <CardContent>
              <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Grid item xs={12} sm={6}>
                  <TextField select fullWidth label="Status" SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}>
                    <MenuItem value="">Select Status</MenuItem>
                    <MenuItem value="1">Active</MenuItem>
                    <MenuItem value="0">Inactive</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField value={searchValue} fullWidth placeholder="Search Non-Teaching Staff" onChange={(e) => handleSearch(e)} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

export default NonTeachingStaffFilterCard;
