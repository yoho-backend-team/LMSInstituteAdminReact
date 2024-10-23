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
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import { addNonTeachingStaff } from 'features/staff-management/non-teaching-staffs/services/nonTeachingStaffServices';
import { Fragment, forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useInstitute } from 'utils/get-institute-details';
import * as yup from 'yup';

const StepperLinearWithValidation = () => {
  const steps = [
    {
      title: 'Personal Info',
      subtitle: 'Setup Informion'
    }
  ];

  const CustomInput = forwardRef(({ ...props }, ref) => {
    return <TextField fullWidth inputRef={ref} {...props} />;
  });

  const personalSchema = yup.object().shape({
    full_name: yup
      .string()
      .required('Name is required')
      .matches(/^[a-zA-Z\s]+$/, 'Name should only contain alphabets'),
      password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Password should only contain alphabets and numbers'),
    email: yup
      .string()
      .required('Email is required')
      .matches(/^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'),
    phone: yup
      .string()
      .required('Phone number is required')
      .matches(/^\d{10,}$/, 'Phone number must be at least 10 digits'),
    alt_phone: yup
      .string()
      .required('Alternate phone number is required')
      .matches(/^\d{10,}$/, 'Alternate phone number must be at least 10 digits'),
    designation: yup
      .string()
      .required('Designation is required')
      .matches(/^[a-zA-Z\s]+$/, 'Designation should only contain alphabets'),
    state: yup
      .string()
      .required('State is required')
      .matches(/^[a-zA-Z\s]+$/, 'State should only contain alphabets'),
    city: yup
      .string()
      .required('City is required')
      .matches(/^[a-zA-Z\s]+$/, 'City should only contain alphabets'),
    pin_code: yup
      .string()
      .required('Pin code is required')
      .matches(/^\d{6}$/, 'Pin code must be 6 digits'),
    address_line_one: yup.string().required('Address line one is required'),
    address_line_two: yup.string().required('Address line two is required'),
    date_of_birth: yup.string().required('Date of birth is required'),
    gender: yup.string().required('Gender is required'),
    branch: yup.string().required('Branch is required'),
    // username: yup
    //   .string()
    //   .required('Username is required')
    //   .matches(/^[a-zA-Z0-9]+$/, 'Username should only contain alphabets and numbers')
  });

  // ** States
  const [activeStep, setActiveStep] = useState(0);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const defaultPersonalValues = {
    name: '',
    password:"",
    email: '',
    phone: '',
    alt_phone: '',
    state: '',
    city: '',
    pin_code: '',
    address_line_one: '',
    address_line_two: '',
    date_of_birth: '',
    gender: '',
    branch: selectedBranchId,
    designation: '',
    education_qualification: '',
    logo: '',
    staffId:''
  };

  const [activeBranches, setActiveBranches] = useState([]);
  useEffect(() => {
    getActiveBranchesByUser();
  }, []);

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();
    setActiveBranches(result.data);
  };

  const {
    reset: personalReset,
    control: personalControl,
    setValue,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors }
  } = useForm({
    defaultValues: defaultPersonalValues,
    resolver: yupResolver(personalSchema)
  });

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    personalReset({
      state: '',
      city: '',
      pin_code: Number(''),
      address_line_one: '',
      address_line_two: '',
      date_of_birth: '',
      name: '',
      Last_name: '',
      gender: '',
      official_email: '',
      phone: Number(''),
      alt_phone: Number(''),
      description: '',
      joining_date: '',
      designation: '',
      staffId:"",
    });
  };

  function convertDateFormat(input) {
    var originalDate = new Date(input);
    var year = originalDate.getFullYear();
    var month = ('0' + (originalDate.getMonth() + 1)).slice(-2); // Months are 0-based
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

  const [logo, setLogo] = useState('');
  const [logoSrc, setLogoSrc] = useState(
    'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
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
    setLogoSrc('/images/avatars/15.png');
  };
  

  const getInstituteDetails = () => {
    if(typeof(localStorage) !== "undefined"){
    const institute = localStorage.getItem("institute")
    return JSON.parse(institute)
    }else{
     return undefined
    }
}



  const onSubmit = async () => {
    const formData = personalControl._formValues;
   
    const non_teaching_staffdata = {
      email: formData.email,
      full_name: formData.full_name,
      password: formData.password,
      institute_id: useInstitute().getInstituteId(),
      branch_id: localStorage.getItem("selectedBranchId"),
      username: formData.username,
      dob: convertDateFormat(formData.date_of_birth),
      gender: formData.gender,
      qualification: formData.education_qualification,
      contact_info: {
        state: formData.state,
        city: formData.city,
        pincode: formData.pin_code,
        address1: formData.address_line_one,
        address2: formData.address_line_two,
        phone_number: formData.phone,
        alternate_phone_number: formData.alt_phone
        
      },
      designation: formData.designation,
      staffId:formData.staffId,
      role: formData.role
    };
    const personalData = personalControl?._formValues;
    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 1) {
      let data = new FormData();

      data.append('name', personalData?.full_name);
      data.append('email', personalData?.email);
      data.append('phone_number', personalData?.phone);
      data.append('alternate_number', personalData?.alt_phone);
      data.append('designation', personalData?.designation);
      data.append('type', 'non_teaching');
      data.append('branch_id', personalData?.branch);
      data.append('image', logo);
      data.append('gender', personalData?.gender);
      data.append('address_line_1', personalData?.address_line_one);
      data.append('address_line_2', personalData?.address_line_two);
      data.append('city', personalData?.city);
      data.append('state', personalData?.state);
      data.append('pin_code', personalData?.pin_code);
      data.append('dob', convertDateFormat(personalData?.date_of_birth));
      data.append('username', personalData?.username);
      data.append('education_qualification', personalData?.education_qualification);

      try {
        const result = await addNonTeachingStaff(non_teaching_staffdata);

        if (result.success) {
          toast.success(result.message);
          navigate(-1);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[0].title}
                </Typography>
                <Typography variant="caption" component="p">
                  {steps[0].subtitle}
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
                  <ImgStyled src={logoSrc} alt="Profile Pic" />
                  <div>
                    <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-image">
                      Upload your Logo
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
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="FullName"
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
                  name="password"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Password"
                      type="password"
                      onChange={onChange}
                      placeholder=""
                      error={Boolean(personalErrors['password'])}
                      aria-describedby="stepper-linear-personal-institute_name"
                      helperText={personalErrors?.password?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="email"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
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
                  name="date_of_birth"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      id="issue-date"
                      dateFormat={'dd/MM/yyyy'}
                      value={value}
                      selected={value}
                      customInput={
                        <CustomInput
                          label="Date Of Birth"
                          error={Boolean(personalErrors['date_of_birth'])}
                          aria-describedby="stepper-linear-personal-date_of_birth"
                          helperText={personalErrors?.date_of_birth?.message}
                        />
                      }
                      onChange={onChange}
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
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      onChange={onChange}
                      label="Gender"
                      placeholder="Select Gender"
                      error={Boolean(personalErrors['gender'])}
                      aria-describedby="stepper-linear-personal-gender"
                      helperText={personalErrors?.gender?.message}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="branch"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value } }) => (
                    <TextField
                      fullWidth
                      select
                      value={value}
                      onChange={(e) => {
                        setValue('branch', e.target.value);
                        getActiveCoursesByBranch(e.target.value);
                      }}
                      label="Branch"
                      id="custom-select"
                      error={Boolean(personalErrors['branch'])}
                      aria-describedby="stepper-linear-personal-branch"
                      {...(personalErrors['branch'] && { helperText: 'This field is required' })}
                    >
                      {activeBranches.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.branch_identity}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="designation"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="designation"
                      onChange={onChange}
                      error={Boolean(personalErrors.designation)}
                      aria-describedby="stepper-linear-personal-designation-helper"
                      helperText={personalErrors?.designation?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="education_qualification"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Qualification"
                      onChange={onChange}
                      error={Boolean(personalErrors.state)}
                      aria-describedby="stepper-linear-personal-qualification-helper"
                      helperText={personalErrors?.education_qualification?.message}
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
                    <CustomTextField
                      fullWidth
                      value={value}
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
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
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
                  name="pin_code"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Pin Code"
                      type="number"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(personalErrors['pin_code'])}
                      aria-describedby="stepper-linear-personal-pin_code"
                      helperText={personalErrors?.pin_code?.message}
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
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Address Line One"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(personalErrors['address_line_one'])}
                      aria-describedby="stepper-linear-personal-address_line_one"
                      helperText={personalErrors?.address_line_one?.message}
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
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Address Line Two"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(personalErrors['address_line_two'])}
                      aria-describedby="stepper-linear-personal-address_line_two"
                      helperText={personalErrors?.address_line_two?.message}
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
                    <CustomTextField
                      fullWidth
                      type="number"
                      value={value}
                      label="Phone Number"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(personalErrors['phone'])}
                      aria-describedby="stepper-linear-personal-phone"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">+91</InputAdornment>
                      }}
                      helperText={personalErrors?.phone?.message}
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
                    <CustomTextField
                      fullWidth
                      value={value}
                      type="number"
                      label="Alt Phone Number"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(personalErrors['alt_phone'])}
                      aria-describedby="stepper-linear-personal-alt_phone"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">+91</InputAdornment>
                      }}
                      helperText={personalErrors?.alt_phone?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="username"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
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
                <Button variant="tonal" color="secondary" onClick={handleBack}>
                  Back
                </Button>
                <Button type="submit" variant="contained">
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        );
    }
  };

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Fragment>
      );
    } else {
      return getStepContent(activeStep);
    }
  };

  return (
    <Card>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};
export default StepperLinearWithValidation;
