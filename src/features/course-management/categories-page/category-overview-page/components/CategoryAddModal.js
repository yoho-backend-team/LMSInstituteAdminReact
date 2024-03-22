import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useState, useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { addCourseCategory } from '../../services/courseCategoryServices';

const CategoryAddModal = ({ open, handleAddClose, setCategoryRefetch }) => {
  const image =
  'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg';

  // Function to handle error messages
  const showErrors = useCallback((field, valueLen, min) => {
    if (valueLen === 0) {
      return `${field} field is required`;
    } else if (valueLen > 0 && valueLen < min) {
      return `${field} must be at least ${min} characters`;
    } else {
      return '';
    }
  }, []);

  // Schema for form validation
  const schema = useMemo(
    () =>
      yup.object().shape({
        category: yup
        .string()
        .matches(/^[a-zA-Z0-9\s]+$/, 'Category Name should not contain special characters')
        .required('Category Name is required'),
      }),
    [showErrors]
  );

  const defaultValues = {
    course: ''
  };

  // Form control using react-hook-form
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const [inputValue, setInputValue] = useState('');
  const [imgSrc, setImgSrc] = useState(image);
  const [selectedImage, setSelectedImage] = useState('');

  // Function to handle closing the dialog
  const handleClose = useCallback(() => {
    reset(); // Reset form
    handleAddClose(); // Close the dialog
  }, [reset, handleAddClose]);

  // Function to handle image input change
  const handleInputImageChange = useCallback((file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      setSelectedImage(files[0]);
      reader.readAsDataURL(files[0]);
      if (reader.result !== null) {
        setInputValue(reader.result);
      }
    }
  }, []);

  // Styled components
  const ImgStyled = useMemo(
    () =>
      styled('img')(({ theme }) => ({
        width: 100,
        height: 100,
        marginRight: theme.spacing(2),
        borderRadius: theme.shape.borderRadius
      })),
    []
  );

  const ButtonStyled = useMemo(
    () =>
      styled(Button)(({ theme }) => ({
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          textAlign: 'center'
        }
      })),
    []
  );

  // Form submission handler
  const onSubmit = useCallback(
    async (data) => {
      var bodyFormData = new FormData();
      bodyFormData.append('logo', selectedImage);
      bodyFormData.append('category_name', data.category);

      const result = await addCourseCategory(bodyFormData);

      if (result.success) {
        reset(); // Reset form
        handleAddClose(); // Close the dialog
        setCategoryRefetch((state) => !state); // Trigger category refetch
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    },
    [selectedImage, reset, handleAddClose, setCategoryRefetch]
  );

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="user-view-edit"
        aria-describedby="user-view-edit-description"
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 600 } }}
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
          Add Category
        </DialogTitle>
        <DialogContent
          sx={{
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(2)} !important`],
            pb: (theme) => `${theme.spacing(5)} !important`,
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                <ImgStyled src={imgSrc} alt="Profile Pic" />
                <div>
                  <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-image">
                    Upload
                    <input
                      hidden
                      type="file"
                      value={inputValue}
                      accept="image/png, image/jpeg"
                      onChange={handleInputImageChange}
                      id="account-settings-upload-image"
                    />
                  </ButtonStyled>
                </div>
              </Box>

              <Controller
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    sx={{ mb: 4 }}
                    label="Category Name"
                    onChange={onChange}
                    placeholder="John Doe"
                    error={Boolean(errors.category)}
                    {...(errors.category && { helperText: errors.category.message })}
                  />
                )}
              />
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
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

export default CategoryAddModal;
