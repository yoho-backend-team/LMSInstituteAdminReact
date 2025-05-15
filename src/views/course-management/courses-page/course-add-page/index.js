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
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import client from 'api/client';
import CustomChip from 'components/mui/chip';
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import { getAllCourseCategories } from 'features/course-management/categories-page/services/courseCategoryServices';
import { addCourse } from 'features/course-management/courses-page/services/courseServices';
import { useInstitute } from 'utils/get-institute-details';

import { Fragment, useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { PDFViewer } from 'react-view-pdf';
import * as yup from 'yup';
import { imagePlaceholder } from 'utils/placeholders';
import { getImageUrl } from 'utils/imageUtils';
import DurationInput from '../../../../features/course-management/courses-page/course-add-page/components/durationInput';
import { useSpinner } from 'context/spinnerContext';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import SuccessMessage from 'features/course-management/courses-page/course-add-page/components/successMessage';


const ButtonStyled1 = styled('label')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection : "column",
  border: '1px dotted #999999', 
  minHeight : "150px",
  minWidth : "100%",
  borderRadius: '10px',
  padding: '10px 20px',
  cursor: 'pointer',
  backgroundColor: "transparent",
  color: '#007bff',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'background-color 0.3s, border-color 0.3s',
});

const InputFile = styled('input')({
  display: 'none',
});


const AddCoursePage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [courseSyllabus, setCourseSyllabus] = useState('');
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [branches, setBranches] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);

  const [duration,setDuration] = useState('')
  const [unit,setUnit] = useState('months')

  const imageLogo = 'https://cdn.shopify.com/app-store/listing_images/0fdeaa25e24b9166bf9ee4652d5ba368/icon/CMLVyfvl2vsCEAE=.png';
  const imageTemplate = 'https://cdn.shopify.com/app-store/listing_images/0fdeaa25e24b9166bf9ee4652d5ba368/icon/CMLVyfvl2vsCEAE=.png';
  const pdfTemplate =
    'https://www.intego.com/mac-security-blog/wp-content/uploads/2023/05/BlueNoroff-OSX-RustBucket-NukeSped-Internal-PDF-Viewer-Trojan-horse-malware-icon.png';

  const [imgSrcLogo, setImgSrcLogo] = useState(imageLogo);
  const [inputLogoValue, setInputLogoValue] = useState('');
  const [selectedLogo, setSelectedLogo] = useState('');
  const [imgSrcTemplate, setImgSrcTemplate] = useState(imageTemplate);
  const [inputTemplateValue, setInputTemplateValue] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const { show, hide } = useSpinner()
   
  const handleUpload = () => {
    if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files.length > 0) {
      const file = fileInputRef.current.files[0];
      const url = URL.createObjectURL(file);
      setCourseSyllabus(url);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    if(name === "duration"){
       setDuration(value)
    }
  }

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
    course_duration:yup.object().shape({
      duration: yup
        .number()
        .typeError('Duration must be a number')
        .required('Course Duration is required')
        .positive('Course Duration must be a positive number')
        .integer('Course Duration must be an integer'),
      unit: yup
        .string()
        .oneOf(['days', 'weeks', 'months', 'years'], 'Invalid unit')
        .required('Course unit is required'),
    }),
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
      .required('Course Description is required'),
      // .matches(/^[a-zA-Z0-9\s]+$/, 'Course Description should not contain special characters'),
    course_overview: yup
      .string()
      .required('Course Overview is required'),
      // .matches(/^[a-zA-Z0-9\s]+$/, 'Course Overview should not contain special characters'),
    learning_format: yup.string().required('Learning Format is required'),
    course_category: yup.object().required('Course Category is required'),
    branches: yup
      .array()
      .required()
      .test('no-special-characters', 'Branches must not contain special characters', (value) => {
        if (!value) return true;
        const specialCharRegex = /[^\w\s]/;
        return !value.some((branch) => specialCharRegex.test(branch));
    }),
    thumbnail: yup.string().required("course thumbnail is required"),
    image : yup.string().required("course main image required")
  });

  const defaultCourseValues = {
    course_duration: { duration: '', unit: "months"},
    course_name: '',
    course_price: '',
    mrp:'',   
    starrating:'',
    ratingnumber:'',
    description: '',
    course_overview: '',
    learning_format: '',
    course_category: '',
    branches: [],
    image : '',
    thumbnail : ''
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
    const result = await getAllCourseCategories(data);
    if (result.data) {
      setActiveCategories(result.data);
    }
  };

  const getAllBranches = async () => {
    const result = await getActiveBranches();
    if (result.data) {
      setBranches(result.data);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [selectedBranchId]);

  const getAllCategories = async () => {
    const result = await getAllCourseCategories(selectedBranchId);
    if (result.success) {
      setActiveCategories(result?.data);
    }
  };

  const {
    reset: courseReset,
    control: courseControl,
    handleSubmit: handleCourseSubmit,setValue,
    formState: { errors: courseErrors }
  } = useForm({
    defaultValues: defaultCourseValues,
    resolver: yupResolver(courseSchema)
  });

  const handleReset = () => {
    setActiveStep(0);
    courseFileReset({ instagram: '', twitter: '', facebook: '', linkedIn: '', pinterest: '' });
    courseReset(defaultCourseValues);
    courseControl._reset()
  };

  const handleInputTemplateImageChange = async (file) => {
    try {
      show()
      const { files } = file.target;
      const image = files[0]
      if (image.size > 1048576) {
        hide()
        return toast.success("image upload lesser than 1mb")
      }
      const form_data = new FormData()
      form_data.append("file",files[0])
      const data = await client.file.upload(form_data)
      setSelectedTemplate(data?.data?.file)
      setImgSrcTemplate(data?.data?.file)
      toast.success(data?.data?.message)
      setValue("image",data?.data?.file)
    } catch (error) {
      toast.error(error?.message)
    }finally{
      hide()
    }
  };

  const handleInputLogoImageChange = async (file) => {
    try {
      show()
      const { files } = file.target;
      const image = files[0]
      if (image.size > 1048576) {
        hide()
        return toast.success("image upload lesser than 1mb")
      }
        const data = new FormData()
        data.append("file",files[0])
       const response = await client.file.upload(data)
       setSelectedLogo(response.data.file)
       setValue("thumbnail",response?.data?.file)
       toast.success(response.message)
    } catch (error) {
      toast.error(error?.message)
    }finally{
      hide()
    }
  };

  const onSubmit = async () => {
    try {
      show()
      const personalData = courseControl?._formValues;

      const filteredBranchId = selectedBranches?.map((branch) => branch?.uuid);
      const data = {
        course_name : personalData.course_name,
        description : personalData.description,
        thumbnail : selectedLogo,
        branch_ids : filteredBranchId,
        image : selectedTemplate ,
        duration : personalData?.course_duration?.duration + " "+ personalData?.course_duration?.unit,
        category : personalData.course_category.uuid,
        institute_id : useInstitute().getInstituteId(),
        actual_price : personalData.course_price,
        current_price: personalData.mrp,
        reviews: personalData.ratingnumber,
        rating: personalData.starrating,
        class_type : [personalData.learning_format],
        overview : personalData.course_overview
      }
  
      await addCourse(data); 
      toast.success("course created sucessfully")
      setActiveStep(activeStep+1)
    } catch (error) {
      toast.error(error?.message)
    }finally{
      hide()
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
                <Typography variant="h3" sx={{ fontWeight: 600, color: '#141C58', fontSize: "20px", lineHeight: "28px" }}>
                  Add New Course
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="course_name"
                  control={courseControl}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Course Name"
                      sx={{
                        '& .MuiInputLabel-root' : {
                          color : '#474747',
                          fontWeight : 500,
                          fontSize : "14px",
                          lineHeight : 1,
                          fontFamily : "Poppins"
                        },
                        borderColor : "red",
                        borderWidth : 1,
                        backgroundColor : "transparent",
                        color : "#474747",
                        lineHeight : "20px",
                        fontSize : "14px",
                        outline : "2px solid transparent",
                        outlineOffset : "2px"
                      }}
                      onChange={onChange}
                      placeholder="Enter the course title"
                      error={Boolean(courseErrors['course_name'])}
                      aria-describedby="stepper-linear-personal-course_name"
                      helperText={courseErrors?.course_name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} >
              <Controller
               name="course_duration"
               control={courseControl}
               render={({ field: { value, onChange } }) => (
                 <DurationInput
                   value={value}
                   onChange={(data) => {onChange(data)}}
                   error={Boolean(courseErrors?.course_duration)}
                   helperText={courseErrors?.course_duration?.duration?.message}
                 />
               )}
              />
              </Grid>
              <Grid sx={{ display: "none"}} item xs={12} sm={2}>
                <Controller
                  name="course_duration"
                  control={courseControl}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      // fullWidth
                      value={value}
                      label="Course Duration"
                      type="number"
                      onChange={onChange}
                      sx={{
                        '& .MuiInputLabel-root' : {
                          color : '#474747',
                          fontWeight : 500,
                          fontSize : "14px",
                          lineHeight : 1,
                          fontFamily : "Poppins"
                        },
                        borderColor : "red",
                        borderWidth : 1,
                        backgroundColor : "transparent",
                        color : "#474747",
                        lineHeight : "20px",
                        fontSize : "14px",
                        outline : "2px solid transparent",
                        outlineOffset : "2px"
                      }}
                      placeholder="Enter the duration in days"
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
              <Grid item xs={12} sm={4}>
                <Controller
                  name="mrp"
                  control={courseControl}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type="number"
                      value={value}
                      label="Actual Price"
                      onChange={onChange}
                      sx={{
                        '& .MuiInputLabel-root' : {
                          color : '#474747',
                          fontWeight : 500,
                          fontSize : "14px",
                          lineHeight : 1,
                          fontFamily : "Poppins"
                        },
                        borderColor : "red",
                        borderWidth : 1,
                        backgroundColor : "transparent",
                        color : "#474747",
                        lineHeight : "20px",
                        fontSize : "14px",
                        outline : "2px solid transparent",
                        outlineOffset : "2px"
                      }}
                      placeholder="Enter the actual price of the course (e.g., ₹200)"
                      error={Boolean(courseErrors['course_price'])}
                      aria-describedby="stepper-linear-personal-course_price"
                      helperText={courseErrors?.course_price?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="course_price"
                  control={courseControl}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type="number"
                      value={value}
                      sx={{
                        '& .MuiInputLabel-root' : {
                          color : '#474747',
                          fontWeight : 500,
                          fontSize : "14px",
                          lineHeight : 1,
                          fontFamily : "Poppins"
                        },
                        borderColor : "red",
                        borderWidth : 1,
                        backgroundColor : "transparent",
                        color : "#474747",
                        lineHeight : "20px",
                        fontSize : "14px",
                        outline : "2px solid transparent",
                        outlineOffset : "2px"
                      }}
                      label="Current Price"
                      onChange={onChange}
                      placeholder="Enter the current price of the course (e.g., ₹150)"
                      error={Boolean(courseErrors['course_price'])}
                      aria-describedby="stepper-linear-personal-course_price"
                      helperText={courseErrors?.course_price?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
              <Controller
                  name="starrating"
                  control={courseControl}
                  render={({ field: { value, onChange } }) => (
                    <Autocomplete
                      fullWidth
                      value={value}
                      onChange={(event, newValue) => {
                        onChange(newValue);
                      }}
                      options={[1,2,3,4,5]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Star Rating"
                          error={Boolean(courseErrors['course_price'])}
                          helperText={courseErrors?.course_price?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="ratingnumber"
                  control={courseControl}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type="number"
                      value={value}
                      sx={{
                        '& .MuiInputLabel-root' : {
                          color : '#474747',
                          fontWeight : 500,
                          fontSize : "14px",
                          lineHeight : 1,
                          fontFamily : "Poppins"
                        },
                        borderColor : "red",
                        borderWidth : 1,
                        backgroundColor : "transparent",
                        color : "#474747",
                        lineHeight : "20px",
                        fontSize : "14px",
                        outline : "2px solid transparent",
                        outlineOffset : "2px"
                      }}
                      label="Total Review"
                      onChange={onChange}
                      placeholder="Enter the total reviews "
                      error={Boolean(courseErrors['course_price'])}
                      aria-describedby="stepper-linear-personal-course_price"
                      helperText={courseErrors?.course_price?.message}
                    />
                  )}
                />
              </Grid>              
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  id="select-multiple-chip"
                  options={branches}
                  getOptionLabel={(option) => option.branch_name}
                  value={selectedBranches}
                  onChange={(e, newValue) => {
                    if (newValue && newValue.some((option) => option.id === 'selectAll')) {
                      setSelectedBranches(branches.filter((option) => option.id !== 'selectAll'));
                    } else {
                      setSelectedBranches(newValue);
                    }
                  }}
                  renderInput={(params) => (
                    <Controller
                      name="branches.branch_identity"
                      control={courseControl}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Select Branches"
                          value={value}
                          sx={{
                            '& .MuiInputLabel-root' : {
                              color : '#474747',
                              fontWeight : 500,
                              fontSize : "14px",
                              lineHeight : 1,
                              fontFamily : "Poppins"
                            },
                            borderColor : "red",
                            borderWidth : 1,
                            backgroundColor : "transparent",
                            color : "#474747",
                            lineHeight : "20px",
                            fontSize : "14px",
                            outline : "2px solid transparent",
                            outlineOffset : "2px"
                          }}
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
                      {option.branch_identity}
                    </li>
                  )}
                  renderTags={(value) => (
                    <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                      {value.map((option, index) => (
                        <CustomChip
                          key={option.id}
                          label={option.branch_identity}
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
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="course_category"
                  control={courseControl}
                  render={({ field: { value, onChange } }) => (
                    <Autocomplete
                      fullWidth
                      value={value || null}
                      onChange={(event, newValue) => {
                        onChange(newValue);
                      }}
                      sx={{
                        '& .MuiInputLabel-root' : {
                          color : '#474747',
                          fontWeight : 500,
                          fontSize : "14px",
                          lineHeight : 1,
                          fontFamily : "Poppins"
                        },
                        borderColor : "red",
                        borderWidth : 1,
                        backgroundColor : "transparent",
                        color : "#474747",
                        lineHeight : "20px",
                        fontSize : "14px",
                        outline : "2px solid transparent",
                        outlineOffset : "2px"
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

              <Grid item xs={12} sm={4}>
                <Controller
                  name="learning_format"
                  control={courseControl}
                  render={({ field: { value, onChange } }) => (
                    <Autocomplete
                      fullWidth
                      value={value}
                      onChange={(event, newValue) => {
                        onChange(newValue);
                      }}
                      sx={{
                        '& .MuiInputLabel-root' : {
                          color : '#474747',
                          fontWeight : 500,
                          fontSize : "14px",
                          lineHeight : 1,
                          fontFamily : "Poppins"
                        },
                        borderColor : "red",
                        borderWidth : 1,
                        backgroundColor : "transparent",
                        color : "#474747",
                        lineHeight : "20px",
                        fontSize : "14px",
                        outline : "2px solid transparent",
                        outlineOffset : "2px"
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
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      multiline
                      rows={3}
                      sx={{
                        '& .MuiInputLabel-root' : {
                          color : '#474747',
                          fontWeight : 500,
                          fontSize : "14px",
                          lineHeight : 1,
                          fontFamily : "Poppins"
                        },
                        borderColor : "red",
                        borderWidth : 1,
                        backgroundColor : "transparent",
                        color : "#474747",
                        lineHeight : "20px",
                        fontSize : "14px",
                        outline : "2px solid transparent",
                        outlineOffset : "2px"
                      }}
                      label="Course Overview"
                      onChange={onChange}
                      placeholder="Provide course overview details"
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
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      multiline
                      rows={3}
                      sx={{
                        '& .MuiInputLabel-root' : {
                          color : '#474747',
                          fontWeight : 500,
                          fontSize : "14px",
                          lineHeight : 1,
                          fontFamily : "Poppins"
                        },
                        borderColor : "red",
                        borderWidth : 1,
                        backgroundColor : "transparent",
                        color : "#474747",
                        lineHeight : "20px",
                        fontSize : "14px",
                        outline : "2px solid transparent",
                        outlineOffset : "2px"
                      }}
                      label="Course Description"
                      onChange={onChange}
                      placeholder="Provide a detailed description of the course"
                      error={Boolean(courseErrors['description'])}
                      aria-describedby="stepper-linear-personal-description"
                      helperText={courseErrors?.description?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ color : "#474747", fontWeight: 600, fontSize: '12px', marginBottom: "12px", lineHeight: "16px" }} >Thumbnail</Typography>
                <Grid sx={{ justifyContent: 'center', display: 'flex', mb: 2 }}>
                  <ButtonStyled1 component="label" sx={{ border : Boolean(courseErrors["thumbnail"]) && "1px solid #EA5455" }} htmlFor="logo-settings-upload-image">
                    {selectedLogo ? (
                      <ImgStyled src={getImageUrl(selectedLogo)} sx={{ height: "inherit"}} alt="Selected Logo" />
                    ) : (
                      <Box
                        sx={{
                          width: "60px",
                          height: "60px",
                          backgroundColor: "#DFE3FE",
                          borderRadius: "50%",
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: "center",
                          position: 'relative',
                        }}
                      >
                        <CloudUploadOutlinedIcon style={{ width: "50%" }} />
                      </Box>
                    )}
                    <Typography
                      variant="p"
                      sx={{
                        fontWeight: 600,
                        fontSize: "12px",
                        color: Boolean(courseErrors["image"]) ? "#EA5455" : "#474747",
                        textAlign: 'center',
                        marginTop: '8px'
                      }}
                    >
                      {!selectedLogo && 'Choose File'}
                    </Typography>
                    <InputFile
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handleInputLogoImageChange}
                      id="logo-settings-upload-image"
                    />
                  </ButtonStyled1>
                </Grid>
                {Boolean(courseErrors?.thumbnail) && <Typography sx={{ color: "#EA5455", fontSize: "12px", fontWeight: 400, marginTop: "3px", marginRight: "14px", marginLeft: "14px"  }} >{courseErrors?.thumbnail.message}</Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ color : "#474747", fontWeight: 600, fontSize: '12px', marginBottom: "12px", lineHeight: "16px" }} >Main image</Typography>
                <Grid sx={{ justifyContent: 'center', display: 'flex' }}>
                  <ButtonStyled1 component="label" sx={{ border : Boolean(courseErrors["image"]) && "1px solid #EA5455" }} variant="contained" htmlFor="template-settings-upload-image">
                    {
                      selectedTemplate ?
                        <ImgStyled src={getImageUrl(selectedTemplate)} alt="Profile Pic" />
                      :
                      <>
                      <Box
                        sx={{
                          width: "60px",
                          height: "60px",
                          backgroundColor: "#DFE3FE",
                          borderRadius: "50%",
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: "center",
                          position: 'relative',
                        }}
                      >
                        <CloudUploadOutlinedIcon style={{ width: "50%" }} />
                      </Box>
                      <Typography
                      variant="p"
                      sx={{
                        fontWeight: 600,
                        fontSize: "12px",
                        color: Boolean(courseErrors["image"]) ? "#EA5455" : "#474747",
                        textAlign: 'center',
                        marginTop: '8px'
                      }}
                    >
                      Choose File
                    </Typography>
                    </>
                    }
                    <input
                      hidden
                      type="file"
                      value={inputTemplateValue}
                      accept="image/png, image/jpeg"
                      onChange={handleInputTemplateImageChange}
                      id="template-settings-upload-image"
                    />
                   
                  </ButtonStyled1>
                </Grid>
                {Boolean(courseErrors?.image) && <Typography sx={{ color: "#EA5455", fontSize: "12px", fontWeight: 400, marginTop: "3px", marginRight: "14px", marginLeft: "14px"  }} >{courseErrors?.image.message}</Typography>}
              </Grid>
               <Grid sx={{ display: "none"}} item xs={12} sm={5}>
                    <Typography sx={{ color : "#474747", fontWeight: 600, fontSize: '12px', marginBottom: "12px", lineHeight: "16px" }} >Study Material</Typography>
                    <Grid>
                      <ButtonStyled1 component="label" variant="contained" htmlFor="template-pdf-upload-image">
                      { 
                        courseSyllabus ?
                        <Grid sx={{ minWidth: "100%", minHeight: "100%"}} >
                          <PDFViewer url={courseSyllabus} />
                        </Grid>
                        : 
                        <Box
                        sx={{
                          width: "60px",
                          height: "60px",
                          backgroundColor: "#DFE3FE",
                          borderRadius: "50%",
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: "center",
                          position: 'relative',
                        }}
                      >
                        <CloudUploadOutlinedIcon style={{ width: "50%" }} />
                      </Box>
                      }
                      <Typography
                      variant="p"
                      sx={{
                        fontWeight: 600,
                        fontSize: "12px",
                        color: "#474747",
                        textAlign: 'center',
                        marginTop: '8px'
                      }}
                    >
                      { courseSyllabus ? 'Change Course Materials (PDFs)'  : 'Upload Course Materials (PDFs)'  }
                    </Typography>
                        <input ref={fileInputRef} hidden type="file" accept=".pdf" onChange={handleUpload} id="template-pdf-upload-image" />
                      </ButtonStyled1>
                    </Grid>
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
          <SuccessMessage message={"Course created successfully!"} />
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
    <Card sx={{ boxShadow: 1}} >
      {/* <Divider sx={{ m: '0 !important' }} /> */}
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};

export default AddCoursePage;
