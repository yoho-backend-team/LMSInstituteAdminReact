// ** React Imports
import { useState, useEffect } from 'react';
// ** MUI Imports
import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
// import axios from 'axios';
// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
// ** Icon Imports
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Icon from 'components/icon';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { getActiveBranches } from 'features/branch-management/services/branchServices';

import { addNotification } from '../services/allNotificationServices';

const AllNotificationAddDrawer = (props) => {
  // ** Props
  const { open, toggle, setAllNotificationRefetch } = props;

  // ** State

  const [inputValue, setInputValue] = useState('');
  const image =
    'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg';

  const [imgSrc, setImgSrc] = useState(image);
  const [selectedImage, setSelectedImage] = useState('');
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [activeBranches, setActiveBranches] = useState([]);

  useEffect(() => {
    getActiveBranchesByUser();
  }, [selectedBranchId]);

  // useEffect(() => {
  //   getActiveStaffsByBranch(selectedBranchId);
  // }, [selectedBranchId]);

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();

    console.log('active branches : ', result.data);
    setActiveBranches(result.data.data);
  };

  const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(6),
    justifyContent: 'space-between'
  }));

  const schema = yup.object().shape({
    branch: yup.string().required('Branch is required'),
    title: yup
      .string()
      .required('Title is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Title should not contain special characters'),
    body: yup
      .string()
      .required('Body is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'body should not contain special characters')
  });

  const defaultValues = {
    title: '',
    body: '',
    branch: ''
  };

  const {
    reset,
    control,
    // setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const handleClose = () => {
    setInputValue(''); // Reset input value
    setImgSrc(image); // Reset image source
    setSelectedImage(''); // Reset selected image
    reset(); // Reset form values
    toggle(); // Close the drawer
  };

  const onSubmit = async (data) => {
    console.log(data);
    var bodyFormData = new FormData();
    // data?.students?.forEach((student) => {
    //   bodyFormData.append('student_ids[]', student?.student_id);
    // });
    bodyFormData.append('image', selectedImage);
    bodyFormData.append('branch', data.branch); // Accessing course_id from selected object
    bodyFormData.append('branch_id', selectedBranchId); // Accessing batch_id from selected object
    bodyFormData.append('title', data.title);
    bodyFormData.append('body', data.body);

    const result = await addNotification(bodyFormData);

    if (result.success) {
      toast.success(result.message);
      handleClose();
      setAllNotificationRefetch();
    } else {
      toast.error(result.message);
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

  const handleInputImageChange = (file) => {
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
  };

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 700 } } }}
    >
      <Header>
        <Typography variant="h5">All Notification</Typography>
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: (theme) => `rgba(${theme.palette.secondary.main}, 0.16)`
            }
          }}
        >
          <Icon icon="tabler:x" fontSize="1.125rem" />
        </IconButton>
      </Header>
      <Box sx={{ p: (theme) => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
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

          <Grid item xs={12} sm={12}>
            <Controller
              name="branch"
              control={control}
              rules={{ required: 'Branch field is required' }}
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  fullWidth
                  options={activeBranches}
                  getOptionLabel={(branch) => branch.branch_name}
                  onChange={(event, newValue) => {
                    onChange(newValue?.branch_id);
                    // getActiveCoursesByBranch(newValue?.branch_id);
                  }}
                  value={activeBranches.find((branch) => branch.branch_id === value) || null}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{ mb: 4 }}
                      label="Select Branch"
                      error={Boolean(errors.branch)}
                      helperText={errors.branch?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  sx={{ mb: 2 }}
                  label="Title"
                  value={value}
                  onChange={onChange}
                  placeholder="Placeholder"
                  error={Boolean(errors.title)}
                  helperText={errors.title ? errors.title.message : null}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name="body"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  sx={{ mb: 2 }}
                  label="Body"
                  value={value}
                  onChange={onChange}
                  placeholder="Placeholder"
                  error={Boolean(errors.body)}
                  helperText={errors.body ? errors.body.message : null}
                  multiline // Add multiline prop
                  rows={4} // Set rows to 4
                />
              )}
            />
          </Grid>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
            <Button type="submit" variant="contained" sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant="tonal" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
};

export default AllNotificationAddDrawer;
