import { yupResolver } from '@hookform/resolvers/yup';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Checkbox, Grid,Typography } from '@mui/material';
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
import { getBatchesByCourse } from 'features/batch-management/batches/services/batchServices';
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import { getAllCourses } from 'features/course-management/courses-page/services/courseServices';
import { getAllNonTeachingStaffs } from 'features/staff-management/non-teaching-staffs/services/nonTeachingStaffServices';
import { getAllActiveTeachingStaffs } from 'features/staff-management/teaching-staffs/services/teachingStaffServices';
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import * as yup from 'yup';
import { addOfflineClass } from '../../services/offlineClassServices';
import { useInstitute } from 'utils/get-institute-details';
import { useSpinner } from 'context/spinnerContext';
import { Link } from 'react-router-dom';

const CustomInput = forwardRef(({ ...props }, ref) => {
  const { label, readOnly } = props;

  return <TextField {...props} fullWidth inputRef={ref} label={label || ''} {...(readOnly && { inputProps: { readOnly: true } })} />;
});

const OfflineClassAddModal = ({ open, handleAddClose, setRefetch }) => {
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [activeBranches, setActiveBranches] = useState([]);
  const [activeTeachingStaff, setActiveTeachingStaff] = useState([]);
  const [activeNonTeachingStaff, setActiveNonTeachingStaff] = useState([]);
  const { show, hide } = useSpinner()


  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [classDateSelected, setClassDateSelected] = useState(false);

  const handleBranchChange = (newValue) => {
  setSelectedBranch(newValue);
  setSelectedCourse(null); // Reset course when branch changes
  setSelectedBatch(null); // Reset batch when branch changes
  setClassDateSelected(false); // Reset class date when branch changes
};

const handleCourseChange = (newValue) => {
  setSelectedCourse(newValue);
  setSelectedBatch(null); // Reset batch when course changes
  setClassDateSelected(false); // Reset class date when course changes
};

const handleBatchChange = (newValue) => {
  setSelectedBatch(newValue);
  setClassDateSelected(false); // Reset class date when batch changes
};

const handleClassDateChange = (newValue) => {
  setClassDateSelected(true);
};
  
  
  useEffect(() => {
    getActiveBranchesByUser();
  }, []);

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();
    setActiveBranches(result.data);
  };

  const [activeCourse, setActiveCourse] = useState([]);
  const [activeBatches, setActiveBatches] = useState([]);
  useEffect(() => {
    getActiveCoursesByBranch(selectedBranchId);
    getActiveTeachingStaffs(selectedBranchId);
    getActiveNonTeachingStaffs(selectedBranchId);
  }, [selectedBranchId]);

  const getActiveCoursesByBranch = async (selectedBranchId) => {
    const result = await getAllCourses({ branch_id: selectedBranchId });

    if (result?.data) {
      setActiveCourse(result?.data);
    }
  };
  const getActiveTeachingStaffs = async (selectedBranchId) => {
    const data = { type: 'teaching', branch_id: selectedBranchId };
    const result = await getAllActiveTeachingStaffs(data);

    setActiveTeachingStaff(result?.data);
  };
  const getActiveNonTeachingStaffs = async (selectedBranchId) => {
    const data = { type: 'non_teaching', branch_id: selectedBranchId };
    const result = await getAllNonTeachingStaffs(data);
    setActiveNonTeachingStaff(result.data);
  };
  const getActiveBatchesByCourse = async (courseId) => {
    const data = { course: courseId, branch_id: selectedBranchId };
    const result = await getBatchesByCourse(data);
    if (result?.success) {
      setActiveBatches(result.data);
    }
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
    batch: yup.object().required('Batch field is required'),
    instructor: yup.array().required('Instructor field is required'),
    classDate: yup.date().nullable().required('Class Date field is required'),
    start_time: yup.string().required('Start Time field is required'),
    end_time: yup.date().nullable().required('End Time field is required')
  });

  const defaultValues = {
    class_name: '',
    branch: "",
    course: '',
    batch: {},
    classDate: null,
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
    setSelectedCoordinates([])
    setSelectedInstructors([])
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
    // show()
    const filteredInstructorId = data.instructor?.map((staff) => staff._id);
    const filteredCoordinatorId = data.coordinator?.map((staff) => staff._id);

    const dummyData = {
      institute: useInstitute().getInstituteId(),
      class_name: data.class_name,
      branch: data.branch,
      course: data.course,
      batch: data.batch._id,
      start_date: convertDateFormat(data.classDate),
      start_time: data.start_time,
      end_time: data.end_time,
      instructors: filteredInstructorId,
      coordinators: filteredCoordinatorId,
    };


    try {
      const result = await addOfflineClass(dummyData);

      if (result.success) {
        setRefetch((state) => !state);
        handleClose();
        reset();
        hide()
        toast.success(result.message);
      } else {
        hide()
        toast.error(result.message);
      }
    } catch (error) {
      hide()
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="user-view-edit"
      aria-describedby="user-view-edit-description"
      sx={{
        '& .MuiPaper-root': {
          width: '100%', maxWidth: 800,
          background: 'linear-gradient(to bottom right, #f0e7ff, #e0f2ff)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          borderRadius: 2,
        }
      }}
    >

      <DialogTitle
        id="user-view-edit"
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(3)} !important`],
          pt: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(4)} !important`],
          background: 'linear-gradient(to right, #6b46c1, #5a67d8)',
          color: 'white',
          fontWeight: 'bold',
          padding: '1rem',
         
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
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      value={value}
                      label="Class Name"
                      onChange={onChange}
                      placeholder="John Doe"
                      error={Boolean(errors.class_name)}
                      {...(errors.class_name && { helperText: errors.class_name.message })}
                      sx={{
                        backgroundColor: 'transparent',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          '& fieldset': {
                            borderColor: 'rgba(156, 163, 175, 1)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(156, 163, 175, 1)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'rgba(96, 165, 250, 1)',
                            boxShadow: '0 0 0 3px rgba(229, 231, 235, 0.5)',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'black',
                          '&.Mui-focused': {
                            color: 'black',
                          },
                        },
                        '& .MuiFormHelperText-root': {
                          backgroundColor: 'transparent',
                          color: 'red',

                          borderRadius: '4px',
                          marginTop: '4px',
                        },

                      }}
                    />
                  )}
                />
              </Grid>
              

              <Grid item xs={12}>
                <Controller
                  name="branch"
                  control={control}
                  rules={{ required: 'Branch is required' }}
                  render={({ field: { value, onChange } }) => (
                    <Autocomplete
                      fullWidth
                      options={activeBranches}
                      getOptionLabel={(option) => option.branch_identity}
                      onChange={(event, newValue) => {
                        onChange(newValue?._id);
                        getActiveCoursesByBranch(newValue?.uuid);
                        handleBranchChange(newValue);
                        
                      }}
                      value={activeBranches.find((branch) => branch._id === value) || null}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Branch" error={Boolean(errors.branch)} helperText={errors.branch?.message}
                          sx={{
                            backgroundColor: 'transparent',
                            borderRadius: '8px',
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                              backgroundColor: 'white',
                              '& fieldset': {
                                borderColor: 'rgba(156, 163, 175, 1)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(156, 163, 175, 1)',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'rgba(96, 165, 250, 1)',
                                boxShadow: '0 0 0 3px rgba(229, 231, 235, 0.5)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'black',
                              '&.Mui-focused': {
                                color: 'black',
                              },
                            },
                            '& .MuiFormHelperText-root': {
                              backgroundColor: 'transparent',
                              color: 'red',

                              borderRadius: '4px',
                              marginTop: '4px',
                            },

                          }}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sx={{}}>
                <Controller
                  name="course"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Autocomplete
                      fullWidth
                      options={activeCourse}
                      getOptionLabel={(course) => course.course_name}
                      onChange={(event, newValue) => {
                        onChange(newValue?._id);
                        getActiveBatchesByCourse(newValue?._id);
                        handleCourseChange(newValue);
                      }}
                      value={activeCourse.find((course) => course._id === value) || null}
                      disabled={!selectedBranch}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Course" error={Boolean(errors.course)} helperText={errors.course?.message 
                          || (!selectedBranch && 'Please select a branch first to enable course selection.')
                        }
                          sx={{
                            '& .MuiInputBase-root.Mui-disabled': {
                                  backgroundColor: '#f0f0f0'  
                                },
                                cursor: !selectedBranch ? 'not-allowed' : 'text',
                            backgroundColor: 'transparent',
                            borderRadius: '8px',
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                              backgroundColor: 'white',
                              '& fieldset': {
                                borderColor: 'rgba(156, 163, 175, 1)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(156, 163, 175, 1)',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'rgba(96, 165, 250, 1)',
                                boxShadow: '0 0 0 3px rgba(229, 231, 235, 0.5)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'black',
                              '&.Mui-focused': {
                                color: 'black',
                              },
                            },
                            '& .MuiFormHelperText-root': {
                              backgroundColor: 'transparent',
                              color: selectedBranch ? 'red':'black',
                              
                              borderRadius: '4px',
                              marginTop: '4px',
                            },

                          }}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Controller
                  name="batch"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      fullWidth
                      options={activeBatches}
                      getOptionLabel={(option) => option?.batch_name || "" }
                      onChange={(event, newValue) => {
                        setValue('batch', newValue);
                        handleBatchChange(newValue);
                      }}
                      disabled={!selectedCourse}
                      value={field.value}
                      renderInput={(params) => (
                        <TextField
                          {...params} label="Select Batch" error={Boolean(errors.course)} helperText={errors.course?.message 
                            || (!selectedCourse && 'Please select a Course first to enable Batch selection.')
                          }
                          sx={{
                            '& .MuiInputBase-root.Mui-disabled': {
                              backgroundColor: '#f0f0f0'  
                            },
                            cursor: !selectedCourse ? 'not-allowed' : 'text',
                            backgroundColor: 'transparent',
                            borderRadius: '8px',
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                              backgroundColor: 'white',
                              '& fieldset': {
                                borderColor: 'rgba(156, 163, 175, 1)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(156, 163, 175, 1)',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'rgba(96, 165, 250, 1)',
                                boxShadow: '0 0 0 3px rgba(229, 231, 235, 0.5)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'black',
                              '&.Mui-focused': {
                                color: 'black',
                              },
                            },
                            '& .MuiFormHelperText-root': {
                              backgroundColor: 'transparent',
                              color:selectedCourse? 'red' :'black',

                              borderRadius: '4px',
                              marginTop: '4px',
                            },

                          }}
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
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      selected={value}
                      id="basic-input"
                      className="full-width-datepicker"
                      onChange={(date) => {
                        onChange(date);
                        handleClassDateChange(date);
                      }}
                      placeholderText="Click to select a date"
                      disabled={!selectedBatch}
                      customInput={<CustomInput label="ClassDate"
                       
                        sx={{
                          '& .MuiInputBase-root.Mui-disabled': {
                            backgroundColor: '#f0f0f0'  
                          },
                          cursor: !selectedBatch ? 'not-allowed' : 'text',
                          backgroundColor: 'transparent',
                          borderRadius: '8px',
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            backgroundColor: 'white',
                            '& fieldset': {
                              borderColor: 'rgba(156, 163, 175, 1)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(156, 163, 175, 1)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'rgba(96, 165, 250, 1)',
                              boxShadow: '0 0 0 3px rgba(229, 231, 235, 0.5)',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'black',
                            '&.Mui-focused': {
                              color: 'black',
                            },
                          },
                          '& .MuiFormHelperText-root': {
                            backgroundColor: 'transparent',
                            color: 'red',

                            borderRadius: '4px',
                            marginTop: '4px',
                          },

                        }}
                       
                         />
                        }

                    />
                  )}

                />
                {/* {errors.classDate && <p style={{ color: 'red', margin: '5px 0 0', fontSize: '0.875rem' }}>{errors.classDate.message }</p>} */}
                {errors.classDate ? (
    <Typography variant="body2" color="error" sx={{ marginTop: '5px' }}>
      {errors.classDate.message}
    </Typography>
  ) : (
    !selectedBatch && (
      <Typography variant="body2" color="textSecondary" sx={{ marginTop: '5px',ml:2,fontSize: '0.8rem' , '& .MuiInputBase-root.Mui-disabled': {
        backgroundColor: '#f0f0f0'  
      },
      cursor: !selectedBatch ? 'not-allowed' : 'text',}}>
        Please select a batch first to enable the class date.
      </Typography>
    )
  )}
              </Grid>

              <Grid container item xs={6} spacing={2}>
                <Grid item md={6} sm={12}>
                  <Controller
                    name="start_time"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          customInput={
                            <CustomInput
                              label="Start Time"
                              sx={{
                                border: errors.start_time ? '1px solid red' : 'none', borderRadius: '7px',
                              }}
                            />
                          }
                          value={value}
                          onChange={onChange}
                          label="Start Time"
                          disabled={!classDateSelected} 
                          sx={{
                            '& .MuiInputBase-root.Mui-disabled': {
                              backgroundColor: '#f0f0f0'  
                            },
                            cursor: !classDateSelected ? 'not-allowed' : 'text',
                            backgroundColor: 'transparent',
                            borderRadius: '8px',
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                              backgroundColor: 'white',
                              '& fieldset': {
                                borderColor: 'rgba(156, 163, 175, 1)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(156, 163, 175, 1)',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'rgba(96, 165, 250, 1)',
                                boxShadow: '0 0 0 3px rgba(229, 231, 235, 0.5)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'black',
                              '&.Mui-focused': {
                                color: 'black',
                              },
                            },
                            '& .MuiFormHelperText-root': {
                              backgroundColor: 'transparent',
                              color: 'red',

                              borderRadius: '4px',
                              marginTop: '4px',
                            },

                          }}
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
                          disabled={!classDateSelected} 
                          sx={{
                            '& .MuiInputBase-root.Mui-disabled': {
                              backgroundColor: '#f0f0f0'  
                            },
                            cursor: !classDateSelected ? 'not-allowed' : 'text',
                            backgroundColor: 'transparent',
                            borderRadius: '8px',
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                              backgroundColor: 'white',
                              '& fieldset': {
                                borderColor: 'rgba(156, 163, 175, 1)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(156, 163, 175, 1)',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'rgba(96, 165, 250, 1)',
                                boxShadow: '0 0 0 3px rgba(229, 231, 235, 0.5)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'black',
                              '&.Mui-focused': {
                                color: 'black',
                              },
                            },
                            '& .MuiFormHelperText-root': {
                              backgroundColor: 'transparent',
                              color: 'red',

                              borderRadius: '4px',
                              marginTop: '4px',
                            },

                          }} />
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
                  options={[{ _id: 'selectAll', full_name: 'Select All' }, ...activeTeachingStaff]}
                  getOptionLabel={(option) => option}
                  value={selectedInstructors}
                  onChange={(e, newValue) => {
                    if (newValue && newValue.some((option) => option._id === 'selectAll')) {
                      setSelectedInstructors(activeTeachingStaff.filter((option) => option._id !== 'selectAll'));
                      setValue(
                        'instructor',
                        activeTeachingStaff.filter((option) => option._id !== 'selectAll')
                      );
                    } else {
                      setSelectedInstructors(newValue);
                      setValue('instructor', newValue);
                    }
                  }}
                  disabled={!classDateSelected}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={Boolean(errors.instructor)} helperText={errors.instructor?.message || (!classDateSelected && 'Please select a ClassDate first to enable Instructor selection.')}
                      fullWidth
                      label="Instructors"
                      InputProps={{
                        ...params.InputProps,
                        style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                      }}
                      sx={{
                        '& .MuiInputBase-root.Mui-disabled': {
                          backgroundColor: '#f0f0f0'  
                        },
                        cursor: !classDateSelected ? 'not-allowed' : 'text',
                        backgroundColor: 'transparent',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          '& fieldset': {
                            borderColor: 'rgba(156, 163, 175, 1)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(156, 163, 175, 1)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'rgba(96, 165, 250, 1)',
                            boxShadow: '0 0 0 3px rgba(229, 231, 235, 0.5)',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'black',
                          '&.Mui-focused': {
                            color: 'black',
                          },
                        },
                        '& .MuiFormHelperText-root': {
                          backgroundColor: 'transparent',
                          color: classDateSelected? 'red':'black',

                          borderRadius: '4px',
                          marginTop: '4px',
                        },

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
                      {option.full_name }
                    </li>
                  )}
                  renderTags={(value) => (
                    <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                      {value.map((option, index) => (
                        <CustomChip
                          key={option._id}
                          label={option.full_name}
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
                  isOptionEqualToValue={(option, value) => option._id === value._id}
                  selectAllText="Select All"
                  SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Autocomplete
                  disableCloseOnSelect
                  multiple
                  id="select-multiple-coordinates"
                  options={[{ _id: 'selectAll', full_name: 'Select All' }, ...activeNonTeachingStaff]}
                  getOptionLabel={(option) => option.full_name}
                  value={selectedCoordinates}
                  onChange={(e, newValue) => {
                    if (newValue && newValue.some((option) => option._id === 'selectAll')) {
                      setSelectedCoordinates(activeNonTeachingStaff.filter((option) => option._id !== 'selectAll'));
                      setValue(
                        'coordinator',
                        activeTeachingStaff.filter((option) => option._id !== 'selectAll')
                      );
                    } else {
                      setSelectedCoordinates(newValue);
                      setValue('coordinator', newValue);
                    }
                  }}
                  disabled={selectedInstructors.length === 0}
                  renderInput={(params) => (
                    <TextField
                      {...params} 
                      error={Boolean(errors.coordinator)} helperText={errors.coordinator?.message || (!classDateSelected && 'Please select a Instructor first to enable Coordinates selection.')}
                      fullWidth
                      label="Coordinates"
                      InputProps={{
                        ...params.InputProps,
                        style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                      }}
                      sx={{
                        '& .MuiInputBase-root.Mui-disabled': {
                          backgroundColor: '#f0f0f0'  
                        },
                        cursor: selectedInstructors.length === 0 ? 'not-allowed' : 'text',
                        backgroundColor: 'transparent',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          '& fieldset': {
                            borderColor: 'rgba(156, 163, 175, 1)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(156, 163, 175, 1)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'rgba(96, 165, 250, 1)',
                            boxShadow: '0 0 0 3px rgba(229, 231, 235, 0.5)',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'black',
                          '&.Mui-focused': {
                            color: 'black',
                          },
                        },
                        '& .MuiFormHelperText-root': {
                          backgroundColor: 'transparent',
                          color:selectedInstructors.length === 0?  'black' :'red',
                          borderRadius: '4px',
                          marginTop: '4px',
                        },

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
                      {option.full_name}
                    </li>
                  )}
                  renderTags={(value) => (
                    <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                      {value.map((option, index) => (
                        <CustomChip
                          key={option._id}
                          label={option.full_name}
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
                  isOptionEqualToValue={(option, value) => option._id === value._id}
                  selectAllText="Select All"
                  SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                />
              </Grid>


              <Grid item xs={12}>

                <Box display="flex" justifyContent="space-between">

                  <Button variant="tonal" color="error" onClick={handleClose} sx={{
                    border: '2px solid #D8B4FE',
                    color: '#9333EA',
                    backgroundColor: 'transparent',
                    '&:hover': {
                      backgroundColor: '#FAF5FF',
                    },
                  }}>
                    Cancel
                  </Button>



                  <Button type="submit" onClick={handleSubmit(onSubmit)} variant="contained"
                    sx={{
                      background: 'linear-gradient(to right, #9333EA, #4F46E5)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(to right, #7E22CE, #4338CA)',
                      },
                    }}  >
                    Submit
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
