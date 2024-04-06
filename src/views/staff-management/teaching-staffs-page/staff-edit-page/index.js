// ** React Imports
import MenuItem from '@mui/material/MenuItem';
import { forwardRef, useEffect, useState } from 'react';
// ** MUI Imports
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CustomChip from 'components/mui/chip';
// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
// ** Icon Imports
import 'react-datepicker/dist/react-datepicker.css';
// ** Custom Components Imports
import { TextField as CustomTextField, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
// ** Styled Components

import { getAllActiveCourses } from 'features/course-management/courses-page/services/courseServices';
import { updateTeachingStaff } from 'features/staff-management/teaching-staffs/services/teachingStaffServices';
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import InputAdornment from '@mui/material/InputAdornment';

const StepperLinearWithValidation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const staffData = location.state.staff;
  const staffId = location.state.id;
  console.log('staffData:', staffData);

  const [activeCourse, setActiveCourse] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [logo, setLogo] = useState('');
  const [logoSrc, setLogoSrc] = useState(
    'https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg'
  );

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const steps = [
    {
      title: 'Edit Teaching Staff',
      subtitle: 'Edit Informion'
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
    education_qualification: yup
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
    pin_code: yup
      .string()
      .matches(/^\d{6}$/, 'Pin code must be 6 digits')
      .required('Pin code is required'),
    address_line_one: yup.string().required('Address line one is required'),
    address_line_two: yup.string().required('Address line two is required'),
    // date_of_birth: yup.string().required('Date of birth is required'),
    gender: yup.string().required('Gender is required'),
    username: yup
      .string()
      .matches(/^[a-zA-Z0-9]+$/, 'Username should only contain alphabets and numbers')
      .required('Username is required'),
    course: yup.array().required('course field is required').min(1, 'At least one course must be selected')
  });

  useEffect(() => {
    getActiveCoursesByBranch(selectedBranchId);
  }, [selectedBranchId]);

  const getActiveCoursesByBranch = async (selectedBranchId) => {
    const result = await getAllActiveCourses({ branch_id: selectedBranchId });

    console.log('active courses : ', result.data);
    setActiveCourse(result.data.data);
  };

  // ** Hooks

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
    // Create a new Date object from the original date string
    var originalDate = new Date(input);
    // Extract the year, month, and day components
    var year = originalDate.getFullYear();
    var month = ('0' + (originalDate.getMonth() + 1)).slice(-2); // Months are 0-based
    var day = ('0' + originalDate.getDate()).slice(-2);

    // Form the yyyy-mm-dd date string
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

  useEffect(() => {
    if (staffData) {
      setValue('id', staffId);
      setValue('name', staffData.staff_name);
      setValue('email', staffData?.email);
      setValue('phone', staffData?.phone_number);
      setValue('alt_phone', staffData?.alternate_number);
      setValue('designation', staffData?.designation);
      setValue('branch_id', staffData?.staff_course?.courses?.branch_id);
      setValue('image', logo);
      setValue('gender', staffData?.gender);
      setValue('address_line_one', staffData?.address_line_1);
      setValue('address_line_two', staffData?.address_line_2);
      setValue('city', staffData?.city);
      setValue('state', staffData?.state);
      setValue('pin_code', staffData?.pin_code);
      setValue('date_of_birth', new Date(staffData?.dob) || new Date()); // Set class date
      setValue('username', staffData?.users?.username);
      setValue('education_qualification', staffData?.education_qualification);
      setSelectedCourses(staffData?.branchCourse);
    }
  }, [staffData]);

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

  const onSubmit = async () => {
    
    const personalData = personalControl?._formValues;

    const filteredCourseId = selectedCourses?.map((course) => course.course_id);

    let data = new FormData();
    filteredCourseId?.forEach((id) => {
      data.append(`course_ids[]`, id);
    });

    data.append('id', staffData?.id);
    data.append('staff_name', personalData?.name);
    data.append('email', personalData?.email);
    data.append('phone_number', personalData?.phone);
    data.append('alternate_number', personalData?.alt_phone);
    data.append('designation', personalData?.designation);
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

    const result = await updateTeachingStaff(data);

    if (result.success) {
      toast.success(result.message);
      navigate(-1);
    } else {
      toast.error(result.message);
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
            <Typography sx={{ color: 'text.disabled', mb: 2 }}>Update Profile Picture</Typography>
            {/* <Typography color="dark" sx={{ fontSize: 12, mb: 4 }}>
                  Upload here
                </Typography> */}
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
                  Update Profile Picture
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
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  // value={value}
                  defaultValue={staffData?.staff_name}
                  label="FullName"
                  onChange={onChange}
                  placeholder="Leonard"
                  error={Boolean(personalErrors['name'])}
                  aria-describedby="stepper-linear-personal-institute_name"
                  helperText={personalErrors?.name?.message}
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
                  // value={value}
                  defaultValue={staffData?.email}
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
              render={({ field: { value } }) => (
                <DatePicker
                  id="issue-date"
                  // dateFormat={'dd/MM/yyyy'}
                  value={value}
                  selected={value}
                  // defaultValue={staffData?.dob}
                  onChange={(date) => {
                    setValue('date_of_birth', date);
                    // setSelectedDate(date);
                  }}
                  customInput={
                    <CustomInput
                      label="Date Of Birth"
                      error={Boolean(personalErrors['date_of_birth'])}
                      aria-describedby="stepper-linear-personal-date_of_birth"
                      // helperText={personalErrors?.dob}
                    />
                  }
                  // onChange={onChange}
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
                  defaultValue={staffData?.gender}
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

          {/* <Grid item xs={12} sm={6}>
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
                  setValue('course', newValue);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Courses"
                  InputProps={{
                    ...params.InputProps,
                    style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                  }}
                  error={personalErrors.course && selectedCourses.length === 0} // Updated error condition
                  aria-describedby="stepper-linear-personal-official_email"
                  helperText={personalErrors.course && selectedCourses.length === 0 ? personalErrors.course.message : ''}
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
                        setValue('course', updatedValue);
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
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <Controller
              name="course"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
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
                      setValue('course', newValue);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Courses"
                      InputProps={{
                        ...params.InputProps,
                        style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                      }}
                      error={personalErrors.course && selectedCourses.length === 0} // Updated error condition
                      aria-describedby="stepper-linear-personal-official_email"
                      helperText={personalErrors.course && selectedCourses.length === 0 ? personalErrors.course.message : ''}
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
                            setValue('course', updatedValue);
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
                  // value={value}
                  defaultValue={staffData?.designation}
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
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  // value={value}
                  defaultValue={staffData?.education_qualification}
                  label="Qualification"
                  onChange={onChange}
                  error={Boolean(personalErrors.education_qualification)}
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
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  // value={value}
                  defaultValue={staffData?.state}
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
                  // value={value}
                  defaultValue={staffData?.city}
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
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  // value={value}
                  defaultValue={staffData?.pin_code}
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
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  // value={value}
                  defaultValue={staffData?.address_line_1}
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
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  // value={value}
                  defaultValue={staffData?.address_line_2}
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
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  type="number"
                  // value={value}
                  defaultValue={staffData?.phone_number}
                  label="Phone Number"
                  onChange={onChange}
                  placeholder="Carter"
                  error={Boolean(personalErrors['phone'])}
                  aria-describedby="stepper-linear-personal-phone"
                  helperText={personalErrors?.phone?.message}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">+91</InputAdornment>
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="alt_phone"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  // value={value}
                  defaultValue={staffData?.alternate_number}
                  type="number"
                  label="Alt Phone Number"
                  onChange={onChange}
                  placeholder="Carter"
                  error={Boolean(personalErrors['alt_phone'])}
                  aria-describedby="stepper-linear-personal-alt_phone"
                  helperText={personalErrors?.alt_phone?.message}
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
                  // value={value}
                  defaultValue={staffData?.users?.username}
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
