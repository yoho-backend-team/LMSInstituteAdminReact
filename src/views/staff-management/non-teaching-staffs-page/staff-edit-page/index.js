import { yupResolver } from '@hookform/resolvers/yup';
import { TextField as CustomTextField, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { updateNonTeachingStaff } from 'features/staff-management/non-teaching-staffs/services/nonTeachingStaffServices';
import { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router';
import * as yup from 'yup';

const StepperLinearWithValidation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const staffData = location.state.staff;
  const staffId = location.state.id;

  const steps = [
    {
      title: 'Edit Non Teaching Staff',
      subtitle: 'Setup Informion'
    }
  ];

  const defaultPersonalValues = {
    full_name: '',
    email: '',
    phone_number: '',
    alternate_number: '',
    state: '',
    city: '',
    pincode: '',
    address1: '',
    address2: '',
    dob: '',
    gender: '',
    designation: '',
    qualification: '',
    username: '',
    logo: ''
  };

  const CustomInput = forwardRef(({ ...props }, ref) => {
    return <TextField fullWidth inputRef={ref} {...props} />;
  });

  const personalSchema = yup.object().shape({
    full_name: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, 'Name should only contain alphabets')
      .required('Name is required'),
    email: yup.string().required().email(),
    phone_number: yup
      .string()
      .matches(/^\d{10,}$/, 'Phone number must be at least 10 digits')
      .required('Phone number is required'),
    alternate_number: yup
      .string()
      .matches(/^\d{10,}$/, 'Alternate phone number must be at least 10 digits')
      .required('Alternate phone number is required'),
    designation: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, 'Designation should only contain alphabets')
      .required('Designation is required'),
    qualification: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, 'Qualification should only contain alphabets')
      .required('Qualification is required'),
    state: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, 'State should only contain alphabets')
      .required('State is required'),
    city: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, 'City should only contain alphabets')
      .required('City is required'),
    pincode: yup
      .string()
      .required('Pin code is required')
      .matches(/^\d{6}$/, 'Pin code must be 6 digits'),
    address1: yup.string().required('Address line one is required'),
    address2: yup.string().required('Address line two is required'),
    dob: yup.string().required('Date of birth is required'),
    gender: yup.string().required('Gender is required'),
    username: yup
      .string()
      .matches(/^[a-zA-Z0-9]+$/, 'Username should only contain alphabets and numbers')
      .required('Username is required')
  });

  const {
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors },
    setValue
  } = useForm({
    defaultValues: defaultPersonalValues,
    resolver: yupResolver(personalSchema)
  });

  function convertDateFormat(input) {
    var originalDate = new Date(input);
    var year = originalDate.getFullYear();
    var month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
    var day = ('0' + originalDate.getDate()).slice(-2);

    var formattedDateString = year + '-' + month + '-' + day;

    return formattedDateString;
  }

  const ImgStyled = styled('img')(({ theme }) => ({
    width: 100,
    height: 100,
    marginRight: theme.spacing(6),
    borderRadius: theme.shape.borderRadius
  }));

  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }));

  const ResetButtonStyled = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
      textAlign: 'center',
      marginTop: theme.spacing(2)
    }
  }));

  const [logo, setLogo] = useState();
  const [logoSrc, setLogoSrc] = useState(
    'https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg'
  );

  const handleInputImageChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setLogoSrc(reader.result);
      reader.readAsDataURL(files[0]);
      setLogo(files[0]);
    }
  };

  const handleInputImageReset = () => {
    setLogo('');
    setLogoSrc(
      'https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg'
    );
  };
  

  useEffect(() => {
    if (staffData) {
      setValue('id', staffId);
      setValue('full_name', staffData.full_name);
      setValue('email', staffData.email);
      setValue('phone_number', staffData.contact_info?.phone_number);
      setValue('alternate_number', staffData.contact_info?.alternate_number);
      setValue('designation', staffData.userDetail?.designation);
      setValue('image', logo);
      setValue('gender', staffData.gender);
      setValue('address1', staffData.contact_info?.address1);
      setValue('address2', staffData.contact_info?.address2);
      setValue('city', staffData.contact_info?.city);
      setValue('state', staffData.contact_info?.state);
      setValue('pincode', staffData.contact_info?.pincode);
      setValue('dob', new Date(staffData.dob) || new Date());
      setValue('username', staffData.userDetail?.username);
      setValue('qualification', staffData.qualification);
    }
  }, [staffData]);


  const onSubmit = async () => {
    try {
    const personalData = personalControl?._formValues;
    
    const non_teaching = {
      id : staffId,
      email: personalData.email,
      full_name: personalData.full_name,
      username: personalData.username,
      dob: (personalData.dob),
      gender: personalData.gender,
      userDetail:staffData.userDetail._id,
      qualification: personalData.qualification,
      contact_info: {
        state: personalData.state,
        city: personalData.city,
        pincode: personalData.pincode,
        address1: personalData.address1,
        address2: personalData.address2,
        phone_number: personalData.phone_number,
        alternate_number: personalData.alternate_number

      },
      designation: personalData.designation,
    };
    
    // let data = new FormData();

    // data.append('id', staffId);
    // data.append('full_name', personalData?.full_name);
    // data.append('email', personalData?.email);
    // data.append('phone_number', personalData?.phone_number);
    // data.append('alternate_number', personalData?.alternate_number);
    // data.append('designation', personalData?.designation);
    // data.append('image', logo);
    // data.append('gender', personalData?.gender);
    // data.append('address_line_1', personalData?.address1);
    // data.append('address_line_2', personalData?.address2);
    // data.append('city', personalData?.city);
    // data.append('state', personalData?.state);
    // data.append('pincode', personalData?.pincode);
    // data.append('dob', convertDateFormat(personalData?.dob));
    // data.append('username', personalData?.username);
    // data.append('qualification', personalData?.qualification);

    const result = await updateNonTeachingStaff(non_teaching);
   
    if (result.success) {
      toast.success(result.message);
      navigate(-1);
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    console.error("Error while updating non-teaching staff:", error);
    toast.error("An error occurred while updating non-teaching staff.");
  }
  };


  const getStepContent = () => {
    return (
      <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant="h2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {steps[0].title}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography color="dark" sx={{ fontWeight: 600 }}>
              Upload Profile Picture
            </Typography>
            <Typography color="dark" sx={{ fontSize: 12, mb: 4 }}>
              Upload here
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {!logo && (
                <ImgStyled
                  src={staffData?.image ? `${process.env.REACT_APP_PUBLIC_API_URL}/storage/${staffData?.image}` : logoSrc}
                  alt="Profile Pic"
                />
              )}

              {logo && <ImgStyled src={logoSrc} alt="Profile Pic" />}
              <div>
                <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-image">
                  Upload Profile Picture
                  <input
                    hidden
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleInputImageChange}
                    id="account-settings-upload-image"
                  />
                </ButtonStyled>
                <ResetButtonStyled color="secondary" variant="tonal" onClick={handleInputImageReset}>
                  Reset
                </ResetButtonStyled>
                <Typography sx={{ mt: 4, color: 'text.disabled' }}>Allowed PNG or JPEG. Max size of 800K.</Typography>
              </div>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="full_name"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  // value={value}
                  defaultValue={staffData.full_name}
                  label="StaffName"
                  onChange={onChange}
                  placeholder="Leonard"
                  error={Boolean(personalErrors['full_name'])}
                  aria-describedby="stepper-linear-personal-institute_name"
                  helperText={personalErrors?.full_name?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="email"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  defaultValue={staffData.email}
                  label="Email"
                  onChange={onChange}
                  placeholder="Carter"
                  error={Boolean(personalErrors['email'])}
                  aria-describedby="stepper-linear-personal-official_email"
                  helperText={personalErrors?.email?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="dob"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { value } }) => (
                <DatePicker
                  id="issue-date"
                  dateFormat={'dd-MM-yyyy'}
                  value={value}
                  selected={value}
                  onChange={(date) => {
                    setValue('dob', date);
                  }}
                  customInput={
                    <CustomInput
                      label="Date Of Birth"
                      error={Boolean(personalErrors['dob'])}
                      aria-describedby="stepper-linear-personal-dob"
                      helperText={personalErrors?.dob?.message}
                    />
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="gender"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  // value={value}
                  onChange={onChange}
                  defaultValue={staffData.gender}
                  label="Gender"
                  placeholder="Select Gender"
                  error={Boolean(personalErrors['gender'])}
                  aria-describedby="stepper-linear-personal-gender"
                  helperText={personalErrors?.gender?.message}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="designation"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  defaultValue={staffData.userDetail?.designation}
                  label="designation"
                  onChange={onChange}
                  error={Boolean(personalErrors.designation)}
                  helperText={personalErrors?.designation?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="qualification"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  defaultValue={staffData.qualification}
                  label="Qualification"
                  onChange={onChange}
                  error={Boolean(personalErrors.state)}
                  aria-describedby="stepper-linear-personal-qualification-helper"
                  helperText={personalErrors?.qualification?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="state"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  defaultValue={staffData.contact_info?.state}
                  label="State"
                  onChange={onChange}
                  error={Boolean(personalErrors.state)}
                  aria-describedby="stepper-linear-personal-state-helper"
                  helperText={personalErrors?.state?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="city"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  defaultValue={staffData.contact_info?.city}
                  label="City"
                  onChange={onChange}
                  error={Boolean(personalErrors.city)}
                  aria-describedby="stepper-linear-personal-city-helper"
                  helperText={personalErrors?.city?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="pincode"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  defaultValue={staffData.contact_info?.pincode}
                  label="Pin Code"
                  type="number"
                  onChange={onChange}
                  placeholder="Carter"
                  error={Boolean(personalErrors['pincode'])}
                  aria-describedby="stepper-linear-personal-pincode"
                  helperText={personalErrors?.pincode?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="address1"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  defaultValue={staffData.contact_info?.address1}
                  label="Address Line One"
                  onChange={onChange}
                  placeholder="Carter"
                  error={Boolean(personalErrors['address1'])}
                  aria-describedby="stepper-linear-personal-address1"
                  helperText={personalErrors?.address1?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="address2"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  defaultValue={staffData.contact_info?.address2}
                  label="Address Line Two"
                  onChange={onChange}
                  placeholder="Carter"
                  error={Boolean(personalErrors['address2'])}
                  aria-describedby="stepper-linear-personal-address2"
                  helperText={personalErrors?.address2?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="phone_number"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  type="number"
                  defaultValue={staffData.contact_info?.phone_number}
                  label="Phone Number"
                  onChange={onChange}
                  placeholder="Carter"
                  error={Boolean(personalErrors['phone_number'])}
                  aria-describedby="stepper-linear-personal-phone"
                  helperText={personalErrors?.phone_number?.message}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">+91</InputAdornment>
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="alternate_number"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  defaultValue={ staffData.contact_info?.alternate_number}
                  type="number"
                  label="Alt Phone Number"
                  onChange={onChange}
                  placeholder="Carter"
                  error={Boolean(personalErrors['alternate_number'])}
                  aria-describedby="stepper-linear-personal-alternate_number"
                  helperText={personalErrors?.alternate_number?.message}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">+91</InputAdornment>
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="username"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  defaultValue={staffData.userDetail?.username}
                  label="Username"
                  onChange={onChange}
                  placeholder="carterLeonard"
                  error={Boolean(personalErrors['username'])}
                  aria-describedby="stepper-linear-account-username"
                  helperText={personalErrors?.username?.message}
                />

              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="tonal" color="secondary" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  };

  return (
    <Card>
      <CardContent>{getStepContent()}</CardContent>
    </Card>
  );
};

export default StepperLinearWithValidation;
