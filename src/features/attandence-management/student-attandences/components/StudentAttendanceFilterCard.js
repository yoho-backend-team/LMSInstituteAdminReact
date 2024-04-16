import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { getAllBatches } from 'features/batch-management/batches/services/batchServices';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { getAllStudentAttendances } from '../redux/studentAttendanceThunks';

const StudentAttendanceFilterCard = ({ selectedBranchId }) => {
  // ** State
  const dispatch = useDispatch();
  const [statusValue, setStatusValue] = useState('');

  const [searchValue, setSearchValue] = useState('');
  const [selectedBatch, setSelectedBatch] = useState(null);

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllStudentAttendances(data));
  };

  const [batches, setBatches] = useState([]);
  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    getBatches(data);
  }, [selectedBranchId]);

  const getBatches = async (data) => {
    const result = await getAllBatches(data);
    if (result?.success) {
      setBatches(result?.data);
    }
  };

  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllStudentAttendances({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
    },
    [dispatch]
  );

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
        batch_id: newValue.batch_id,
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
                    options={batches}
                    filterSelectedOptions
                    onChange={handleBatchChange}
                    value={selectedBatch}
                    id="autocomplete-multiple-outlined"
                    getOptionLabel={(option) => option.batch_name || ''}
                    renderInput={(params) => <TextField {...params} label=" Batches" placeholder="Favorites" />}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField value={searchValue} fullWidth placeholder="Search" onChange={(e) => handleSearch(e)} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

StudentAttendanceFilterCard.propTypes = {
  selectedBranchId: PropTypes.any
};

export default StudentAttendanceFilterCard;
