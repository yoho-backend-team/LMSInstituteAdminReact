import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { addNotification } from '../services/allNotificationServices';
import { useInstitute } from 'utils/get-institute-details';
import { useSpinner } from 'context/spinnerContext';

import { Modal } from "@mui/material";

const AllNotificationAddDrawer = (props) => {
  const { open, toggle, setAllNotificationRefetch } = props;
  const {show,hide} = useSpinner()

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

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();
    setActiveBranches(result.data);
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
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const handleClose = () => {
    setInputValue('');
    setImgSrc(image);
    setSelectedImage('');
    reset();
    toggle();
  };

  const onSubmit = async (data) => {
    show()
    const new_notification = {
      institute : useInstitute().getInstituteId(),
      branch : data?.branch,
      title : data?.title,
      body : data?.body
    }
    
    const result = await addNotification(new_notification);

    if (result.success) {
      hide()
      toast.success(result.message);
      handleClose();
      setAllNotificationRefetch();
    } else {
      hide()
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


     <Modal
    open={open}
    onClose={handleClose}
    closeAfterTransition
    ModalProps={{ keepMounted: true }}
    BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,0.5)" } }} 
     
  >
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "90%", sm: 500, md: 600 },
        height: "auto",  
        maxHeight: "80vh", 
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 3,
        borderRadius: 2,
        overflowY: "auto",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Header  sx={{mt:-7}}>
        <Typography variant="h2"  sx={{ml:-4}}>All Notification</Typography>
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{
            mr:-7,
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
          {/* <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
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
          </Box> */}

          <Grid item xs={12} sm={12}>
            <Controller
              name="branch"
              control={control}
              rules={{ required: 'Branch field is required' }}
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  fullWidth
                  options={activeBranches}
                  getOptionLabel={(branch) => branch.branch_identity}
                  onChange={(event, newValue) => {
                    onChange(newValue?._id);
                  }}
                  value={activeBranches.find((branch) => branch._id === value) || null}
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
                  multiline
                  rows={4}
                />
              )}
            />
          </Grid>

          <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:'flex-end', mt: 4 }}>

            <Button 
            variant="tonal"
            onClick={handleClose}
           sx={{ 
            mr: 3,
            backgroundColor: 'white', 
            color: 'black', 
            border: '1px solid #D3D3D3',  
            '&:hover': {
              backgroundColor: '#f0f0f0',  
              color: 'text.secondary',  
            },
            transition: 'all 0.3s ease',
                }}>
              Cancel
            </Button>

            <Button type="submit" variant="contained" 
            sx={{
              backgroundColor: '#1976d2', 
              color: 'white',  
              '&:hover': {
                backgroundColor: '#1565c0',  
              },
              '&:active': {
                backgroundColor: '#0d47a1',  
              },
              transition: 'all 0.3s ease',  
            }}>
              Add Notification
            </Button>

          </Box>
        </form>
      </Box>
      </Box>
      </Modal>
     
  );
};

AllNotificationAddDrawer.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  setAllNotificationRefetch: PropTypes.any
};

export default AllNotificationAddDrawer;
