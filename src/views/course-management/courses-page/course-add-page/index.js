import { yupResolver } from '@hookform/resolvers/yup';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Checkbox, TextField as CustomTextField, TextField, styled } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import CustomChip from 'components/mui/chip';
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import { getActiveCategoriesByBranch } from 'features/course-management/categories-page/services/courseCategoryServices';
import CoursePdfInput from 'features/course-management/courses-page/course-add-page/components/CoursePdfInput';
import StepperCustomDot from 'features/course-management/courses-page/course-add-page/components/StepperCustomDot';
import { addCourse, getAllActiveCourseCategories } from 'features/course-management/courses-page/services/courseServices';
import { Fragment, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import StepperWrapper from 'styles/mui/stepper';
import * as yup from 'yup';

const AddCoursePage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [courseSyllabus, setCourseSyllabus] = useState('');
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [branches, setBranches] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);

  const imageLogo =
    'https://media.istockphoto.com/id/1411772543/photo/side-profile-of-african-woman-with-afro-isolated-against-a-white-background-in-a-studio.webp?b=1&s=170667a&w=0&k=20&c=AXoZk6bD-xbU4AQ66k4AKpWBRuDgHufmP4A1_Gn_5zg=';
  const imageTemplate =
    'https://media.istockphoto.com/id/1411772543/photo/side-profile-of-african-woman-with-afro-isolated-against-a-white-background-in-a-studio.webp?b=1&s=170667a&w=0&k=20&c=AXoZk6bD-xbU4AQ66k4AKpWBRuDgHufmP4A1_Gn_5zg=';

  const [imgSrcLogo, setImgSrcLogo] = useState(imageLogo);
  const [inputLogoValue, setInputLogoValue] = useState('');
  const [selectedLogo, setSelectedLogo] = useState('');

  const [imgSrcTemplate, setImgSrcTemplate] = useState(imageTemplate);
  const [inputTemplateValue, setInputTemplateValue] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  console.log("selectedLogo",selectedLogo);
  console.log("selectedTemplate",selectedTemplate);

  const handleInputLogoImageChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrcLogo(reader.result);
      setSelectedLogo(files[0]);
      reader.readAsDataURL(files[0]);
      if (reader.result !== null) {
        setInputLogoValue(reader.result);
      }
    }
  };

  const handleInputTemplateImageChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrcTemplate(reader.result);
      setSelectedTemplate(files[0]);
      reader.readAsDataURL(files[0]);
      if (reader.result !== null) {
        setInputTemplateValue(reader.result);
      }
    }
  };

  const ImgStyled = styled('img')(({ theme }) => ({
    width: 100,
    height: 100,
    marginRight: theme.spacing(2),
    borderRadius: theme.shape.borderRadius
  }));

  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }));

  const steps = [
    {
      title: 'Course Information',
      subtitle: 'Setup Information'
    },
    {
      title: 'Course Files',
      subtitle: 'Add Logo, Template, Syllabus'
    }
  ];

  const defaultCourseValues = {
    course_duration: '',
    course_name: '',
    course_price: '',
    description: '',
    course_overview: '',
    learning_format: '',
    course_category: '',
    branches: []
  };

  const defaultCourseFileValues = {};

  const courseSchema = yup.object().shape({
    course_duration: yup.number().required(),
    course_name: yup.string().required(),
    course_price: yup.number().required(),
    description: yup.string().required(),
    course_overview: yup.string().required(),
    learning_format: yup.string().required(),
    course_category: yup.object().required('Course Category is required').nullable(true),
    branches: yup
      .array()
      .required()
      .test('no-special-characters', 'Branches must not contain special characters', (value) => {
        if (!value) return true;
        const specialCharRegex = /[^\w\s]/;
        return !value.some((branch) => specialCharRegex.test(branch));
      })
  });

  const courseFileSchema = yup.object().shape({});

  useEffect(() => {
    getAllBranches();
  }, []);

  useEffect(() => {
    const filteredBranchId = selectedBranches?.map((branch) => branch?.branch_id);
    getActiveCourseCategories(filteredBranchId);
  }, [selectedBranches, setSelectedBranches]);

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

  const getAllBranches = async () => {
    const result = await getActiveBranches();

    if (result.data.data) {
      setBranches(result.data.data);
    }
  };

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
    reset: courseReset,
    control: courseControl,
    handleSubmit: handleCourseSubmit,
    formState: { errors: courseErrors }
  } = useForm({
    defaultValues: defaultCourseValues,
    resolver: yupResolver(courseSchema)
  });

  const {
    reset: courseFileReset,
    handleSubmit: handleCourseFileSubmit,
    formState: { errors: courseFileErrors }
  } = useForm({
    defaultValues: defaultCourseFileValues,
    resolver: yupResolver(courseFileSchema)
  });

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    courseFileReset({ instagram: '', twitter: '', facebook: '', linkedIn: '', pinterest: '' });
    courseReset({
      course_duration: Number(''),
      course_name: '',
      course_price: Number(''),
      description: '',
      course_overview: '',
      learning_format: '',
      course_category: '',
      branches: []
    });
  };

  const onSubmit = async () => {
    const personalData = courseControl?._formValues;
    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 1) {
      const filteredBranchId = selectedBranches?.map((branch) => branch?.branch_id);
      console.log(selectedBranches);

      let data = new FormData();
      filteredBranchId.forEach((id) => {
        data.append(`branch_id[]`, id);
      });
      data.append('course_name', personalData?.course_name);
      data.append('description', personalData?.description);
      data.append('course_overview', personalData?.course_overview);
      data.append('course_duration', personalData?.course_duration);
      data.append('institute_category_id', personalData?.course_category.category_id);
      data.append('course_price', personalData?.course_price);
      data.append('learning_format', personalData?.learning_format);
      data.append('logo', selectedLogo);
      data.append('image', selectedTemplate);
      data.append('syllabus', courseSyllabus);
      // data.append('branch_id', filteredBranchId);
      console.log(personalData);
      const result = await addCourse(data);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <form key={1} onSubmit={handleCourseSubmit(onSubmit)}>
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
                  control={courseControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Course Name"
                      onChange={onChange}
                      placeholder="Leonard"
                      error={Boolean(courseErrors['course_name'])}
                      aria-describedby="stepper-linear-personal-course_name"
                      {...(courseErrors['course_name'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="course_duration"
                  control={courseControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Course Duration"
                      type="number"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(courseErrors['course_duration'])}
                      aria-describedby="stepper-linear-personal-course_duration"
                      {...(courseErrors['course_duration'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="course_price"
                  control={courseControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type="number"
                      value={value}
                      label="Course Price"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(courseErrors['course_price'])}
                      aria-describedby="stepper-linear-personal-course_price"
                      {...(courseErrors['course_price'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  id="select-multiple-chip"
                  options={branches}
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
                    <Controller
                      name="branches"
                      control={courseControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Branches"
                          value={value}
                          onChange={onChange}
                          error={Boolean(courseErrors['branches'])}
                          aria-describedby="stepper-linear-personal-branches"
                          {...(courseErrors['branches'] && { helperText: 'This field is required' })}
                          InputProps={{
                            ...params.InputProps,
                            style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                          }}
                        />
                      )}
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
                  name="course_category"
                  control={courseControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Autocomplete
                      fullWidth
                      value={value || null}
                      onChange={(event, newValue) => {
                        console.log(event);
                        onChange(newValue);
                        // setValue('course_category', newValue.category_id);
                      }}
                      options={activeCategories ?? []}
                      getOptionLabel={(option) => option.category_name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          value={value}
                          onChange={onChange}
                          label="Course Category"
                          error={Boolean(courseErrors['course_category'])}
                          helperText={courseErrors['course_category'] ? 'This field is required' : ''}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="learning_format"
                  control={courseControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Autocomplete
                      fullWidth
                      value={value}
                      onChange={(event, newValue) => {
                        onChange(newValue);
                      }}
                      options={['online', 'offline', 'hybrid']}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Learning Format"
                          error={Boolean(courseErrors['learning_format'])}
                          {...(courseErrors['learning_format'] && { helperText: 'This field is required' })}
                        />
                      )}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="course_overview"
                  control={courseControl}
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
                      error={Boolean(courseErrors['course_overview'])}
                      aria-describedby="stepper-linear-personal-course_overview"
                      {...(courseErrors['course_overview'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="description"
                  control={courseControl}
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
                      error={Boolean(courseErrors['description'])}
                      aria-describedby="stepper-linear-personal-description"
                      {...(courseErrors['description'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
                    <ImgStyled src={imgSrcLogo} alt="Profile Pic" />
                    <div>
                      <ButtonStyled component="label" variant="contained" htmlFor="logo-settings-upload-image">
                        update New logo
                        <input
                          hidden
                          type="file"
                          value={inputLogoValue}
                          accept="image/png, image/jpeg"
                          onChange={handleInputLogoImageChange}
                          id="logo-settings-upload-image"
                        />
                      </ButtonStyled>
                    </div>
                  </Box>
                </Grid>

                {/*  */}
                <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
                  <ImgStyled src={imgSrcTemplate} alt="Profile Pic" />
                  <div>
                    <ButtonStyled component="label" variant="contained" htmlFor="template-settings-upload-image">
                      Upload New Template
                      <input
                        hidden
                        type="file"
                        value={inputTemplateValue}
                        accept="image/png, image/jpeg"
                        onChange={handleInputTemplateImageChange}
                        id="template-settings-upload-image"
                      />
                    </ButtonStyled>
                  </div>
                </Box>
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
          <form key={2} onSubmit={handleCourseFileSubmit(onSubmit)}>
            <CoursePdfInput setCourseSyllabus={setCourseSyllabus} />
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
  }

  function renderContent() {
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
  }

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
                } else if ((courseErrors['registered_date'] || courseErrors['first-name']) && activeStep === 0) {
                  labelProps.error = true;
                } else if (
                  (courseFileErrors.instagram || courseFileErrors.twitter || courseFileErrors.facebook || courseFileErrors.linkedIn) &&
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
