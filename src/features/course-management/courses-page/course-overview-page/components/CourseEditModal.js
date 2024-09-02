import { yupResolver } from '@hookform/resolvers/yup';
import { TextField as CustomTextField, Grid, styled, Typography } from '@mui/material';
import { CameraAlt as CameraAltIcon, AddPhotoAlternate as AddPhotoAlternateIcon } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { getAllCourseCategories } from 'features/course-management/categories-page/services/courseCategoryServices';
import CourseValidate from 'features/course-management/courses-page/course-add-page/components/CourseValidate';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { updateCourse } from '../../services/courseServices';
import client from 'api/client';
import { imagePlaceholder } from 'utils/placeholders';
import { getImageUrl } from 'utils/imageUtils';

const CourseEditModal = ({ open, handleEditClose, course, selectedBranchId,setRefetch }) => {
  const [activeCategories, setActiveCategories] = useState([]);

  const image =
    'https://media.istockphoto.com/id/1411772543/photo/side-profile-of-african-woman-with-afro-isolated-against-a-white-background-in-a-studio.webp?b=1&s=170667a&w=0&k=20&c=AXoZk6bD-xbU4AQ66k4AKpWBRuDgHufmP4A1_Gn_5zg=';

  const schema = yup.object().shape({
    course_duration: yup.number().required(),
    course_name: yup
      .string()
      .matches(/^[a-zA-Z0-9\s]+$/, 'Course Name should not contain special characters')
      .required('Course Name is required'),
    course_price: yup.number().required(),
    description: yup
      .string()
      .matches(/^[a-zA-Z0-9\s]+$/, 'Description should not contain special characters')
      .required('Description is required'),
    course_overview: yup
      .string()
      .matches(/^[a-zA-Z0-9\s]+$/, 'Course Overview should not contain special characters')
      .required('Course Overview is required'),
    learning_format: yup
      .string()
      .matches(/^[a-zA-Z0-9\s]+$/, 'learning Format should not contain special characters')
      .required('learning Format is required'),
    course_category: yup.string().required()
  });

  const defaultValues = {
    course_duration: '',
    course_name: '',
    course_price: '',
    description: '',
    course_overview: '',
    learning_format: '',
    course_category: ''
  };

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  // Set form values when selectedBranch changes
  useEffect(() => {
    if (course) {
      setValue('course_duration', course?.duration || '');
      setValue('course_name', course?.course_name || '');
      setValue('course_price', course?.price || '');
      setValue('description', course?.description || '');
      setValue('course_overview', course?.overview || '');
      setValue('learning_format', course?.class_type[0] || '');
      setValue('course_category', course?.category?.uuid || '');
    }
  }, [course, setValue]);

  const [inputValue, setInputValue] = useState('');
  const [imgSrc, setImgSrc] = useState(image);
  const [selectedImage, setSelectedImage] = useState('');

  const [inputTemplateValue, setInputTemplateValue] = useState('');
  const [template, setTemplate] = useState(image);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleInputImageChange = async (file) => {
    console.log("called the file", file)
    const reader = new FileReader();
    const { files } = file.target;
    const data = new FormData()
    data.append("file",files[0])
    const uploadFile = await client.file.upload(data)
    setSelectedImage(uploadFile?.data?.file)
    setImgSrc(uploadFile?.data?.file)
  };

  const handleInputTemplateChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setTemplate(reader.result);
      setSelectedTemplate(files[0]);
      reader.readAsDataURL(files[0]);
      if (reader.result !== null) {
        setInputTemplateValue(reader.result);
      }
    }
  };

  const ImgStyled = styled('img')({
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    border: '2px solid #ddd',
    objectFit: 'cover',
  });

 const ButtonStyled = styled('button')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '& svg': {
    marginRight: '8px',
  },
  });

  // Handle form submission
  const onSubmit = useCallback(
    async (data) => {
     
      const course_data = {
        course_name : data.course_name,
        duration : data.course_duration,
        price : data.course_price,
        category : data.course_category,
        class_type : data.learning_format,
        overview : data.overview,
        description : data.description,
        course : course.uuid,
        image : selectedImage ? imgSrc : course?.image
      }
      try {
        const result = await updateCourse(course_data);

        if (result.success) {
          setRefetch((state) => !state);
          toast.success(result.message);
          handleClose();
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [course]
  );

  // Close the modal
  const handleClose = useCallback(() => {
    handleEditClose();
  }, [handleEditClose, course]);

  useEffect(() => {
    getActiveCourseCategories();
  }, []);

  const getActiveCourseCategories = async (branchIds) => {
    const data = {
      branch_id: branchIds
    };
    const result = await getAllCourseCategories(data);

    if (result.data) {
      setActiveCategories(result.data);
    }
  };
  console.log(course,"course","image")
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="user-view-edit"
        aria-describedby="user-view-edit-description"
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 1000 } }}
      >
        <DialogTitle
          id="user-view-edit"
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(10)} !important`],
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          Edit Course Information
        </DialogTitle>
        <DialogContent
          sx={{
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(2)} !important`],
            pb: (theme) => `${theme.spacing(5)} !important`,
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="course_name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      // defaultValue={course?.institute_course_branch?.course_name}
                      label="Course Name"
                      onChange={onChange}
                      placeholder="Leonard"
                      error={Boolean(errors.course_name)}
                      aria-describedby="stepper-linear-personal-course_name"
                      // {...(errors.course_name && { helperText: 'This field is required' })}
                      helperText={errors.course_name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="course_duration"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label="Course Duration"
                      type="number"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(errors.course_duration)}
                      helperText={errors.course_duration?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="course_price"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type="number"
                      value={value}
                      label="Course Price"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(errors.course_price)}
                      helperText={errors.course_price?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="course_category"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      select
                      fullWidth
                      label="Course Category"
                      id="validation-billing-select"
                      error={Boolean(errors.course_category)}
                      helperText={errors.course_category?.message}
                      onChange={onChange}
                      value={value}
                    >
                      {activeCategories?.map((item, index) => (
                        <MenuItem key={index} value={item.uuid}>
                          {item.category_name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                  name="learning_format"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      multiline
                      rows={3}
                      label="learning_format"
                      onChange={onChange}
                      placeholder="Carter"
                      error={Boolean(errors.learning_format)}
                      helperText={errors.learning_format?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="course_overview"
                  control={control}
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
                      error={Boolean(errors.course_overview)}
                      helperText={errors.course_overview?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="description"
                  control={control}
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
                      error={Boolean(errors.description)}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Grid>

              <Grid container spacing={2} sx={{ mt: 5 }}>

              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ mb: 2 , textAlign: "start"}}>Thumbnail Image</Typography>
                  <ImgStyled
                    src={ course?.thumbnail ? getImageUrl(course?.thumbnail) : imagePlaceholder}
                    alt="Thumbnail"
                  />
                  <label htmlFor="thumbnail-upload">
                    <ButtonStyled component="span">
                      <CameraAltIcon />
                      Update Thumbnail
                      <input
                        hidden
                        type="file"
                        id="thumbnail-upload"
                        accept="image/png, image/jpeg"
                        // value={inputValue}
                        onChange={handleInputImageChange}
                      />
                    </ButtonStyled>
                  </label>
                </Box>
              </Grid>
        
              <Grid item xs={12} md={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ mb: 2, textAlign: "start" }}>Main Image</Typography>
                  <ImgStyled
                    src={ course?.image ? getImageUrl(course?.image) : imagePlaceholder }
                    alt="Main"
                    // sx={{ height: 200 }}
                  />
                  <label htmlFor="main-image-upload">
                    <ButtonStyled component="label" htmlFor="main-image-upload"  >
                      <AddPhotoAlternateIcon />
                      Update Main Image
                      <input
                        hidden
                        type="file"
                        id="main-image-upload"
                        accept="image/png, image/jpeg"
                        // value={inputTemplateValue}
                        onChange={handleInputTemplateChange}
                      />
                    </ButtonStyled>
                  </label>
                </Box>
              </Grid>
              </Grid>

              {/* <CourseValidate /> */}
            </Grid>

            <Grid style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
              <Button type="submit" variant="contained" sx={{ mr: 3 }}>
                Submit
              </Button>
              <Button variant="tonal" color="error" onClick={handleClose}>
                Cancel
              </Button>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

CourseEditModal.propTypes = {
  selectedBranchId: PropTypes.any,
  course: PropTypes.any,
  handleEditClose: PropTypes.any,
  open: PropTypes.any
};

export default CourseEditModal;
