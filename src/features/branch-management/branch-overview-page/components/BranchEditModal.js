import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CardContent, TextField as CustomTextField, Grid, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import { updateBranch } from 'features/branch-management/services/branchServices';
import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { getChangedFields } from 'utils/getChanges';
import * as yup from 'yup';

const BranchEditModal = ({ open, handleEditClose, selectedBranch, setSelectedBranch, setRefetchBranch }) => {
  const branchSchema = yup.object().shape({
    branchName: yup
      .string()
      .required('Branch Name is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Branch Name should not contain special characters'),
    phone: yup
      .string()
      .required('Phone No. is required')
      .matches(/^[0-9]{10}$/, 'Phone No. should be exactly 10 digits'),
    alternatePhone: yup
      .string()
      .required('Alternate Phone No. is required')
      .matches(/^[0-9]{10}$/, 'Alternate Phone No. should be exactly 10 digits'),
    address: yup.string().required('Address is required'),
    pinCode: yup
      .string()
      .required('PIN Code is required')
      .matches(/^[0-9]{6}$/, 'PIN Code should be exactly 6 digits'),
    landmark: yup
      .string()
      .required('Landmark is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Landmark should not contain special characters'),
    city: yup
      .string()
      .required('City is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'City should not contain special characters'),
    state: yup
      .string()
      .required('State is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'State should not contain special characters')
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(branchSchema)
  });

  useEffect(() => {
    if (selectedBranch) {
      setValue('branchName', selectedBranch?.branch_identity || '');
      setValue('phone', selectedBranch?.contact_info?.phone_no || '');
      setValue('alternatePhone', selectedBranch?.contact_info?.alternate_no || '');
      setValue('address', selectedBranch?.contact_info?.address || '');
      setValue('pinCode', selectedBranch?.contact_info?.pincode || '');
      setValue('landmark', selectedBranch?.contact_info?.landmark || '');
      setValue('city', selectedBranch?.contact_info?.city || '');
      setValue('state', selectedBranch?.contact_info?.state || '');
    }
  }, [selectedBranch, setValue]);

  const onSubmit = useCallback(
    async (data) => {
      const dummyData = {
        branch_identity: data.branchName,
        id: selectedBranch.id,
        contact_info: {
          address: data.address,
          city: data.city,
          state: data.state,
          pincode: data.pinCode,
          landmark: data.landmark,
          phone_no: data.phone,
          alternate_no: data.alternatePhone
        },
        uuid: selectedBranch.uuid
      };
      const changeFields = getChangedFields(selectedBranch, dummyData);

      if (!changeFields.is_changed) {
        toast.error("No changes detected. Please make some changes before updating.");
        return;
      }
      Object.assign(changeFields, { uuid: selectedBranch?.uuid });
      try {
        const result = await updateBranch(changeFields);

        if (result.success) {
          toast.success (result.message);
          setRefetchBranch((state) => !state);
          handleClose();
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [selectedBranch, setRefetchBranch]
  );

  const handleClose = useCallback(() => {
    handleEditClose();
    setSelectedBranch(null);
  }, [handleEditClose, setSelectedBranch]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="user-view-edit"
        aria-describedby="user-view-edit-description"
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800, borderRadius: '8px' } }}
      >
        <DialogTitle
          id="user-view-edit"
          sx={{
            textAlign: 'center',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            bgcolor: 'primary.main',
            color: 'white',
            py: 2
          }}
        >
          Edit Branch
        </DialogTitle>
        <DialogContent
          sx={{
            pt: 2,
            pb: 3,
            px: 3,
            bgcolor: 'background.default'
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent sx={{p:0}}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{  pt:0 ,mb: 2 }}>
                    Branch Information
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="branchName"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label="Branch Name"
                        placeholder="Enter Branch Name"
                        error={Boolean(errors.branchName)}
                        helperText={errors.branchName?.message}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">🏢</InputAdornment>
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        type="tel"
                        label="Phone No."
                        error={Boolean(errors.phone)}
                        helperText={errors.phone?.message}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">📞</InputAdornment>
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="alternatePhone"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        type="tel"
                        label="Alternate Phone No."
                        error={Boolean(errors.alternatePhone)}
                        helperText={errors.alternatePhone?.message}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">📞</InputAdornment>
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        multiline
                        rows={1}
                        fullWidth
                        label="Address"
                        placeholder="Enter Address"
                        error={Boolean(errors.address)}
                        helperText={errors.address?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="pinCode"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        type="number"
                        label="PIN Code"
                        error={Boolean(errors.pinCode)}
                        helperText={errors.pinCode?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="landmark"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label="Landmark"
                        error={Boolean(errors.landmark)}
                        helperText={errors.landmark?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label="City"
                        error={Boolean(errors.city)}
                        helperText={errors.city?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12 } sm={6}>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label="State"
                        error={Boolean(errors.state)}
                        helperText={errors.state?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                    Update
                  </Button>
                  <Button variant="outlined" color="error" onClick={handleClose}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

BranchEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleEditClose: PropTypes.func.isRequired,
  selectedBranch: PropTypes.object,
  setSelectedBranch: PropTypes.func.isRequired,
  setRefetchBranch: PropTypes.func.isRequired
};

export default BranchEditModal;