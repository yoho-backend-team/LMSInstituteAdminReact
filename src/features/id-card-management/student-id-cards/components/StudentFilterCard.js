import { Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { getAllBatches } from 'features/batch-management/batches/services/batchServices';
import { getAllStudentIdCards } from 'features/id-card-management/student-id-cards/redux/studentIdcardThunks';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { useInstitute } from 'utils/get-institute-details';

const StudentFilterCard = (props) => {
  const dispatch = useDispatch();
  const [statusValue, setStatusValue] = useState('');

  const { handleSearch, selectedBranchId, searchValue, filterstatusValue } = props;

  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId,
    };
    getBatches(data);
  }, [selectedBranchId]);

  const getBatches = async (data) => {
    const result = await getAllBatches(data);
    console.log(result,"result")
    if (result?.success) {
      setBatches(result?.data);
    }
  };

  
  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { isActive: e.target.value, branchid: selectedBranchId, instituteid: useInstitute().getInstituteId(), page: '1' };
    dispatch(getAllStudentIdCards(data));
  };

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
            <Typography variant='h2'>Student ID card</Typography>
          <Card sx={{display: "none" , boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)"}} >
            <CardHeader sx={{ fontSize: "24px" }} title="ID card" />
            <CardContent sx={{ pt: 0, display: "none" }}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    fullWidth
                    options={batches || []}
                    filterSelectedOptions
                    onChange={(e, newValue) => {
                      if (!newValue) {
                        const data = {
                          batch_id: '',
                          branchid: selectedBranchId,
                          instituteid: useInstitute().getInstituteId()
                        };
                        dispatch(getAllStudentIdCards(data));
                      } else {
                        const data = {
                          batch_id: newValue._id,
                          branchid: selectedBranchId,
                          instituteid: useInstitute().getInstituteId()
                        };
                 
                        dispatch(getAllStudentIdCards(data));
                      }
                    }}
                    id="autocomplete-multiple-outlined"
                    getOptionLabel={(option) => option.batch_name || ''}
                    renderInput={(params) => <TextField {...params} label=" Batches" placeholder="Favorites" />}
                  />
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
