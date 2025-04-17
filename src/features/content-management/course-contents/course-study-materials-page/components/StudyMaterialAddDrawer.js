import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Chip, Grid, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import { getAllCourses } from 'features/course-management/courses-page/services/courseServices';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import CoursePdfInput from '../../components/PdfInput';
import { addCourseStudyMaterial } from '../services/studyMaterialServices';
import { useInstitute } from 'utils/get-institute-details';
import { useSpinner } from 'context/spinnerContext';
import { white } from 'precise-ui/dist/es6/colors';

const StudyMaterialAddDrawer = (props) => {
  const { open, toggle, branches, setRefetch } = props;
  // ** State
  const [studymaterialPdf, setstudymaterialPdf] = useState('');

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [files, setFiles] = useState([]);
  const { show, hide } = useSpinner();

  const [activeCourse, setActiveCourse] = useState([]);
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

  const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(6),
    justifyContent: 'space-between'
  }));

  const schema = yup.object().shape({
    description: yup
      .string()
      .required('Description is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Description should not contain special characters'),
    title: yup
      .string()
      .required('Title is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Title should not contain special characters'),
    branch: yup.object().required(),
    course: yup.object().required(),
    pdf_file: yup.mixed().required('PDF file is required')
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

  const onSubmit = async (data) => {
    try {
      show();
      console.log(data, 'data');
      const Study_data = {
        title: data.title,
        description: data.description,
        branch: data.branch.uuid,
        course: data.course._id,
        institute: useInstitute().getInstituteId(),
        file: data.pdf_file
      };

      const result = await addCourseStudyMaterial(Study_data);
      setRefetch((state) => !state);
      toast.success(result.message);
      setstudymaterialPdf('');
      reset();
      toggle();
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hide();
    }
  };

  const handleSetPdf = async (data) => {
    setstudymaterialPdf(data);
    if (data.size > 1048576) {
     return toast.success("pdf upload lesser than 1mb")
    }else{
     const fileData = new FormData();
     fileData.append('file', fileData);
     setValue('pdf_file', data);
     const file = await client.file.upload(data)
     setValue("file",file.data.file)
     toast.success("pdf uploaded")
    }
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
      <Header sx={{ paddingBottom: 0 }}>
        {/* <Chip color='success'  label="Add Study Material " sx={{fontSize:'16px', pb:0,mb:0}}/> */}
        <Typography variant="h2 " sx={{border:2,borderColor:"#0cce7b", fontSize: '1.4rem',fontWeight:"bold", borderRadius: 50, px: 2, py: 1 }}>
          Add Study Material
        </Typography>
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
      <Box sx={{ p: (theme) => theme.spacing(0, 6, 6), pt: 0, mt: 0 }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            borderRadius: '8px', // Optional: Rounded corners
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow effect
            padding: '16px', // Add spacing inside the form
            margin: '16px auto', // Center the form and add spacing outside
            maxWidth: '600px', // Optional: Limit the form's width
            backgroundColor: '#fff' // Optional: Background color
          }}
        >
          <Grid item xs={12} sm={12}>
            <CoursePdfInput
              setCourseNotePdf={handleSetPdf}
              setValue={setValue}
              files={files}
              setFiles={setFiles}
              className={`form-control ${errors.pdf_file ? 'is-invalid' : ''}`}
            />
            {errors.pdf_file && <p style={{ color: 'red', margin: '5px 0 0', fontSize: '0.875rem' }}>{errors.pdf_file.message}</p>}
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name="branch"
              control={control}
              render={() => (
                <Autocomplete
                  // fullWidth
                  // value={value}
                  onChange={(event, newValue) => {
                    setValue('branch', newValue);
                    getActiveCoursesByBranch(newValue);
                  }}
                  options={branches ?? []}
                  getOptionLabel={(option) => option.branch_identity}
                  renderInput={(params) => (
                    <TextField
                      sx={{ mb: 2 }}
                      {...params}
                      label="Branch"
                      error={Boolean(errors.branch)}
                      {...(errors.branch && { helperText: errors.branch.message })}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name="course"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue);
                  }}
                  options={activeCourse || []}
                  getOptionLabel={(option) => option.course_name || ''}
                  // fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Course"
                      sx={{ mb: 2 }}
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
              name="title"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  sx={{ mb: 2 }}
                  label="Title"
                  onChange={onChange}
                  placeholder="Testing , developing ,etc"
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
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
                  value={value}
                  sx={{ mb: 2 }}
                  label="Description"
                  onChange={onChange}
                  placeholder="Description about the Study Material"
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
    </Drawer>
  );
};

StudyMaterialAddDrawer.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  branches: PropTypes.any,
  setRefetch: PropTypes.any
};

export default StudyMaterialAddDrawer;
