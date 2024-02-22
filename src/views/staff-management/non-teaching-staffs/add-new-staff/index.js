import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardHeader, Grid, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { addNonTeachingStaff } from 'features/staff-management/non-teaching-staffs/services/nonTeachingStaffServices';
import toast from 'react-hot-toast';
import DatePickerWrapper from 'styles/libs/react-datepicker';

const schema = yup.object().shape({
  // Add validation schemas for the new fields here
  gender: yup.string().required('Gender is required'),
  joining_date: yup.date().required('Joining Date is required'),
  specialization: yup.string().required('Specialization is required'),
  position: yup.string().required('Position is required'),
  Qualification: yup.string().required('Qualification is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  pin_code: yup.number().required('Pin Code is required'),
  address_line_one: yup.string().required('Address Line One is required'),
  address_line_two: yup.string().required('Address Line Two is required'),
  phone: yup.number().required('Phone Number is required'),
  alt_phone: yup.number().required('Alt Phone Number is required'),
  official_email: yup.string().email('Invalid email').required('Official Email is required'),
  description: yup.string().required('Description is required'),
  First_name: yup.string().required('First Name is required'),
  Last_name: yup.string().required('Last Name is required'),
  branch: yup.string().required('Branch is required')
});

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <TextField fullWidth inputRef={ref} {...props} />;
});

const StepperLinearWithValidation = () => {
  const {
    control: personalControl,
    formState: { errors: personalErrors },
    handleSubmit
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    console.log(data);
    const dummyData = {
      gender: data.gender,
      joining_date: data.joining_date,
      specialization: data.specialization,
      position: data.position,
      Qualification: data.qualification,
      state: data.state,
      city: data.city,
      pin_code: data.pinCode || 0,
      address_line_one: data.addressLineOne,
      address_line_two: data.addressLineTwo,
      phone: data.phoneNumber || 0,
      alt_phone: data.alternateNumber || 0,
      official_email: data.officialEmail,
      description: data.description,
      First_name: data.firstName,
      Last_name: data.lastName,
      branch: data.branchName
    };

    try {
      const result = await addNonTeachingStaff(dummyData);

      if (result.success) {
        toast.success(result.message);
        navigate(-1);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DatePickerWrapper>
    <Card sx={{ p: 3 }}>
      <CardHeader title="Add New Staff" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="First_name"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label="First Name"
                  placeholder="Enter your first name"
                  error={Boolean(personalErrors['First_name'])}
                  aria-describedby="stepper-linear-personal-first-name"
                  {...(personalErrors['First_name'] && { helperText: personalErrors['First_name'].message })}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="Last_name"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label="Last Name"
                  placeholder="Enter your last name"
                  error={Boolean(personalErrors['Last_name'])}
                  aria-describedby="stepper-linear-personal-last-name"
                  {...(personalErrors['Last_name'] && { helperText: personalErrors['Last_name'].message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="gender"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  select
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label="Gender"
                  placeholder="Select Gender"
                  error={Boolean(personalErrors['gender'])}
                  aria-describedby="stepper-linear-personal-gender"
                  {...(personalErrors['gender'] && { helperText: personalErrors['gender'].message })}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="joining_date"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  id="joining_date"
                  dateFormat={'dd/MM/yyyy'}
                  value={value}
                  selected={value}
                  customInput={
                    <CustomInput
                      label="Joining Date"
                      error={Boolean(personalErrors['joining_date'])}
                      aria-describedby="stepper-linear-personal-joining-date"
                      {...(personalErrors['joining_date'] && { helperText: 'This field is required' })}
                    />
                  }
                  onChange={onChange}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="specialization"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label="Specialization"
                  placeholder="eg: Code Customization"
                  error={Boolean(personalErrors['specialization'])}
                  aria-describedby="stepper-linear-personal-specialization"
                  {...(personalErrors['specialization'] && { helperText: personalErrors['specialization'].message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="position"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label="Position"
                  error={Boolean(personalErrors['position'])}
                  aria-describedby="stepper-linear-personal-position"
                  {...(personalErrors['position'] && { helperText: personalErrors['position'].message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="Qualification"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label="Qualification"
                  error={Boolean(personalErrors['Qualification'])}
                  aria-describedby="stepper-linear-personal-Qualification"
                  {...(personalErrors['Qualification'] && { helperText: personalErrors['Qualification'].message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="state"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label="State"
                  error={Boolean(personalErrors['state'])}
                  aria-describedby="stepper-linear-personal-state"
                  {...(personalErrors['state'] && { helperText: personalErrors['state'].message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="city"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label="City"
                  error={Boolean(personalErrors['city'])}
                  aria-describedby="stepper-linear-personal-city"
                  {...(personalErrors['city'] && { helperText: personalErrors['city'].message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="pin_code"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  type="number"
                  value={value}
                  onChange={onChange}
                  label="Pin Code"
                  error={Boolean(personalErrors['pin_code'])}
                  aria-describedby="stepper-linear-personal-pin_code"
                  {...(personalErrors['pin_code'] && { helperText: personalErrors['pin_code'].message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="address_line_one"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label="Address Line One"
                  error={Boolean(personalErrors['address_line_one'])}
                  aria-describedby="stepper-linear-personal-address_line_one"
                  {...(personalErrors['address_line_one'] && { helperText: personalErrors['address_line_one'].message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="address_line_two"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label="Address Line Two"
                  error={Boolean(personalErrors['address_line_two'])}
                  aria-describedby="stepper-linear-personal-address_line_two"
                  {...(personalErrors['address_line_two'] && { helperText: personalErrors['address_line_two'].message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="phone"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  type="number"
                  value={value}
                  onChange={onChange}
                  label="Phone Number"
                  error={Boolean(personalErrors['phone'])}
                  aria-describedby="stepper-linear-personal-phone"
                  {...(personalErrors['phone'] && { helperText: personalErrors['phone'].message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="alt_phone"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  type="number"
                  onChange={onChange}
                  label="Alt Phone Number"
                  error={Boolean(personalErrors['alt_phone'])}
                  aria-describedby="stepper-linear-personal-alt_phone"
                  {...(personalErrors['alt_phone'] && { helperText: personalErrors['alt_phone'].message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="official_email"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label="Official Email"
                  error={Boolean(personalErrors['official_email'])}
                  aria-describedby="stepper-linear-personal-official_email"
                  {...(personalErrors['official_email'] && { helperText: personalErrors['official_email'].message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="branch"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  select
                  value={value}
                  onChange={onChange}
                  label="Branch"
                  id="custom-select"
                  error={Boolean(personalErrors['branch'])}
                  aria-describedby="stepper-linear-personal-branch"
                  {...(personalErrors['branch'] && { helperText: 'This field is required' })}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name="description"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  multiline
                  rows={3}
                  label="Description"
                  onChange={onChange}
                  error={Boolean(personalErrors['description'])}
                  aria-describedby="stepper-linear-personal-description"
                  {...(personalErrors['description'] && { helperText: personalErrors['description'].message })}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="tonal" color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
    </DatePickerWrapper>
  );
};

export default StepperLinearWithValidation;
