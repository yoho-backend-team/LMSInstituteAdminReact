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
import CoursePdfInput from 'features/course-management/courses-page/course-add-page/components/CoursePdfInput';
import toast from 'react-hot-toast';
import { updateCourseNote } from '../services/noteServices';
import { PDFViewer } from 'react-view-pdf';


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
  pdf_file: yup.mixed().required('PDF file is required')
});

const defaultValues = {
  description: '',
  title: ''
};

const NotesEdit = (props) => {
  // ** Props
  const { open, toggle, notes } = props;
  console.log('NotesEdit - open:', props.open);
  console.log('NotesEdit - toggle:', props.toggle);
  // ** State
  const [notesPdf, setnotesPdf] = useState('');
  const savedPdfUrl = require('assets/pdf.pdf');

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  console.log('notes :', notes);

  useEffect(() => {
    if (notes) {
      setValue('title', notes?.title || '');
      setValue('description', notes?.description || '');
      setValue('pdf_file', notes?.notesPdf || '');
    }
  }, [notes, setValue]);

  const onSubmit = async (data) => {
    var bodyFormData = new FormData();
    bodyFormData.append('title', data.title);
    bodyFormData.append('description', data.description);
    bodyFormData.append('id',notes.id);
    bodyFormData.append('document', notesPdf);
    console.log(bodyFormData);

    const result = await updateCourseNote(bodyFormData);

    if (result.success) {
      toast.success(result.message);
    } else {
      let errorMessage = '';
      // Object.values(result.message).forEach((errors) => {
      //   errors.forEach((error) => {
      //     errorMessage += `${error}\n`; // Concatenate errors with newline
      //   });
      // });
      toast.error(errorMessage.trim());
      // toast.error(result.message);
    }
  };

  const handleClose = () => {
    setValue('contact', Number(''));
    toggle();
    reset();
  };
  const handleSetPdf = (data) => {
    setnotesPdf(data);
    setValue('pdf_file', data);
  };
  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { md:1100,xs: 300, sm: 500 } } }}
    >
      <Grid container spacing={1}>
        <Grid item md={6} sm={12} sx={{mt:5,pl:2,height:"100%"}}>
        <PDFViewer url={savedPdfUrl} />
        </Grid>
        <Grid item  md={6} sm={12}>
          <Header>
            <Typography variant="h5">Edit Study Material</Typography>
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
                <CoursePdfInput setCourseNotePdf={handleSetPdf} className={`form-control ${errors.pdf_file ? 'is-invalid' : ''}`} />
                {errors.pdf_file && <p style={{ color: 'red', margin: '5px 0 0', fontSize: '0.875rem' }}>{errors.pdf_file.message}</p>}
              </Grid>

              <Controller
                name="title"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    sx={{ mb: 4 }}
                    label="Title"
                    onChange={onChange}
                    placeholder="John Doe"
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message}
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    sx={{ mb: 4 }}
                    label="description"
                    onChange={onChange}
                    placeholder="Business Development Executive"
                    error={Boolean(errors.description)}
                    {...(errors.description && { helperText: errors.description.message })}
                  />
                )}
              />

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
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default NotesEdit;
