import { yupResolver } from '@hookform/resolvers/yup';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { TextField as CustomTextField, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CustomChip from 'components/mui/chip';
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import { getAllActiveCourses } from 'features/course-management/courses-page/services/courseServices';
import { addTeachingStaff } from 'features/staff-management/teaching-staffs/services/teachingStaffServices';
import { Fragment, forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import StepperWrapper from 'styles/mui/stepper';
import * as yup from 'yup';
import StepperCustomDot from '../../../../features/staff-management/teaching-staffs/components/StepperCustomDot';

const StepperLinearWithValidation = () => {
  const steps = [
    {
      title: 'Add New Staff',
      subtitle: 'Add staff Information'
    }
  ];

  const defaultPersonalValues = {
    name: '',
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
    course: '',
    branch: '',
    designation: '',
    education_qualification: '',
    username: '',
    logo: ''
  };

  const CustomInput = forwardRef(({ ...props }, ref) => {
    return <TextField fullWidth inputRef={ref} {...props} />;
  });

  const personalSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, 'Name should only contain alphabets')
      .required('Name is required'),
    email: yup
      .string()
      .matches(/^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format')
      .required('Email is required'),
    phone: yup
      .string()
      .matches(/^\d{10,}$/, 'Phone number must be at least 10 digits')
      .required('Phone number is required'),
    alt_phone: yup
      .string()
      .matches(/^\d{10,}$/, 'Alternate phone number must be at least 10 digits')
      .required('Alternate phone number is required'),
    designation: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, 'Designation should only contain alphabets')
      .required('Designation is required'),
    state: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, 'State should only contain alphabets')
      .required('State is required'),
    city: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, 'City should only contain alphabets')
      .required('City is required'),
    pin_code: yup
      .string()
      .matches(/^\d{6}$/, 'Pin code must be 6 digits')
      .required('Pin code is required'),
    address_line_one: yup.string().required('Address line one is required'),
    address_line_two: yup.string().required('Address line two is required'),
    date_of_birth: yup.string().required('Date of birth is required'),
    gender: yup.string().required('Gender is required'),
    branch: yup.string().required('Branch is required'),
    username: yup
      .string()
      .matches(/^[a-zA-Z0-9]+$/, 'Username should only contain alphabets and numbers')
      .required('Username is required')
  });

  // ** States
  const [activeStep, setActiveStep] = useState(0);

  const [activeCourse, setActiveCourse] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  useEffect(() => {
    getActiveCoursesByBranch(selectedBranchId);
  }, [selectedBranchId]);

  const getActiveCoursesByBranch = async (selectedBranchId) => {
    const result = await getAllActiveCourses({ branch_id: selectedBranchId });

    console.log('active courses : ', result.data);
    setActiveCourse(result.data.data);
  };

  const [activeBranches, setActiveBranches] = useState([]);
  useEffect(() => {
    getActiveBranchesByUser();
  }, []);

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();

    console.log(result.data);
    setActiveBranches(result.data.data);
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
      course: '',
      official_email: '',
      phone: Number(''),
      alt_phone: Number(''),
      description: '',
      joining_date: '',
      designation: '',
      branch: ''
    });
  };

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

  const [logo, setLogo] = useState('');
  const [logoSrc, setLogoSrc] = useState(
    'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg'
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
      'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg'
    );
  };
  console.log(logo);

  const onSubmit = async () => {
    const personalData = personalControl?._formValues;
    const filteredCourseId = selectedCourses?.map((course) => course.course_id);
    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 1) {
      let data = new FormData();
      filteredCourseId.forEach((id) => {
        data.append(`course_ids[]`, id);
      });
      data.append('name', personalData?.name);
      data.append('email', personalData?.email);
      data.append('phone_number', personalData?.phone);
      data.append('alternate_number', personalData?.alt_phone);
      data.append('designation', personalData?.designation);
      data.append('type', 'teaching');
      data.append('branch_id', personalData?.branch.branch_id);
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
        const result = await addTeachingStaff(data);
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
              <Grid item xs={12} sm={12}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ImgStyled src={logoSrc} alt="Profile Pic" />
                  <div>
                    <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-image">
                      Upload Profile picture
                      <input
                        hidden
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleInputImageChange}
                        id="account-settings-upload-image"
                      />
                    </ButtonStyled>
                    <ResetButtonStyled color="error" variant="tonal" onClick={handleInputImageReset}>
                      Reset
                    </ResetButtonStyled>
                    <Typography sx={{ mt: 4, color: 'text.disabled', justifyContent: 'center', display: 'flex' }}>
                      Allowed PNG or JPEG. Max size of 800K.
                    </Typography>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="name"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Full Name"
                      onChange={onChange}
                      placeholder="Leonard"
                      error={Boolean(personalErrors['name'])}
                      aria-describedby="stepper-linear-personal-institute_name"
                      {...(personalErrors['name'] && { helperText: 'This field is required' })}
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
                      {...(personalErrors['email'] && { helperText: 'This field is required' })}
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
                          {...(personalErrors['date_of_birth'] && { helperText: 'This field is required' })}
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
                      {...(personalErrors['gender'] && { helperText: 'This field is required' })}
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
                  name="branch"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value } }) => (
                    <Autocomplete
                      selectAll
                      fullWidth
                      options={activeBranches}
                      getOptionLabel={(option) => option.branch_name}
                      value={activeBranches.find((branch) => branch.branch_id === value) || null}
                      onChange={(event, newValue) => {
                        setValue('branch', newValue ? newValue.branch_id : '');
                        getActiveCoursesByBranch(newValue ? newValue.branch_id : '');
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Branch"
                          error={Boolean(personalErrors['branch'])}
                          helperText={personalErrors.branch?.message}
                          id="custom-select"
                          aria-describedby="stepper-linear-personal-branch"
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  id="select-multiple-chip"
                  options={[{ course_id: 'selectAll', course_name: 'Select All' }, ...activeCourse]}
                  getOptionLabel={(option) => option.course_name}
                  value={selectedCourses}
                  onChange={(e, newValue) => {
                    if (newValue && newValue.some((option) => option.course_id === 'selectAll')) {
                      setSelectedCourses(activeCourse.filter((option) => option.course_id !== 'selectAll'));
                    } else {
                      setSelectedCourses(newValue);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Select Course"
                      InputProps={{
                        ...params.InputProps,
                        style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                      }}
                    />
                  )}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.course_name}
                    </li>
                  )}
                  renderTags={(value) => (
                    <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                      {value.map((option, index) => (
                        <CustomChip
                          key={option.course_id}
                          label={option.course_name}
                          onDelete={() => {
                            const updatedValue = [...value];
                            updatedValue.splice(index, 1);
                            setSelectedCourses(updatedValue);
                          }}
                          color="primary"
                          sx={{ m: 0.75 }}
                        />
                      ))}
                    </div>
                  )}
                  isOptionEqualToValue={(option, value) => option.course_id === value.course_id}
                  selectAllText="Select All"
                  SelectAllProps={{ sx: { fontWeight: 'bold' } }}
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
                      {...(personalErrors.state && { helperText: 'This field is required' })}
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
                      {...(personalErrors.state && { helperText: 'This field is required' })}
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
                      {...(personalErrors.city && { helperText: 'This field is required' })}
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
                      {...(personalErrors['pin_code'] && { helperText: 'This field is required' })}
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
                      label="Address Line 1"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(personalErrors['address_line_one'])}
                      aria-describedby="stepper-linear-personal-address_line_one"
                      {...(personalErrors['address_line_one'] && { helperText: 'This field is required' })}
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
                      label="Address Line 2"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(personalErrors['address_line_two'])}
                      aria-describedby="stepper-linear-personal-address_line_two"
                      {...(personalErrors['address_line_two'] && { helperText: 'This field is required' })}
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
                      placeholder=""
                      error={Boolean(personalErrors['phone'])}
                      aria-describedby="stepper-linear-personal-phone"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">+91</InputAdornment>
                      }}
                      {...(personalErrors['phone'] && { helperText: 'This field is required' })}
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
                      placeholder=""
                      error={Boolean(personalErrors['alt_phone'])}
                      aria-describedby="stepper-linear-personal-alt_phone"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">+91</InputAdornment>
                      }}
                      {...(personalErrors['alt_phone'] && { helperText: 'This field is required' })}
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
                      {...(personalErrors['username'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="tonal" color="secondary" onClick={handleBack}>
                  Back
                </Button>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
                <Button variant="tonal" color="error" onClick={handleReset}>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </form>
        );

      default:
        return null;
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
      <CardContent>
        <StepperWrapper>
          <Stepper activeStep={activeStep}>
            {steps.map((step, index) => {
              const labelProps = {};
              if (index === activeStep) {
                labelProps.error = false;
                if ((personalErrors['date_of_birth'] || personalErrors['first-name']) && activeStep === 0) {
                  labelProps.error = true;
                } else {
                  labelProps.error = false;
                }
              }

              return (
                <Step key={index}>
                  <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                    <div className="step-label">
                      <Typography className="step-number">{`0${index + 1}`}</Typography>
                      <div>
                        <Typography className="step-title">{step.title}</Typography>
                        <Typography className="step-subtitle">{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>

      <Divider sx={{ m: '0 !important' }} />

      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};
export default StepperLinearWithValidation;
