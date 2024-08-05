import MenuItem from '@mui/material/MenuItem';
import { forwardRef, useEffect, useState } from 'react';
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
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import { TextField as CustomTextField, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import { getAllCourses } from 'features/course-management/courses-page/services/courseServices';
import { updateTeachingStaff } from 'features/staff-management/teaching-staffs/services/teachingStaffServices';
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import InputAdornment from '@mui/material/InputAdornment';
import { checkUserName } from 'features/user-management/users-page/services/userServices';
import { imagePlaceholder } from 'utils/placeholders';
import { getImageUrl } from 'utils/imageUtils';
import client from 'api/client';
import { useSpinner } from 'context/spinnerContext';

const StepperLinearWithValidation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const staffData = location.state.staff;
  const staffId = location.state.id;
  

  console.log(staffId,staffData)
  const [activeCourse, setActiveCourse] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [logo, setLogo] = useState('');
  const [logoSrc, setLogoSrc] = useState(
    'https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg'
  );
  const { show, hide } = useSpinner()
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const steps = [
    {
      title: 'Edit Teaching Staff',
      subtitle: 'Edit Informion'
    }
  ];

  const defaultPersonalValues = {
    full_name: '',
    email: '',
    phone_number: '',
    alternate_phone_number: '',
    state: '',
    city: '',
    pincode: '',
    address1: '',
    address2: '',
    date_of_birth: '',
    gender: '',
    course: '',
    branch: '',
    designation: '',
    qualification: '',
    // username: '',
    logo: '',
  };

  const CustomInput = forwardRef(({ ...props }, ref) => {
    return <TextField fullWidth inputRef={ref} {...props} />;
  });

  const personalSchema = yup.object().shape({
    full_name: yup
      .string()
      .required('Full Name is required')
      .matches(/^[a-zA-Z\s]+$/, 'Full Name should only contain alphabets'),
    email: yup
      .string()
      .required('Email is required')
      .matches(/^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'),
    phone_number: yup
      .string()
      .required('Phone number is required')
      .matches(/^\d{10,}$/, 'Phone number must be at least 10 digits'),
      alternate_phone_number: yup
      .string()
      .required('Alternate phone_number number is required')
      .matches(/^\d{10,}$/, 'Alternate phone_number number must be at least 10 digits'),
    designation: yup
      .string()
      .required('Designation is required')
      .matches(/^[a-zA-Z\s]+$/, 'Designation should only contain alphabets'),
    qualification: yup
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

    pincode: yup
      .string()
      .required('Pin code is required')
      .matches(/^\d{6}$/, 'Pin code must be 6 digits'),

    address1: yup.string().required('Address line one is required'),
    address2: yup.string().required('Address line two is required'),
    date_of_birth: yup.string().required('Date of birth is required'),
    gender: yup.string().required('Gender is required'),
    // username: yup
    //   .string()
    //   // .required('Username is required')
    //   .matches(/^[a-zA-Z0-9]+$/, 'Username should only contain alphabets and numbers')
  });

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
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors },
    setError,
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

  useEffect(() => {
    if (staffData) {
      setValue('id', staffId);
      setValue('full_name', staffData?.full_name);
      setValue('email', staffData?.email);
      setValue('phone_number', Number(staffData?.contact_info?.phone_number));
      setValue('alternate_phone_number', Number(staffData?.contact_info?.alternate_phone_number));
      setValue('designation', staffData?.userDetail?.designation);
      setValue('branch_id', staffData?.userDetail?.branch_id);
      setValue('image', staffData?.image);
      setValue('gender', staffData?.gender);
      setValue('address1', staffData?.contact_info?.address1);
      setValue('address2', staffData?.contact_info?.address2);
      setValue('city', staffData?.contact_info?.city);
      setValue('state', staffData?.contact_info?.state);
      setValue('pincode', staffData?.contact_info?.pincode);
      setValue('date_of_birth', new Date(staffData?.dob) || new Date()); // Set class date
      setValue('username', staffData?.full_name);
      setValue('qualification', staffData?.qualification);
      setSelectedCourses(staffData?.userDetail?.course);
      setLogo(staffData?.image)
    }
  }, [staffData]);


  const handleInputImageChange = async (file) => {
    try {
      const {files } = file.target
      const form_data = new FormData()
      form_data.append("file",files[0])
     
      const response = await client.file.upload(form_data)
      setLogo(response?.data?.file)
      setValue("image",response?.data?.file)  
      toast.success("profile changed sucessfully")
    } catch (error) {
      toast.error(error?.message)
    }
  };

  const handleInputImageReset = () => {
    setLogo(staffData?.image)
  };

  console.log(personalControl?._formValues,"values")

  const onSubmit = async () => {
    const personalData = personalControl?._formValues;
    const filteredCourseId = selectedCourses?.map((course) => course._id);
    const userDetail = staffData?.userDetail?._id
  
    const teaching = {
      id : staffId,
      course:filteredCourseId,
      email: personalData?.email,
      full_name: personalData?.full_name,
      username: personalData?.full_name,
      dob: (personalData?.date_of_birth),
      gender: personalData?.gender,
      userDetail: userDetail ,
      qualification: personalData?.qualification,
      contact_info: {
        state: personalData?.state,
        city: personalData?.city,
        pincode: personalData?.pincode,
        address1: personalData?.address1,
        address2: personalData?.address2,
        phone_number: personalData?.phone_number,
        alternate_phone_number: personalData?.alternate_phone_number
      },
      designation: personalData?.designation,
      image : logo
    };
    console.log(teaching,staffData,staffData?.userDetail?._id,filteredCourseId,selectedCourses)
    
    const result = await updateTeachingStaff(teaching);
    
      if (result.success) {
        toast.success(result.message);
        navigate(-1);
      } else {
        
        toast.error(result.message);
      // }
    }
  };

  console.log(staffData,"staffData",defaultPersonalValues,"errors",staffData?.userDetail?._id)

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

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {logo && (
                <ImgStyled
                  src={logo ? getImageUrl(logo) : imagePlaceholder }
                  alt={ staffData?.full_name || "Profile Pic"}
                />
              )}

              {!logo && <ImgStyled src={imagePlaceholder} alt="Profile Pic" />}
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
                {
                logo !== staffData?.image && <ResetButtonStyled color="error" variant="tonal" onClick={handleInputImageReset}>
                  Reset
                </ResetButtonStyled>
                }
                <Typography sx={{ mt: 4, color: 'text.disabled', justifyContent: 'center', display: 'flex' }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
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
                  defaultValue={staffData?.full_name}
                  label="FullName"
                  onChange={onChange}
                  placeholder="Leonard"
                  aria-describedby="stepper-linear-personal-institute_name"
                  error={Boolean(personalErrors.full_name)}
                  {...(personalErrors.full_name && { helperText: personalErrors.full_name.message })}
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
                  defaultValue={staffData?.email}
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
            <Controller
              name="date_of_birth"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { value } }) => (
                <DatePicker
                  id="issue-date"
                  value={value}
                  selected={value}
                  onChange={(date) => {
                    setValue('date_of_birth', date);
                  }}
                  customInput={
                    <CustomInput
                      label="Date Of Birth"
                      error={Boolean(personalErrors.date_of_birth)}
                      {...(personalErrors.date_of_birth && { helperText: personalErrors.date_of_birth.message })}
                      aria-describedby="stepper-linear-personal-date_of_birth"
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
                  onChange={onChange}
                  defaultValue={staffData?.gender}
                  label="Gender"
                  placeholder="Select Gender"
                  aria-describedby="stepper-linear-personal-gender"
                  error={Boolean(personalErrors.gender)}
                  {...(personalErrors.gender && { helperText: personalErrors.gender.message })}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="course"
              control={personalControl}
              rules={{ required: true }}
              render={() => (
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  id="select-multiple-chip"
                  options={[{ _id: 'selectAll', course_name: 'Select All' }, ...activeCourse]}
                  getOptionLabel={(option) => option.course_name}
                  value={selectedCourses}
                  onChange={(e, newValue) => {
                    if (newValue && newValue.some((option) => option._id === 'selectAll')) {
                      setSelectedCourses(activeCourse.filter((option) => option._id !== 'selectAll'));
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
                          key={option._id}
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
                  isOptionEqualToValue={(option, value) => option._id === value._id}
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
                  defaultValue={staffData?.userDetail?.designation}
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
              name="qualification"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  defaultValue={staffData?.qualification}
                  label="Qualification"
                  onChange={onChange}
                  aria-describedby="stepper-linear-personal-qualification-helper"
                  error={Boolean(personalErrors.qualification)}
                  {...(personalErrors.qualification && { helperText: personalErrors.qualification.message })}
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
                  defaultValue={staffData?.contact_info?.state}
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
              name="city"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  defaultValue={staffData?.contact_info?.city}
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
              name="pincode"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  defaultValue={staffData?.contact_info?.pincode}
                  label="Pin Code"
                  type="number"
                  onChange={onChange}
                  placeholder="Carter"
                  aria-describedby="stepper-linear-personal-pincode"
                  error={Boolean(personalErrors.pincode)}
                  {...(personalErrors.pincode && { helperText: personalErrors.pincode.message })}
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
                  defaultValue={staffData?.contact_info?.address1}
                  label="Address Line One"
                  onChange={onChange}
                  placeholder="Carter"
                  aria-describedby="stepper-linear-personal-address1"
                  error={Boolean(personalErrors.address1)}
                  {...(personalErrors.address1 && { helperText: personalErrors.address1.message })}
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
                  defaultValue={staffData?.contact_info?.address2}
                  label="Address Line Two"
                  onChange={onChange}
                  placeholder="Carter"
                  aria-describedby="stepper-linear-personal-address2"
                  error={Boolean(personalErrors.address2)}
                  {...(personalErrors.address2 && { helperText: personalErrors.address2.message })}
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
                  defaultValue={Number(staffData?.contact_info?.phone_number)}
                  label="Phone Number"
                  onChange={onChange}
                  placeholder="Carter"
                  aria-describedby="stepper-linear-personal-phone_number"
                  error={Boolean(personalErrors.phone_number)}
                  {...(personalErrors.phone_number && { helperText: personalErrors.phone_number.message })}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">+91</InputAdornment>
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="alternate_phone_number"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <CustomTextField
                  fullWidth
                  defaultValue={String(staffData?.contact_info?.alternate_phone_number)}
                  type="number"
                  label="Alt Phone Number"
                  onChange={onChange}
                  placeholder="Carter"
                  aria-describedby="stepper-linear-personal-alternate_number"
                  error={Boolean(personalErrors.name)}
                  {...(personalErrors.name && { helperText: personalErrors.name })}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">+91</InputAdornment>
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ display : "none"}} >
            <Controller
              name="username"
              control={personalControl}
              rules={{ required: true }}
              render={({ field: { value } }) => (
                <TextField
                  fullWidth
                  value={staffData?.full_name}
                  sx={{ mb: 4 }}
                  label="Username"
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
