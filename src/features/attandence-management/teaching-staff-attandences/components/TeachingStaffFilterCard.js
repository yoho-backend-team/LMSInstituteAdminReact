// ** React Imports
import { useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
// ** Third Party Imports
// import format from 'date-fns/format';
// import DatePicker from 'react-datepicker';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Checkbox } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CustomChip from 'components/mui/chip';
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
const TeachingStaffFilterCard = () => {
  // ** State
  // const [dates, setDates] = useState([]);
  const [statusValue, setStatusValue] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedstaff, setSelectedstaff] = useState([]);

  const courses = [
    { course_id: '1', course_name: 'Course 1' },
    { course_id: '2', course_name: 'Course 2' },
    { course_id: '3', course_name: 'Course 3' }
  ];

  const staff = [
    { staff_id: '1', staff_name: 'Staff 1' },
    { staff_id: '2', staff_name: 'Staff 2' },
    { staff_id: '3', staff_name: 'Staff 3' }
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

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Teaching Staff Attendance" />
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                  <TextField select fullWidth label="Status" SelectProps={{ value: statusValue, onChange: (e) => handleStatusValue(e) }}>
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
                    options={[{ course_id: 'selectAll', course_name: 'Select All' }, ...courses]}
                    getOptionLabel={(option) => option.course_name}
                    value={selectedCourses}
                    onChange={(e, newValue) => {
                      if (newValue && newValue.some((option) => option.course_id === 'selectAll')) {
                        setSelectedCourses(courses.filter((option) => option.course_id !== 'selectAll'));
                      } else {
                        setSelectedCourses(newValue);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Courses"
                        InputProps={{
                          ...params.InputProps,
                          style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                        }}
                      />
                    )}
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
                    renderTags={(value) => (
                      <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                        {value.map((option, index) => (
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
                        ))}
                      </div>
                    )}
                    isOptionEqualToValue={(option, value) => option.course_id === value.course_id}
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
                <Grid item xs={12} sm={4}>
                <Autocomplete
                    multiple
                    id="select-multiple-chip"
                    options={[{ staff_id: 'selectAll', staff_name: 'Select All' }, ...staff]}
                    getOptionLabel={(option) => option.staff_name}
                    value={selectedstaff}
                    onChange={(e, newValue) => {
                      if (newValue && newValue.some((option) => option.staff_id === 'selectAll')) {
                        setSelectedstaff(staff.filter((option) => option.staff_id !== 'selectAll'));
                      } else {
                        setSelectedstaff(newValue);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Staffs"
                        InputProps={{
                          ...params.InputProps,
                          style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                        }}
                      />
                    )}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.staff_name}
                      </li>
                    )}
                    renderTags={(value) => (
                      <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                        {value.map((option, index) => (
                          <CustomChip
                            key={option.staff_id}
                            label={option.staff_name}
                            onDelete={() => {
                              const updatedValue = [...value];
                              updatedValue.splice(index, 1);
                              setSelectedstaff(updatedValue);
                            }}
                            color="primary"
                            sx={{ m: 0.75 }}
                          />
                        ))}
                      </div>
                    )}
                    isOptionEqualToValue={(option, value) => option.staff_id === value.staff_id}
                    selectAllText="Select All"
                    SelectAllProps={{ sx: { fontWeight: 'bold' } }}
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

export default TeachingStaffFilterCard;
