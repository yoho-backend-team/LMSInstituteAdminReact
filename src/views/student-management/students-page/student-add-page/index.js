import { yupResolver } from '@hookform/resolvers/yup';
import { TextField as CustomTextField, TextField } from '@mui/material';
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
import ImagePlaceholder from 'components/cards/Skeleton/ImagePlaceholder';
import { imagePlaceholder } from 'utils/placeholders';
import { useSpinner } from 'context/spinnerContext';
import UploadIcon from '@mui/icons-material/Upload';
import 'dayjs/locale/en'; // Add your preferred locale

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
    gender: yup.string().required(),
    username: yup
      .string()
      .required('User Name is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'User Name should not contain special characters')
    // staffId:yup.string().required('Unique Id'),
  });

  const [activeCourse, setActiveCourse] = useState([]);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const Navigate = useNavigate();
  const { show, hide } = useSpinner();

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    getActiveCoursesByBranch(data);
  }, [selectedBranchId]);

  const defaultPersonalValues = {
    student_first_name: '',
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
    branch: selectedBranchId,
    designation: '',
    education_qualification: '',
    // username: '',
    studentId: '',
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
    borderRadius: 10,
    boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.1)',
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
      // username : personalData.username,
      dob: convertDateFormat(personalData.date_of_birth),
      gender: personalData.gender,
      branch_id: personalData.branch,
      course: personalData.course,
      image: logo,
      studentId: personalData.studentId
    };

    try {
      const result = await addStudent(student_data);

      if (result.success) {
        hide();
        toast.success(result.message);
        Navigate(-1);
      } else {
        hide();
        toast.error(result.message);
      }
    } catch (error) {
      hide();
      console.log(error);
    }
    // }
  };

  return (
    <Card>
      <CardContent>
        <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
          <Grid container spacing={5}>
            {/* Title Section */}
            <Grid item xs={12} textAlign="center">
              <Typography variant="h1" fontWeight={600} color="primary">
                {steps[0].title}
              </Typography>
            </Grid>

            {/* Profile Upload Section */}
            <Grid item xs={12} textAlign="center">
              <ImgStyled src={logo ? getImageUrl(logo) : imagePlaceholder} alt="Profile Pic" />
              <Box mt={2}>
                <ButtonStyled component="label" variant="contained" htmlFor="upload-image" startIcon={<UploadIcon />}>
                  Upload
                  <input hidden type="file" accept="image/png, image/jpeg" onChange={handleInputImageChange} id="upload-image" />
                </ButtonStyled>
                <ResetButtonStyled color="error" variant="tonal" onClick={handleInputImageReset}>
                  Reset
                </ResetButtonStyled>
                <Typography sx={{ mt: 1, color: 'grey' }}>Allowed PNG or JPEG. Max size of 800K.</Typography>
              </Box>
            </Grid>

            {/* Student Details Section */}
            <Grid item xs={12}>
              <Typography variant="h3" lineHeight={3}>
                Student Details
              </Typography>
              <Grid container spacing={3}>
                {[
                  { name: 'student_first_name', label: 'First Name', placeholder: 'Leonard' },
                  { name: 'student_last_name', label: 'Last Name' },
                  { name: 'student_email', label: 'Email', placeholder: 'example@email.com' },
                  { name: 'date_of_birth', label: 'Date Of Birth', component: DatePicker },
                  { name: 'gender', label: 'Gender', options: ['Male', 'Female', 'Other'] },
                  { name: 'qualification', label: 'Qualification' }
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
                          />
                        )}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Contact Info Section */}
            <Grid item xs={12}>
              <Typography variant="h3" lineHeight={3}>
                Contact Info
              </Typography>
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
                          InputProps={adornment ? { startAdornment: <InputAdornment position="start">{adornment}</InputAdornment> } : null}
                          error={Boolean(personalErrors[name])}
                          helperText={personalErrors[name]?.message}
                        />
                      )}
                    />
                  </Grid>
                ))}
              </Grid>
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
      </CardContent>
    </Card>
  );
};
export default StepperLinearWithValidation;
