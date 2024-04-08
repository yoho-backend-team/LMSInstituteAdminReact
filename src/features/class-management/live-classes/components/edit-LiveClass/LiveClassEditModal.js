import { yupResolver } from '@hookform/resolvers/yup';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Checkbox, Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import CustomChip from 'components/mui/chip';
import { getAllActiveNonTeachingStaffs } from 'features/staff-management/non-teaching-staffs/services/nonTeachingStaffServices';
import { getAllActiveTeachingStaffs } from 'features/staff-management/teaching-staffs/services/teachingStaffServices';
import { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import * as yup from 'yup';
// import { update } from '../../services/offlineClassServices';
import FileCopy from '@mui/icons-material/FileCopy';
import { IconButton, InputAdornment } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { updateLiveClass } from '../../services/liveClassServices';



const CustomInput = forwardRef(({ ...props }, ref) => {
  // ** Props
  const { label, readOnly } = props;

  return <TextField {...props} fullWidth inputRef={ref} label={label || ''} {...(readOnly && { inputProps: { readOnly: true } })} />;
});

const LiveClassEditModal = ({ open, handleEditClose, liveClasses ,setRefetch}) => {
  console.log(liveClasses);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  // const selectedClassId = useSelector((state) => state.auth.selectedClassId);

  const schema = yup.object().shape({
    class_name: yup
      .string()
      .min(3, (obj) => showErrors('Class', obj.value.length, obj.min))
      .matches(/^[a-zA-Z0-9\s]+$/, 'Class Name should not contain special characters')
      .required('Class Name field is required'),
    classDate: yup.date().nullable().required('Class Date field is required'),
    // start_time: yup.date().nullable().required('Start Time field is required'),
    // end_time: yup.date().nullable().required('End Time field is required'),
    instructors: yup.array().min(1, 'At least one instructor must be selected').required('Instructor field is required'),
    coordinators: yup.array().min(1, 'At least one coordinator must be selected').required('coordinator field is required')
  });

  const defaultValues = {
    class_name: '',
    classDate: new Date(),
    start_time: null,
    end_time: null,
    instructors: [],
    coordinators: []
  };
  const handleCopyLink = () => {
    const link = 'your Generated Link';
    navigator.clipboard.writeText(link).then(() => {});
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

  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState([]);

  const showErrors = (field, valueLen, min) => {
    if (valueLen === 0) {
      return `${field} field is required`;
    } else if (valueLen > 0 && valueLen < min) {
      return `${field} must be at least ${min} characters`;
    } else {
      return '';
    }
  };

  useEffect(() => {
    if (liveClasses) {
      setValue('class_name', liveClasses.class_name || ''); // Set class name
      setValue('class_id', liveClasses.class_id || ''); // Set class ID
      setValue('classDate', new Date(liveClasses.class_date) || new Date()); // Set class date
      setValue('start_time', dayjs(liveClasses?.start_time) || null);
      setValue('end_time', dayjs(liveClasses?.end_time) || null); // Set end time
      setValue('instructors', liveClasses.instructors || []); // Set instructors
      setValue('coordinators', liveClasses.coordinators || []); // Set coordinators
      setSelectedCoordinates(liveClasses?.coordinators) // Set coordinators
      setSelectedInstructors(liveClasses?.instructors) 
    }
  }, [liveClasses, setValue]);

  console.log('selected ', liveClasses);

  useEffect(() => {
    if (liveClasses && liveClasses.instructors) {
      setSelectedInstructors(liveClasses.instructors);
      setValue('instructors', liveClasses.instructors); // Set default value for instructor field
    }
  }, [liveClasses, setValue]);

  useEffect(() => {
    if (liveClasses && liveClasses.coordinators) {
      setSelectedCoordinates(liveClasses.coordinators);
      setValue('coordinators', liveClasses.coordinators); // Set default value for coordinator field
    }
  }, [liveClasses, setValue]);

  const handleClose = () => {
    handleEditClose();
    // setValue('class_name', null);
    // setValue('classDate', null);
    // setValue('start_time', null);
    // setValue('end_time', null);
    // setValue('instructor', '');
    // setValue('coordinator', '');
    reset(defaultValues);
  };
  const [activeNonTeachingStaff, setActiveNonTeachingStaff] = useState([]);
  const [activeTeachingStaff, setActiveTeachingStaff] = useState([]);

  const getActiveTeachingStaffs = async (selectedBranchId) => {
    const data = { type: 'teaching', branch_id: selectedBranchId };
    const result = await getAllActiveTeachingStaffs(data);

    console.log('active teaching staffs : ', result.data);
    setActiveTeachingStaff(result.data.data);
  };
  const getActiveNonTeachingStaffs = async (selectedBranchId) => {
    const data = { type: 'non_teaching', branch_id: selectedBranchId };
    const result = await getAllActiveNonTeachingStaffs(data);

    console.log('active non teaching staffs : ', result.data);
    setActiveNonTeachingStaff(result.data.data);
  };

  useEffect(() => {
    getActiveTeachingStaffs(selectedBranchId);
    getActiveNonTeachingStaffs(selectedBranchId);
  }, [selectedBranchId]);

  function convertDateFormat(input) {
    // Create a new Date object from the original date string
    var originalDate = new Date(input);
    // Extract the year, month, and day components
    var year = originalDate.getFullYear();
    var month = ('0' + (originalDate.getMonth() + 1)).slice(-2); // Months are 0-based
    var day = ('0' + originalDate.getDate()).slice(-2);

    // Form the yyyy-mm-dd date string
    var formattedDateString = year + '-' + month + '-' + day;

    return formattedDateString;
  }

  const onSubmit = async (data) => {
    const filteredInstructorId = data?.instructors?.map((staff) => staff.staff_id);
    const filteredCoordinatorId = data?.coordinators?.map((staff) => staff.staff_id);
    var bodyFormData = new FormData();
    filteredInstructorId?.forEach((id) => {
      bodyFormData.append('instructor_staff_ids[]', id);
    });
    filteredCoordinatorId?.forEach((id) => {
      bodyFormData.append('coordinator_staff_ids[]', id);
    });
    bodyFormData.append('class_name', data.class_name);
    bodyFormData.append('class_id', liveClasses.class_id);
    bodyFormData.append('branch_id', selectedBranchId);
    bodyFormData.append('course_id', data.course_id);
    bodyFormData.append('batch_id', data.batch_id);
    bodyFormData.append('class_date', convertDateFormat(data.classDate));
    bodyFormData.append('start_time', data.start_time);
    bodyFormData.append('end_time', data.end_time); // Fixed field name
    bodyFormData.append('videoUrl', data.class_link);

    console.log(data);

    const result = await updateLiveClass(bodyFormData);

    if (result.success) {
      setRefetch((state) => !state); 
      toast.success(result.message);
      handleClose();
    } else {
      let errorMessage = '';
      // Object.values(result.message).forEach((errors) => {
      //   errors.forEach((error) => {
      //     errorMessage += `${error}\n`; // Concatenate errors with newline
      //   });
      // });
      toast.error(errorMessage.trim());
      // toast.error(result.message);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="user-view-edit"
      aria-describedby="user-view-edit-description"
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800 } }}
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
        Edit Live Class
      </DialogTitle>

      <DialogContent
        sx={{
          pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(2)} !important`],
          pb: (theme) => `${theme.spacing(2)} !important`,
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
        }}
      >
        <DatePickerWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Controller
                  name="class_name"
                  control={control}
                  rules={{ required: 'Class Name field is required' }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      value={value}
                      label="Class Name"
                      onChange={onChange}
                      placeholder="John Doe"
                      error={Boolean(errors.class_name)}
                      {...(errors.class_name && { helperText: errors.class_name.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Controller
                  name="classDate"
                  control={control}
                  rules={{ required: 'Class Date field is required' }}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      selected={value}
                      id="basic-input"
                      className="full-width-datepicker"
                      onChange={onChange}
                      placeholderText="Click to select a date"
                      customInput={<CustomInput label="ClassDate" />}
                    />
                  )}
                />
                {errors.classDate && <p style={{ color: 'red', margin: '5px 0 0', fontSize: '0.875rem' }}>{errors.classDate.message}</p>}
              </Grid>

              <Grid container item xs={6} spacing={2}>
                <Grid item md={6} sm={12}>
                  <Controller
                    name="start_time"
                    control={control}
                    rules={{ required: 'Start time is required' }}
                    render={({ field: { value, onChange } }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          customInput={
                            <CustomInput
                              label="Start Time"
                              sx={{ border: errors.start_time ? '1px solid red' : 'none', borderRadius: '7px' }}
                            />
                          }
                          value={value}
                          onChange={onChange}
                          label="Start Time"
                        />
                      </LocalizationProvider>
                    )}
                  />
                  {errors.start_time && (
                    <p style={{ color: '#EA5455', marginTop: '5px', marginLeft: '5px', fontSize: '12px' }}>{errors.start_time.message}</p>
                  )}
                </Grid>

                <Grid item md={6} sm={12}>
                  <Controller
                    name="end_time"
                    control={control}
                    rules={{ required: 'End time is required' }}
                    render={({ field: { value, onChange } }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          customInput={
                            <CustomInput
                              label="End Time"
                              sx={{ border: errors.end_time ? '1px solid red' : 'none', borderRadius: '7px' }}
                            />
                          }
                          value={value}
                          onChange={onChange}
                          label="End Time"
                        />
                      </LocalizationProvider>
                    )}
                  />
                  {errors.end_time && (
                    <p style={{ color: '#EA5455', marginTop: '5px', marginLeft: '5px', fontSize: '12px' }}>{errors.end_time.message}</p>
                  )}
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  id="select-multiple-chip"
                  options={[{ staff_id: 'selectAll', staff_name: 'Select All' }, ...activeTeachingStaff]}
                  getOptionLabel={(option) => option.staff_name}
                  value={selectedInstructors}
                  onChange={(e, newValue) => {
                    if (newValue && newValue.some((option) => option.staff_id === 'selectAll')) {
                      setSelectedInstructors(activeTeachingStaff.filter((option) => option.staff_id !== 'selectAll'));
                      setValue(
                        'instructors',
                        activeTeachingStaff.filter((option) => option.staff_id !== 'selectAll')
                      );
                    } else {
                      setSelectedInstructors(newValue);
                      setValue('instructors', newValue);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Instructors"
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
                            setSelectedInstructors(updatedValue);
                            setValue('instructors', updatedValue);
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

              <Grid item xs={12} sm={12}>
                <Autocomplete
                  disableCloseOnSelect
                  multiple
                  id="select-multiple-coordinates"
                  options={[{ staff_id: 'selectAll', staff_name: 'Select All' }, ...activeNonTeachingStaff]}
                  getOptionLabel={(option) => option.coordinate_name}
                  value={selectedCoordinates}
                  onChange={(e, newValue) => {
                    if (newValue && newValue.some((option) => option.staff_id === 'selectAll')) {
                      setSelectedCoordinates(activeNonTeachingStaff.filter((option) => option.staff_id !== 'selectAll'));
                      setValue(
                        'coordinators',
                        activeTeachingStaff.filter((option) => option.staff_id !== 'selectAll')
                      );
                    } else {
                      setSelectedCoordinates(newValue);
                      setValue('coordinators', newValue);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="cordinators"
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
                            setSelectedCoordinates(updatedValue);
                            setValue('coordinators', updatedValue);
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

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  defaultValue={liveClasses?.class_link}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton aria-label="copy-link" onClick={handleCopyLink} edge="start" sx={{ color: 'primary.main' }}>
                          <FileCopy />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  style={{ border: '1px ', borderRadius: '7px' }}
                />
              </Grid>



              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <Box>
                  <Button type="submit" variant="contained" sx={{ mr: 3 }}>
                    Submit
                  </Button>
                  <Button onClick={handleClose} variant="tonal" color="error">
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

export default LiveClassEditModal;
