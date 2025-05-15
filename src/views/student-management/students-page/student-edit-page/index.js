import { yupResolver } from '@hookform/resolvers/yup';
import { TextField as CustomTextField, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { getAllCourses } from 'features/course-management/courses-page/services/courseServices';
import { updateStudent } from 'features/student-management/students/services/studentService';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import * as yup from 'yup';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CustomChip from 'components/mui/chip';
import Checkbox from '@mui/material/Checkbox';
import { getImageUrl } from 'utils/imageUtils';
import { imagePlaceholder } from 'utils/placeholders';
import { Link } from 'react-router-dom';
import client from 'api/client';

const StepperLinearWithValidation = () => {
  const location = useLocation();
  const studentData = location?.state?.student;

  const steps = [
    {
      title: 'Student Information',
      subtitle: 'Edit Student Details'
    }
  ];

  const CustomInput = forwardRef(({ ...props }, ref) => {
    return <TextField fullWidth inputRef={ref} {...props} />;
  });

  const personalSchema = yup.object().shape({
    first_name: yup
      .string()
      .required('First Name is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'First Name should not contain special characters'),
    last_name: yup
      .string()
      .required('Last Name is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Last Name should not contain special characters'),
    email: yup.string().email().required('Email is required'),
    phone_no: yup
      .string()
      .required('Phone No. is required')
      .matches(/^[0-9]{10}$/, 'Phone No. should be exactly 10 digits'),
    alternate_number: yup
      .string()
      .required('Alternate Phone No. is required')
      .matches(/^[0-9]{10}$/, 'Alternate Phone No. should be exactly 10 digits'),
    state: yup
      .string()
      .required('state is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'state should not contain special characters'),
    city: yup
      .string()
      .required('city is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'city should not contain special characters'),
    pincode: yup
      .string()
      .required('Pin Code is required')
      .matches(/^[0-9]{6}$/, 'PIN Code should be exactly 6 digits'),
    address_line_1: yup.string().required('Address Line One is required'),
    address_line_2: yup.string().required('Address Line Two is required'),
    dob: yup.string().required(),
    gender: yup.string().required(),
    username: yup
      .string()
      .required('User Name is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'User Name should not contain special characters'),
    course: yup.string().required()
  });

  const [activeStep, setActiveStep] = useState(0);

  const [activeCourse, setActiveCourse] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    getActiveCoursesByBranch(data);
  }, [selectedBranchId]);

  const defaultPersonalValues = {
    last_name: '',
    first_name: '',
    email: '',
    phone_no: '',
    alternate_number: '',
    state: '',
    city: '',
    pincode: '',
    address_line_1: '',
    address_line_2: '',
    dob: '',
    gender: '',
    course: '',
    branch: selectedBranchId,
    // designation: '',
    education_qualification: '',
    username: '',
    full_name: '',
    logo: ''
  };

  const getActiveCoursesByBranch = async (data) => {
    const result = await getAllCourses(data);
    if (result?.data) {
      setActiveCourse(result?.data);
    }
  };

  const {
    control: personalControl,
    setValue,
    getValues,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors }
  } = useForm({
    defaultValues: defaultPersonalValues,
    resolver: yupResolver(personalSchema)
  });

  useEffect(() => {
    if (studentData) {
      const {
        first_name,
        last_name,
        email,
        phone_no,
        alternate_number,
        state,
        city,
        pincode,
        address1,
        address2,
        dob,
        gender,
        qualification,
        username,
        full_name,
        contact_info
      } = studentData;

      setValue('first_name', first_name || '');
      setValue('last_name', last_name || '');
      setValue('email', email || '');
      setValue('phone_no', contact_info.phone_number?.slice(3) || '');
      setValue('alternate_number', contact_info?.alternate_phone_number?.slice(3) || '');
      setValue('state', contact_info.state || '');
      setValue('city', contact_info.city || '');
      setValue('pincode', contact_info.pincode || '');
      setValue('address_line_1', contact_info.address1 || '');
      setValue('address_line_2', contact_info.address2 || '');
      setValue('dob', new Date(dob) || '');
      setValue('gender', gender || '');
      setValue('education_qualification', qualification || '');
      setValue('username', full_name || '');
      setValue("course",studentData?.userDetail?.course?._id)
      setSelectedCourses([studentData?.userDetail?.course]);
    }
  }, [studentData, setValue]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
  const [logoSrc, setLogoSrc] = useState('');


  const handleInputImageChange = async(file) => {
    const reader = new FileReader();
    const { files } = file.target;
    const image = files[0]
    if (image.size > 1048576) {
      return toast.success("image upload lesser than 1mb")
    }
    const data = new FormData()
    data.append("file",files[0])
    const file_upload = await client.file.upload(data)
    toast.success(file_upload?.message)
    setLogoSrc(file_upload?.data?.file)
    setLogo(file_upload?.data?.file)
  };

  const handleInputImageReset = () => {
    setLogo('');
    setLogoSrc(
      'https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg'
    );
  };


  const onSubmit = useCallback(async () => {
    const personalData = getValues();
    console.log('personalData:', personalData);
    const filteredCourseId = selectedCourses?.map((course) => course._id);
    const data = new FormData();
    const new_user_data = {
      course : filteredCourseId,
      first_name : personalData?.first_name,
      last_name : personalData?.last_name,
      email : personalData?.email,
      gender : personalData?.gender,
      dob : convertDateFormat(personalData?.dob),
      contact_info : {
        phone_number : "+91 "+personalData?.phone_no,
        alternate_phone_number : "+91 "+personalData?.alternate_number,
        address1 : personalData?.address_line_1,
        address2 : personalData?.address_line_2,
        city : personalData?.city,
        pincode : personalData?.pincode,
        state : personalData?.state
      },
      uuid : studentData?.uuid,
      username : personalData?.full_name,
      image : logo ? logo : studentData?.image
    }
    console.log('updating data fields:', new_user_data);
    const result = await updateStudent(new_user_data);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  });

  return (
    <Card>

      <CardContent>

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
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={logo?getImageUrl(logo):getImageUrl(studentData?.image)} alt="Profile Pic" />
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
                name="first_name"
                control={personalControl}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="First Name"
                    onChange={onChange}
                    placeholder="Leonard"
                    error={Boolean(personalErrors['first_name'])}
                    aria-describedby="stepper-linear-personal-institute_first_name"
                    helperText={personalErrors.first_name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="last_name"
                control={personalControl}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="Last Name"
                    onChange={onChange}
                    error={Boolean(personalErrors.last_name)}
                    aria-describedby="stepper-linear-personal-last_name-helper"
                    helperText={personalErrors.last_name?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={personalControl}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="Email"
                    onChange={onChange}
                    placeholder="Carter"
                    error={Boolean(personalErrors['email'])}
                    aria-describedby="stepper-linear-personal-official_email"
                    helperText={personalErrors.email?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="dob"
                control={personalControl}
                render={({ field: { value, onChange } }) => (
                 
                  <DatePicker
                    id="issue-date"
                    dateFormat={'dd/MM/yyyy'}
                    value={value}
                    selected={value}
                    customInput={
                      <CustomInput
                        label="Date Of Birth"
                        error={Boolean(personalErrors["dob"])}
                        aria-describedby="stepper-linear-personal-date_of_birth"
                        {...(personalErrors["dob"] && { helperText: 'This field is required' })}
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
                    helperText={personalErrors.gender?.message}
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
                name="education_qualification"
                control={personalControl}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="Qualification"
                    onChange={onChange}
                    error={Boolean(personalErrors.state)}
                    aria-describedby="stepper-linear-personal-qualification-helper"
                    helperText={personalErrors.qualification?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="state"
                control={personalControl}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="State"
                    onChange={onChange}
                    error={Boolean(personalErrors.state)}
                    aria-describedby="stepper-linear-personal-state-helper"
                    helperText={personalErrors.state?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="city"
                control={personalControl}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="City"
                    onChange={onChange}
                    error={Boolean(personalErrors.city)}
                    aria-describedby="stepper-linear-personal-city-helper"
                    helperText={personalErrors.city?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="pincode"
                control={personalControl}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="Pin Code"
                    type="number"
                    onChange={onChange}
                    placeholder="Carter"
                    error={Boolean(personalErrors['pincode'])}
                    aria-describedby="stepper-linear-personal-pin_code"
                    helperText={personalErrors.pincode?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="address_line_1"
                control={personalControl}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="Address Line One"
                    onChange={onChange}
                    placeholder="Carter"
                    error={Boolean(personalErrors['address_line_1'])}
                    aria-describedby="stepper-linear-personal-address_line_1"
                    helperText={personalErrors.address_line_1?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="address_line_2"
                control={personalControl}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="Address Line Two"
                    onChange={onChange}
                    placeholder="Carter"
                    error={Boolean(personalErrors['address_line_2'])}
                    aria-describedby="stepper-linear-personal-address_line_2"
                    helperText={personalErrors.address_line_2?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="phone_no"
                control={personalControl}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    type="text"
                    value={value}
                    label="Phone Number"
                    onChange={onChange}
                    placeholder="Carter"
                    error={Boolean(personalErrors['phone_no'])}
                    aria-describedby="stepper-linear-personal-phone"
                    helperText={personalErrors.phone_no?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="alternate_number"
                control={personalControl}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    type="text"
                    label="Alt Phone Number"
                    onChange={onChange}
                    placeholder="Carter"
                    error={Boolean(personalErrors['alternate_number'])}
                    aria-describedby="stepper-linear-personal-alternate_number"
                    helperText={personalErrors.alternate_number?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="username"
                control={personalControl}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="Username"
                    onChange={onChange}
                    placeholder="carterLeonard"
                    error={Boolean(personalErrors['username'])}
                    aria-describedby="stepper-linear-account-username"
                    helperText={personalErrors.username?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button component={Link} variant="tonal"  color="secondary" state={{id:studentData?.uuid}} to= {`/student-management/students/${studentData?.uuid}/`} >
                Cancel
              </Button>

              <Button type="submit" variant="contained" sx={{ mr: 3 }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};
export default StepperLinearWithValidation;
