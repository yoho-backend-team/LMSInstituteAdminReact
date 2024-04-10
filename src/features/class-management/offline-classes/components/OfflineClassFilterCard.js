import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { selectBatches } from 'features/batch-management/batches/redux/batchSelectors';
import { getAllBatches } from 'features/batch-management/batches/redux/batchThunks';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { getAllOfflineClasses } from '../redux/offlineClassThunks';

const OfflineClassFilterCard = ({ selectedBranchId }) => {
  const [statusValue, setStatusValue] = useState('');
  const dispatch = useDispatch();
  const batch = useSelector(selectBatches);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllOfflineClasses(data));
  };

  useEffect(() => {
    dispatch(
      getAllBatches({
        branch_id: selectedBranchId
      })
    );
  }, [dispatch, selectedBranchId]);

  const handleBatchChange = (e, newValue) => {
    if (!newValue) {
      setSelectedBatch(null);
      const data = {
        branch_id: selectedBranchId,
        batch_id: ''
      };
      dispatch(getAllOfflineClasses(data));
    } else {
      setSelectedBatch(newValue);
      const data = {
        batch_id: newValue.batch.batch_id,
        branch_id: selectedBranchId
      };
      dispatch(getAllOfflineClasses(data));
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
                <Grid item xs={12} sm={6}>
                  <TextField select fullWidth label="Status" SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}>
                    <MenuItem value="">Select Options</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    fullWidth
                    options={batch}
                    filterSelectedOptions
                    onChange={handleBatchChange}
                    value={selectedBatch}
                    id="autocomplete-multiple-outlined"
                    getOptionLabel={(option) => option.batch.batch_name || ''}
                    renderInput={(params) => <TextField {...params} label=" Batches" placeholder="Favorites" />}
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

OfflineClassFilterCard.propTypes = {
  selectedBranchId: PropTypes.any
};

export default OfflineClassFilterCard;
