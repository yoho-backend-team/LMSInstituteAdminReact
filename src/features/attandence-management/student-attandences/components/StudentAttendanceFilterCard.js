// ** React Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
// ** Third Party Imports
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
// ** Styled Components
import { selectBatches } from 'features/batch-management/batches/redux/batchSelectors';
import { getAllBatches } from 'features/batch-management/batches/redux/batchThunks';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { getAllStudentAttendances } from '../redux/studentAttendanceThunks';

/* eslint-enable */
const StudentAttendanceFilterCard = ({ selectedBranchId }) => {
  // ** State
  const dispatch = useDispatch();
  const [statusValue, setStatusValue] = useState('');

  const [searchValue, setSearchValue] = useState('');
  const batch = useSelector(selectBatches);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllStudentAttendances(data));
  };

  useEffect(() => {
    dispatch(
      getAllBatches({
        branch_id: selectedBranchId
      })
    );
  }, [dispatch, selectedBranchId]);

  // Callback function to handle search
  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllStudentAttendances({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
      // Dispatch action to fetch branches with search input
    },
    [dispatch]
  );

  // Function to handle batch selection change
  const handleBatchChange = (e, newValue) => {
    if (!newValue) {
      // If newValue is null, clear the batch selection
      setSelectedBatch(null);
      const data = {
        branch_id: selectedBranchId,
        // Pass empty batch_id to reset the batch filter
        batch_id: ''
      };
      dispatch(getAllStudentAttendances(data));
    } else {
      setSelectedBatch(newValue);
      const data = {
        batch_id: newValue.batch.batch_id,
        branch_id: selectedBranchId
      };
      dispatch(getAllStudentAttendances(data));
    }
  };

  return (
    <DatePickerWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Filters" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField select fullWidth label="Status" SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}>
                    <MenuItem value="">Select Options</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    fullWidth
                    options={batch}
                    filterSelectedOptions
                    onChange={handleBatchChange} // Handle batch selection change
                    value={selectedBatch} // Controlled value for the Autocomplete component
                    id="autocomplete-multiple-outlined"
                    getOptionLabel={(option) => option.batch.batch_name || ''}
                    renderInput={(params) => <TextField {...params} label=" Batches" placeholder="Favorites" />}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    value={searchValue}
                    fullWidth
                    placeholder="Search"
                    onChange={(e) => handleSearch(e)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

export default StudentAttendanceFilterCard;
