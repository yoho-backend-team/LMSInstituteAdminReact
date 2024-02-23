import { yupResolver } from '@hookform/resolvers/yup';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Checkbox, TextField as CustomTextField, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
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
import CustomChip from 'components/mui/chip';
import CourseValidate from 'features/course-management/add-course/components/CourseValidate';
import StepperCustomDot from 'features/course-management/add-course/components/StepperCustomDot';
import { addCourse, getAllActiveCourseCategories } from 'features/course-management/courses/services/courseServices';
import { Fragment, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import StepperWrapper from 'styles/mui/stepper';
import * as yup from 'yup';
import { getActiveBranches } from 'features/branch-management/branch-overview-page/services/branchServices';
import { getActiveCategoriesByBranch } from 'features/course-management/categories/services/courseCategoryServices';
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

const defaultPersonalValues = {
  Course_duration: '',
  course_name: '',
  Course_Price: '',
  description: '',
  course_overview: '',
  Learning_Format: '',
  Course_Category: ''
};

const defaultSocialValues = {};

const personalSchema = yup.object().shape({
  Course_duration: yup.number().required(),
  course_name: yup.string().required(),
  Course_Price: yup.number().required(),
  description: yup.string().required(),
  course_overview: yup.string().required(),
  Learning_Format: yup.string().required(),
  Course_Category: yup.string().required()
});

const socialSchema = yup.object().shape({});

const AddCoursePage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [courseLogo, setCourseLogo] = useState('');
  const [courseTemplate, setCourseTemplate] = useState('');
  const [courseSyllabus, setCourseSyllabus] = useState('');
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [branches, setBranches] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);

  useEffect(() => {
    getAllBranches();
  }, []);
  useEffect(() => {
    const filteredBranchId = selectedBranches?.map((branch) => branch?.branch_id);
    getActiveCourseCategories(filteredBranchId);
  }, [selectedBranches, setSelectedBranches]);
  const getAllBranches = async () => {
    const result = await getActiveBranches();

    if (result.data.data) {
      setBranches(result.data.data);
    }
  };
  const getActiveCourseCategories = async (branchIds) => {
    const data = {
      branch_id: branchIds
    };
    console.log(data);
    const result = await getActiveCategoriesByBranch(data);

    if (result.data.data) {
      setActiveCategories(result.data.data);
    }
  };
  // const branches = [
  //   { branch_id: '1', branch_name: 'Branch 1' },
  //   { branch_id: '2', branch_name: 'Branch 2' },
  //   { branch_id: '3', branch_name: 'Branch 3' }
  // ];
  console.log(courseSyllabus);

  useEffect(() => {
    getAllCategories();
  }, [selectedBranchId]);

  const getAllCategories = async () => {
    const result = await getAllActiveCourseCategories(selectedBranchId);
    if (result.success) {
      setActiveCategories(result?.data);
    }
  };

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
    handleSubmit: handleSocialSubmit,
    formState: { errors: socialErrors }
  } = useForm({
    defaultValues: defaultSocialValues,
    resolver: yupResolver(socialSchema)
  });

  console.log(defaultPersonalValues);
  console.log(activeCategories);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    socialReset({ instagram: '', twitter: '', facebook: '', linkedIn: '', pinterest: '' });
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

  const onSubmit = async () => {
    const personalData = personalControl?._formValues;
    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 1) {
      const filteredBranchId = selectedBranches?.map((branch) => branch?.branch_id);
      const filteredCategoryId = activeCategories?.map((category) => category?.id);

      console.log(filteredBranchId);
      console.log(filteredCategoryId);

      let data = new FormData();
      data.append('course_name', personalData?.course_name);
      data.append('description', personalData?.description);
      data.append('course_overview', personalData?.course_overview);
      data.append('course_duration', personalData?.Course_duration);
      data.append('institute_category_id', filteredCategoryId);
      data.append('course_price', personalData?.Course_Price);
      data.append('learning_format', personalData?.Learning_Format);
      data.append('logo', courseLogo);
      data.append('image', courseTemplate);
      data.append('image', courseSyllabus);
      data.append('branch_id', filteredBranchId);

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
                  disableCloseOnSelect
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
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      sx={{ mb: 2 }}
                      fullWidth
                      select
                      defaultValue={value}
                      onChange={onChange}
                      label="Course_Category"
                      id="custom-select"
                      error={Boolean(personalErrors['Course_Category'])}
                      aria-describedby="stepper-linear-personal-Course_Category"
                      {...(personalErrors['Course_Category'] && { helperText: 'This field is required' })}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </TextField>
                  )}
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
                      <MenuItem value="hybrid">Hybrid Mode</MenuItem>
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
                if (activeStep === 3) {
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
