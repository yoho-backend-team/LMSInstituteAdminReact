import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { forwardRef, useCallback, useState } from 'react';
import { Box } from '@mui/material';
import format from 'date-fns/format';
import DatePicker from 'react-datepicker';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { getAllCourses } from 'features/course-management/courses-page/services/courseServices';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { getAllBatches } from '../redux/batchThunks';
import PropTypes from 'prop-types';
import SearchIcon from "@mui/icons-material/Search"
import { serialize } from 'stylis';

const CustomInput = forwardRef((props, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : '';
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null;
  const value = `${startDate}${endDate !== null ? endDate : ''}`;
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null;
  const updatedProps = { ...props };
  delete updatedProps.setDates;
  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />;
});

const BatchFilterCard = (props) => {
  const { selectedBranchId ,batches} = props;

  const [startDateRange, setStartDateRange] = useState(null);
  const [dates, setDates] = useState([]);
  const [endDateRange, setEndDateRange] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [filterstatusValue, setFilterStatusValue] = useState('');

  const handleFilterByStatus = (e) => {
    setFilterStatusValue(e.target.value);
    const data = { is_active: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllBatches(data));
  };

  function convertDateFormat(input) {
    var originalDate = new Date(input);
    var year = originalDate.getFullYear();
    var month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
    var day = ('0' + originalDate.getDate()).slice(-2);
    var formattedDateString = year + '-' + month + '-' + day;
    return formattedDateString;
  }

  const handleOnChangeRange = (dates) => {
    const [start, end] = dates;
    if (start !== null && end !== null) {
      setDates(dates);
      const data = {
        start_date: convertDateFormat(start),
        end_date: convertDateFormat(end),
        branch_id: selectedBranchId
      };
      dispatch(getAllBatches(data));
    }
    setStartDateRange(start);
    setEndDateRange(end);
  };

  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };

    if (batches?.length > 0) {
      setSuggestions(batches);
    }   
     getCourses(data);
  }, [selectedBranchId,batches]);

  const getCourses = async (data) => {
    const result = await getAllCourses(data);
    if (result?.data) {
      setCourses(result?.data);
    }
  };

  const handleSearch = useCallback(
    (e) => {
      dispatch(getAllBatches({ batch_name: searchValue?.batch_name,branch_id:selectedBranchId}));
    },
    [dispatch, selectedBranchId]
  );


  const handleSearchIconClick = () => {
    
    const data = {
      search: searchValue,
      branch_id: selectedBranchId
    };
    dispatch(getAllBatches(data));
  };

  return (
    <DatePickerWrapper>

      <Grid item xs={12} sm={12}>
        
        <Card sx={{ boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }} >
          <CardHeader title="Batches" />
          <CardContent>
            <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  fullWidth
                  label="Search By Status"
                  defaultValue={''}
                  SelectProps={{ value: filterstatusValue, onChange: (e) => handleFilterByStatus(e) }}
                >
                  <MenuItem value="">Select Status</MenuItem>
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <DatePicker
                  isClearable
                  selectsRange
                  monthsShown={2}
                  endDate={endDateRange}
                  selected={startDateRange}
                  startDate={startDateRange}
                  shouldCloseOnSelect={false}
                  id="date-range-picker-months"
                  onChange={handleOnChangeRange}
                  customInput={
                    <CustomInput dates={dates} setDates={setDates} label="Search Between Dates" end={endDateRange} start={startDateRange} />
                  }
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Autocomplete
                  fullWidth
                  onChange={(e, newValue) => {
                    const data = {
                      course: newValue?._id || '',
                      branch_id: selectedBranchId
                    };
                    dispatch(getAllBatches(data));
                  }}
                  options={courses}
                  getOptionLabel={(option) => option.course_name || ''}
                  renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} label="Search By Course" />}
                />
              </Grid>
              <Grid item xs={12} sm={4}></Grid>
              <Grid item xs={12} sm={4}>
              <Autocomplete
                fullWidth
                value={searchValue}
                onChange={(e,newValue)=>setSearchValue(newValue)}
                // onChange={handleSearch}
                options={suggestions||[]}
                getOptionLabel={(option) => option?.batch_name}
                defaultValue={'search here'}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Batch"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Button onClick={handleSearch} sx={{ p: 0 }}>
                          <SearchIcon />
                        </Button>
                      )
                    }}
                  />
                )}
              />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Box component={Link} to={'batches/add'}>
                  <Button variant="contained" size="medium" fullWidth sx={{ py: 1.7, borderRadius: 2, backgroundColor : "#0CCE7F", ":hover" : { backgroundColor: "#0AA865" } }}>
                    Add New Batch
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </DatePickerWrapper>
  );
};

BatchFilterCard.propTypes = {
  selectedBranchId: PropTypes.any
};

export default BatchFilterCard;
