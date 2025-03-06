import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, styled, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { addCourseCategory } from '../../services/courseCategoryServices';
import { getImageUrl } from 'utils/imageUtils';
import client from 'api/client';
import { useSpinner } from 'context/spinnerContext';

const CategoryAddModal = ({ open, handleAddClose, setCategoryRefetch }) => {
  const schema = useMemo(
    () =>
      yup.object().shape({
        category: yup
          .string()
          .matches(/^[a-zA-Z0-9\s]+$/, 'Category Name should not contain special characters')
          .required('Category Name is required'),
        image: yup
          .string()
          .required("Category Image is required")
      }),
    []
  );
  
  const defaultValues = {
    category: '',
    image: ''
  };

  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const [imgSrc, setImgSrc] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const { show, hide } = useSpinner()

  const handleClose = useCallback(() => {
    reset();
    handleAddClose();
  }, [reset, handleAddClose]);

  const handleInputImageChange = useCallback(async (file) => {
    const { files } = file.target;
    show()
    if (files && files[0]) {
      const img = new Image();
      img.src = URL.createObjectURL(files[0]);

      img.onload = async () => {
        // Check if the resolution is within the allowed range
        if ((img.width >= 300 && img.width <= 388)) {
          const data = new FormData();
          data.append("file", files[0]);

          const response = await client.file.upload(data);
          setSelectedImage(response.data.file);
          setValue("image",response?.data?.file)
          setImgSrc(response.data.file);
          hide()
        } else {
          hide()
          toast.error('Image resolution must be between 300x300 and 388x300 pixels');
        }
      };

      img.onerror = () => {
        hide()
        toast.error('Failed to load image');
      };
    }
  }, []);

  const handleRemoveImage = useCallback(() => {
    setSelectedImage('');
    setImgSrc('');
  }, []);

  const ImgStyled = useMemo(
    () =>
      styled('img')(({ theme }) => ({
        width: 150,
        height: 150,
        marginBottom: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        objectFit: 'cover'
      })),
    []
  );

  const onSubmit = useCallback(
    async (data) => {
      try {
        show()
        const result = await addCourseCategory({ category_name: data.category, image: selectedImage });
        reset();
        handleAddClose();
        setCategoryRefetch((state) => !state);
        toast.success(result.message);
        setSelectedImage('');
        setImgSrc('');
      } catch (error) {
        hide()
        toast.error(error.message);
      }finally{
        hide()
      }
    },
    [selectedImage, reset, handleAddClose, setCategoryRefetch]
  );
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="user-view-edit"
      aria-describedby="user-view-edit-description"
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 500, borderRadius: 2 } }}
    >
      <DialogTitle
        id="user-view-edit"
        sx={{
          ml:-7,mt:-3,
          fontSize: '1.5rem !important',
          fontWeight: 'bold',
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(10)} !important`],
          pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(5)} !important`]
        }}
      >
        Add Category
      </DialogTitle>
        <Typography variant="caption" color="textSecondary" sx={{mx:4,ml:3,color:'grey',fontSize: '0.9rem !important',}}>
        Create a new course category with an image.
              </Typography>
      <DialogContent
        sx={{
          pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(2)} !important`],
          pb: (theme) => `${theme.spacing(5)} !important`,
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <Controller
                name="category"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    label="Category Name"
                    onChange={onChange}
                    placeholder="Enter category name"
                    error={Boolean(errors.category)}
                    helperText={errors.category ? errors.category.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="center" flexDirection="column" alignItems="center">
              {imgSrc ? (
                <>
                  <ImgStyled src={getImageUrl(imgSrc)} alt="Category" />
                  <Box>
                    <Button variant="outlined" color="error" onClick={handleRemoveImage} startIcon={<CloseIcon />}>
                      Remove
                    </Button>
                  </Box>
                </>
              ) : (
                <Button variant="contained" component="label" 
                startIcon={<Icon icon="tabler:upload" />}
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: 'grey.300', 
                  },px:5,py:0.8
                }} >
                  Upload Image
                  <input
                    hidden
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleInputImageChange}
                    
                  />
                </Button>
              )}
              <Typography variant="caption" color="grey" sx={{m:2}}>
              Recommended: 388x300 pixels <br />
              Accepted formats: PNG, JPEG
              </Typography>
              { errors.image &&
              <Typography  sx={{ color: "#EA5455", fontSize: "0.75rem",fontWeight: 400}}>
                {errors?.image?.message}
              </Typography>
              }
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button variant="contained"  onClick={handleClose} sx={{ mr: 2,
                  backgroundColor: 'white',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: 'grey.300', 
                  } }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{backgroundColor: 'black',
                  color: 'white','&:hover': {
                    backgroundColor: '#353636', }}}>
              Create category
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

CategoryAddModal.propTypes = {
  open: PropTypes.bool,
  handleAddClose: PropTypes.func.isRequired,
  setCategoryRefetch: PropTypes.func.isRequired
};

export default CategoryAddModal;
