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
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import { getAllActiveCourses } from 'features/course-management/courses-page/services/courseServices';
import { updateStudent } from 'features/student-management/students/services/studentService';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import * as yup from 'yup';

const StepperLinearWithValidation = () => {
  const location = useLocation();
  const studentData = location?.state?.student;

  console.log('student Edit:', studentData);

  const steps = [
    {
      title: 'Student Information',
      subtitle: 'Add Student Details'
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
    date_of_birth: yup.string().required(),
    gender: yup.string().required(),
    branch: yup.string().required('Branch is required'),
    username: yup
      .string()
      .required('User Name is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'User Name should not contain special characters'),
    course: yup.string().required()
  });

  const [activeStep, setActiveStep] = useState(0);
  console.log(activeStep);
  const [activeCourse, setActiveCourse] = useState([]);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  useEffect(() => {
    getActiveCoursesByBranch(selectedBranchId);
  }, [selectedBranchId]);

  const defaultPersonalValues = {
    last_name: '',
    name: '',
    email: '',
    phone_no: '',
    alternate_number: '',
    state: '',
    city: '',
    pincode: '',
    address_line_1: '',
    address_line_2: '',
    date_of_birth: '',
    gender: '',
    course: '',
    branch: selectedBranchId,
    designation: '',
    education_qualification: '',
    username: '',
    logo: ''
  };

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
    control: personalControl,
    setValue,
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
        address_line_1,
        address_line_2,
        date_of_birth,
        gender,
        branch,
        course,
        education_qualification,
        username
      } = studentData;

      setValue('first_name', first_name || '');
      setValue('last_name', last_name || '');
      setValue('email', email || '');
      setValue('phone_no', phone_no || '');
      setValue('alternate_number', alternate_number || '');
      setValue('state', state || '');
      setValue('city', city || '');
      setValue('pincode', pincode || '');
      setValue('address_line_1 ', address_line_1 || '');
      setValue('address_line_2', address_line_2 || '');
      setValue('date_of_birth', date_of_birth || '');
      setValue('gender', gender || '');
      setValue('branch', branch || '');
      setValue('course', course || '');
      setValue('education_qualification', education_qualification || '');
      setValue('username', username || '');
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

  console.log(logo);

  const onSubmit = useCallback(async () => {
    const personalData = personalControl?._formValues;

    const data = new FormData();
    data.append('first_name', personalData?.first_name);
    data.append('last_name', personalData?.last_name);
    data.append('email', personalData?.email);
    data.append('phone_no', personalData?.phone_no);
    data.append('alternate_number', personalData?.alternate_number);
    data.append('branch_id', personalData?.branch);
    data.append('course_id', personalData?.course);
    data.append('image', logo);
    data.append('gender', personalData?.gender);
    data.append('address_line_1', personalData?.address_line_1);
    data.append('address_line_2', personalData?.address_line_2);
    data.append('city', personalData?.city);
    data.append('state', personalData?.state);
    data.append('pincode', personalData?.pincode);
    data.append('dob', convertDateFormat(personalData?.date_of_birth));
    data.append('username', personalData?.username);
    data.append('education_qualification', personalData?.education_qualification);
    data.append('id', studentData.id);

    const result = await updateStudent(data);

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
                name="first_name"
                control={personalControl}
                rules={{ required: true }}
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
                rules={{ required: true }}
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
                    helperText={personalErrors.email?.message}
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
                    helperText={personalErrors.gender?.message}
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
                        label="Branch"
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
              <Controller
                name="course"
                control={personalControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    fullWidth
                    options={activeCourse}
                    getOptionLabel={(option) => option.course_name}
                    value={activeCourse.find((course) => course.course_id === value) || null}
                    onChange={(event, newValue) => {
                      onChange(newValue ? newValue.course_id : '');
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Course"
                        error={Boolean(personalErrors['course'])}
                        helperText={personalErrors.course?.message}
                        id="custom-select"
                        aria-describedby="stepper-linear-personal-course"
                      />
                    )}
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
                    helperText={personalErrors.qualification?.message}
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
                    helperText={personalErrors.state?.message}
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
                    helperText={personalErrors.city?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="pincode"
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
                rules={{ required: true }}
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
                rules={{ required: true }}
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
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    type="number"
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
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    type="number"
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
                    helperText={personalErrors.username?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="tonal" color="secondary" onClick={handleBack}>
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
