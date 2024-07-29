import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField as CustomTextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import { addBranch } from 'features/branch-management/services/branchServices';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useSpinner } from 'context/spinnerContext';
import { useEffect } from 'react';

const AddBranchForms = () => {
  const navigate = useNavigate();
  const initialValues = {
    branch_identity: '',
    phone: Number(''),
    alternatePhone: Number(''),
    address: '',
    pinCode: Number(''),
    landmark: '',
    city: '',
    state: ''
  };

  const branchSchema = yup.object().shape({
    branch_identity: yup
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

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    initialState: initialValues,
    resolver: yupResolver(branchSchema)
  });
  const {show,hide} = useSpinner()

  const onSubmit = async (data) => {
    const inputData = {
      branch_identity: data.branch_identity,
      contact_info:{ 
        address: data.address,
      city: data.city,
      state: data.state,
      pincode: data.pinCode,
      landmark: data.landmark,
      phone_no: data.phone,
      alternate_no: data.alternatePhone
      }
    };

    try {
      show()
      const result = await addBranch(inputData);

      if (result.success) {
        hide()
        toast.success(result.message);
        navigate(-1);
      } else {
        hide()
        toast.error(result.message);
      }
    } catch (error) {
      hide()
    }
  };

  useEffect(()=>{
  const lister =(event) => {
   if(event.code === "Enter"){
    handleSubmit(onSubmit)()
   }
  }
  document.addEventListener("keydown",lister)
  return () => {
    document.removeEventListener("keydown",lister)
  }
  },[])

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <Controller
                name="branch_identity"
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label="Branch Name"
                    placeholder="carterLeonard"
                    error={Boolean(errors.branch_identity)}
                    helperText={errors.branch_identity?.message}
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
                    slot='false'
                    onKeyDown={(e)=>e.key==="e"&&e.preventDefault()}
                    type="number"
                    label="Phone No."
                    error={Boolean(errors.phone)}
                    helperText={errors.phone?.message}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">+91</InputAdornment>
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
                    onKeyDown={(e)=>e.key==="e"&&e.preventDefault()}
                    type="number"
                    label="Alternate Phone No."
                    error={Boolean(errors.alternatePhone)}
                    helperText={errors.alternatePhone?.message}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">+91</InputAdornment>
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

            <Grid item xs={12} sm={12}>
              <Button onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="submit" variant="contained">
                Create Branch
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
};

export default AddBranchForms;
