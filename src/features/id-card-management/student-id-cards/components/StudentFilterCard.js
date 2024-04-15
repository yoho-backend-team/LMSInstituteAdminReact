import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { selectBatches } from 'features/batch-management/batches/redux/batchSelectors';
import { getAllBatches } from 'features/batch-management/batches/redux/batchThunks';
import { getAllStudentIdCards } from 'features/id-card-management/student-id-cards/redux/studentIdcardThunks';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';

const StudentFilterCard = (props) => {
  const dispatch = useDispatch();

  const { handleSearch, selectedBranchId, searchValue, filterstatusValue, handleFilterByStatus } = props;

  const batch = useSelector(selectBatches);

  useEffect(() => {
    dispatch(
      getAllBatches({
        branch_id: selectedBranchId
      })
    );
  }, [dispatch, selectedBranchId]);

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="ID card" />
            <CardContent sx={{ pt: 0 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    fullWidth
                    options={batch}
                    filterSelectedOptions
                    onChange={(e, newValue) => {
                      if (!newValue) {
                        const data = {
                          batch_id: '',
                          branch_id: selectedBranchId
                        };
                        dispatch(getAllStudentIdCards(data));
                      } else {
                        const data = {
                          batch_id: newValue.batch.batch_id,
                          branch_id: selectedBranchId
                        };
                        dispatch(getAllStudentIdCards(data));
                      }
                    }}
                    id="autocomplete-multiple-outlined"
                    getOptionLabel={(option) => option.batch.batch_name || ''}
                    renderInput={(params) => <TextField {...params} label=" Batches" placeholder="Favorites" />}
                  />
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
                  <TextField value={searchValue} fullWidth placeholder="Search Student" onChange={(e) => handleSearch(e)} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

StudentFilterCard.propTypes = {
  handleSearch: PropTypes.any,
  selectedBranchId: PropTypes.any,
  searchValue: PropTypes.any,
  filterstatusValue: PropTypes.any,
  handleFilterByStatus: PropTypes.any
};

export default StudentFilterCard;
