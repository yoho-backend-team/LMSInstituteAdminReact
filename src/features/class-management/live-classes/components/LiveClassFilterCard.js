import Autocomplete from '@mui/material/Autocomplete';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import format from 'date-fns/format';
import { getAllCourses } from 'features/course-management/courses-page/services/courseServices';
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState, useRef ,useCallback} from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { getAllLiveClasses } from '../redux/liveClassThunks';
import { getAllBatches } from 'features/batch-management/batches/services/batchServices';
import { useInstitute } from 'utils/get-institute-details';

import { Box } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Button from '@mui/material/Button';
import LiveClassCardHeader from './LiveClassCardHeader';

const CustomInput = forwardRef((props, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : '';
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null;
  const value = `${startDate}${endDate !== null ? endDate : ''}`;
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null;
  const updatedProps = { ...props };
  delete updatedProps.setDates;
  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />;
});

const LiveClassFilterCard = (props) => {
  const { selectedBranchId , setRefetch } = props;
  const dispatch = useDispatch();
  const [statusValue, setStatusValue] = useState('');
  const [startDateRange, setStartDateRange] = useState(null);
  const [dates, setDates] = useState([]);
  const [endDateRange, setEndDateRange] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
 const [searchValue, setSearchValue] = useState('');

  const handleSearch = useCallback(
     (e) => {
       const searchInput = e.target.value;
       dispatch(getAllLiveClasses({ search: searchInput, branch_id: selectedBranchId }));
       setSearchValue(searchInput);
     },
     [dispatch]
   );

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const data = {
      branch_id: selectedBranchId,
      institute: useInstitute().getInstituteId()
    };
    getCourses(data);
  }, [selectedBranchId]);

  const getCourses = async (data) => {
    const result = await getAllCourses(data);

    if (result?.data) {
      setCourses(result?.data);
    }
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
        institute: useInstitute().getInstituteId(),
        start_date: convertDateFormat(start),
        end_date: convertDateFormat(end),
        branch: selectedBranchId
      };
      dispatch(getAllLiveClasses(data));
    }
    setStartDateRange(start);
    setEndDateRange(end);
  };

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllLiveClasses(data));
  };

  const handleBatchChange = (e, newValue) => {
    if (!newValue) {
      setSelectedBatch(null);
      const data = {
        branch_id: selectedBranchId,
        batch_id: ''
      };
      dispatch(getAllLiveClasses(data));
    } else {
      setSelectedBatch(newValue);
      const data = {
        batch: newValue._id,
        branch: selectedBranchId,
        institute: useInstitute().getInstituteId()
      };
      dispatch(getAllLiveClasses(data));
    }
  };

  //toggle filter card
  const [isCardOpen, setIsCardOpen] = useState(false);
  const filterCardRef = useRef(null);

  //toggle handler
  const handleToggleCard = (event) => {
    setIsCardOpen((prev) => !prev);
  };

  return (
    <Grid>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, position: 'relative', zIndex: 1000 }}>
            <Button
              variant="contained"
              size="medium"
              data-ignore-outside-click="true"
              sx={{ width: '130px', py: 1.6, borderRadius: 2, backgroundColor: '#0CCE7F', ':hover': { backgroundColor: '#0AA865' } }}
              onClick={(event) => {
                handleToggleCard(event);
              }}
            >
              <FilterListIcon /> {isCardOpen ? 'Hide' : 'Show Filter'}
            </Button>
            <Typography variant="h2">Live Class</Typography>
          </Box>
          <Box>
            <LiveClassCardHeader  setRefetch={setRefetch}/>
          </Box>
        </Box>
      </Grid>

      {isCardOpen && (
        <>
          <Box
            ref={filterCardRef}
            sx={{
              position: 'relative',
              top: '19%',
              left: '50%',

              transform: 'translateX(-50%)',
              zIndex: 999,
              width: '100%',
              backgroundColor: 'white',
              boxShadow: 3,
              borderRadius: 2,
              p: 3,
              mt: 3,
              overflowY: 'auto',
              maxHeight: '80vh',
              transition: 'left 0.3s ease'
            }}
          >
            <DatePickerWrapper>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card sx={{ boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)' }}>
                    <CardHeader title="Filters" />
                    <CardContent>
                      <Grid container spacing={2}>
                        {/* <Grid item xs={12} sm={6}>
                  <TextField select fullWidth label="Status" SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}>
                    <MenuItem value="">Select Options</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                  </TextField>
                </Grid> */}

                        <Grid item xs={12} sm={6}>
                          <Autocomplete
                            fullWidth
                            value={statusValue}
                            onChange={(event, newValue) => handleFilterByStatus({ target: { value: newValue } })}
                            options={['Select Options', 'completed', 'pending']}
                            renderInput={(params) => <TextField {...params} label="Status" />}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Autocomplete
                            fullWidth
                            onChange={(e, newValue) => {
                              const data = {
                                institute: useInstitute().getInstituteId(),
                                course: newValue?._id || '',
                                branch: selectedBranchId,
                                institute: useInstitute().getInstituteId()
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
                            options={batches}
                            filterSelectedOptions
                            onChange={handleBatchChange}
                            value={selectedBatch}
                            id="autocomplete-multiple-outlined"
                            getOptionLabel={(option) => option.batch_name || ''}
                            renderInput={(params) => <TextField {...params} label=" Batches" placeholder="Batches" />}
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
                              <CustomInput
                                dates={dates}
                                setDates={setDates}
                                label="Start date End date"
                                end={endDateRange}
                                start={startDateRange}
                              />
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            value={searchValue}
                            sx={{
                              width: "100%"
                            }}
                            placeholder="Search Class"
                            onChange={(e) => handleSearch(e)}
                            label={
                              <>
                                {[..."Search Class"].map((char, index) => (
                                  <span key={index} style={{ "--index": index }}>{char}</span>
                                ))}
                              </>
                            }
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </DatePickerWrapper>
          </Box>
        </>
      )}
    </Grid>
  );
};

LiveClassFilterCard.propTypes = {
  selectedBranchId: PropTypes.any
};

export default LiveClassFilterCard;
