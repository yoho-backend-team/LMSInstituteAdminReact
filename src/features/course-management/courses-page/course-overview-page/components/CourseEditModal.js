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

const CourseEditModal = ({ open, handleEditClose, course, selectedBranchId, setRefetch }) => {
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
      setValue('course_price', course?.current_price || '');
      setValue('description', course?.description || '');
      setValue('course_overview', course?.overview || '');
      setValue('learning_format', course?.class_type[0] || '');
      setValue('course_category', course?.category?.uuid || '');
    }
  }, [course, setValue]);

  const [inputValue, setInputValue] = useState('');
  // const [imgSrc, setImgSrc] = useState(image);
  // const [selectedImage, setSelectedImage] = useState('');

  const [imgSrc, setImgSrc] = useState(getImageUrl(course?.image));
  const [selectedImage, setSelectedImage] = useState('');

  const [inputTemplateValue, setInputTemplateValue] = useState('');
  const [template, setTemplate] = useState(course?.template);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  // const handleInputImageChange = async (e) => {
  //   e.preventDefault()
  //   console.log('called the file', e);
  //   const { files } = e.target;

  //   if (!files || files.length === 0) {
  //     console.error('No file selected');
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setImgSrc(reader.result); // Preview the image (optional)
  //   };
  //   reader.readAsDataURL(files[0]);

  //   const data = new FormData();
  //   data.append('file', files[0]);

  //   try {
  //     const uploadFile = await client.file.upload(data);
  //     setSelectedImage(uploadFile?.data?.file);
  //     setImgSrc(uploadFile?.data?.file);
  //   } catch (error) {
  //     console.error('File upload failed:', error);
  //   }
  // };

  // const handleInputImageChange = (e) => {
  //   e.preventDefault();
  //   const { files } = e.target;

  //   if (!files || files.length === 0) {
  //     console.error('No file selected');
  //     return;
  //   }

  //   const file = files[0];
  //   const reader = new FileReader();

  //   // Set up the preview of the selected image
  //   reader.onload = () => {
  //     setImgSrc(reader.result); // Preview the newly selected image
  //   };

  //   reader.readAsDataURL(file);

  //   const data = new FormData();
  //   data.append('file', file);

  //   try {
  //     client.file.upload(data).then((uploadFile) => {
  //       setSelectedImage(uploadFile?.data?.file); // Store the selected image for uploading
  //     });
  //   } catch (error) {
  //     console.error('File upload failed:', error);
  //   }
  // };

  const handleInputImageChange = (event) => {
    const file = event.target.files[0];
    if (!file || file.length === 0) {
      console.error('No file selected');
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgSrc(reader.result); // Set the data URL as the new src
        console.log(reader.result);
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }

    const data = new FormData();
    data.append('file', file);

    try {
      client.file.upload(data).then((uploadFile) => {
        setSelectedImage(uploadFile?.data?.file); // Store the selected image for uploading
      });
    } catch (error) {
      console.error('File upload failed:', error);
    }
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
    height: '200px',
    borderRadius: '8px',
    border: '2px solid #ddd',
    objectFit: 'cover'
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
      backgroundColor: '#0056b3'
    },
    '& svg': {
      marginRight: '8px'
    }
  });

  // Handle form submission
  const onSubmit = useCallback(
    async (data) => {
      console.log('Form data submitted:', data); // Debug form data
      const course_data = {
        course_name: data.course_name,
        duration: data.course_duration,
        price: data.course_price,
        category: data.course_category,
        class_type: data.learning_format,
        overview: data.overview,
        description: data.description,
        course: course.uuid,
        image: selectedImage ? imgSrc : course?.image
      };

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
    // console.log(result);

    if (result.data) {
      setActiveCategories(result.data);
    }
  };
  console.log(course, 'course', 'image');
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-course-dialog"
        sx={{
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: 900,
            borderRadius: 3,
            p: 3
          }
        }}
      >
        <DialogTitle
          id="edit-course-dialog"
          sx={{
            textAlign: 'center',
            fontWeight: 600,
            fontSize: '2rem',
            color: 'primary.main'
          }}
        >
          Edit Course Information
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="course_name"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CustomTextField
                      label="Course Name"
                      placeholder="Enter course name"
                      value={value}
                      onChange={onChange}
                      size="small"
                      fullWidth
                      error={Boolean(errors.course_name)}
                      helperText={errors.course_name?.message}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '16px'
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="course_duration"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      label="Course Duration (in months)"
                      placeholder="e.g., 6"
                      type="number"
                      size="small"
                      fullWidth
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.course_duration)}
                      helperText={errors.course_duration?.message}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '16px'
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="learning_format"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      label="Learning Format"
                      size="small"
                      value={value}
                      fullWidth
                      onChange={onChange}
                      error={Boolean(errors.learning_format)}
                      helperText={errors.learning_format?.message}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '16px'
                        }
                      }}
                    >
                      <MenuItem value="online">Online</MenuItem>
                      <MenuItem value="offline">Offline</MenuItem>
                      <MenuItem value="hybrid">Hybrid</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="course_price"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      label="Course Price"
                      placeholder="Enter course price"
                      type="number"
                      size="small"
                      fullWidth
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.course_price)}
                      helperText={errors.course_price?.message}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '16px'
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="course_category"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      select
                      label="Course Category"
                      fullWidth
                      size="small"
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.course_category)}
                      helperText={errors.course_category?.message}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '16px'
                        }
                      }}
                    >
                      {activeCategories?.map((item) => (
                        <MenuItem key={item.uuid} value={item.uuid}>
                          {item.category_name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="course_overview"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      label="Course Overview"
                      placeholder="Provide a brief overview of the course"
                      multiline
                      rows={4}
                      fullWidth
                      size="small"
                      value={value}
                      onChange={onChange}
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
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      label="Description"
                      placeholder="Provide a detailed description"
                      multiline
                      rows={4}
                      fullWidth
                      size="small"
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.description)}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Grid>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle1">Thumbnail Image</Typography>
                    <ImgStyled src={template ? template : getImageUrl(course?.thumbnail) || imagePlaceholder} alt="Thumbnail" />
                    <label htmlFor="thumbnail-upload">
                      <Button variant="outlined" component="label" sx={{ mt: 2, borderRadius: '20px' }}>
                        Update Thumbnail
                        <input
                          hidden
                          type="file"
                          id="thumbnail-upload"
                          accept="image/png, image/jpeg"
                          onChange={handleInputTemplateChange}
                        />
                      </Button>
                    </label>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle1">Main Image</Typography>
                    <ImgStyled src={imgSrc ? imgSrc : getImageUrl(course?.image)} alt="Main" />
                    <label htmlFor="main-image-upload">
                      <Button variant="outlined" component="label" sx={{ mt: 2, borderRadius: '20px' }}>
                        Update Main Image
                        <input hidden type="file" id="main-image-upload" accept="image/png, image/jpeg" onChange={handleInputImageChange} />
                      </Button>
                    </label>
                  </Box>
                </Grid>
              </Grid>

              <Grid item xs={12} sx={{ textAlign: 'center', mt: 4 }}>
                <Button type="submit" variant="contained" sx={{ mr: 2 }}>
                  Submit
                </Button>
                <Button variant="outlined" color="error" onClick={handleClose}>
                  Cancel
                </Button>
              </Grid>
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
