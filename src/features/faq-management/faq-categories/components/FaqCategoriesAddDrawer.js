import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Grid,
  TextField,
  Typography,
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
import { addFaqCategory } from '../services/faqCategoryServices';
import secureLocalStorage from 'react-secure-storage';
import toast from 'react-hot-toast';
import { getBranchObjectId, useBranchId, useInstitute } from 'utils/get-institute-details';

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
  name: yup.string().required('Category Name is required'),
  description: yup.string().required('Description is required')
});

const defaultValues = {
  name: '',
  description: ''
};

const FaqCategoriesAddDrawer = ({ open, toggle, setRefetch }) => {
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
    const institute = useInstitute().getDetails();
    const selectedBranchId = useBranchId();
    console.log('Selected Branch:', selectedBranchId);

    const cleanedBranchId = selectedBranchId ? selectedBranchId.replace(/^"|"$/g, '') : '';
  
    const faq_CategoryData = {
      category_name: data.name, 
      description: data.description,
      branchid: cleanedBranchId,
      institute_id: institute?._id
    };
  
    console.log("Sending Data:", faq_CategoryData);
  
    try {
      const result = await addFaqCategory(faq_CategoryData);
      setSubmitting(false);
      console.log('result:', result);
  
      if (result.status) {
        setSuccessDialogOpen(true);
        setRefetch((state) => !state);
        toggle();
        reset();
      } else {
        toast.error('Failed to add Faq_Category. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting Faq_Category:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
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
                Add FAQ Category
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
                    name="name"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        label="Category "
                        placeholder="Enter Category Name"
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
                        placeholder="Enter Description"
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.description)}
                        helperText={errors.description?.message}
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
        <DialogTitle>Category Added</DialogTitle>
        <DialogContent>
          <Typography>The FAQ category was successfully added.</Typography>
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

FaqCategoriesAddDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  setRefetch: PropTypes.func.isRequired
};

export default FaqCategoriesAddDrawer;