import { useState, forwardRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import CustomChip from 'components/mui/chip';
import DatePicker from 'react-datepicker';
import format from 'date-fns/format';
import DatePickerWrapper from 'styles/libs/react-datepicker';
// import { InputAdornment, IconButton } from '@mui/material';
// import FileCopyIcon from '@mui/icons-material/FileCopy';

// import { register } from 'react-hook-form';

/* eslint-disable */
const DateCustomInput = forwardRef((props, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : '';
  const value = `${startDate}`;
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null;
  const updatedProps = { ...props };
  delete updatedProps.setDates;
  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />;
});

const CustomInput = forwardRef(({ ...props }, ref) => {
  // ** Props
  const { label, readOnly } = props;

  return <TextField {...props} inputRef={ref} label={label || ''} {...(readOnly && { inputProps: { readOnly: true } })} />;
});

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`;
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`;
  } else {
    return '';
  }
};

const schema = yup.object().shape({
  course: yup
    .string()
    .min(3, (obj) => showErrors('Course', obj.value.length, obj.min))
    .required('Course field is required'),
  batch: yup.array().of(yup.string()).min(1, 'Batch field is required').required('Batch field is required'),
  classDate: yup.date().nullable().required('Class Date field is required'),
  startTime: yup.date().nullable().required('Start Time field is required'),
  endTime: yup.date().nullable().required('End Time field is required'),
  instructor: yup.string().required('Instructor field is required'),
  teacher: yup.array().of(yup.string()).min(1, 'Teacher field is required').required('Teacher field is required')
});

const defaultValues = {
  course: '',
  batch: [],
  classDate: null,
  startTime: null,
  endTime: null,
  instructor: '',
  teacher: []
};

// const handleCopyLink = () => {
//   // Logic to copy the link goes here
//   const link = 'Your generated link'; // Replace this with the actual link
//   navigator.clipboard.writeText(link).then(() => {
//     console.log('Link copied to clipboard');
//   });
// };

const OfflineClassEditModal = ({ open, handleEditClose }) => {
  const [personName, setPersonName] = useState([]);
  const [dates, setDates] = useState([]);
  const [startDateRange, setStartDateRange] = useState(null);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };

  const handleOnChangeRange = (dates) => {
    const [start] = dates;
    if (start !== null) {
      setDates(dates);
    }
    setStartDateRange(start);
  };

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const [selectedTeachers, setSelectedTeachers] = useState([]);

  const handleTeacherChange = (event) => {
    setSelectedTeachers(event.target.value);
  };

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const handleClose = () => {
    setValue('course', '');
    setValue('batch', []);
    setValue('classDate', null);
    setValue('startTime', null);
    setValue('endTime', null);
    setValue('instructor', '');
    setValue('teacher', []);
    handleEditClose();
    reset();
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
      }
    }
  };

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder'
  ];

  const teachersList = ['Teacher 1', 'Teacher 2', 'Teacher 3'];
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="user-view-edit"
      aria-describedby="user-view-edit-description"
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800, } }}
    >
      <DialogTitle
        id="user-view-edit"
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(3)} !important`],
          pt: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(4)} !important`]
        }}
      >
        Edit Offline Class
      </DialogTitle>

      <DialogContent
        sx={{
          pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(2)} !important`],
          pb: (theme) => `${theme.spacing(2)} !important`,
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
        }}
      >
        <DatePickerWrapper>
          <form onSubmit={handleSubmit()}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Controller
                  name="course"
                  control={control}
                  rules={{ required: 'Course field is required' }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      value={value}
                      label="Course Name"
                      onChange={onChange}
                      placeholder="John Doe"
                      error={Boolean(errors.course)}
                      {...(errors.course && { helperText: errors.course.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="batch"
                  control={control}
                  rules={{ required: 'Batch field is required' }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      select
                      label="Batch"
                      id="select-multiple-chip"
                      value={value}
                      onChange={(e) => {
                        handleChange(e);
                        onChange(e);
                      }}
                      SelectProps={{
                        MenuProps,
                        multiple: true,
                        renderValue: (selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {selected.map((value) => (
                              <CustomChip key={value} label={value} sx={{ m: 0.75 }} skin="light" color="primary" />
                            ))}
                          </Box>
                        )
                      }}
                      error={Boolean(errors.batch)}
                      helperText={errors.batch?.message}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="classDate"
                  control={control}
                  rules={{ required: 'Class date is required' }}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      isClearable
                      selectsRange
                      monthsShown={1}
                      selected={value}
                      startDate={value}
                      shouldCloseOnSelect={false}
                      onChange={(dates) => {
                        handleOnChangeRange(dates);
                        onChange(dates);
                      }}
                      customInput={
                        <DateCustomInput
                          dates={dates}
                          setDates={setDates}
                          label="Class Date"
                          start={value}
                          sx={{ border: errors.classDate ? '1px solid red' : 'none', borderRadius: '7px' }}
                        />
                      }
                      dateFormat="MM/dd/yyyy"
                      placeholderText="Select Class Date"
                      // Add the error styling
                      className={`form-control ${errors.classDate ? 'is-invalid' : ''}`}
                    />
                  )}
                />
                {errors.classDate && <p style={{ color: 'red', margin: '5px 0 0', fontSize: '0.875rem' }}>{errors.classDate.message}</p>}
              </Grid>

              <Grid container item xs={6} spacing={2}>
                <Grid item xs={6}>
                  <Controller
                    name="startTime"
                    control={control}
                    rules={{ required: 'Start time is required' }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        selected={value}
                        onChange={(time) => {
                          handleStartTimeChange(time);
                          onChange(time);
                        }}
                        customInput={
                          <CustomInput
                            label="Start Time"
                            sx={{ border: errors.startTime ? '1px solid red' : 'none', borderRadius: '7px' }}
                          />
                        }
                        dateFormat="h:mm aa"
                        placeholderText="Select Start Time"
                        // Add the error styling
                        className={`form-control ${errors.startTime ? 'is-invalid' : ''}`}
                      />
                    )}
                  />
                  {errors.startTime && <p style={{ color: 'red', margin: '5px 0 0', fontSize: '0.875rem' }}>{errors.startTime.message}</p>}
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="endTime"
                    control={control}
                    rules={{ required: 'End time is required' }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        selected={value}
                        onChange={(time) => {
                          handleEndTimeChange(time);
                          onChange(time);
                        }}
                        customInput={
                          <CustomInput label="End Time" sx={{ border: errors.endTime ? '1px solid red' : 'none', borderRadius: '7px' }} />
                        }
                        dateFormat="h:mm aa"
                        placeholderText="Select End Time"
                        // Add the error styling
                        className={`form-control ${errors.endTime ? 'is-invalid' : ''}`}
                      />
                    )}
                  />
                  {errors.endTime && <p style={{ color: 'red', margin: '5px 0 0', fontSize: '0.875rem' }}>{errors.endTime.message}</p>}
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="instructor"
                  control={control}
                  rules={{ required: 'Instructor is required' }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      select
                      label="Instructor"
                      id="custom-select"
                      value={value}
                      onChange={(e) => onChange(e)}
                      error={Boolean(errors.instructor)}
                      helperText={errors.instructor ? errors.instructor.message : null}
                    >
                      <MenuItem value="">
                        <em>Thasthahir</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="teacher"
                  control={control}
                  rules={{ required: 'Teacher field is required' }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      select
                      fullWidth
                      label="Teacher"
                      id="select-teacher-chip"
                      SelectProps={{
                        MenuProps,
                        multiple: true,
                        value: selectedTeachers,
                        onChange: (e) => {
                          handleTeacherChange(e);
                          onChange(e);
                        },
                        renderValue: (selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {selected.map((value) => (
                              <CustomChip key={value} label={value} sx={{ m: 0.75 }} skin="light" color="primary" />
                            ))}
                          </Box>
                        )
                      }}
                      error={Boolean(errors.teacher)}
                    >
                      {teachersList.map((teacher) => (
                        <MenuItem key={teacher} value={teacher}>
                          {teacher}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                {errors.teacher && <p style={{ color: 'red', margin: '5px 0 0', fontSize: '0.875rem' }}>{errors.teacher.message}</p>}
              </Grid>

              {/* <Grid item xs={12}>
                <TextField
                  fullWidth
                  // label="Generated Link"
                  value="Your generated link" // Replace this with the actual link
                  readOnly
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton aria-label="copy-link" onClick={handleCopyLink} edge="start" sx={{ color: 'primary.main' }}>
                          <FileCopyIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  style={{ border: '1px', borderRadius: '7px' }}
                />
              </Grid> */}

              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <Box>
                  <Button type="submit" variant="contained" sx={{ mr: 3 }}>
                    Submit
                  </Button>
                  <Button variant="tonal" color="error" onClick={handleClose}>
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </DatePickerWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default OfflineClassEditModal;
