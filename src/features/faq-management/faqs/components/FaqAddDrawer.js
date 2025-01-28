import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Grid,
  TextField,
  Typography,
  Autocomplete,
  Box,
  Drawer,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import * as yup from 'yup';
import { addFaq } from '../services/faqServices';

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
  name: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  category: yup.object().required('Category is required')
});

const defaultValues = {
  name: '',
  description: '',
  category: ''
};

const FaqAddDrawer = ({ open, toggle, faqCategories, setRefetch }) => {
  const [isSuccessDialogOpen, setSuccessDialogOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const handleClose = () => {
    reset();
    toggle();
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    const inputData = {
      title: data.name,
      description: data.description,
      category_id: data.category._id
    };
    const result = await addFaq(inputData);
    setSubmitting(false);

    if (result.success) {
      setSuccessDialogOpen(true);
      setRefetch((state) => !state);
      toggle();
      reset();
    } else {
      alert('Failed to add FAQ. Please try again.'); 
    }
  };

  const closeSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };

  return (
    <>
      <Drawer
        open={open}
        anchor="right"
        variant="temporary"
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 500 } } }}
      >
        <Box sx={{ p: 2 ,mt: 2, m:3}}>
          <Box  sx={{
            boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)',
            background: 'rgb(232, 232, 238)',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            borderBottom:"none"
          }}>
          <Header>
            <Typography variant="h5" fontWeight="bold">Add FAQ</Typography>
            <CloseButton size="small" onClick={handleClose}>
              <Icon icon="tabler:x" fontSize="1.125rem" />
            </CloseButton>
          </Header>
          </Box>
            <FormContainer sx={{
              borderTopLeftRadius: '0',
              borderTopRightRadius: '0',
              boxShadow:'0 .505rem .875rem 0 rgba(38,43,67,.16)',
              }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        label="Title"
                        placeholder="Enter FAQ Title"
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
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
                        label="Description"
                        placeholder="Enter FAQ Description"
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.description)}
                        helperText={errors.description?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Autocomplete
                        fullWidth
                        options={faqCategories}
                        getOptionLabel={(option) => option.category_name}
                        onChange={(e, newValue) => onChange(newValue)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Category"
                            placeholder="Choose a Category"
                            error={Boolean(errors.category)}
                            helperText={errors.category?.message}
                          />
                        )}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ mr: 2 }}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </Box>
            </form>
          </FormContainer>
        </Box>
      </Drawer>

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onClose={closeSuccessDialog}>
        <DialogTitle>FAQ Added</DialogTitle>
        <DialogContent>
          <Typography>The FAQ was successfully added.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSuccessDialog} variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

FaqAddDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  faqCategories: PropTypes.array.isRequired,
  setRefetch: PropTypes.func.isRequired
};

export default FaqAddDrawer;
