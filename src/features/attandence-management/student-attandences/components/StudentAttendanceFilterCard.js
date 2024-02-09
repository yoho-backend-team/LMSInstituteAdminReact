// ** React Imports
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import CustomChip from 'components/mui/chip';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Checkbox } from '@mui/material';

// ** Styled Components
import DatePickerWrapper from 'styles/libs/react-datepicker';

/* eslint-disable */
// const CustomInput = forwardRef((props, ref) => {
//   const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : '';
//   const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null;
//   const value = `${startDate}${endDate !== null ? endDate : ''}`;
//   props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null;
//   const updatedProps = { ...props };
//   delete updatedProps.setDates;
//   return <CustomTextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />;
// });

/* eslint-enable */
const StudentAttendanceFilterCard = () => {
  // ** State
  // const [dates, setDates] = useState([]);
  const [statusValue, setStatusValue] = useState('');
  
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const courses = [
    { course_id: '1', course_name: 'Course 1' },
    { course_id: '2', course_name: 'Course 2' },
    { course_id: '3', course_name: 'Course 3' }
  ];
  const students = [
    { student_id: '1', student_name: 'Student 1' },
    { student_id: '2', student_name: 'Student 2' },
    { student_id: '3', student_name: 'Student 3' }
  ];
  // const [endDateRange, setEndDateRange] = useState(null);
  // const [startDateRange, setStartDateRange] = useState(null);

  const handleStatusValue = (e) => {
    setStatusValue(e.target.value);
  };

  // const handleOnChangeRange = (dates) => {
  //   const [start, end] = dates;
  //   if (start !== null && end !== null) {
  //     setDates(dates);
  //   }
  //   setStartDateRange(start);
  //   setEndDateRange(end);
  // };

  const handleCourseChange = (newValue) => {
    if (newValue && newValue.some((option) => option.course_id === 'selectAll')) {
      setSelectedCourses(courses.filter((option) => option.course_id !== 'selectAll'));
    } else {
      setSelectedCourses(newValue);
    }
  };
  const handleStudentChange = (newValue) => {
    if (newValue && newValue.some((option) => option.student_id === 'selectAll')) {
      setSelectedStudents(students.filter((option) => option.student_id !== 'selectAll'));
    } else {
      setSelectedStudents(newValue);
    }
  };
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Student Attendance" />
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                  <TextField select fullWidth label="Batch" SelectProps={{ value: statusValue, onChange: (e) => handleStatusValue(e) }}>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="downloaded">Downloaded</MenuItem>
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="partial payment">Partial Payment</MenuItem>
                    <MenuItem value="past due">Past Due</MenuItem>
                    <MenuItem value="sent">Sent</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    multiple
                    id="select-multiple-chip"
                    options={courses}
                    getOptionLabel={(option) => option.course_name}
                    value={selectedCourses}
                    onChange={(event, newValue) => handleCourseChange(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth label="Courses" />}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.course_name}
                      </li>
                    )}
                    renderTags={(value) =>
                      value.map((option, index) => (
                        <CustomChip
                          key={option.course_id}
                          label={option.course_name}
                          onDelete={() => {
                            const updatedValue = [...value];
                            updatedValue.splice(index, 1);
                            setSelectedCourses(updatedValue);
                          }}
                          color="primary"
                          sx={{ m: 0.75 }}
                        />
                      ))
                    }
                    isOptionEqualToValue={(option, value) => option.course_id === value.course_id}
                    selectAllText="Select All"
                    SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                <Autocomplete
                  multiple
                  id="select-multiple-chip"
                  options={students}
                  getOptionLabel={(option) => option.student_name}
                  value={selectedStudents}
                  onChange={(event, newValue) => handleStudentChange(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth label="Students" />}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.student_name}
                    </li>
                  )}
                  renderTags={(value) =>
                    value.map((option, index) => (
                      <CustomChip
                        key={option.student_id}
                        label={option.student_name}
                        onDelete={() => {
                          const updatedValue = [...value];
                          updatedValue.splice(index, 1);
                          setSelectedStudents(updatedValue);
                        }}
                        color="primary"
                        sx={{ m: 0.75 }}
                      />
                    ))
                  }
                  isOptionEqualToValue={(option, value) => option.student_id === value.student_id}
                  selectAllText="Select All"
                  SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                />
              </Grid>
                {/* <Grid item xs={12} sm={6}>
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
                </Grid> */}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

export default StudentAttendanceFilterCard;
