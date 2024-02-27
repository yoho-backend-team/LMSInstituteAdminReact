// ** React Imports
import { useEffect, useState } from 'react';
// ** MUI Imports
import { Button, Grid, Typography } from '@mui/material';
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
import Icon from 'components/icon';
import toast from 'react-hot-toast';
import { addCourseStudyMaterial } from '../services/studyMaterialServices';
import CoursePdfInput from '../../components/PdfInput';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import { getAllActiveCourses } from 'features/course-management/courses-page/services/courseServices';



const StudyMaterialAddDrawer = (props) => {
  // ** Props
  const { open, toggle, branches } = props;

  // ** State
  const [studymaterialPdf, setstudymaterialPdf] = useState('');
  const [activeCourse, setActiveCourse] = useState([]);


  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  console.log(selectedBranchId);

  useEffect(() => {
    getActiveCoursesByBranch(selectedBranchId);
  }, [selectedBranchId]);


  const getActiveCoursesByBranch = async (selectedBranchId) => {
    const result = await getAllActiveCourses(selectedBranchId);

    console.log("active courses : ", result.data);
    setActiveCourse(result.data.data);
  };

  const showErrors = (field, valueLen, min) => {
    if (valueLen === 0) {
      return `${field} field is required`;
    } else if (valueLen > 0 && valueLen < min) {
      return `${field} must be at least ${min} characters`;
    } else {
      return '';
    }
  };

  const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(6),
    justifyContent: 'space-between'
  }));

  const schema = yup.object().shape({
    description: yup.string().required(),
    title: yup
      .string()
      .min(3, (obj) => showErrors('Title', obj.value.length, obj.min))
      .required(),
    branch: yup.string().required(),
    course: yup.string().required(),
  });

  const defaultValues = {
    description: '',
    title: '',
    branch: selectedBranchId,
    course: ''
  };

  // ** Hooks
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

  console.log(studymaterialPdf);

  const onSubmit = async (data) => {
    var bodyFormData = new FormData();
    bodyFormData.append('branch_id', data.branch);
    bodyFormData.append('course_id', data.course);
    bodyFormData.append('title', data.title);
    bodyFormData.append('description', data.description);
    bodyFormData.append('document', studymaterialPdf);
    console.log(bodyFormData);

    const result = await addCourseStudyMaterial(bodyFormData);

    if (result.success) {
      toast.success(result.message);
      reset();
      toggle();
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

  const handleSetPdf = (data) => {
    setstudymaterialPdf(data);
  };

  const handleClose = () => {
    setValue('contact', Number(''));
    toggle();
    reset();
  };

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 500 } } }}
    >
      <Header>
        <Typography variant="h5">Add Study Material</Typography>
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
          <Grid item xs={12} sm={12} sx={{ mb: 4 }}>
            <CoursePdfInput setCourseNotePdf={handleSetPdf} />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name="branch"
              control={control}
              rules={{ required: true }}
              render={({ field: { value } }) => (
                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  value={value}
                  select
                  label="Branch"
                  id="custom-select"
                  onChange={(e) => {
                    setValue('branch', e.target.value);
                    getActiveCoursesByBranch(e.target.value);
                  }}
                  error={Boolean(errors.branch)}
                  {...(errors.branch && { helperText: errors.branch.message })}>
                  {branches?.map((item, index) => (
                    <MenuItem key={index} value={item.branch_id}>{item.branch_name}</MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Controller
              name="course"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  value={value}
                  select
                  label="Select Course"
                  id="custom-select"
                  onChange={onChange}
                  error={Boolean(errors.course)}
                  {...(errors.course && { helperText: errors.course.message })}>
                  {activeCourse?.map((item, index) => (
                    <MenuItem key={index} value={item.course_id}>{item.course_name}</MenuItem>
                  ))}
                </TextField>
              )}
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
                  value={value}
                  sx={{ mb: 2 }}
                  label="Title"
                  onChange={onChange}
                  placeholder="John Doe"
                  error={Boolean(errors.title)}
                  {...(errors.title && { helperText: errors.title.message })}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  sx={{ mb: 2 }}
                  label="description"
                  onChange={onChange}
                  placeholder="Business Development Executive"
                  error={Boolean(errors.description)}
                  {...(errors.description && { helperText: errors.description.message })}
                />
              )}
            />
          </Grid>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type="submit" variant="contained" sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant="tonal" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer >
  );
};

export default StudyMaterialAddDrawer;
