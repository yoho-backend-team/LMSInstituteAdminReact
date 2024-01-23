// ** React Imports
import { Fragment, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Step from '@mui/material/Step';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stepper from '@mui/material/Stepper';
import MenuItem from '@mui/material/MenuItem';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
// ** Third Party Imports
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Fab, Slider } from '@mui/material';
// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot';
import CustomTextField from 'components/mui/text-field';
import Icon from 'components/icon';
// ** Styled Components
import StepperWrapper from 'styles/mui/stepper';

const steps = [
  {
    title: 'Create Exam Paper',
    subtitle: 'Enter your Exam Details'
  },
  {
    title: 'Create Sections',
    subtitle: 'Setup Sections'
  },
  {
    title: 'Create Questions',
    subtitle: 'create questions for exam paper'
  }
];

const defaultAccountValues = {
  course: '',
  exam_name: '',
  total_sections: '',
  pass_percentage: 35
};

const defaultPersonalValues = {
  section_description: '',
  section_duration: '',
  section_name: ''
};

const defaultSocialValues = {
  google: '',
  section: '',
  facebook: '',
  linkedIn: ''
};

const accountSchema = yup.object().shape({
  exam_name: yup.string().required(),
  course: yup.string().required(),
  total_sections: yup.number().required()
});

const personalSchema = yup.object().shape({
  section_description: yup.string().required(),
  section_duration: yup.string().required(),
  section_name: yup.string().required()
});

const socialSchema = yup.object().shape({
  google: yup.string().required(),
  section: yup.string().required(),
  facebook: yup.string().required(),
  linkedIn: yup.string().required()
});

const StepperLinearWithValidation = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(2);

  // ** Hooks
  const {
    reset: accountReset,
    control: accountControl,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors }
  } = useForm({
    defaultValues: defaultAccountValues,
    resolver: yupResolver(accountSchema)
  });

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
    control: socialControl,
    handleSubmit: handleSocialSubmit,
    formState: { errors: socialErrors }
  } = useForm({
    defaultValues: defaultSocialValues,
    resolver: yupResolver(socialSchema)
  });

  // Handle Stepper
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    socialReset({ google: '', section: '', facebook: '', linkedIn: '' });
    accountReset({ course: '', exam_name: '', password: '', 'confirm-password': '' });
    personalReset({ section_description: '', language: [], section_duration: '', section_name: '' });
  };

  const onSubmit = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted');
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <form key={0} onSubmit={handleAccountSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[0].title}
                </Typography>
                <Typography variant="caption" component="p">
                  {steps[0].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="exam_name"
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Exam Name"
                      onChange={onChange}
                      placeholder="carterLeonard"
                      error={Boolean(accountErrors.exam_name)}
                      aria-describedby="stepper-linear-account-exam_name"
                      {...(accountErrors.exam_name && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="course"
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      select
                      type="course"
                      value={value}
                      label="Course"
                      onChange={onChange}
                      error={Boolean(accountErrors.course)}
                      placeholder="Web Development"
                      aria-describedby="stepper-linear-account-course"
                      {...(accountErrors.course && { helperText: accountErrors.course.message })}
                    >
                      <MenuItem value="1">Web Development</MenuItem>
                      <MenuItem value="2">Android Development</MenuItem>
                      <MenuItem value="2">Full Stack Development</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="total_sections"
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      type="number"
                      label="Total Sections"
                      onChange={onChange}
                      placeholder="5"
                      error={Boolean(accountErrors.total_sections)}
                      aria-describedby="stepper-linear-account-total_sections"
                      {...(accountErrors.total_sections && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>Select Pass Percentage</Typography>
                <Controller
                  name="pass_percentage"
                  control={accountControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Slider
                      marks
                      sx={{ mt: 1 }}
                      step={5}
                      defaultValue={value}
                      valueLabelDisplay="auto"
                      getAriaValueText={onChange}
                      aria-labelledby="small-steps-slider"
                      error={Boolean(accountErrors.pass_percentage)}
                      aria-describedby="stepper-linear-account-pass_percentage"
                      {...(accountErrors.pass_percentage && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="tonal" color="secondary" disabled>
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
                  name="section_name"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Section Name"
                      onChange={onChange}
                      placeholder="Leonard"
                      error={Boolean(personalErrors['section_name'])}
                      aria-describedby="stepper-linear-personal-section_name"
                      {...(personalErrors['section_name'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="section_duration"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Section Duration"
                      type="number"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(personalErrors['section_duration'])}
                      aria-describedby="stepper-linear-personal-section_duration"
                      {...(personalErrors['section_duration'] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="section_description"
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      multiline
                      rows={3}
                      value={value}
                      label="Section Description"
                      onChange={onChange}
                      id="stepper-linear-personal-section_description"
                      error={Boolean(personalErrors.section_description)}
                      aria-describedby="stepper-linear-personal-section_description-helper"
                      {...(personalErrors.section_description && { helperText: 'This field is required' })}
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
      case 2:
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[2].title}
                </Typography>
                <Typography variant="caption" component="p">
                  {steps[2].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="section"
                  control={socialControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      select
                      value={value}
                      label="section"
                      onChange={onChange}
                      error={Boolean(socialErrors.section)}
                      placeholder="https://section.com/carterLeonard"
                      aria-describedby="stepper-linear-social-section"
                      {...(socialErrors.section && { helperText: 'This field is required' })}
                    >
                      <MenuItem value="1">Section 1 - React Introduction</MenuItem>
                      <MenuItem value="2">Section 2 - React Fundamentals</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Grid container sx={{}}>
                  <Grid item xs={12} sm={8}>
                    <Grid container>
                      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h5" sx={{ mb: 4 }}>
                            Add New Question
                          </Typography>
                          <Box>
                            <Fab component={Link} to="create-question" color="primary" aria-label="add" size="large">
                              <Icon icon="tabler:plus" />
                            </Fab>
                          </Box>
                        </Box>
                        <Box sx={{ mr: 5 }}>
                          <Typography variant="h3">OR</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Grid
                          sx={{
                            border: 'dashed',
                            height: '100%',
                            borderWidth: 0.5,
                            ml: 4,
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            my: 'auto',
                            display: 'flex',
                            minHeight: 150
                          }}
                        >
                          <Typography variant="p">Add Questions from bank</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* <Grid item xs={12} sm={6}></Grid> */}
                </Grid>
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="tonal" color="secondary" onClick={handleBack}>
                  Back
                </Button>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Grid>
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
                if ((accountErrors.course || accountErrors.exam_name) && activeStep === 0) {
                  labelProps.error = true;
                } else if (
                  (personalErrors.section_description ||
                    personalErrors.language ||
                    personalErrors['section_duration'] ||
                    personalErrors['section_name']) &&
                  activeStep === 1
                ) {
                  labelProps.error = true;
                } else if (
                  (socialErrors.google || socialErrors.section || socialErrors.facebook || socialErrors.linkedIn) &&
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

export default StepperLinearWithValidation;
