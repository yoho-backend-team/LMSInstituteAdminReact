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
import { getAllActiveBatchesByCourse } from 'features/batch-management/batches/services/batchServices';
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
  const [filterBatches,setFilterBatches]=useState({})
  const [filterCourses,setfilterCourses]=useState({})
  console.log('dummy', setStatusValue);

  useEffect(() => {
    const data = {
      type: 'live-classes',
      branch_id: selectedBranchId
    };
    dispatch(getAllLiveClasses(data));
  }, [dispatch, selectedBranchId]);

  // useEffect(() => {
  //   const data = {
  //     branch_id: selectedBranchId
  //   };
  //   dispatch(getAllCourses(data));
  // }, [dispatch, selectedBranchId]);

  // useEffect(() => {
  //   const data = {
  //     branch_id: selectedBranchId
  //   };
  //   dispatch(getAllBatches(data));
  // }, [dispatch, selectedBranchId]);
  const getFilteredCourses = async () => {
    const data = {
      branch_id: selectedBranchId
    };
    const courses = await getAllCourses(data);
    setfilterCourses(courses);
  }

  useEffect(() => {
    getFilteredCourses() 
  }, [dispatch, selectedBranchId]);
  
  const getAllbatches = async () => {
    const data = {
      branch_id: selectedBranchId
    };
    const activeBatches = await getAllActiveBatchesByCourse(data);
    setFilterBatches(activeBatches);
  }

  useEffect(() => {
    getAllbatches() 
  }, [dispatch, selectedBranchId]);


  const handleOnChangeRange = (dates) => {
    const [start, end] = dates;
    if (start !== null && end !== null) {
      setDates(dates);
    }
    setStartDateRange(start);
    setEndDateRange(end);
  };

  // const [selectedCourses, setSelectedCourses] = useState([]);
  // const batch = [
  //   { batch_id: '1', batch_name: 'batch 1' },
  //   { batch_id: '2', batch_name: 'batch 2' },
  //   { batch_id: '3', batch_name: 'batch 3' }
  // ];

  // const [selectedbatch, setSelectedbatch] = useState([]);

  // const handlebatchChange = (newValue) => {
  //   if (newValue && newValue.some((option) => option.batch_id === 'selectAll')) {
  //     setSelectedbatch(batch.filter((option) => option.batch_id !== 'selectAll'));
  //   } else {
  //     setSelectedbatch(newValue);
  //   }
  // };

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
                    <MenuItem value="1">Active</MenuItem>
                    <MenuItem value="0">Inactive</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    fullWidth
                    // value={value}
                    onChange={(e, newValue) => {
                      // const courseId = newValue?.map((item) => item?.course_id);
                      const data = {
                        course_id: newValue.course_id,
                        branch_id: selectedBranchId
                      };
                      filterCourses(getAllLiveClasses(data));
                    }}
                    options={courses}
                    getOptionLabel={(option) => option.course_name || ''}
                    renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} label="Course" />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                    filterBatches(getAllLiveClasses(data));
                  }}
                  // defaultValue={[top100Films[13]]}
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
