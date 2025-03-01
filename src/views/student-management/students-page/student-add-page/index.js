import { yupResolver } from '@hookform/resolvers/yup';
import { TextField as CustomTextField, TextField } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import client from 'api/client';
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import { getAllCourses } from 'features/course-management/courses-page/services/courseServices';
import { addStudent } from 'features/student-management/students/services/studentService';
import { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useInstitute } from 'utils/get-institute-details';
import { getImageUrl } from 'utils/imageUtils';
// import ImagePlaceholder from 'components/cards/Skeleton/ImagePlaceholder';
// import { imagePlaceholder } from 'utils/placeholders';
import { useSpinner } from 'context/spinnerContext';
import UploadIcon from '@mui/icons-material/Upload';
import { getBatchesByCourse } from 'features/batch-management/batches/services/batchServices';


import { Stepper, Step, StepLabel } from '@mui/material';
import { borderRadius } from '@mui/system';

const StepperLinearWithValidation = () => {
  const steps = [
    {
      title: 'Add New Student',
      subtitle: 'Enter Student Details'
    }
  ];

  const CustomInput = forwardRef(({ ...props }, ref) => {
    return <TextField fullWidth inputRef={ref} {...props} />;
  });

  const personalSchema = yup.object().shape({
    student_first_name: yup
      .string()
      .required('First Name is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'First Name should not contain special characters'),
    student_last_name: yup
      .string()
      .required('Last Name is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Last Name should not contain special characters'),
    student_email: yup.string().email().required('Email is required'),
    student_phone_no: yup
      .string()
      .required('Phone No. is required')
      .matches(/^[0-9]{10}$/, 'Phone No. should be exactly 10 digits'),
    alt_phone: yup
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
    pin_code: yup
      .string()
      .required('PIN Code is required')
      .matches(/^[0-9]{6}$/, 'PIN Code should be exactly 6 digits'),
    qualification: yup
      .string()
      .required('Qualification is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Qualification should not contain special characters'),
    address_line_one: yup.string().required('Address Line One is required'),
    address_line_two: yup.string().required('Address Line Two is required'),
    date_of_birth: yup.string().required(),
    gender: yup.string().required(),
    // username: yup
    //   .string()
    //   .required('User Name is required')
    //   .matches(/^[a-zA-Z0-9\s]+$/, 'User Name should not contain special characters')
    // staffId:yup.string().required('Unique Id'),
  });

  const [activeCourse, setActiveCourse] = useState([]);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const Navigate = useNavigate();
  const { show, hide } = useSpinner();
    const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    getActiveCoursesByBranch(data);
  }, [selectedBranchId]);


  const defaultPersonalValues = {
    student_first_name: '',
    student_last_name:'',
    student_email: '',
    student_phone_no: '',
    alt_phone: '',
    state: '',
    city: '',
    pin_code: '',
    address_line_one: '',
    address_line_two: '',
    date_of_birth: '',
    gender: '',
    course: '',
    batch:'',
    branch: selectedBranchId,
    // designation: '',
    education_qualification: '',
    // username: '',
    // studentId: '',
    logo: ''
  };

  const getActiveCoursesByBranch = async (data) => {
    const result = await getAllCourses(data);

    if (result?.data) {
      setActiveCourse(result?.data);
    }
  };



  const [activeBranches, setActiveBranches] = useState([]);
  useEffect(() => {
    getActiveBranchesByUser();
    getActiveBatchesByCourse()
  }, []);

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();
    setActiveBranches(result.data);
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

  const handleBack = () => {
    Navigate(-1);
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

    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid green', // Green border
    boxShadow: '0 0 5px 3px rgba(0, 128, 0, 0.5)' // Green glow effect
  }));

  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center',
      borderRadius: 50
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
  const [logoSrc, setLogoSrc] = useState('https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg');

  const handleInputImageChange = async (file) => {
    show();
    const { files } = file.target;
    const data = new FormData();
    data.append('file', files[0]);
    const response = await client.file.upload(data);

    
    toast.success(response.message);
    setLogo(response.data.file);
    hide();
  };

  const handleInputImageReset = () => {
    setLogo('');
    setLogoSrc(
      'https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg'
    );
  };
const [activeBatches,setActiveBatches]=useState()
console.log(activeBatches,'activeBatches');


const getActiveBatchesByCourse = async (courseId) => {
  show();
  const data = { course_id: courseId, branch_id: selectedBranchId }; // Include branch_id in the request data
  const result = await getBatchesByCourse(data);
  if (result?.success) {
    hide();
    setActiveBatches(result?.data);
  } else {
    hide();
  }
};
  console.log(personalErrors)
  const onSubmit = async () => {
    console.log('iam working before result 0');

    const personalData = personalControl?._formValues;
    console.log(personalData.batch);
    
    show();
    const student_data = {
      first_name: personalData.student_first_name,
      last_name: personalData.student_last_name,
      email: personalData.student_email,
      institute_id: useInstitute().getInstituteId(),
      contact_info: {
        state: personalData.state,
        city: personalData.city,
        pincode: personalData.pin_code,
        address1: personalData.address_line_one,
        address2: personalData.address_line_two,
        phone_number: '+91' + personalData.student_phone_no,
        alternate_phone_number: '+91' + personalData?.alt_phone
      },
      qualification: personalData.qualification,
      // username : personalData.username,
      dob: convertDateFormat(personalData.date_of_birth),
      gender: personalData.gender,
      branch_id: personalData.branch,
      batch: personalData.batch,
      course: personalData.course,
      image: logo,
      logo:logo,
      studentId: personalData.studentId,
      type:'payment'
    };

    
 
    try {
      console.log('iam working before result 1');
      console.log('Student Data:', student_data); 
      const result = await addStudent(student_data);

      if (result.success) {
        hide();
        setDialogTitle('Success');
        setDialogMessage(result.message);
        setOpen(true);
        toast.success(result.message);
        Navigate(-1);
        return;
      } else {
        hide();
        setDialogTitle('Error');
        setDialogMessage(result.message);
        setOpen(true);
        toast.error(result.message);
      }
    } catch (error) {
      hide();
      setDialogTitle('Error');
      setDialogMessage('An error occurred while adding the student.');
      setOpen(true);
      console.error(error);
    }
    // }
  };
const handleClose = () => {
    setOpen(false);
    if (dialogTitle === 'Success') {
      Navigate(-1);
    }
  };
  return (
    <Card>
      <CardContent>
        <form onSubmit={handlePersonalSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography
                variant="h1"
                sx={{ fontWeight: 600, color: 'text.primary', display: 'flex', justifyContent: 'center', textalign: 'center' }}
              >
                {steps[0].title}
              </Typography>
              <Typography
                variant="caption"
                component="p"
                sx={{ fontSize: 15, color: 'grey', display: 'flex', justifyContent: 'center', textalign: 'center' }}
              >
                {steps[0].subtitle}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <ImgStyled src={logo ? getImageUrl(logo) : logoSrc } alt="Profile Pic" />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                  <ButtonStyled
                    sx={{ borderRadius: 50 }}
                    component="label"
                    variant="contained"
                    htmlFor="account-settings-upload-image"
                    startIcon={<UploadIcon />}
                  >
                    Upload
                    <input
                      hidden
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handleInputImageChange}
                      id="account-settings-upload-image"
                    />
                  </ButtonStyled>
                  <ResetButtonStyled sx={{ borderRadius: 50 }} color="error" variant="tonal" onClick={handleInputImageReset}>
                    Reset
                  </ResetButtonStyled>
                </div>
                <Typography sx={{ mt: 2, color: 'text.disabled', color: 'grey' }}>Allowed PNG or JPEG. Max size of 800K.</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="student_first_name"
                control={personalControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="First Name"
                    onChange={onChange}
                    placeholder="Leonard"
                    error={Boolean(personalErrors['student_first_name'])}
                    aria-describedby="stepper-linear-personal-institute_student_first_name"
                    helperText={personalErrors.student_first_name?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="student_last_name"
                control={personalControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="Last Name"
                    onChange={onChange}
                    error={Boolean(personalErrors.student_last_name)}
                    aria-describedby="stepper-linear-personal-student_last_name-helper"
                    helperText={personalErrors.student_last_name?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="student_email"
                control={personalControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label="Email"
                    onChange={onChange}
                    placeholder="Carter"
                    error={Boolean(personalErrors['student_email'])}
                    aria-describedby="stepper-linear-personal-official_student_email"
                    helperText={personalErrors.student_email?.message}
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
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
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
                    getOptionLabel={(option) => option.branch_identity}
                    value={activeBranches.find((branch) => branch.uuid === value) || null}
                    onChange={(event, newValue) => {
                      setValue('branch', newValue ? newValue.uuid : '');
                      getActiveCoursesByBranch(newValue ? { branch_id: newValue.uuid } : '');
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
              <Controller
                name="course"
                control={personalControl}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    fullWidth
                    options={activeCourse}
                    getOptionLabel={(option) => option.course_name}
                    value={activeCourse.find((course) => course.uuid === value) || null}
                    onChange={(event, newValue) => {
                      onChange(newValue ? newValue.uuid : '');
                      getActiveBatchesByCourse(newValue ? { courseId: newValue.uuid } : '')
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
                name="batch"
                control={personalControl}
                rules={{ required: true }}
                render={({ field: { value } }) => (
                  <Autocomplete
                    fullWidth
                    options={activeBatches}
                    getOptionLabel={(option) => option.batch_name}
                    value={activeBatches}
                    onChange={(event, newValue) => {
                      setValue('batch', newValue ? newValue.uuid : '');
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Batch"
                        error={Boolean(personalErrors['batch'])}
                        helperText={personalErrors.batch?.message}
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
                name="qualification"
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
                    helperText={personalErrors.pin_code?.message}
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
                    helperText={personalErrors.address_line_one?.message}
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
                    helperText={personalErrors.address_line_two?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="student_phone_no"
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
                    InputProps={{
                      startAdornment: <InputAdornment position="start">+91</InputAdornment>
                    }}
                    error={Boolean(personalErrors['student_phone_no'])}
                    aria-describedby="stepper-linear-personal-phone"
                    helperText={personalErrors.student_phone_no?.message}
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
                    InputProps={{
                      startAdornment: <InputAdornment position="start">+91</InputAdornment>
                    }}
                    error={Boolean(personalErrors['alt_phone'])}
                    aria-describedby="stepper-linear-personal-alt_phone"
                    helperText={personalErrors.alt_phone?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="tonal"
                color="secondary"
                onClick={handleBack}
                sx={{
                  backgroundColor: '#f5f5f5',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: '#e0e0e0'
                  }
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  mr: 3,
                  backgroundColor: 'black',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'black',
                    color: 'white'
                  }
                }}
              >
                Add Student
              </Button>
            </Grid>
          </Grid>
        </form>
        <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: 3, // Rounded corners
          boxShadow: 6, // Subtle shadow effect
          padding: 2,
          backgroundColor: "#fff",
          maxWidth: "400px",
        },
      }}
      transitionDuration={300} // Smooth fade effect
    >
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "#333", textAlign: "center" }}>
        {dialogTitle}
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: "1rem", color: "#666", lineHeight: 1.5 }}>
          {dialogMessage}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
        <Button
          onClick={handleClose}
          sx={{
            backgroundColor: "#007bff",
            color: "#fff",
            "&:hover": { backgroundColor: "#0056b3" },
            padding: "8px 20px",
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>

      </CardContent>
    </Card>
  );
};
export default StepperLinearWithValidation;
