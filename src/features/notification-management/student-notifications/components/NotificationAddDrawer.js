import { yupResolver } from '@hookform/resolvers/yup';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Button, Checkbox, Grid, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import CustomChip from 'components/mui/chip';
import { getBatchesByCourse } from 'features/batch-management/batches/services/batchServices';
import { getAllCourses } from 'features/course-management/courses-page/services/courseServices';
import { getAllStudentsByBatch } from 'features/student-management/students/services/studentService';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { addStudentNotification } from '../services/studentNotificationServices';
import { useSpinner } from 'context/spinnerContext';
import { title } from '_mock/text';
import { useInstitute } from 'utils/get-institute-details';

const NotificationAddDrawer = (props) => {
  const { open, toggle, setStudentNotificationRefetch } = props;
  const {show,hide} = useSpinner()

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

  const getActiveBatchesByCourse = async (courseId) => {
    const data = { course: courseId, branch_id: selectedBranchId };
    const result = await getBatchesByCourse(data);

    if (result?.success) {
      setActiveBatches(result?.data);
    }
  };

  const getStudentsByBatch = async (batchId) => {
    const data = { batch_id: batchId, branch_id: selectedBranchId };
    const result = await getAllStudentsByBatch(data);
    if (result?.success) {
      setStudents(result?.data);
    }
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
    description: yup
      .string()
      .required('Body is required'),
    course: yup.object().required('Course is required'),
    batch: yup.object().required('Batch is required'),
    notification_type : yup.string().required("Type is required"),
    link : yup.string().optional()
  });

  const defaultValues = {
    course: null,
    batch: null,
    students: [],
    title: '',
    description: '',
    notification_type : '',
    link : ''
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
    setInputValue('');
    setImgSrc(image);
    setSelectedImage(''); 
    reset();
    toggle();
  };

  const instituteId = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).institute_id : null;

  const onSubmit = async (data) => {
    try{
      show()
      const studentIds = data?.students?.map((user)=>user?._id)
      const notification = {
        institute : useInstitute().getInstituteId(),
        course : data?.course?._id,
        batch : data?.batch?._id,
        branch : selectedBranchId,
        title : data?.title,
        body : data?.description,
        student : studentIds,
        link : data?.link,
        type : data?.notification_type
      }
      
      const result = await addStudentNotification(notification);
      toast.success(result.message);
      handleClose();
      setStudentNotificationRefetch((state) => !state);
      hide()
    }catch(error){
      toast.error(error?.message)
    }finally{
     hide()
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
          {/* <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
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
          </Box> */}

          <Grid item xs={12} sm={12}>
            <Controller
              name="course"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  fullWidth
                  options={activeCourse}
                  getOptionLabel={(option) => option.course_name}
                  onChange={(event, newValue) => {
                    field.onChange(newValue);
                    setValue('course', newValue);
                    getActiveBatchesByCourse(newValue?._id);
                  }}
                  value={activeCourse.find((course) => course._id === (field.value ? field.value._id : null)) || null}
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
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  fullWidth
                  options={activeBatches}
                  getOptionLabel={(option) => option?.batch_name}
                  onChange={(event, newValue) => {
                    field.onChange(newValue);
                    setValue('batch', newValue);
                    getStudentsByBatch(newValue?.uuid);
                  }}
                  value={field.value}
                  renderInput={(params) => (
                    <TextField {...params} sx={{ mb: 2 }} label="Batch" error={Boolean(errors.batch)} helperText={errors.batch?.message} />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name="students"
              control={control}
              render={({ field: { value } }) => (
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  id="select-multiple-chip"
                  options={students}
                  getOptionLabel={(option) => option?.full_name || ''}
                  value={value}
                  onChange={(e, newValue) => {
                    setValue('students', newValue);
                    setSelectedStudents(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{ mb: 2 }}
                      fullWidth
                      label="Students"
                      error={Boolean(errors.students)}
                      helperText={errors.students ? errors.students.message : null}
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
                      {option?.full_name}
                    </li>
                  )}
                  renderTags={(value) => (
                    <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                      {value?.map((option, index) => (
                        <CustomChip
                          key={option?._id}
                          label={option?.full_name}
                          onDelete={() => {
                            const updatedValue = [...value];
                            updatedValue?.splice(index, 1);
                            setValue('students', updatedValue);
                            setSelectedStudents(updatedValue);
                          }}
                          color="primary"
                          sx={{ m: 0.75 }}
                        />
                      ))}
                    </div>
                  )}
                  isOptionEqualToValue={(option, value) => option?._id === value?._id}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
           <Controller
             name="notification_type"
             control={control}
             render={({ field: { onChange, onBlur, value } }) => (
               <Autocomplete
                 multiple={false}
                 freeSolo // Allow custom input
                 disableCloseOnSelect={false}
                 id="select-multiple-chip"
                 options={["Notification", "Classes", "Alerts", "Reminders"]} // Add default options here
                 getOptionLabel={(option) => option}
                 value={value || ''} // Ensure the value is handled correctly
                 onChange={(event, newValue) => {
                   onChange(newValue);
                 }}
                 renderInput={(params) => (
                   <TextField
                     {...params}
                     sx={{ mb: 2 }}
                     fullWidth
                     label={"Notification type"}
                     error={Boolean(errors.notification_type)}
                     helperText={errors?.notification_type ? errors.notification_type.message : null}
                     InputProps={{
                       ...params.InputProps,
                       style: { overflowY: "hidden", overflowX: "auto", maxHeight: 55 }
                     }}
                   />
                 )}
                 renderOption={(props, option, { selected }) => (
                   <li {...props}>
                     <Checkbox
                       // icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                       // checkedIcon={<CheckBoxIcon fontSize="small" />}
                       style={{ marginRight: 8 }}
                       checked={selected}
                     />
                     {option}
                   </li>
                 )}
               />
             )}
           />
          </Grid>


          <Grid item xs={12} sm={12}>
            <Controller
              name="title"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  sx={{ mb: 2 }}
                  label="Title"
                  value={value}
                  onChange={onChange}
                  placeholder="New Course Announcement"
                  error={Boolean(errors.title)}
                  helperText={errors.title ? errors.title.message : null}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name="description"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  sx={{ mb: 2 }}
                  label="Body"
                  value={value}
                  onChange={onChange}
                  placeholder="We are excited to announce a new course, JS, starting on start_date. This course will cover brief_course_description. Enroll now to secure your spot and gain valuable insights into course_topic."
                  error={Boolean(errors.description)}
                  helperText={errors.description ? errors.description.message : null}
                  multiline
                  rows={4}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12} >
            <Controller 
             name='link'
             control={control}
             render={({field:{value,onChange}}) => (
              <TextField 
              fullWidth
              sx={{ mb: 2}}
              label="Link"
              value={value}
              onChange={onChange}
              error={Boolean(errors?.link)}
              helperText={errors?.link ? errors?.link.message : null}
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

NotificationAddDrawer.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  setStudentNotificationRefetch: PropTypes.any
};

export default NotificationAddDrawer;
