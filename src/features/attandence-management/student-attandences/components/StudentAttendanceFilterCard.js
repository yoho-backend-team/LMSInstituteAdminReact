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
import { useInstitute } from 'utils/get-institute-details';
import FilterCardDesign from './FilterCardDesign';
import { Button } from '@mui/material';
import { IconX } from '@tabler/icons';
import { IconSearch } from '@tabler/icons';
import { display } from '@mui/system';

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
  console.log(batches, 'batches');
  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      e.preventDefault();
      // dispatch(getAllStudentAttendances({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
    },
    [dispatch]
  );

  const handleBatchChange = (e, newValue) => {
    if (!newValue) {
      setSelectedBatch(null);
      const data = {
        branch_id: selectedBranchId,
        institute_id: useInstitute().getInstituteId(),
        batch_id: ''
      };
      dispatch(getAllStudentAttendances(data));
    } else {
      setSelectedBatch(newValue);
      const data = {
        batch: newValue._id,
        branch_id: selectedBranchId,
        institute_id: useInstitute().getInstituteId()
      };
      dispatch(getAllStudentAttendances(data));
    }
  };
  const [show, setShow] = useState(true);
  function handleClose() {
    setShow(!show);
  }

  return (
    <>
      {show ? (
        <FilterCardDesign show={show} setShow={setShow} back={handleClose} />
      ) : (
        <DatePickerWrapper>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card sx={{ boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)' }}>
                <Button
                  style={{ backgroundColor: 'black', height: 10, position: 'absolute', right: 40, marginTop: 20 }}
                  onClick={handleClose}
                >
                  <IconX stroke={2} />
                </Button>
                <CardHeader title="Filters" />
                <CardContent>
                  <Grid container spacing={2}>
                    {/* <Grid item xs={12} sm={4}>
                    <TextField select fullWidth label="Status" SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}>
                    <MenuItem value="">Select Options</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    </TextField>
                    </Grid> */}

                    <Grid item xs={12} sm={4}>
                      <Autocomplete
                        fullWidth
                        options={batches || []}
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
                    <Grid></Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DatePickerWrapper>
      )}
    </>
  );
};

StudentAttendanceFilterCard.propTypes = {
  selectedBranchId: PropTypes.any
};

export default StudentAttendanceFilterCard;
