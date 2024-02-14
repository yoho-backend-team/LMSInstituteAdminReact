// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
// ** Icon Imports
import 'react-datepicker/dist/react-datepicker.css';
// ** Custom Components Imports
import { TextField as CustomTextField, TextField, Checkbox, } from '@mui/material';
import StepperCustomDot from 'features/course-management/add-course/components/StepperCustomDot';
// ** Styled Components
import CustomChip from 'components/mui/chip';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CourseValidate from 'features/course-management/add-course/components/CourseValidate';
import Autocomplete from '@mui/material/Autocomplete';
import StepperWrapper from 'styles/mui/stepper';
import { useSelector } from 'react-redux';
import { addCourse, getAllActiveCourseCategories } from 'features/course-management/courses/services/courseServices';



const steps = [
  {
    title: 'Personal Info',
    subtitle: 'Setup Information'
  },
  {
    title: 'Social Links',
    subtitle: 'Add Social Links'
  }
];

// const defaultAccountValues = {};

const defaultPersonalValues = {
  Course_duration: '',
  course_name: '',
  Course_Price: '',
  description: '',
  course_overview: '',
  Learning_Format: '',
  Course_Category: []
};

const defaultSocialValues = {};

const personalSchema = yup.object().shape({
  Course_duration: yup.number().required(),
  course_name: yup.string().required(),
  Course_Price: yup.number().required(),
  description: yup.string().required(),
  course_overview: yup.string().required(),
  Learning_Format: yup.string().required(),
  Course_Category: yup.array().min(1, 'Select at least one CourseCategory').required()
});

const socialSchema = yup.object().shape({});
// const gallerySchema = yup.object().shape({
//   images: Yup.array().min(1, 'Images is required')
// });

const AddCoursePage = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(0);
  const [courseLogo, setCourseLogo] = useState('');
  const [courseTemplate, setCourseTemplate] = useState('');
  const [courseSyllabus, setCourseSyllabus] = useState('');
  const [activeCategories, setActiveCategories] = useState([]);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const branches = [
    { branch_id: '1', branch_name: 'Branch 1' },
    { branch_id: '2', branch_name: 'Branch 2' },
    { branch_id: '3', branch_name: 'Branch 3' },
  ];
  console.log(courseSyllabus);

  useEffect(() => {
    getAllCategories();
  }, [selectedBranchId]);

  const getAllCategories = async () => {
    const result = await getAllActiveCourseCategories(selectedBranchId);
    // console.log('result', result?.data)
    if (result.success) {
      setActiveCategories(result?.data);
    }
  };
  // const [features, setFeatures] = useState([]);

  // ** Hooks

  const {
    reset: personalReset,
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors }
  } = useForm({
    defaultValues: defaultPersonalValues,
    resolver: yupResolver(personalSchema)
  });

  const {
    reset: socialReset,
    // control: socialControl,
    handleSubmit: handleSocialSubmit,
    formState: { errors: socialErrors }
  } = useForm({
    defaultValues: defaultSocialValues,
    resolver: yupResolver(socialSchema)
  });
  // const methods = useForm({
  //   defaultValues: defaultGalleryValues,
  //   resolver: yupResolver(gallerySchema)
  // });
  // console.log(galleryControl);
  console.log(defaultPersonalValues);
  console.log(activeCategories);
  // Handle Stepper
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    socialReset({ instagram: '', twitter: '', facebook: '', linkedIn: '', pinterest: '' });
    // galleryReset({ logo: '', image: '', gallery: [] });
    accountReset({ email: '', username: '', password: '', confirm_password: '', name: '', contact: '' });
    personalReset({
      Course_duration: Number(''),
      course_name: '',
      Course_Price: Number(''),
      description: '',
      course_overview: '',
      Learning_Format: '',
      Course_Category: ''
    });
  };

  // const onSubmit = async () => {
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     reset();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onSubmit = async () => {
    // const accountData = accountControl?._formValues;
    const personalData = personalControl?._formValues;
    // const socialData = socialControl?._formValues;
    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 1) {
      let data = new FormData();
      data.append('course_name', personalData?.course_name);
      data.append('description', personalData?.description);
      data.append('course_overview', personalData?.course_overview);
      data.append('course_duration', personalData?.Course_duration);
      data.append('course_category', personalData?.Course_Category);
      data.append('course_price', personalData?.Course_Price);
      data.append('learning_format', personalData?.Learning_Format);
      data.append('logo', courseLogo);
      data.append('image', courseTemplate);
      data.append('image', courseSyllabus);
      data.append('branch_id', selectedBranchId);

      const result = await addCourse(data);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          // <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
          <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[1].title}
                </Typography>
                <Typography variant="caption" component="p">
                  {steps[1].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="course_name"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Course Name"
                      onChange={onChange}
                      placeholder="Leonard"
                      error={Boolean(personalErrors['course_name'])}
                      aria-describedby="stepper-linear-personal-course_name"
                      {...(personalErrors['course_name'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="Course_duration"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Course Duration"
                      type="number"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(personalErrors['Course_duration'])}
                      aria-describedby="stepper-linear-personal-Course_duration"
                      {...(personalErrors['Course_duration'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="Course_Price"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type="number"
                      value={value}
                      label="Course Price"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(personalErrors['Course_Price'])}
                      aria-describedby="stepper-linear-personal-Course_Price"
                      {...(personalErrors['Course_Price'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  multiple
                  id="select-multiple-chip"
                  options={[{ branch_id: 'selectAll', branch_name: 'Select All' }, ...branches]}
                  getOptionLabel={(option) => option.branch_name}
                  value={selectedBranches}
                  onChange={(e, newValue) => {
                    if (newValue && newValue.some((option) => option.branch_id === 'selectAll')) {
                      setSelectedBranches(branches.filter((option) => option.branch_id !== 'selectAll'));
                    } else {
                      setSelectedBranches(newValue);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Branches"
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
                      {option.branch_name}
                    </li>
                  )}
                  renderTags={(value) => (
                    <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                      {value.map((option, index) => (
                        <CustomChip
                          key={option.branch_id}
                          label={option.branch_name}
                          onDelete={() => {
                            const updatedValue = [...value];
                            updatedValue.splice(index, 1);
                            setSelectedBranches(updatedValue);
                          }}
                          color="primary"
                          sx={{ m: 0.75 }}
                        />
                      ))}
                    </div>
                  )}
                  isOptionEqualToValue={(option, value) => option.branch_id === value.branch_id}
                  selectAllText="Select All"
                  SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>

                <Controller
                  name="Course_Category"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => {
                    const branchesWithSelectAll = [{ id: 'selectAll', course_category_name: 'Select All' }, ...activeCategories];

                    return (
                      <Autocomplete
                        multiple
                        id="select-multiple-chip"
                        options={branchesWithSelectAll}
                        getOptionLabel={(option) => option.course_category_name}
                        value={value}
                        onChange={(e, newValue) => {
                          if (newValue && newValue.some((option) => option.id === 'selectAll')) {
                            onChange(activeCategories?.filter((option) => option.id !== 'selectAll'));
                          } else {
                            onChange(newValue);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            label="Course Category"
                            error={Boolean(personalErrors.Course_Category)}
                            {...(personalErrors.Course_Category && { helperText: personalErrors.Course_Category.message })}
                            InputProps={{
                              ...params.InputProps,
                              style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' } //
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
                            {option.course_category_name}
                          </li>
                        )}
                        renderTags={(value) => (
                          <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                            {value.map((option, index) => (
                              <CustomChip
                                key={option.id}
                                label={option.course_category_name}
                                onDelete={() => {
                                  const updatedValue = [...value];
                                  updatedValue.splice(index, 1);
                                  onChange(updatedValue);
                                }}
                                color="primary"
                                // {...getTagProps({ index })}
                                sx={{ m: 0.75 }}
                              />
                            ))}
                          </div>
                        )}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        selectAllText="Select All"
                        SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                      />
                    );
                  }}
                />
              </Grid>
             
              <Grid item xs={12} sm={6}>
                <Controller
                  name="Learning_Format"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      select
                      label="Learning Format"
                      fullWidth
                      id="validation-billing-select"
                      aria-describedby="validation-billing-select"
                      error={Boolean(personalErrors['Learning_Format'])}
                      {...(personalErrors['Learning_Format'] && { helperText: 'This field is required' })}
                      onChange={onChange}
                      value={value}
                    >
                      <MenuItem value="online">Online Mode</MenuItem>
                      <MenuItem value="offline">Offline Mode</MenuItem>
                      <MenuItem value="Hybrid">Hybrid Mode</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="course_overview"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      multiline
                      rows={3}
                      label="Course Overview"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(personalErrors['course_overview'])}
                      aria-describedby="stepper-linear-personal-course_overview"
                      {...(personalErrors['course_overview'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="description"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      multiline
                      rows={3}
                      label="Description"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(personalErrors['description'])}
                      aria-describedby="stepper-linear-personal-description"
                      {...(personalErrors['description'] && { helperText: 'This field is required' })}
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
          // </DatePickerWrapper>
        );
      case 1:
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <CourseValidate setCourseLogo={setCourseLogo} setCourseSyllabus={setCourseSyllabus} setCourseTemplate={setCourseTemplate} />
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button variant="tonal" color="secondary" onClick={handleBack}>
                Back
              </Button>
              <Button type="submit" variant="contained">
                Next
              </Button>
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
                if (
                  // (accountErrors.email || accountErrors.username || accountErrors.password || accountErrors['confirm_password']) &&
                  activeStep === 3
                ) {
                  labelProps.error = true;
                } else if ((personalErrors['registered_date'] || personalErrors['first-name']) && activeStep === 0) {
                  labelProps.error = true;
                } else if (
                  (socialErrors.instagram || socialErrors.twitter || socialErrors.facebook || socialErrors.linkedIn) &&
                  activeStep === 2
                ) {
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

export default AddCoursePage;
