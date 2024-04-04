import { Box, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllNonTeachingStaffs } from '../redux/nontTeachingStaffThunks';

const TeacherFilter = (props) => {
  const { selectedBranchId } = props;
  const [statusValue, setStatusValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useDispatch();

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId, type: 'non_teaching' };
    dispatch(getAllNonTeachingStaffs(data));
  };

  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      setSearchValue(searchInput);
      dispatch(getAllNonTeachingStaffs({ search: searchInput, branch_id: selectedBranchId, type: 'non_teaching' }));
      // Dispatch action to fetch branches with search input
    },
    [dispatch]
  );

  console.log(statusValue);
  return (
    <Grid container spacing={2} px={1}>
      <Grid item xs={12}>
        <Card>
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
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="0">Inactive</MenuItem>
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
                  <Button variant="contained" size="medium" fullWidth sx={{ py: 1.5, borderRadius: '0.5rem' }}>
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

export default TeacherFilter;
