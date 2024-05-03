  import { yupResolver } from '@hookform/resolvers/yup';
  import { Button, TextField, Typography } from '@mui/material';
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
    category_name: yup
      .string()
      .min(3, (obj) => showErrors('category_name', obj.value.length, obj.min))
      .required()
  });

  const defaultValues = {
    description: '',
    category_name: ''
  };

  const FaqCategoriesEdit = (props) => {
    const { open, toggle, setRefetch } = props;
    console.log('StudyMaterialEdit - open:', props.open);
    console.log('StudyMaterialEdit - toggle:', props.toggle);

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
      console.log(inputData)
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
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 500 } } }}
      >
        <Header>
          <Typography variant="h5">Edit Faq Categories</Typography>
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
            <Controller
              name="category_name"
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
                  error={Boolean(errors.category_name)}
                  {...(errors.category_name && { helperText: errors.category_name.message })}
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

  FaqCategoriesEdit.propTypes = {
    open: PropTypes.any,
    toggle: PropTypes.any,
    setRefetch: PropTypes.any
  };

  export default FaqCategoriesEdit;
