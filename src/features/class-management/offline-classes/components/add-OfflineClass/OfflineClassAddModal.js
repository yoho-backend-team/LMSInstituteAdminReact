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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CustomChip from 'components/mui/chip';
import { getAllBatches } from 'features/batch-management/batches/services/batchServices';
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import { getAllActiveCourses } from 'features/course-management/courses-page/services/courseServices';
import { getAllActiveNonTeachingStaffs } from 'features/staff-management/non-teaching-staffs/services/nonTeachingStaffServices';
import { getAllActiveTeachingStaffs } from 'features/staff-management/teaching-staffs/services/teachingStaffServices';
import { getAllStudents } from 'features/student-management/students/services/studentService';
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import * as yup from 'yup';
import { addOfflineClass } from '../../services/offlineClassServices';

const CustomInput = forwardRef(({ ...props }, ref) => {
  const { label, readOnly } = props;

  return <TextField {...props} fullWidth inputRef={ref} label={label || ''} {...(readOnly && { inputProps: { readOnly: true } })} />;
});

const OfflineClassAddModal = ({ open, handleAddClose, setRefetch }) => {
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [activeBranches, setActiveBranches] = useState([]);
  const [activeTeachingStaff, setActiveTeachingStaff] = useState([]);
  const [activeNonTeachingStaff, setActiveNonTeachingStaff] = useState([]);
  const [students, setStudents] = useState([]);
  console.log(students);
  useEffect(() => {
    getActiveBranchesByUser();
  }, []);

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();

    console.log('active branches : ', result.data);
    setActiveBranches(result.data.data);
  };

  const [activeCourse, setActiveCourse] = useState([]);
  const [activeBatches, setActiveBatches] = useState([]);
  useEffect(() => {
    getActiveCoursesByBranch(selectedBranchId);
    getActiveTeachingStaffs(selectedBranchId);
    getActiveNonTeachingStaffs(selectedBranchId);
  }, [selectedBranchId]);

  const getActiveCoursesByBranch = async (selectedBranchId) => {
    const result = await getAllActiveCourses({ branch_id: selectedBranchId });

    console.log('active courses : ', result.data);
    setActiveCourse(result.data.data);
  };
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
  const getActiveBatchesByCourse = async (courseId) => {
    const data = { course_id: courseId, branch_id: selectedBranchId };
    const result = await getAllBatches(data);

    console.log('active batches : ', result.data);
    setActiveBatches(result.data.data);
  };

  const getStudentsByBatch = async (batchId) => {
    const data = { batch_id: batchId, branch_id: selectedBranchId };
    const result = await getAllStudents(data);
    setStudents(result.data.data);
  };

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

  const schema = yup.object().shape({
    class_name: yup
      .string()
      .min(3, (obj) => showErrors('Class', obj.value.length, obj.min))
      .matches(/^[a-zA-Z0-9\s]+$/, 'Class Name should not contain special characters')
      .required('Class Name field is required'),
    branch: yup.string().required('Branch field is required'),
    course: yup.string().required('Course field is required'),
    batch: yup.object().required('Batch is required'),
    classDate: yup.date().nullable().required('Class Date field is required'),
    start_time: yup.string().required('Start Time field is required'),
    end_time: yup.date().nullable().required('End Time field is required')
  });

  const defaultValues = {
    class_name: '',
    branch: selectedBranchId,
    course: '',
    batch: '',
    classDate: new Date(),
    start_time: null,
    end_time: null,
    instructor: [],
    coordinator: []
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
    handleAddClose();
    setValue('class_name', '');
    setValue('branch', '');
    setValue('course', '');
    setValue('batch', '');
    setValue('classDate', null);
    setValue('start_time', null);
    setValue('end_time', null);
    setValue('instructor', []);
    setValue('coordinator', []);
    reset();
  };

  function convertDateFormat(input) {
    var originalDate = new Date(input);

    var year = originalDate.getFullYear();
    var month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
    var day = ('0' + originalDate.getDate()).slice(-2);
    var formattedDateString = year + '-' + month + '-' + day;
    return formattedDateString;
  }

  const onSubmit = async (data) => {
    console.log(data);

    const filteredInstructorId = data.instructor?.map((staff) => staff.staff_id);
    const filteredCoordinatorId = data.coordinator?.map((staff) => staff.staff_id);
    const dummyData = {
      class_name: data.class_name,
      branch_id: data.branch,
      course_id: data.course,
      batch_id: data.batch.batch.batch_id,
      class_date: convertDateFormat(data.classDate),
      start_time: data.start_time,
      end_time: data.end_time,
      instructor_staff_ids: filteredInstructorId,
      coordinator_staff_ids: filteredCoordinatorId,
      type: 'offline',
      status: 'pending'
    };

    try {
      const result = await addOfflineClass(dummyData);

      if (result.success) {
        setRefetch((state) => !state);
        handleClose();
        reset();
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
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
        Add Offline Class
      </DialogTitle>

      <DialogContent
        sx={{
          pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(2)} !important`],
          pb: (theme) => `${theme.spacing(5)} !important`,
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
              <Grid item xs={12}>
                <Controller
                  name="branch"
                  control={control}
                  rules={{ required: 'Branch field is required' }}
                  render={({ field: { value, onChange } }) => (
                    <Autocomplete
                      fullWidth
                      options={activeBranches}
                      getOptionLabel={(option) => option.branch_name}
                      onChange={(event, newValue) => {
                        onChange(newValue?.branch_id);
                        getActiveCoursesByBranch(newValue?.branch_id);
                      }}
                      value={activeBranches.find((branch) => branch.branch_id === value) || null}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Branch" error={Boolean(errors.branch)} helperText={errors.branch?.message} />
                      )}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <Controller
                  name="course"
                  control={control}
                  rules={{ required: 'Course field is required' }}
                  render={({ field: { value, onChange } }) => (
                    <Autocomplete
                      fullWidth
                      options={activeCourse}
                      getOptionLabel={(course) => course.course_name}
                      onChange={(event, newValue) => {
                        onChange(newValue?.course_id);
                        getActiveBatchesByCourse(newValue?.course_id);
                      }}
                      value={activeCourse.find((course) => course.course_id === value) || null}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Course" error={Boolean(errors.course)} helperText={errors.course?.message} />
                      )}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                  name="batch"
                  control={control}
                  rules={{ required: 'Batch field is required' }}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      fullWidth
                      options={activeBatches}
                      getOptionLabel={(option) => option?.batch?.batch_name}
                      onChange={(event, newValue) => {
                        field.onChange(newValue);
                        setValue('batch', newValue);
                        getStudentsByBatch(newValue?.batch_id);
                      }}
                      value={field.value}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{ mb: 2 }}
                          label="Batch"
                          error={Boolean(errors.batch)}
                          helperText={errors.batch?.message}
                        />
                      )}
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
                        'instructor',
                        activeTeachingStaff.filter((option) => option.staff_id !== 'selectAll')
                      );
                    } else {
                      setSelectedInstructors(newValue);
                      setValue('instructor', newValue);
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
                            setValue('instructor', updatedValue);
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
                        'coordinator',
                        activeTeachingStaff.filter((option) => option.staff_id !== 'selectAll')
                      );
                    } else {
                      setSelectedCoordinates(newValue);
                      setValue('coordinator', newValue);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Coordinates"
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
                            setValue('coordinator', updatedValue);
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
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <Box>
                  <Button type="submit" onClick={handleSubmit(onSubmit)} variant="contained" sx={{ mr: 3 }}>
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

OfflineClassAddModal.propTypes = {
  open: PropTypes.any,
  handleAddClose: PropTypes.any,
  setRefetch: PropTypes.any
};

export default OfflineClassAddModal;
