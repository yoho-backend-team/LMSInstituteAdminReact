import { Box, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllNonTeachingStaffs } from '../redux/nontTeachingStaffThunks';
import { useInstitute } from 'utils/get-institute-details';

const TeacherFilter = (props) => {
  const { selectedBranchId } = props;

  const [statusValue, setStatusValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useDispatch();

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { is_active: e.target.value, branchid: selectedBranchId, instituteId: useInstitute().getInstituteId() };
    dispatch(getAllNonTeachingStaffs(data));
  };

  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      setSearchValue(searchInput);
      dispatch(getAllNonTeachingStaffs({ search: searchInput, branchid: selectedBranchId, instituteId: useInstitute().getInstituteId()}));
    },
    [dispatch]
  );

  return (
    <Grid container spacing={2} px={1}>
      <Grid item xs={12}>
        <Card sx={{ boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }} >
          <CardHeader title=" Non Teaching Staff" />

          <CardContent>
            <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Search By Status"
                  SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}
                >
                  <MenuItem value="">Select Status</MenuItem>
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </TextField>
              </Grid>
              <Grid item sm={3} xs={12}>
                <TextField
                  fullWidth
                  value={searchValue}
                  label="Search Staff"
                  sx={{}}
                  placeholder="Search Staff "
                  onChange={(e) => handleSearch(e)}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Box component={Link} to={'non-teaching-staffs/add'} alignItems="center">
                  <Button variant="contained" size="medium" fullWidth sx={{ py: 1.5, borderRadius: '0.5rem', backgroundColor: "#0CCE7F" , ":hover" : { backgroundColor: "#0AA865"} }}>
                    Add New Staff
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

TeacherFilter.propTypes = {
  selectedBranchId: PropTypes.any
};

export default TeacherFilter;
