// ** React Imports
import { useEffect } from 'react';
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
import { updateStudentCertificate } from '../services/studentCertificateServices';

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
  name: yup
    .string()
    .min(3, (obj) => showErrors('Title', obj.value.length, obj.min))
    .required()
});

const defaultValues = {
  description: '',
  name: ''
};

const StudentCertificateEdit = (props) => {
  // ** Props
  const { open, toggle } = props;
  console.log('StudentCertificateEdit - open:', props.open);
  console.log('StudentCertificateEdit - toggle:', props.toggle);
  // ** State

  const {
    reset,
    control,
    setValue,
    // setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: props.initialValues || defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  console.log(defaultValues);

  useEffect(() => {
    if (open) {
      reset(props.initialValues || defaultValues);
    }
  }, [open, reset, props.initialValues]);

  const onSubmit = async (data) => {
    var bodyFormData = new FormData();
    bodyFormData.append('name', data.name);
    bodyFormData.append('description', data.description);
    bodyFormData.append('id', props.initialValues.id);
    console.log(bodyFormData);

    const result = await updateStudentCertificate(bodyFormData);

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
            <CoursePdfInput />
          </Grid>

          <Controller
            name="name"
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
                error={Boolean(errors.name)}
                {...(errors.name && { helperText: errors.name.message })}
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
    </Drawer>
  );
};

export default StudentCertificateEdit;
