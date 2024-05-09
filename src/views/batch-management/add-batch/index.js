// material-ui
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField as CustomTextField, Grid, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import CustomChip from 'components/mui/chip';
import { addBatch } from 'features/batch-management/batches/services/batchServices';
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import { getAllCourses, getStudentByCourse } from 'features/course-management/courses-page/services/courseServices';
import { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { useInstitute } from 'utils/get-institute-details';
import * as yup from 'yup';

const AddBatchPage = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [activeCourse, setActiveCourse] = useState([]);
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

  const CustomInput = forwardRef((props, ref) => {
    return <CustomTextField fullWidth {...props} inputRef={ref} autoComplete="off" />;
  });

  const validationSchema = yup.object().shape({
    batchName: yup
      .string()
      .required('Batch Name is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Batch Name should not contain special characters'),
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
    const data = {
      branch_id: selectedBranchId
    };
    getActiveCoursesByBranch(data);
  }, [selectedBranchId]);

  const getActiveCoursesByBranch = async (data) => {
    const result = await getAllCourses(data);
    if (result?.data) {
      setActiveCourse(result?.data);
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

  const handleStudentsChange = (event) => {
    setValue('students', event.target.value);
    const filteredStudents = activeStudents.filter((student) => event.target.value.includes(student.uuid));
    console.log('event', event.target.value);
    console.log('filter', filteredStudents);
    setSelectedStudentIds(event.target.value);
    setSelectedStudents(filteredStudents);
  };

  const getStudentByCourseId = async (courseId) => {
    const result = await getStudentByCourse({ course_id: courseId });
    console.log(result.data);
    setActiveStudents(result.data);
  };

  console.log('Active Students :', activeStudents);
  console.log('Selected Students :', selectedStudents);

  const onSubmit = async (data) => {
    console.log(data);
    const instituteId = useInstitute().getInstituteId()
    const inputData = {
      batch_name: data.batchName,
      start_date: convertDateFormat(data.startDate),
      end_date: convertDateFormat(data.endDate),
      branch_id: data.branch,
      course: data.course,
      student: data.students,
      institute_id : instituteId
    };
    const result = await addBatch(inputData);

    if (result.success) {
      navigate(-1);
      toast.success(result.message);
    } else {
      let errorMessage = '';
      Object.values(result.message).forEach((errors) => {
        errors.forEach((error) => {
          errorMessage += `${error}\n`;
        });
      });
      toast.error(errorMessage.trim());
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
  console.log(activeStudents,selectedStudents,"selectedStudents");
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
                          helperText={errors.batchName?.message}
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
                            setValue('branch', newValue ? newValue.uuid : '');
                            getActiveCoursesByBranch(newValue ? newValue.branch_id : '');
                          }}
                          options={activeBranches}
                          getOptionLabel={(option) => option.branch_identity || ''}
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
                            setValue('course', newValue ? newValue.uuid : '');
                            getStudentByCourseId(newValue.uuid);
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
                                    key={student?.uuid}
                                    label={`${student?.full_name}`}
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
                            <MenuItem key={index} value={student?.uuid}>
                              {student?.full_name}
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
                  <Button variant="tonal" color="error" onClick={() => navigate(-1)}>
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </form>
          </Card>
        </DatePickerWrapper>
      </Grid>
    </Grid>
  );
};

export default AddBatchPage;
