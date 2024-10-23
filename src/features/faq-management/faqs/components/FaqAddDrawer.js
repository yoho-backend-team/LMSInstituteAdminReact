import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import * as yup from 'yup';
import { addFaq } from '../services/faqServices';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  name: yup.string().required('Category Name is required'),
  description: yup.string().required('Description is required'),
  category: yup.object().required('Category is required')
});

const defaultValues = {
  name: '',
  description: '',
  category: ''
};

const FaqAddDrawer = (props) => {
  const { open, toggle, faqCategories, setRefetch } = props;

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
    setValue('contact', Number(''));
    setValue('category', '');
    reset();
    toggle();
  };

  const onSubmit = async (data) => {

    const inputData = {
      title: data.name,
      description: data.description,
      category_id: data.category._id
    };
    const result = await addFaq(inputData);
    if (result.success) {
      toast.success(result.message);
      setRefetch((state) => !state);
      toggle();
      reset();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <DatePickerWrapper>
      <Drawer
        open={open}
        anchor="right"
        variant="temporary"
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 500 } } }}
      >
        <Header>
          <Typography variant="h5">Add Faq</Typography>
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
            <Grid item xs={12} sm={12}>
              <Controller
                name="name"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    sx={{ mb: 2 }}
                    label="Title"
                    onChange={onChange}
                    error={Boolean(errors.name)}
                    {...(errors.name && { helperText: errors.name.message })}
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
                    label="description"
                    onChange={onChange}
                    error={Boolean(errors.description)}
                    {...(errors.description && { helperText: errors.description.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name="category"
                control={control}
                render={({ field: { onChange } }) => (
                  <Autocomplete
                    fullWidth
                    sx={{ mb: 2 }}
                    getOptionLabel={(option) => option.category_name}
                    onChange={(e, newValue) => {
                      onChange(newValue);
                    }}
                    options={faqCategories}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Category"
                        error={Boolean(errors.category)}
                        helperText={errors.category?.message}
                      />
                    )}
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
    </DatePickerWrapper>
  );
};

FaqAddDrawer.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  faqCategories: PropTypes.any,
  setRefetch: PropTypes.any
};

export default FaqAddDrawer;
