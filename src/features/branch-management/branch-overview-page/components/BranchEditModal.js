import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CardContent, TextField as CustomTextField, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import { updateBranch } from 'features/branch-management/services/branchServices';
import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
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
      .required('city is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'City should not contain special characters'),
    state: yup
      .string()
      .required('state is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'State should not contain special characters')
  });

  // React Hook Form initialization
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(branchSchema)
  });

  // Set form values when selectedBranch changes
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

  // Handle form submission
  const onSubmit = useCallback(
    async (data) => {
      const dummyData = {
        branch_identity: data.branchName,
        id: selectedBranch.id,
        contact_info:{
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pinCode,
        landmark: data.landmark,
        phone_no: data.phone,
        alternate_no: data.alternatePhone},
        uuid:selectedBranch.uuid
      };

      try {
        const result = await updateBranch(dummyData);

        if (result.success) {
          toast.success(result.message);
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

  // Close the modal
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
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800 } }}
      >
        <DialogTitle
          id="user-view-edit"
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(3)} !important`],
            pt: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(3)} !important`]
          }}
        >
          Edit Branch
        </DialogTitle>
        <DialogContent
          sx={{
            pt: (theme) => [`${theme.spacing(2)} !important`, `${theme.spacing(2)} !important`],
            pb: (theme) => `${theme.spacing(3)} !important`,
            px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(4)} !important`]
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <Grid container spacing={3}>
                {/* Form fields */}
                {/* Branch Name */}
                <Grid item xs={12} sm={12}>
                  <Controller
                    name="branchName"
                    control={control}
                    defaultValue={selectedBranch ? selectedBranch.branch_name : ''}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label="Branch Name"
                        placeholder="carterLeonard"
                        error={Boolean(errors.branchName)}
                        helperText={errors.branchName?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Phone No. */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        // type="tel"
                        type="number"
                        label="Phone No."
                        // placeholder="1234567890"
                        error={Boolean(errors.phone)}
                        helperText={errors.phone?.message}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">+91</InputAdornment>
                        }}
                      />
                    )}
                  />
                </Grid>
                {/* Alternate Phone No. */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="alternatePhone"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        // type="tel"
                        type="number"
                        label="Alternate Phone No."
                        // placeholder="1234567890"
                        error={Boolean(errors.alternatePhone)}
                        helperText={errors.alternatePhone?.message}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">+91</InputAdornment>
                        }}
                      />
                    )}
                  />
                </Grid>
                {/* Address */}
                <Grid item xs={12}>
                  <Controller
                    name="address"
                    control={control}
                    value={selectedBranch ? selectedBranch.address : ''}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        multiline
                        rows={3}
                        fullWidth
                        label="Address"
                        placeholder="1456, Liberty Street"
                        error={Boolean(errors.address)}
                        helperText={errors.address?.message}
                      />
                    )}
                  />
                </Grid>
                {/* PIN Code */}
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
                        placeholder="612503"
                        error={Boolean(errors.pinCode)}
                        helperText={errors.pinCode?.message}
                      />
                    )}
                  />
                </Grid>
                {/* Landmark */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="landmark"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label="Landmark"
                        placeholder="Nr. Wall Street"
                        error={Boolean(errors.landmark)}
                        helperText={errors.landmark?.message}
                      />
                    )}
                  />
                </Grid>
                {/* City */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label="City"
                        placeholder="Kumbakonam"
                        error={Boolean(errors.city)}
                        helperText={errors.city?.message}
                      />
                    )}
                  />
                </Grid>
                {/* State */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label="State"
                        placeholder="TamilNadu"
                        error={Boolean(errors.state)}
                        helperText={errors.state?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Submit and Cancel buttons */}
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button type="submit" variant="contained" sx={{ mr: 3 }}>
                    Update
                  </Button>
                  <Button variant="tonal" color="error" onClick={handleClose}>
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
  open: PropTypes.any,
  handleEditClose: PropTypes.any,
  selectedBranch: PropTypes.any,
  setSelectedBranch: PropTypes.any,
  setRefetchBranch: PropTypes.any
};

export default BranchEditModal;
