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
import { getAllCourses, getAllInstructorsWithCourse, getStudentByCourse } from 'features/course-management/courses-page/services/courseServices';
import { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { useInstitute } from 'utils/get-institute-details';
import * as yup from 'yup';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const AddBatchPage = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState('')
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [selectedInstructor,setSelectedInstructors] = useState([])
  const [selectedInstructorIds,setSelectedInstructorIds] = useState([])
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
      .nullable(),
    instructors : yup.array()
    .min(1, 'Please select at least one Student')
    .test({
      name: 'atLeastOneStudent',
      message: 'Please select at least one Student',
      test: (value) => value && value.length > 0
    })
  });

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

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
  const [InstructorList,setInstructorList] = useState([])

  useEffect(() => {
    getActiveBranchesByUser();
  }, []);

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();
    setActiveBranches(result.data);
  };

  const defaultValues = {
    batchName: '',
    course: '',
    branch: selectedBranchId,
    startDate: null,
    endDate: null,
    students: [],
    instructors: []
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
    setSelectedStudentIds(event.target.value);
    setSelectedStudents(filteredStudents);
  };

  const handleInstructorChange = (event) => {
    setValue("instructors",event.target.value)
    const filterInstructors = InstructorList.filter((instructor) => event.target.value.includes(instructor.uuid) )
    setSelectedInstructorIds(event.target.value)
    setSelectedInstructors(filterInstructors)
  }

  const getStudentByCourseId = async (courseId) => {
    const result = await getStudentByCourse({ branch_id: selectedBranch, course_id: courseId })
    setActiveStudents(result.data);
  };

  const getInstructorByCourseId = async (courseId) => {
    const result = await getAllInstructorsWithCourse({branch_id: selectedBranch, course_id: courseId})
    setInstructorList(result.data)
  }


  const onSubmit = async (data) => {
    const instituteId = useInstitute().getInstituteId()
    console.log(data,"data")
    const inputData = {
      batch_name: data.batchName,
      start_date: convertDateFormat(data.startDate),
      end_date: convertDateFormat(data.endDate),
      branch_id: data.branch,
      course: data.course,
      student: data.students,
      institute_id: instituteId,
      instructor : data.instructors
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
  console.log(control._defaultValues.branch.length, control?._defaultValues, control?._formValues,InstructorList)

  return (
    <Grid container spacing={4} sx={{ p: 1 }}>




      <Grid item xs={12} sm={12}>

        <DatePickerWrapper>

          <Card>

            <Grid item xs={12} sx={{ background: 'linear-gradient(to right, #6366F1, #8B5CF6)' }}>
              <Typography variant="h1" sx={{ py: 4, px: 3, color: 'white' }} ><CalendarTodayIcon sx={{ mx: 1 }} />Create New Batch</Typography>
            </Grid>

            <form onSubmit={handleSubmit(onSubmit)}>

              <CardContent>

                <Grid container spacing={5}>



                  <Grid item xs={12} sm={12}>
                    <Controller
                      name="batchName"
                      control={control}
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
                            getActiveCoursesByBranch(newValue ? { branch_id: newValue.uuid } : '');
                            setSelectedBranch(newValue?.uuid);
                            setValue('course', ''); // Reset course when branch changes
                            setValue('students', []); // Reset students when branch changes

                          }}
                          options={activeBranches}
                          getOptionLabel={(option) => option.branch_identity || ''}
                          renderInput={(params) => (
                            <CustomTextField
                              {...params}
                              label="Branch"
                              error={Boolean(errors.branch)}
                              helperText={errors.branch?.message || 'Select a branch to see available courses.'}
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
                          // disabled={control._defaultValues.branch.length === 0}
                          disabled={!selectedBranch} // Disable if no branch is selected

                          value={value}
                          onChange={(event, newValue) => {
                            setValue('course', newValue ? newValue.uuid : '');
                            getStudentByCourseId(newValue.uuid);
                            getInstructorByCourseId(newValue?._id)
                            setValue('students', []);// Reset students when course changes
                          }}
                          options={activeCourse}
                          getOptionLabel={(option) => option.course_name || ''}
                          renderInput={(params) => (
                            <CustomTextField
                              {...params}
                              label="Course"
                              error={Boolean(errors.course)}
                              helperText={errors.course?.message ||
                                (!selectedBranch && 'Please select a branch first to enable course selection.')
                              }
                              sx={{
                                '& .MuiInputBase-root.Mui-disabled': {
                                  backgroundColor: '#f0f0f0'  
                                },
                                cursor: !selectedBranch ? 'not-allowed' : 'text'
                              }}
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
                          disabled={!selectedBranch || !control._formValues.course} // Disable if branch or course is not selected
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
                          helperText={errors.students?.message ||
                            (!control._formValues.course &&
                              'Please select a course to view and select students.')}
                              sx={{
                                '& .MuiInputBase-root.Mui-disabled': {
                                  backgroundColor: '#f0f0f0' 
                                },
                                cursor: !selectedBranch || !control._formValues.course ? 'not-allowed' : 'text'
                              }}
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

                  <Grid item xs={12} sm={12}>
                    <Controller
                      name="instructors"
                      control={control}
                      render={({ value }) => (
                        <CustomTextField
                          value={value}
                          select
                          fullWidth
                          label="Teachers"
                          id="select-multiple-chip"
                          disabled={!selectedBranch || !control._formValues.course} // Disable if branch or course is not selected
                          SelectProps={{
                            MenuProps,
                            multiple: true,
                            value: selectedInstructorIds,
                            onChange: (e) => handleInstructorChange(e),
                            renderValue: () => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                {selectedInstructor.map((instructor) => (
                                  <CustomChip
                                    key={instructor.uuid}
                                    label={`${instructor.full_name}`}
                                    sx={{ m: 0.75 }}
                                    skin="light"
                                    color="primary"
                                  />
                                ))}
                              </Box>
                            )
                          }}
                          error={Boolean(errors.instructors)}
                          helperText={errors.students?.instructor ||
                            (!control._formValues.course &&
                              'Please select a course to view and select teachers.')}
                              sx={{
                                '& .MuiInputBase-root.Mui-disabled': {
                                  backgroundColor: '#f0f0f0' 
                                },
                                cursor: !selectedBranch || !control._formValues.course ? 'not-allowed' : 'text'
                              }}
                        >
                          {InstructorList.map((instructor, index) => (
                            <MenuItem key={index} value={instructor?.uuid}>
                              {instructor?.full_name}
                            </MenuItem>
                          ))}
                        </CustomTextField>
                      )}
                    />
                  </Grid>

                </Grid>
              </CardContent>

              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6, marginBottom: 12, gap: 2 }}>
                <Box>

                  <Button variant="tonal" color="secondary" onClick={() => navigate(-1)} sx={{
                    backgroundColor: '#f5f5f5',
                    color: 'black', mr: 2,
                    '&:hover': {
                      backgroundColor: '#e0e0e0',
                    }
                  }}>
                    Cancel
                  </Button>

                  <Button type="submit" variant="contained" sx={{
                    mr: 3, background: 'linear-gradient(to right, #6366F1, #8B5CF6)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(to right, #4F46E5, #6B21A8)',
                      color: 'white',
                    }
                  }}>
                    Create Batch
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
