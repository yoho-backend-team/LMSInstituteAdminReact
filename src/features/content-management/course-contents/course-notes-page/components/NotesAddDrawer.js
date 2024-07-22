import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, TextField, Typography } from '@mui/material';
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
import { addCourseNote } from '../services/noteServices';
import { useInstitute } from 'utils/get-institute-details';

const CourseNotesAddDrawer = (props) => {
  const { open, toggle, branches, setRefetch } = props;
  
  // ** State
  const [notesPdf, setnotesPdf] = useState('');

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [files, setFiles] = useState([]);
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
    branch: '',
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
    const note_data = {
      branch : data.branch.uuid,
      course : data.course._id,
      institute : useInstitute().getInstituteId(),
      title  : data.title,
      description : data.description,
      file : data.pdf_file
    }
    

    const result = await addCourseNote(note_data);

    if (result.success) {
      setRefetch((state) => !state);
      toast.success(result.message);
      setValue("")
      setFiles([])
      reset();
      toggle();
    } else {
      
      toast.error(result?.message);
    }
  };

  const handleSetPdf = (data) => {
    setnotesPdf(data);
    // setValue('pdf_file', data);
  };

  const handleClose = () => {
    setnotesPdf("")
    setValue("")
    setValue("branch","")
    setFiles([])
    setValue('contact', Number(''));
    toggle();
    reset({
      ...defaultValues,
      branch: null,
      course: '',
    });
  };

  useEffect(() => {
    if (open) {
      reset({
        ...defaultValues,
        branch: null,
      });
    }
  }, [open, reset, selectedBranchId]);
  

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
        <Typography variant="h5">Add Notes</Typography>
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
            <CoursePdfInput setCourseNotePdf={handleSetPdf} files={files} setFiles={setFiles} setValue={setValue} className={`form-control ${errors.pdf_file ? 'is-invalid' : ''}`} />
            {errors.pdf_file && <p style={{ color: 'red', margin: '5px 0 0', fontSize: '0.875rem' }}>{errors.pdf_file.message}</p>}
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name="branch"
              control={control}
              rules={{ required: true }}
              render={() => (
                <Autocomplete
                  fullWidth
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
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue);
                  }}
                  options={activeCourse || []}
                  getOptionLabel={(option) => option.course_name || ''}
                  fullWidth
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
                  helperText={errors.title?.message}
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
    </Drawer>
  );
};

CourseNotesAddDrawer.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  branches: PropTypes.any,
  setRefetch: PropTypes.any
};

export default CourseNotesAddDrawer;
