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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';

const StudentFilterCard = (props) => {
  const dispatch = useDispatch();

  const { handleSearchFilter, value, selectedBranchId } = props;

  const [statusValue, setStatusValue] = useState('');

  const batch = useSelector(selectBatches);

  useEffect(() => {
    dispatch(
      getAllBatches({
        branch_id: selectedBranchId
      })
    );
  }, [dispatch, selectedBranchId]);

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
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
                  <Autocomplete
                    // multiple
                    fullWidth
                    options={batch}
                    filterSelectedOptions
                    onChange={(e, newValue) => {
                      // const batchId = newValue.map((item) => item.batch.batch_id);
                      console.log(newValue);
                      const data = {
                        batch_id: newValue.batch.batch_id,
                        branch_id: selectedBranchId
                      };
                      dispatch(getAllStudentIdCards(data));
                    }}
                    // defaultValue={[top100Films[13]]}
                    id="autocomplete-multiple-outlined"
                    getOptionLabel={(option) => option.batch.batch_name || ''}
                    renderInput={(params) => <TextField {...params} label=" Batches" placeholder="Favorites" />}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField select fullWidth label="Status" SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}>
                    <MenuItem value="0">Active</MenuItem>
                    <MenuItem value="1">Deactive</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    value={value}
                    label="Search Student"
                    sx={{}}
                    placeholder="Search Student"
                    onChange={(e) => handleSearchFilter(e.target.value)}
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

export default StudentFilterCard;
