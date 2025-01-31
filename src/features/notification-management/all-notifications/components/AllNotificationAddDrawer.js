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

const AllNotificationAddDrawer = (props) => {
  const { open, toggle, setAllNotificationRefetch } = props;
  const { show, hide } = useSpinner();

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
    show();
    const new_notification = {
      institute: useInstitute().getInstituteId(),
      branch: data?.branch,
      title: data?.title,
      body: data?.body
    };

    const result = await addNotification(new_notification);

    if (result.success) {
      hide();
      toast.success(result.message);
      handleClose();
      setAllNotificationRefetch();
    } else {
      hide();
      toast.error(result.message);
    }
  };

  const AnimatedTextField = styled(TextField)(({ theme }) => ({
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.1)`
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.grey[400]
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.green,
        boxShadow: `0px 0px 8px rgba(0, 255, 13, 0.2)`
      }
    }
  }));

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
      sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 450 } } }}
    >
      <Box
        sx={{
          border: '1px solid #e0e0e0',
          boxShadow: 3,
          padding: 3,
          margin: '80px auto',
          borderRadius: '12px',
          backgroundColor: 'background.paper',
          width: { xs: '90%', sm: '80%', md: '60%' }
        }}
      >
          <Header sx={{height: '5px' , borderBottom: '1px solid #ddd'}}>
            <Typography variant="h3" fontWeight={600} color="primary">
              Add Notification
            </Typography>
            <IconButton
              size="small"
              onClick={handleClose}
              sx={{
                color: 'text.primary',
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.secondary.light
                }
              }}
            >
              <Icon icon="tabler:x" fontSize="1.125rem" />
            </IconButton>
          </Header>

        <Box>
          <Box sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="branch"
                    control={control}
                    rules={{ required: 'Branch field is required' }}
                    render={({ field: { value, onChange } }) => (
                      <Autocomplete
                        fullWidth
                        options={activeBranches}
                        getOptionLabel={(branch) => branch.branch_identity}
                        onChange={(event, newValue) => onChange(newValue?._id)}
                        value={activeBranches.find((branch) => branch._id === value) || null}
                        renderInput={(params) => (
                          <AnimatedTextField
                            {...params}
                            label="Select Branch"
                            error={Boolean(errors.branch)}
                            helperText={errors.branch?.message}
                          />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="title"
                    control={control}
                    rules={{ required: 'Title field is required' }}
                    render={({ field: { value, onChange } }) => (
                      <AnimatedTextField
                        fullWidth
                        label="Title"
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.title)}
                        helperText={errors.title?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="body"
                    control={control}
                    rules={{ required: 'Body field is required' }}
                    render={({ field: { value, onChange } }) => (
                      <AnimatedTextField
                        fullWidth
                        label="Body"
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.body)}
                        helperText={errors.body?.message}
                        multiline
                        rows={4}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

AllNotificationAddDrawer.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  setAllNotificationRefetch: PropTypes.any
};

export default AllNotificationAddDrawer;
