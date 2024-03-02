// material-ui
import { Button, Grid, Typography } from '@mui/material';
import StudentTableList from 'features/batch-management/add-batch/components/StudentTableList';
import { Controller, useForm } from 'react-hook-form';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import * as yup from 'yup';
// ** React Imports
import { forwardRef, useState, useEffect } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
// ** Custom Component Import
import { TextField as CustomTextField } from '@mui/material';
// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup';
import CustomChip from 'components/mui/chip';
import DatePicker from 'react-datepicker';
import { addBatch } from 'features/batch-management/batches/services/batchServices';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { getAllActiveCourses } from 'features/course-management/courses-page/services/courseServices';
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import { getStudentByCourse } from 'features/course-management/courses-page/services/courseServices';
import Autocomplete from '@mui/material/Autocomplete';
// import { top100Films } from '_mock';

const AddBatchPage = () => {
  // ** States
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [activeCourse, setActiveCourse] = useState([]);

  const CustomInput = forwardRef((props, ref) => {
    return <CustomTextField fullWidth {...props} inputRef={ref} autoComplete="off" />;
  });

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

  const validationSchema = yup.object().shape({
    batchName: yup.string().required('Batch Name is required'),
    startDate: yup.date().required('Start Date is required'),
    endDate: yup.date().required('End Date is required'),
    branch: yup.string().required('Branch is required'),
    course: yup.string().required('Course is required'),
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

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  console.log(selectedBranchId);

  useEffect(() => {
    getActiveCoursesByBranch(selectedBranchId);
  }, [selectedBranchId]);

  const getActiveCoursesByBranch = async (selectedBranchId) => {
    const result = await getAllActiveCourses(selectedBranchId);

    console.log('active courses : ', result.data);
    setActiveCourse(result.data.data);
  };

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

  const [activeBranches, setActiveBranches] = useState([]);
  const [activeStudents, setActiveStudents] = useState([]);

  useEffect(() => {
    getActiveBranchesByUser();
  }, []);

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();

    console.log('active branches : ', result.data);
    setActiveBranches(result.data.data);
  };

  const defaultValues = {
    batchName: '',
    course: '',
    branch: selectedBranchId,
    startDate: null,
    endDate: null,
    students: []
  };

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema)
  });

  const handleClose = () => {
    reset();
  };

  const handleStudentsChange = (event) => {
    setValue('students', event.target.value);
    // const filteredStudent = activeStudents.filter((student) => student.student_id === event.target.value);
    // console.log('filtered', filteredStudent);
    // const filteredStudent = activeStudents.filter(item => event.target.value.includes(item.student_id));
    const filteredStudents = activeStudents.filter((student) => event.target.value.includes(student.student_id));

    console.log('event', event.target.value);
    console.log('filter', filteredStudents);
    setSelectedStudentIds(event.target.value);
    setSelectedStudents(filteredStudents);
  };

  const getStudentByCourseId = async (courseId) => {
    const result = await getStudentByCourse(courseId);
    console.log(result.data.data);
    setActiveStudents(result.data.data);
  };

  console.log('Active Students :', activeStudents);
  console.log('Selected Students :', selectedStudents);

  const onSubmit = async (data) => {
    console.log(data);
    const inputData = {
      batch_name: data.batchName,
      start_date: convertDateFormat(data.startDate),
      end_date: convertDateFormat(data.endDate),
      branch_id: data.branch,
      course_id: data.course,
      student_ids: data.students
    };
    const result = await addBatch(inputData);

    if (result.success) {
      toast.success(result.message);
    } else {
      let errorMessage = '';
      Object.values(result.message).forEach((errors) => {
        errors.forEach((error) => {
          errorMessage += `${error}\n`; // Concatenate errors with newline
        });
      });
      toast.error(errorMessage.trim());
      // toast.error(result.message);
    }
  };

  const handleStartDateChange = (date) => {
    setValue('startDate', date);
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setValue('endDate', date);
    setEndDate(date);
  };
  console.log(activeStudents);
  return (
    <Grid container spacing={4} sx={{ p: 1 }}>
      <Grid item xs={12}>
        <Typography variant="h3">Create a new batch</Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography variant="h4">Details</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Name, start date, end date</Typography>
      </Grid>
      <Grid item xs={12} sm={9}>
        <DatePickerWrapper>
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={12}>
                    <Controller
                      name="batchName"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          value={value}
                          label="Batch Name"
                          onChange={onChange}
                          placeholder="Leonard"
                          error={Boolean(errors['batchName'])}
                          aria-describedby="stepper-linear-personal-institute_batchName"
                          {...(errors['batchName'] && { helperText: 'This field is required' })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="startDate"
                      control={control}
                      render={({ value }) => (
                        <DatePicker
                          selected={startDate}
                          value={value}
                          showYearDropdown
                          showMonthDropdown
                          placeholderText="MM-DD-YYYY"
                          customInput={
                            <CustomInput label="Start Date" error={Boolean(errors.startDate)} helperText={errors.startDate?.message} />
                          }
                          id="form-layouts-separator-date"
                          onChange={handleStartDateChange}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="endDate"
                      control={control}
                      render={({ value }) => (
                        <DatePicker
                          selected={endDate}
                          value={value}
                          showYearDropdown
                          showMonthDropdown
                          placeholderText="MM-DD-YYYY"
                          customInput={
                            <CustomInput label="End Date" error={Boolean(errors.endDate)} helperText={errors.endDate?.message} />
                          }
                          id="form-layouts-separator-date"
                          onChange={handleEndDateChange}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="branch"
                      control={control}
                      render={({ value }) => (
                        <Autocomplete
                          value={value}
                          onChange={(event, newValue) => {
                            setValue('branch', newValue ? newValue.branch_id : ''); // Update the value of the 'branch' field
                            getActiveCoursesByBranch(newValue ? newValue.branch_id : ''); // Call function to fetch active courses based on the selected branch
                          }}
                          options={activeBranches}
                          getOptionLabel={(option) => option.branch_name || ''}
                          renderInput={(params) => (
                            <CustomTextField
                              {...params}
                              label="Branch"
                              error={Boolean(errors.branch)}
                              helperText={errors.branch?.message}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="course"
                      control={control}
                      render={({ value }) => (
                        <Autocomplete
                          value={value}
                          onChange={(event, newValue) => {
                            setValue('course', newValue ? newValue.course_id : ''); // Update the value of the 'course' field
                            getStudentByCourseId(newValue ? newValue.course_id : ''); // Call function to get students by course ID
                          }}
                          options={activeCourse}
                          getOptionLabel={(option) => option.course_name || ''}
                          renderInput={(params) => (
                            <CustomTextField
                              {...params}
                              label="Course"
                              error={Boolean(errors.course)}
                              helperText={errors.course?.message}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Controller
                      name="students"
                      control={control}
                      render={({ value }) => (
                        <CustomTextField
                          value={value}
                          select
                          fullWidth
                          label="Students"
                          id="select-multiple-chip"
                          SelectProps={{
                            MenuProps,
                            multiple: true,
                            value: selectedStudentIds,
                            onChange: (e) => handleStudentsChange(e),
                            renderValue: () => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                {selectedStudents.map((student) => (
                                  <CustomChip
                                    key={student?.student_id}
                                    label={`${student?.first_name} ${student?.last_name}`}
                                    sx={{ m: 0.75 }}
                                    skin="light"
                                    color="primary"
                                  />
                                ))}
                              </Box>
                            )
                          }}
                          error={Boolean(errors.students)}
                          helperText={errors.students?.message}
                        >
                          {activeStudents.map((student, index) => (
                            <MenuItem key={index} value={student?.student_id}>
                              {student?.first_name} {student?.last_name}
                            </MenuItem>
                          ))}
                        </CustomTextField>
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: 6, marginBottom: 12 }}>
                <Box>
                  <Button type="submit" variant="contained" sx={{ mr: 3 }}>
                    Update
                  </Button>
                  <Button variant="tonal" color="error" onClick={handleClose}>
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </form>
          </Card>
        </DatePickerWrapper>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4">Students List</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Check, remove student</Typography>
      </Grid>
      <Grid item xs={12}>
        <StudentTableList />
      </Grid>
    </Grid>
  );
};

export default AddBatchPage;
