// ** React Imports
import { useState } from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CustomChip from 'components/mui/chip';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

// ** MUI Imports
import { Button, Grid, Typography, Checkbox } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
// ** Icon Imports
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Icon from 'components/icon';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { getAllActiveCourses } from 'features/course-management/courses-page/services/courseServices';
import { getAllActiveBatchesByCourse } from 'features/batch-management/batches/services/batchServices';
import { addStudentNotification } from '../services/studentNotificationServices';

import { getAllStudentsByBatch } from 'features/student-management/students/services/studentService';

const NotificationAddDrawer = (props) => {
  // ** Props
  const { open, toggle } = props;

  // ** State

  const [inputValue, setInputValue] = useState('');
  const image =
    'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg';

  const [imgSrc, setImgSrc] = useState(image);
  const [selectedImage, setSelectedImage] = useState('');

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const [activeCourse, setActiveCourse] = useState([]);
  const [activeBatches, setActiveBatches] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    getActiveCoursesByBranch(selectedBranchId);
  }, [selectedBranchId]);

  const getActiveCoursesByBranch = async (selectedBranchId) => {
    const result = await getAllActiveCourses({branch_id:selectedBranchId});

    console.log('active courses : ', result.data);
    setActiveCourse(result.data.data);
  };

  const getActiveBatchesByCourse = async (courseId) => {
    const data = { course_id: courseId };
    const result = await getAllActiveBatchesByCourse(data);

    console.log('active batches : ', result.data);
    setActiveBatches(result.data.data);

    // Fetch students whenever active batches change
    result.data.data.forEach((batch) => {
      getStudentsByBatch(batch.batch_id);
    });
  };

  const getStudentsByBatch = async (batchId) => {
    const data = { batch_id: batchId };
    const result = await getAllStudentsByBatch(data);
    setStudents(result.data.data); // Assuming result.data contains the list of students
  };

  const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(6),
    justifyContent: 'space-between'
  }));

  const schema = yup.object().shape({
    students: yup.array().required('Students is required').min(1, 'Select at least one student'),
    title: yup
    .string()
    .required('Title is required')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Title should not contain special characters'),
    body: yup
    .string()
    .required('Body is required')
    .matches(/^[a-zA-Z0-9\s]+$/, 'body should not contain special characters'),
    course: yup.object().required('Course is required'),
    batch: yup.object().required('Batch is required')
  });

  const defaultValues = {
    course: null, // Changed to null
    batch: null, // Changed to null
    students: [],
    title: '',
    body: ''
  };

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });


  const handleClose = () => {
    setInputValue(''); // Reset input value
    setImgSrc(image); // Reset image source
    setSelectedImage(''); // Reset selected image
    reset(); // Reset form values
    toggle(); // Close the drawer
  };

  const onSubmit = async (data) => {
    console.log(data);
    var bodyFormData = new FormData();
    data?.students?.forEach((student) => {
      bodyFormData.append('student_ids[]', student?.student_id);
    });
    bodyFormData.append('image', selectedImage);
    bodyFormData.append('course', data.course.course_id); // Accessing course_id from selected object
    bodyFormData.append('branch_id', selectedBranchId); // Accessing batch_id from selected object
    bodyFormData.append('title', data.title);
    bodyFormData.append('body', data.body);

    const result = await addStudentNotification(bodyFormData);

    if (result.success) {
      toast.success(result.message);
      handleClose();
    } else {
      // let errorMessage = '';
      // Object.values(result.message).forEach((errors) => {
      //   errors.forEach((error) => {
      //     errorMessage += `${error}\n`; // Concatenate errors with newline
      //   });
      // });
      toast.error(result.message);
    }
  };

  const ImgStyled = styled('img')(({ theme }) => ({
    width: 100,
    height: 100,
    marginRight: theme.spacing(2),
    borderRadius: theme.shape.borderRadius
  }));

  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }));

  const handleInputImageChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files?.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      setSelectedImage(files[0]);
      reader.readAsDataURL(files[0]);
      if (reader.result !== null) {
        setInputValue(reader.result);
      }
    }
  };

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 700 } } }}
    >
      <Header>
        <Typography variant="h5">Add Notification</Typography>
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: (theme) => `rgba(${theme.palette.secondary.main}, 0.16)`
            }
          }}
        >
          <Icon icon="tabler:x" fontSize="1.125rem" />
        </IconButton>
      </Header>
      <Box sx={{ p: (theme) => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <ImgStyled src={imgSrc} alt="Profile Pic" />
            <div>
              <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-image">
                Upload
                <input
                  hidden
                  type="file"
                  value={inputValue}
                  accept="image/png, image/jpeg"
                  onChange={handleInputImageChange}
                  id="account-settings-upload-image"
                />
              </ButtonStyled>
            </div>
          </Box>

          <Grid item xs={12} sm={12}>
            <Controller
              name="course"
              control={control}
              rules={{ required: 'Course field is required' }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  fullWidth
                  options={activeCourse}
                  getOptionLabel={(option) => option.course_name}
                  onChange={(event, newValue) => {
                    field.onChange(newValue); // This will update the form state
                    setValue('course', newValue); // Set the selected value in the form state
                    getActiveBatchesByCourse(newValue?.course_id);
                  }}
                  value={activeCourse.find((course) => course.course_id === (field.value ? field.value.course_id : null)) || null}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{ mb: 2 }}
                      label="Select Course"
                      id="select-single-course-extra"
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
              name="batch"
              control={control}
              rules={{ required: 'Batch field is required' }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  fullWidth
                  options={activeBatches}
                  getOptionLabel={(option) => option.batch_name}
                  onChange={(event, newValue) => {
                    field.onChange(newValue); // This will update the form state
                    setValue('batch', newValue); // Set the selected value in the form state
                    // Optionally, you can fetch students here based on the selected batch
                    getStudentsByBatch(newValue?.batch_id);
                  }}
                  value={activeBatches.find((batch) => batch.batch_id === (field.value ? field.value.batch_id : null)) || null}
                  renderInput={(params) => (
                    <TextField sx={{ mb: 2 }} {...params} label="Batch" error={Boolean(errors.batch)} helperText={errors.batch?.message} />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Autocomplete
              multiple
              disableCloseOnSelect
              id="select-multiple-chip"
              options={students}
              getOptionLabel={(option) => option?.first_name}
              value={selectedStudents}
              onChange={(e, newValue) => {
                setSelectedStudents(newValue);
                setValue('students', newValue);
              }}
              renderInput={(params) => (
                <Controller
                  name="students"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      {...params}
                      sx={{ mb: 2 }}
                      fullWidth
                      label="Students"
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.students)}
                      helperText={errors.students ? errors.students.message : null}
                      aria-describedby="stepper-linear-personal-branches"
                      // {...(errors.students['Students'] && { helperText: 'This field is required' })}
                      // {...(errors.students && { helperText: 'This field is required' })}
                      InputProps={{
                        ...params.InputProps,
                        style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                      }}
                    />
                  )}
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
                  {option?.first_name}
                </li>
              )}
              renderTags={(value) => (
                <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                  {value?.map((option, index) => (
                    <CustomChip
                      key={option?.student_id}
                      label={option?.first_name}
                      onDelete={() => {
                        const updatedValue = [...value];
                        updatedValue?.splice(index, 1);
                        setSelectedStudents(updatedValue);
                        setValue('students', updatedValue);
                      }}
                      color="primary"
                      sx={{ m: 0.75 }}
                    />
                  ))}
                </div>
              )}
              isOptionEqualToValue={(option, value) => option?.student_id === value?.student_id}
              selectAllText="Select All"
              SelectAllProps={{ sx: { fontWeight: 'bold' } }}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  sx={{ mb: 2 }}
                  label="Title"
                  value={value}
                  onChange={onChange}
                  placeholder="Placeholder"
                  error={Boolean(errors.title)}
                  helperText={errors.title ? errors.title.message : null}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name="body"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  sx={{ mb: 2 }}
                  label="Body"
                  value={value}
                  onChange={onChange}
                  placeholder="Placeholder"
                  error={Boolean(errors.body)}
                  helperText={errors.body ? errors.body.message : null}
                  multiline // Add multiline prop
                  rows={4} // Set rows to 4
                />
              )}
            />
          </Grid>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
            <Button type="submit" variant="contained" sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant="tonal" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
};

export default NotificationAddDrawer;
