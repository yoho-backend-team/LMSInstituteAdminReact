import { yupResolver } from '@hookform/resolvers/yup';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { TextField as CustomTextField, IconButton, TextField } from '@mui/material';
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
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CustomChip from 'components/mui/chip';
import { getAllCourses } from 'features/course-management/courses-page/services/courseServices';
import { addTeachingStaff } from 'features/staff-management/teaching-staffs/services/teachingStaffServices';
import { forwardRef, useEffect, useState } from 'react';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { checkUserName } from 'features/user-management/users-page/services/userServices';
import { useNavigate } from 'react-router-dom';
import { useBranchId, useInstitute } from 'utils/get-institute-details';
import client from 'api/client';
import { useSpinner } from 'context/spinnerContext';
import { getImageUrl } from 'utils/imageUtils';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import 'dayjs/locale/en'; // Add your preferred locale
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Visibility, VisibilityOff } from "@mui/icons-material";


const StepperLinearWithValidation = () => {
  const defaultPersonalValues = {
    name: '',
    password: '',
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
    staffId: '',
    logo: ''
  };

  const CustomInput = forwardRef(({ ...props }, ref) => {
    return <TextField fullWidth inputRef={ref} {...props} />;
  });

  const personalSchema = yup.object().shape({
    full_name: yup
      .string()
      .required('Full Name is required')
      .matches(/^[a-zA-Z\s]+$/, 'Full Name should only contain alphabets'),
    //   password: yup
    // .string()
    // .required('Password is required')
    // .min(6, 'Password must be at least 6 characters'),
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
    education_qualification: yup
      .string()
      .required('Educational Qualification is required')
      .matches(/^[a-zA-Z\s]+$/, 'Educational Qualification should only contain alphabets'),
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
    gender: yup.string().required('Gender is required')
    // username: yup
    //   .string()
    //   .required('Username is required')
    //   .matches(/^[a-zA-Z0-9]+$/, 'Username should only contain alphabets and numbers')
  });

  // ** States
  const navigate = useNavigate();
  const [activeCourse, setActiveCourse] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const { show, hide } = useSpinner();

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    getActiveCoursesByBranch(data);
  }, [selectedBranchId]);

  const getActiveCoursesByBranch = async (data) => {
    const result = await getAllCourses(data);
    if (result?.data) {
      setActiveCourse(result?.data);
    }
  };

  const {
    setValue,
    setError,
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors }
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
    borderRadius: 50
  }));

  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }));
  const getInstituteDetails = () => {
    if (typeof localStorage !== 'undefined') {
      const institute = localStorage.getItem('institute');
      return JSON.parse(institute);
    } else {
      return undefined;
    if(typeof(secureLocalStorage) !== "undefined"){
    const institute = secureLocalStorage.getItem("institute")
    return JSON.parse(institute)
    }else{
     return undefined
    }
  };

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

  const handleInputImageChange = async (file) => {
    try {
      show();
      const { files } = file.target;
      const form_data = new FormData();
      form_data.append('file', files[0]);
      const response = await client.file.upload(form_data);
      setLogo(response?.data?.file);
    } catch (error) {
      hide();
      toast.error(error?.message);
    } finally {
      hide();
    }
  };

  const handleInputImageReset = () => {
    setLogo('');
    setLogoSrc(
      'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg'
    );
  };
  const onSubmit = async () => {
    const personalData = personalControl._formValues;
    console.log(personalData);
    const logosrc = logo;
    const courseUUIDs = selectedCourses.map((option) => option.uuid);
    const teaching_staffdata = {
      email: personalData.email,
      full_name: personalData.full_name,
      // password: personalData.password,
      course: courseUUIDs,
      institute_id: useInstitute().getInstituteId(),
      // username: personalData.username,
      dob: convertDateFormat(personalData.date_of_birth),
      gender: personalData.gender,
      branch_id: selectedBranchId,
      qualification: personalData.education_qualification,
      contact_info: {
        state: personalData.state,
        city: personalData.city,
        pincode: personalData.pin_code,
        address1: personalData.address_line_one,
        address2: personalData.address_line_two,
        phone_number: personalData.phone,
        alternate_phone_number: personalData.alt_phone
      },
      designation: personalData.designation,
      // role: personalData.role,
      staffId: personalData?.staffId,
      image: logosrc,
      logo: logosrc,
      user_details: 'InstituteTeachingStaff'
    };
    const filteredCourseId = selectedCourses?.map((course) => course.course_id);

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
    data.append('branch_id', selectedBranchId);
    data.append('image', logo);
    data.append('logo', logo);
    data.append('gender', personalData?.gender);
    data.append('address_line_1', personalData?.address_line_one);
    data.append('address_line_2', personalData?.address_line_two);
    data.append('city', personalData?.city);
    data.append('state', personalData?.state);
    data.append('pin_code', personalData?.pin_code);
    data.append('dob', convertDateFormat(personalData?.date_of_birth));
    data.append('education_qualification', personalData?.education_qualification);
    try {
      console.log('iam working before response 1');

      const result = await addTeachingStaff(teaching_staffdata);
      console.log(result, ' -------------');

      if (result.message) {
        toast.success(result.message);
        navigate(-1);
        return;
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
    // }
  };

  const getStepContent = () => {
    return (
      <form onSubmit={handlePersonalSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={logo ? getImageUrl(logo) : logoSrc} alt="Profile Pic" />
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
                  Allowed PNG or JPEG. Max size of 800Kb.
                </Typography>
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
                  label="Full Name"
                  onChange={onChange}
                  placeholder="Leonard"
                  aria-describedby="stepper-linear-personal-institute_name"
                  error={Boolean(personalErrors.full_name)}
                  {...(personalErrors.name && { helperText: personalErrors.name.message })}
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
                  aria-describedby="stepper-linear-personal-official_email"
                  error={Boolean(personalErrors.email)}
                  {...(personalErrors.email && { helperText: personalErrors.email.message })}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
              <Controller
                name="date_of_birth"
                control={personalControl}
                rules={{ required: 'Date of birth is required' }}
                
                render={({ field }) => (
                  <DatePicker
                    label="Date of Birth"
                    format="DD/MM/YYYY"
                    value={field.value ? dayjs(field.value) : null}
                    error={Boolean(personalErrors.date_of_birth)}
                {...(personalErrors.date_of_birth && { helperText: personalErrors.date_of_birth.message })}
                    onChange={(date) => field.onChange(date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: Boolean(personalErrors?.date_of_birth),
                        helperText: personalErrors?.date_of_birth?.message
                      }
                    }}
                  />
                )}
              />
            </LocalizationProvider>
            {/* <Controller
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
                      aria-describedby="stepper-linear-personal-date_of_birth"
                      error={Boolean(personalErrors.date_of_birth)}
                      {...(personalErrors.date_of_birth && { helperText: personalErrors.date_of_birth.message })}
                    />
                  }
                  onChange={onChange}
                />
              )}
            /> */}
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
                  aria-describedby="stepper-linear-personal-gender"
                  error={Boolean(personalErrors.gender)}
                  {...(personalErrors.gender && { helperText: personalErrors.gender.message })}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </CustomTextField>
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
                if (newValue && newValue.some((option) => option.id === 'selectAll')) {
                  setSelectedCourses(activeCourse.filter((option) => option.id !== 'selectAll'));
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
                      key={option.id}
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
              isOptionEqualToValue={(option, value) => option.id === value.id}
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
                  aria-describedby="stepper-linear-personal-qualification-helper"
                  error={Boolean(personalErrors.education_qualification)}
                  {...(personalErrors.education_qualification && { helperText: personalErrors.education_qualification.message })}
                />
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
                  aria-describedby="stepper-linear-personal-designation-helper"
                  error={Boolean(personalErrors.designation)}
                  {...(personalErrors.designation && { helperText: personalErrors.designation.message })}
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
                  aria-describedby="stepper-linear-personal-address_line_one"
                  error={Boolean(personalErrors.address_line_one)}
                  {...(personalErrors.address_line_one && { helperText: personalErrors.address_line_one.message })}
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
                  aria-describedby="stepper-linear-personal-address_line_two"
                  error={Boolean(personalErrors.address_line_two)}
                  {...(personalErrors.address_line_two && { helperText: personalErrors.address_line_two.message })}
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
                  aria-describedby="stepper-linear-personal-city-helper"
                  error={Boolean(personalErrors.city)}
                  {...(personalErrors.city && { helperText: personalErrors.city.message })}
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
                  aria-describedby="stepper-linear-personal-state-helper"
                  error={Boolean(personalErrors.state)}
                  {...(personalErrors.state && { helperText: personalErrors.state.message })}
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
                  aria-describedby="stepper-linear-personal-pin_code"
                  error={Boolean(personalErrors.pin_code)}
                  {...(personalErrors.pin_code && { helperText: personalErrors.pin_code.message })}
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
                  aria-describedby="stepper-linear-personal-phone"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">+91</InputAdornment>
                  }}
                  error={Boolean(personalErrors.phone)}
                  {...(personalErrors.phone && { helperText: personalErrors.phone.message })}
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
                  aria-describedby="stepper-linear-personal-alt_phone"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">+91</InputAdornment>
                  }}
                  error={Boolean(personalErrors.alt_phone)}
                  {...(personalErrors.alt_phone && { helperText: personalErrors.alt_phone.message })}
                />
              )}
            />
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <Controller
              name="username"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { value } }) => (
                <TextField
                  fullWidth
                  value={value}
                  sx={{ mb: 4 }}
                  label="UserName"
                  onChange={async (e) => {
                    setValue('username', e.target.value);
                    const result = await checkUserName(e.target.value);

                    if (result.success) {
                      setError('username', {
                        type: 'manual',
                        message: ''
                      });
                    } else {
                      setError('username', {
                        type: 'manual',
                        message: 'Username is already taken'
                      });
                    }
                  }}
                  placeholder="John Doe"
                  error={Boolean(personalErrors.username)}
                  {...(personalErrors.username && { helperText: personalErrors.username.message })}
                />
              )}
            />
          </Grid> */}

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  };

  const renderContent = () => {
    return getStepContent();
  };

  return (
    <Card>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};
export default StepperLinearWithValidation;
