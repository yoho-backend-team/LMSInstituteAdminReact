import { TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { getAllStaffIdCards } from 'features/id-card-management/staff-id-cards/redux/staffIdcardThunks';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { useInstitute } from 'utils/get-institute-details';

const StaffFilterCard = (props) => {
  const dispatch = useDispatch();

  const { handleSearch, selectedBranchId, searchValue, filterstatusValue } = props;

  const [staffValue, setStaffValue] = useState('');
  const [statusValue, setStatusValue] = useState('');

  const handleFilterByStaffType = (e) => {
    setStaffValue(e.target.value);
    const data = { type: e.target.value, branchid: selectedBranchId, instituteid: useInstitute().getInstituteId(), page: '1' };
    dispatch(getAllStaffIdCards(data));
  };

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { isActive: e.target.value, branchid: selectedBranchId, instituteid: useInstitute().getInstituteId(), page: '1' };
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
                    <MenuItem value="nonteaching">Non Teaching</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    select
                    fullWidth
                    label="Status"
                    defaultValue={''}
                    SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}
                  >
                    <MenuItem value="">Select Status</MenuItem>
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Inactive</MenuItem>
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

StaffFilterCard.propTypes = {
  handleSearch: PropTypes.func,
  selectedBranchId: PropTypes.string,
  searchValue: PropTypes.string,
  filterstatusValue: PropTypes.string,
  handleFilterByStatus: PropTypes.func
};

export default StaffFilterCard;
