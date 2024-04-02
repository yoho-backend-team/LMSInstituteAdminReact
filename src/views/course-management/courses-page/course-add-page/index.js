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
import Typography from '@mui/material/Typography';
import CustomChip from 'components/mui/chip';
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import { getActiveCategoriesByBranch } from 'features/course-management/categories-page/services/courseCategoryServices';
// import CoursePdfInput from 'features/course-management/courses-page/course-add-page/components/CoursePdfInput';
import { addCourse, getAllActiveCourseCategories } from 'features/course-management/courses-page/services/courseServices';
import { Fragment, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import InputAdornment from '@mui/material/InputAdornment';
import * as yup from 'yup';
import { PDFViewer } from 'react-view-pdf';
import { useRef } from 'react';

const AddCoursePage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [courseSyllabus, setCourseSyllabus] = useState('');
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [branches, setBranches] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);

  const imageLogo = 'https://cdn.shopify.com/app-store/listing_images/0fdeaa25e24b9166bf9ee4652d5ba368/icon/CMLVyfvl2vsCEAE=.png';
  const imageTemplate = 'https://cdn.shopify.com/app-store/listing_images/0fdeaa25e24b9166bf9ee4652d5ba368/icon/CMLVyfvl2vsCEAE=.png';
  const pdfTemplate =
    'https://www.intego.com/mac-security-blog/wp-content/uploads/2023/05/BlueNoroff-OSX-RustBucket-NukeSped-Internal-PDF-Viewer-Trojan-horse-malware-icon.png';

  const [imgSrcLogo, setImgSrcLogo] = useState(imageLogo);
  const [inputLogoValue, setInputLogoValue] = useState('');
  const [selectedLogo, setSelectedLogo] = useState('');

  const [imgSrcTemplate, setImgSrcTemplate] = useState(imageTemplate);
  // const [pdfSourceTemplate,setPdfsourceTemplate] = useState(pdfTemplate)
  const [inputTemplateValue, setInputTemplateValue] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  console.log(setCourseSyllabus);
  console.log('selectedLogo', selectedLogo);
  console.log('selectedTemplate', selectedTemplate);

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

  const handleUpload = () => {
    if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files.length > 0) {
      const file = fileInputRef.current.files[0];
      const url = URL.createObjectURL(file);
      setCourseSyllabus(url);
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
    }
  ];
  const courseSchema = yup.object().shape({
    course_duration: yup
      .string()
      .required('Course Duration is required')
      .matches(/^[0-9]+$/, 'Course Duration should be digits'),
    course_name: yup
      .string()
      .required('Course Name is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Course Name should not contain special characters'),
    course_price: yup
      .string()
      .required('Course Price is required')
      .matches(/^[0-9]+$/, 'Course Price should be digits'),
    description: yup
      .string()
      .required('Course Description is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Course Description should not contain special characters'),
    course_overview: yup
      .string()
      .required('Course Overview is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Course Overview should not contain special characters'),
    learning_format: yup.string().required('Learning Format is required'),
    course_category: yup.string().required('Course Category is required'),
    branches: yup
      .array()
      .required()
      .test('no-special-characters', 'Branches must not contain special characters', (value) => {
        if (!value) return true;
        const specialCharRegex = /[^\w\s]/;
        return !value.some((branch) => specialCharRegex.test(branch));
      })
  });

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

  const fileInputRef = useRef(null);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <form key={1} onSubmit={handleCourseSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant="h3" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Add Course
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
                      helperText={courseErrors?.course_name?.message}
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
                      helperText={courseErrors?.course_duration?.message}
                      InputProps={{
                        endAdornment: <InputAdornment position="start">Days</InputAdornment>
                      }}
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
                      helperText={courseErrors?.course_price?.message}
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
                          label="Select Branches"
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
                          label="Select Category"
                          error={Boolean(courseErrors['course_category'])}
                          helperText={courseErrors?.course_category?.message}
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
                          helperText={courseErrors?.learning_format?.message}
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
                      helperText={courseErrors?.course_overview?.message}
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
                      label="Course Description"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(courseErrors['description'])}
                      aria-describedby="stepper-linear-personal-description"
                      helperText={courseErrors?.description?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Grid sx={{ justifyContent: 'center', display: 'flex', mb: 2 }}>
                  <ImgStyled src={imgSrcLogo} alt="Profile Pic" />
                </Grid>
                <Grid sx={{ justifyContent: 'center', display: 'flex', mb: 2 }}>
                  <ButtonStyled component="label" variant="contained" htmlFor="logo-settings-upload-image">
                    Add Course Logo
                    <input
                      hidden
                      type="file"
                      value={inputLogoValue}
                      accept="image/png, image/jpeg"
                      onChange={handleInputLogoImageChange}
                      id="logo-settings-upload-image"
                    />
                  </ButtonStyled>
                </Grid>
              </Grid>

              {/*  */}
              <Grid item xs={12} sm={6}>
                <Grid sx={{ justifyContent: 'center', display: 'flex', mb: 2 }}>
                  <ImgStyled src={imgSrcTemplate} alt="Profile Pic" />
                </Grid>
                <Grid sx={{ justifyContent: 'center', display: 'flex' }}>
                  <ButtonStyled component="label" variant="contained" htmlFor="template-settings-upload-image">
                    Add Course Template
                    <input
                      hidden
                      type="file"
                      value={inputTemplateValue}
                      accept="image/png, image/jpeg"
                      onChange={handleInputTemplateImageChange}
                      id="template-settings-upload-image"
                    />
                  </ButtonStyled>
                </Grid>
              </Grid>

              {/* <Grid item xs={12} sm={12}>

              <PDFViewer url={courseSyllabus} />
              <Button>Upload</Button>
              </Grid> */}
              <Grid item xs={12} sm={12}>
                {courseSyllabus ? (
                  <>
                    <Grid>
                      <Grid>
                        <PDFViewer url={courseSyllabus} />
                      </Grid>
                      <Grid justifyContent="center" display="flex" sx={{ mt: 1 }}>
                        <ButtonStyled component="label" variant="contained" htmlFor="template-pdf-upload-image">
                          {'Change Course Materials (PDF)'}
                          <input
                            ref={fileInputRef}
                            hidden
                            type="file"
                            accept=".pdf"
                            onChange={handleUpload}
                            id="template-pdf-upload-image"
                          />
                        </ButtonStyled>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <Grid item justifyContent="center" display="flex" alignItems="center">
                    <Grid>
                      <ImgStyled src={pdfTemplate} alt="Profile Pic" />
                    </Grid>
                    <Grid>
                      <ButtonStyled component="label" variant="contained" htmlFor="template-pdf-upload-image">
                        {'Upload Course Materials (PDF)'}
                        <input ref={fileInputRef} hidden type="file" accept=".pdf" onChange={handleUpload} id="template-pdf-upload-image" />
                      </ButtonStyled>
                    </Grid>
                  </Grid>
                )}
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
      <Divider sx={{ m: '0 !important' }} />

      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};

export default AddCoursePage;
