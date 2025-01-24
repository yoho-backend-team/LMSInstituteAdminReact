import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography, Box, Drawer, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { updateFaq } from '../services/faqServices';

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
  title: yup.string().min(3, 'Title must be at least 3 characters').required('Title is required'),
  description: yup.string().required('Description is required')
});

const defaultValues = {
  title: '',
  description: ''
};

const FaqEdit = ({ open, toggle, initialValues, setRefetch }) => {
  console.log('editing values', initialValues);
  const [isSuccessDialogOpen, setSuccessDialogOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initialValues || defaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  useEffect(() => {
    if (open && initialValues?.uuid) {
      reset(initialValues);
    }
  }, [open, reset, initialValues]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    const inputData = {
      title: data?.title,
      description: data?.description,
      uuid: initialValues?.uuid
    };
    console.log('input data', inputData);
    console.log('Initial values passed to form:', initialValues);
    console.log('Resetting form with values:', initialValues || defaultValues);
    console.log('Submitted data:', inputData);

    const result = await updateFaq(inputData);
    setSubmitting(false);

    if (result.success) {
      setSuccessDialogOpen(true);
      setRefetch((state) => !state);
      toggle();
      reset();
    } else {
      alert('Failed to edit FAQ. Please try again.');
    }
  };

  const handleClose = () => {
    toggle();
    reset();
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
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 500 } } }}
      >
        <Header>
          <Typography variant="h5">Edit FAQ</Typography>
          <IconButton size="small" onClick={handleClose} sx={{ color: 'text.primary' }}>
            <Icon icon="tabler:x" fontSize="1.125rem" />
          </IconButton>
        </Header>
        <Box sx={{ p: 6 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  placeholder="Enter FAQ Title"
                  fullWidth
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                  sx={{ mb: 4 }}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  placeholder="Enter FAQ Description"
                  fullWidth
                  multiline
                  rows={4}
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                  sx={{ mb: 4 }}
                />
              )}
            />
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ mr: 2 }}>
                {isSubmitting ? 'Submitting...' : 'Save Changes'}
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Drawer>

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onClose={closeSuccessDialog}>
        <DialogTitle>FAQ Edited</DialogTitle>
        <DialogContent>
          <Typography>The FAQ was successfully updated.</Typography>
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

FaqEdit.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  setRefetch: PropTypes.func.isRequired
};

export default FaqEdit;
