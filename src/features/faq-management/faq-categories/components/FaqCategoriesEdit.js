import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { updateFaqCategory } from '../services/faqCategoryServices';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  transition: 'background-color 0.3s, color 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.contrastText
  }
}));

const FormContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

const schema = yup.object().shape({
  description: yup.string().required(),
  category_name: yup
    .string()
    .min(3, (obj) => `Category Name must be at least ${obj.min} characters`)
    .required('Category Name is required')
});

const defaultValues = {
  description: '',
  category_name: ''
};

const FaqCategoriesEdit = (props) => {
  const { open, toggle, setRefetch } = props;

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: props.initialValues || defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (open) {
      reset(props.initialValues || defaultValues);
    }
  }, [open, reset, props.initialValues]);

  const onSubmit = async (data) => {
    const inputData = {
      category_name: data.category_name,
      description: data.description,
      uuid: String(props.initialValues.uuid)
    };

    try {
      const result = await updateFaqCategory(inputData);

      if (result.success) {
        toast.success(result.message);
        toggle();
        setRefetch((state) => !state);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error in onSubmit:', error);
      toast.error('Failed to update FaqCategory');
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
      sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 500 } } }}
    >
      <Box sx={{ p: 2, mt: 2, m: 3 }}>
        <Box
          sx={{
            boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)',
            background: 'rgb(232, 232, 238)',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            borderBottom: 'none'
          }}
        >
          <Header>
            <Typography variant="h5" fontWeight="bold">
              Edit FAQ Category
            </Typography>
            <CloseButton size="small" onClick={handleClose}>
              <Icon icon="tabler:x" fontSize="1.125rem" />
            </CloseButton>
          </Header>
        </Box>
        <FormContainer
          sx={{
            borderTopLeftRadius: '0',
            borderTopRightRadius: '0',
            boxShadow: '0 .505rem .875rem 0 rgba(38,43,67,.16)'
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controller
                  name="category_name"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      value={value}
                      label="Title"
                      placeholder="Enter Category Title"
                      onChange={onChange}
                      error={Boolean(errors.category_name)}
                      helperText={errors.category_name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      value={value}
                      label="Description"
                      placeholder="Enter Description"
                      onChange={onChange}
                      error={Boolean(errors.description)}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit" variant="contained" sx={{ mr: 2 }}>
                Submit
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </form>
        </FormContainer>
      </Box>
    </Drawer>
  );
};

FaqCategoriesEdit.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  setRefetch: PropTypes.any
};

export default FaqCategoriesEdit;
