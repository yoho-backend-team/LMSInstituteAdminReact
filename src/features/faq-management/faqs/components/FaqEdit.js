import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { updateFaq } from '../services/faqServices';
import toast from 'react-hot-toast';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  transition: 'background-color 0.3s, color 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.contrastText,
  },
}));

const FormContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const schema = yup.object().shape({
  title: yup.string().min(3, 'Title must be at least 3 characters').required('Title is required'),
  description: yup.string().required('Description is required'),
});

const defaultValues = {
  title: '',
  description: '',
};

const FaqEdit = ({ open, toggle, initialValues, setRefetch }) => {
  const [isSuccessDialogOpen, setSuccessDialogOpen] = useState(false);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues || defaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (open && initialValues?.uuid) {
      reset(initialValues);
    }
  }, [open, reset, initialValues]);

  const onSubmit = async (data) => {
    console.log("Initial Values UUID:", initialValues?.uuid);
    
    if (!initialValues?.uuid) {
      toast.error("UUID is missing! Cannot update FAQ.");
      return;
    }
  
    const inputData = {
      title: data?.title,
      description: data?.description,
      uuid: initialValues?.uuid,
    };
  
    try {
      const result = await updateFaq(inputData);

      // console.log("after api uuid :",result.updatedFaq?.uuid);
  
      if (result.success) {
        setSuccessDialogOpen(true);
        setRefetch((state) => !state);
        toggle();
        reset();
        // toast.success(result.message);
      } else {
        toast.error("Failed to edit FAQ. Please try again.");
      }
    } catch (error) {
      console.error("Error updating FAQ:", error);
      toast.error("An error occurred while updating the FAQ.");
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
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 500 } } }}
      >
        <Box sx={{ p: 2, mt: 2, m: 3 }}>
          <Box
            sx={{
              boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)',
              background: 'rgb(232, 232, 238)',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              borderBottom: 'none',
            }}
          >
            <Header>
              <Typography variant="h5" fontWeight="bold">
                Edit FAQ
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
              boxShadow: '0 .505rem .875rem 0 rgba(38,43,67,.16)',
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
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
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
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
  setRefetch: PropTypes.func.isRequired,
};

export default FaqEdit;
