import { TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { getAllStaffIdCards } from 'features/id-card-management/staff-id-cards/redux/staffIdcardThunks';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';

const StaffFilterCard = (props) => {
  //
  const dispatch = useDispatch();
  const { handleSearch, selectedBranchId, searchValue, filterstatusValue, handleFilterByStatus } = props;

  const [staffValue, setStaffValue] = useState('');

  const handleFilterByStaffType = (e) => {
    setStaffValue(e.target.value);
    const data = { type: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllStaffIdCards(data));
  };

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="ID card" />
            <CardContent sx={{ pt: 0 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    select
                    fullWidth
                    label="Staff Type"
                    defaultValue={''}
                    SelectProps={{ value: staffValue, onChange: (e) => handleFilterByStaffType(e) }}
                  >
                    <MenuItem value="">Select Option</MenuItem>
                    <MenuItem value="teaching">Teaching</MenuItem>
                    <MenuItem value="non_teaching">Non Teaching</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={4}>
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

                <Grid item xs={12} sm={4}>
                  <TextField value={searchValue} fullWidth placeholder="Search Staff" onChange={(e) => handleSearch(e)} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

export default StaffFilterCard;
