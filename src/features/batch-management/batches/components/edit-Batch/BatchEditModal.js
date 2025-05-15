import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField as CustomTextField, Grid, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CustomChip from 'components/mui/chip';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import * as yup from 'yup';
import { updateBatch } from '../../services/batchServices';
import { getChangedFields } from 'utils/getChanges';
import { useSelector } from 'react-redux';
import { getAllCourses, getStudentByCourse } from 'features/course-management/courses-page/services/courseServices';
import { getActiveBranches } from 'features/branch-management/services/branchServices';

const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} autoComplete="off" />;
});

const validationSchema = yup.object().shape({
  batch_name: yup
    .string()
    .matches(/^[a-zA-Z0-9\s]+$/, 'Batch Name should not contain special characters')
    .required('Batch Name is required'),
  start_date: yup.date().required('Start Date is required'),
  end_date: yup.date().required('End Date is required'),

  students: yup
    .array()
    .min(1, 'Please select at least one Student')
    .test({
      name: 'atLeastOneStudent',
      message: 'Please select at least one Student',
      test: (value) => value && value.length > 0
    })
    .nullable()
});

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

const BatchEditModal = ({ open, handleEditClose, selectedBatch, setBatchRefetch }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [activeCourse, setActiveCourse] = useState([]);

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',

    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    if (selectedBatch) {
      setValue('batch_name', selectedBatch?.batch_name || '');
      setValue('start_date', selectedBatch?.start_date || '');
      setValue('end_date', selectedBatch?.end_date || '');
      setValue('students', selectedBatch?.student);
      setSelectedStudents(selectedBatch?.student);
      setStartDate(new Date(selectedBatch?.start_date || null));
      setEndDate(new Date(selectedBatch?.end_date || null));
    }
  }, [selectedBatch, setValue]);

  const [activeBranches, setActiveBranches] = useState([]);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  useEffect(() => {
    getActiveBranchesByUser();
  }, []);

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();
    setActiveBranches(result.data);
    console.log('active branches', result.data[0].uuid);
  };

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    getActiveCoursesByBranch(data);
  }, [selectedBranchId]);

  const getActiveCoursesByBranch = async (data) => {
    const result = await getAllCourses(data);
    console.log('active course result', result);
    if (result?.data) {
      setActiveCourse(result?.data);

      if (result?.data.length > 0) {
        const courseId = result.data[0].uuid;
        getStudentByCourseId(courseId);
      }
    }
  };

  const [activeStudents, setActiveStudents] = useState([]);

  const getStudentByCourseId = async (courseId) => {
    if (!courseId || !selectedBranchId) {
      console.error('Missing courseId or selectedBranch:', { courseId, selectedBranchId });
      return;
    }

    try {
      console.log('Fetching students with:', { branch_id: selectedBranchId, course_id: courseId });

      const result = await getStudentByCourse({ branch_id: selectedBranchId, course_id: courseId });

      setActiveStudents(result.data);
      console.log('Active students:', result.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleClose = () => {
    setValue('batch_name', '');
    setValue('start_date', '');
    setValue('end_date', '');
    setValue('students', '');
    handleEditClose();
    reset();
  };

  const onSubmit = async (data) => {
    const studentIds = data?.students?.map((student) => student?._id);
    const inputData = {
      batch_name: data?.batch_name,
      start_date: data?.start_date,
      end_date: data?.end_date,
      student: data?.student,
      uuid: selectedBatch?.uuid,
      student: studentIds
    };

    // Manually compare fields
    const hasChanges = [
      selectedBatch?.batch_name !== inputData?.batch_name,
      selectedBatch?.start_date !== inputData?.start_date,
      selectedBatch?.end_date !== inputData?.end_date,
      JSON.stringify(selectedBatch?.students) !== JSON.stringify(inputData?.students)
    ].some(Boolean);

    if (!hasChanges) {
      toast.error('No changes detected. Please make some changes before updating.');
      return;
    }

    // const changeFields = getChangedFields(selectedBatch,inputData)
    // if(!changeFields.is_changed){
    //   toast.error("No changes detected. Please make some changes before updating.")
    //   return;
    // }

    const result = await updateBatch(inputData);

    if (result.success) {
      toast.success(result.message);
      setBatchRefetch((prev) => !prev);
      handleEditClose();
      reset();
    } else {
      toast.error(result?.message);
    }
    [setBatchRefetch];
  };

  const handleStartDateChange = (date) => {
    const formattedDate = new Date(date).toLocaleDateString();
    setValue('start_date', formattedDate);
    setStartDate(new Date(date));
  };

  const handleEndDateChange = (date) => {
    const formattedDate = new Date(date).toLocaleDateString();
    setValue('end_date', formattedDate);
    setEndDate(new Date(date));
  };

  return (
    <div>
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
            pt: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(3)} !important`],
            background: 'linear-gradient(to right, #6366F1, #8B5CF6)'
          }}
        >
          <Typography variant="h1" sx={{ py: 3, color: 'white' }}>
            Create New Batch
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            pt: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(2)} !important`],
            pb: (theme) => `${theme.spacing(3)} !important`,
            px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(4)} !important`]
          }}
        >
          <Grid item xs={12} sm={9}>
            <DatePickerWrapper>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={12}>
                      <Controller
                        name="batch_name"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            value={value}
                            label="Batch Name"
                            onChange={onChange}
                            placeholder="Leonard"
                            error={Boolean(errors['batch_name'])}
                            aria-describedby="stepper-linear-personal-institute_batch_name"
                            helperText={errors.batch_name?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="start_date"
                        control={control}
                        render={({ value }) => (
                          <DatePicker
                            selected={startDate}
                            value={value}
                            showYearDropdown
                            showMonthDropdown
                            dateFormat="MM/dd/yyyy"
                            placeholderText="MM-DD-YYYY"
                            customInput={
                              <CustomInput label="Start Date" error={Boolean(errors.start_date)} helperText={errors.start_date?.message} />
                            }
                            id="form-layouts-separator-date"
                            onChange={handleStartDateChange}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="end_date"
                        control={control}
                        render={({ value }) => (
                          <DatePicker
                            selected={endDate}
                            value={value}
                            showYearDropdown
                            showMonthDropdown
                            dateFormat="MM/dd/yyyy"
                            placeholderText="MM-DD-YYYY"
                            customInput={
                              <CustomInput label="End Date" error={Boolean(errors.end_date)} helperText={errors.end_date?.message} />
                            }
                            id="form-layouts-separator-date"
                            onChange={handleEndDateChange}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <Controller
                        name="students"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Autocomplete
                            multiple
                            id="students-autocomplete"
                            options={activeStudents}
                            getOptionLabel={(option) => option?.full_name}
                            value={selectedStudents}
                            onChange={(event, newValue) => {
                              setValue('students', newValue);
                              setSelectedStudents(newValue);
                            }}
                            disableClearable
                            isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
                            renderTags={(tagValue, getTagProps) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                {tagValue.map((option, index) => (
                                  <CustomChip
                                    key={option?.uuid}
                                    label={option?.full_name}
                                    sx={{ m: 0.75 }}
                                    skin="black"
                                    color="primary"
                                    {...getTagProps({ index })}
                                  />
                                ))}
                              </Box>
                            )}
                            renderInput={(params) => (
                              <CustomTextField
                                {...params}
                                label="Students"
                                fullWidth
                                error={Boolean(errors.students)}
                                sx={{
                                  '& .MuiInputBase-root.Mui-disabled': {
                                    backgroundColor: '#f0f0f0'
                                  },
                                  cursor: !selectedBranch || !control._formValues.course ? 'not-allowed' : 'text'
                                }}
                              />
                            )}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </CardContent>

                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6, marginBottom: 12, gap: 2 }}>
                  {' '}
                  <Box>
                    <Button
                      variant="tonal"
                      color="secondary"
                      onClick={handleClose}
                      sx={{
                        backgroundColor: '#f5f5f5',
                        color: 'black',
                        mr: 2,
                        '&:hover': {
                          backgroundColor: '#e0e0e0'
                        }
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        mr: 3,
                        background: 'linear-gradient(to right, #6366F1, #8B5CF6)',
                        color: 'white',
                        '&:hover': {
                          background: 'linear-gradient(to right, #4F46E5, #6B21A8)',
                          color: 'white'
                        }
                      }}
                    >
                      Update
                    </Button>
                  </Box>
                </Grid>
              </form>
            </DatePickerWrapper>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

BatchEditModal.propTypes = {
  open: PropTypes.any,
  handleEditClose: PropTypes.any,
  selectedBatch: PropTypes.any,
  setBatchRefetch: PropTypes.any
};

export default BatchEditModal;
