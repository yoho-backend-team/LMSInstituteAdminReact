// ** React Imports
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { forwardRef, useState } from 'react';
// ** Third Party Imports
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import format from 'date-fns/format';
import DatePicker from 'react-datepicker';
import { getAllLiveClasses } from '../redux/liveClassThunks';
// ** Styled Components
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { getAllCourses } from 'features/course-management/courses-page/redux/courseThunks';
import { getAllBatches } from 'features/batch-management/batches/redux/batchThunks';
import { selectCourses } from 'features/course-management/courses-page/redux/courseSelectors';
import { selectBatches } from 'features/batch-management/batches/redux/batchSelectors';
/* eslint-disable */
const CustomInput = forwardRef((props, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : '';
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null;
  const value = `${startDate}${endDate !== null ? endDate : ''}`;
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null;
  const updatedProps = { ...props };
  delete updatedProps.setDates;
  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />;
});

/* eslint-enable */

const LiveClassFilterCard = (props) => {
  // ** State
  const { selectedBranchId } = props;
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const batch = useSelector(selectBatches);
  const [dates, setDates] = useState([]);
  const [statusValue, setStatusValue] = useState('');
  const [endDateRange, setEndDateRange] = useState(null);
  // const [activecourses,setActiveCourses]=useState('')
  const [startDateRange, setStartDateRange] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);

  console.log('dummy', setStatusValue);

  useEffect(() => {
    const data = {
      type: 'live-classes',
      branch_id: selectedBranchId
    };
    dispatch(getAllLiveClasses(data));
  }, [dispatch, selectedBranchId]);


  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllLiveClasses(data));
  };

  useEffect(() => {
    dispatch(
      getAllBatches({
        branch_id: selectedBranchId
      })
    );
  }, [dispatch, selectedBranchId]);



  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    dispatch(getAllCourses(data));
  }, [dispatch, selectedBranchId]);

  const handleBatchChange = (e, newValue) => {
    if (!newValue) {
      // If newValue is null, clear the batch selection
      setSelectedBatch(null);
      const data = {
        branch_id: selectedBranchId,
        // Pass empty batch_id to reset the batch filter
        batch_id: ''
      };
      dispatch(getAllLiveClasses(data));
    } else {
      setSelectedBatch(newValue);
      const data = {
        batch_id: newValue.batch.batch_id,
        branch_id: selectedBranchId
      };
      dispatch(getAllLiveClasses(data));
    }
  };


  const handleOnChangeRange = (dates) => {
    const [start, end] = dates;
    if (start !== null && end !== null) {
      setDates(dates);
    }
    setStartDateRange(start);
    setEndDateRange(end);
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
                    // value={courses.find((course) => course.course_id === (newValue?.course_id || '')) || null} // Reset to null when newValue is undefined or course_id is not found
                    onChange={(e, newValue) => {
                      const data = {
                        course_id: newValue?.course_id || '', 
                        branch_id: selectedBranchId
                      };
                      dispatch(getAllLiveClasses(data));
                    }}
                    options={courses}
                    getOptionLabel={(option) => option.course_name || ''}
                    renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} label="Course" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
                      <CustomInput dates={dates} setDates={setDates} label="Class Date" end={endDateRange} start={startDateRange} />
                    }
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

export default LiveClassFilterCard;
