import { yupResolver } from '@hookform/resolvers/yup';
import { TextField as CustomTextField, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
// import UploadIcon from '@mui/icons-material/Upload';
import { getBatchesByCourse } from 'features/batch-management/batches/services/batchServices';

import 'dayjs/locale/en';
import { Stepper, Step, StepLabel } from '@mui/material';

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
    gender: yup.string().required()
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
    student_last_name: '',
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
    getValues,
    formState: { errors: personalErrors }
  } = useForm({
    defaultValues: defaultPersonalValues,
    resolver: yupResolver(personalSchema)
  });
  console.log('personalErrors', personalErrors);

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
    marginRight: theme.spacing(6),
    borderRadius: 50,
    boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.1)'
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
  const [logoSrc, setLogoSrc] = useState('https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg');

  const handleInputImageChange = async (file) => {
    show();
    const { files } = file.target;
    const data = new FormData();
    data.append('file', files[0]);
    const response = await client.file.upload(data);
    setLogo(response.data.file);
    hide();
  };

  const handleInputImageReset = () => {
    setLogo('');
    setLogoSrc(
      'https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg'
    );
  };

  const [activeBatches, setActiveBatches] = useState();
  console.log(activeBatches, 'activeBatches');

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

  const onSubmit = async () => {
    console.log('hello');

    const personalData = getValues();
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
      username: personalData.username,
      dob: convertDateFormat(personalData.date_of_birth),
      gender: personalData.gender,
      branch_id: personalData.branch,
      batch_id: personalData.batch,
      course: personalData.course,
      logo: logo,
      type:'payment'
      // studentId: personalData.studentId
    };

    try {
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
      console.log(error);
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
        <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
          <Grid container spacing={5}>
            {/* Title Section */}
            <Grid item xs={12} textAlign="left">
              <Typography variant="h1" fontWeight={600} color="primary">
                {steps[0].title}
              </Typography>
            </Grid>

            {/* Dotted Divider */}
            <Grid item xs={12}>
              <Box sx={{ borderBottom: '2px dashed ', borderColor: 'grey.200', width: '100%', my: 2 }} />
            </Grid>

            {/* Profile Upload Section */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h3" sx={{ mt: 1, color: 'grey.500' }}>
                  Upload Profile Picture
                </Typography>
                <Typography sx={{ mt: 1, color: 'grey' }}>Allowed PNG or JPEG. Max size of 800K.</Typography>
              </Box>

              <Box
                sx={{
                  flex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '2px dashed ',
                  borderColor: 'grey.300',
                  borderRadius: '8px',
                  padding: '20px',
                  width: '100%',
                  height: '150px',
                  backgroundColor: 'grey.100'
                }}
              >
                {logo ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <ImgStyled
                      src={logo ? getImageUrl(logo) : logoSrc}
                      alt="Profile Pic"
                      style={{ maxHeight: '100px', maxWidth: '100px', objectFit: 'contain' }}
                    />
                    <Box>
                      <Typography sx={{ color: 'grey.600', fontSize: '14px' }}>{logo}</Typography>
                      <Typography sx={{ color: 'grey.500', fontSize: '12px' }}>PNG, JPG</Typography>
                      <ResetButtonStyled color="error" variant="tonal" onClick={handleInputImageReset}>
                        Reset
                      </ResetButtonStyled>
                    </Box>
                  </Box>
                ) : (
                  <>
                    <CloudUploadIcon sx={{ fontSize: 40, color: 'grey.400' }} />
                    <Typography sx={{ mt: 1, color: 'grey.600' }}>
                      <Typography component="label" sx={{ color: 'teal', fontWeight: 'bold', cursor: 'pointer' }} htmlFor="upload-image">
                        Upload an image
                      </Typography>{' '}
                      or drag and drop
                    </Typography>
                    <Typography sx={{ color: 'grey.500', fontSize: '12px' }}>PNG, JPG</Typography>
                    <input hidden type="file" accept="image/png, image/jpeg" onChange={handleInputImageChange} id="upload-image" />
                  </>
                )}
              </Box>
            </Grid>

            {/* Dotted Divider */}
            <Grid item xs={12}>
              <Box sx={{ borderBottom: '2px dashed ', borderColor: 'grey.200', width: '100%', my: 2 }} />
            </Grid>

            {/* Student Details Section */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h3" sx={{ mt: 1, color: 'grey.500' }}>
                  Student Details
                </Typography>
                <Typography sx={{ mt: 1, color: 'grey' }}>Add user details here </Typography>
              </Box>

              <Box
                sx={{
                  flex: 2,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  padding: '20px',
                  borderRadius: '8px',
                  width: '100%',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'grey.100'
                }}
              >
                <Grid container spacing={3}>
                  {[
                    { name: 'student_first_name', label: 'First Name', placeholder: 'Leonard' },
                    { name: 'student_last_name', label: 'Last Name', placeholder: 'Lee' },
                    { name: 'student_email', label: 'Email', placeholder: 'example@email.com' },
                    { name: 'date_of_birth', label: 'Date Of Birth', component: DatePicker },
                    { name: 'gender', label: 'Gender', options: ['Male', 'Female', 'Other'] },
                    { name: 'qualification', label: 'Qualification' },
                    { name: 'batch', label: 'Batch' , options: ['Morning', 'Afternoon'] }
                  ].map(({ name, label, placeholder, component, options }, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Controller
                        name={name}
                        control={personalControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) =>
                          component ? (
                            <DatePicker
                              selected={value}
                              customInput={
                                <CustomTextField
                                  label={label}
                                  error={Boolean(personalErrors[name])}
                                  helperText={personalErrors[name]?.message}
                                  sx={{ backgroundColor: 'grey.100' }}
                                />
                              }
                              onChange={onChange}
                            />
                          ) : options ? (
                            <CustomTextField
                              select
                              fullWidth
                              label={label}
                              value={value}
                              onChange={onChange}
                              error={Boolean(personalErrors[name])}
                              helperText={personalErrors[name]?.message}
                              sx={{ backgroundColor: 'grey.100' }}
                            >
                              {options.map((opt, i) => (
                                <MenuItem key={i} value={opt}>
                                  {opt}
                                </MenuItem>
                              ))}
                            </CustomTextField>
                          ) : (
                            <CustomTextField
                              fullWidth
                              label={label}
                              value={value}
                              onChange={onChange}
                              placeholder={placeholder}
                              error={Boolean(personalErrors[name])}
                              helperText={personalErrors[name]?.message}
                              sx={{ backgroundColor: 'grey.100' }}
                            />
                          )
                        }
                      />
                    </Grid>
                  ))}

                  {/* Branch Field  */}
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
                              sx={{ backgroundColor: 'grey.100' }}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>

                  {/* Course Field  */}
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
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select Course"
                              error={Boolean(personalErrors['course'])}
                              helperText={personalErrors.course?.message}
                              id="custom-select"
                              aria-describedby="stepper-linear-personal-course"
                              sx={{ backgroundColor: 'grey.100' }}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Dotted Divider */}
            <Grid item xs={12}>
              <Box sx={{ borderBottom: '2px dashed ', borderColor: 'grey.200', width: '100%', my: 2 }} />
            </Grid>

            {/* Contact Info Section */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h3" sx={{ mt: 1, color: 'grey.500' }}>
                  Contact Info
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: 2,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  padding: '20px',
                  borderRadius: '8px',
                  width: '100%',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'grey.100'
                }}
              >
                <Grid container spacing={3}>
                  {[
                    { name: 'address_line_one', label: 'Address Line One' },
                    { name: 'address_line_two', label: 'Address Line Two' },
                    { name: 'city', label: 'City' },
                    { name: 'state', label: 'State' },
                    { name: 'pin_code', label: 'Pin Code', type: 'number' },
                    { name: 'student_phone_no', label: 'Phone Number', type: 'number', adornment: '+91' },
                    { name: 'alt_phone', label: 'Alt Phone Number', type: 'number', adornment: '+91' }
                  ].map(({ name, label, type, adornment }, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Controller
                        name={name}
                        control={personalControl}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            label={label}
                            value={value}
                            onChange={onChange}
                            type={type}
                            InputProps={
                              adornment ? { startAdornment: <InputAdornment position="start">{adornment}</InputAdornment> } : null
                            }
                            error={Boolean(personalErrors[name])}
                            helperText={personalErrors[name]?.message}
                          />
                        )}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* Submit and Cancel Buttons */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="tonal" color="secondary" onClick={handleBack}>
                Cancel
              </Button>

              <Button type="submit" variant="contained">
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
