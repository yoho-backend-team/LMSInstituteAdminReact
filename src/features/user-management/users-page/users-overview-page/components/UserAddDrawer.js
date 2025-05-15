import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { addUser, checkUserName } from '../../services/userServices';
import { getImageUrl } from 'utils/imageUtils';
import { imagePlaceholder, profilePlaceholder } from 'utils/placeholders';
import client from 'api/client';
import { useInstitute } from 'utils/get-institute-details';
import { useSpinner } from 'context/spinnerContext';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../redux/userThunks';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};

const defaultValues = {
  email: '',
  password: '',
  confirm_password: '',
  designation: '',
  fullName: '',
  userName: '',
  role: '',
  contact: Number(''),
  branch: []
};

const SidebarAddUser = (props) => {
  const { open, toggle, groups,branch_id } = props;
  const branches = useSelector((state) => state.auth.branches);
  const [inputValue, setInputValue] = useState('');
  const { show ,hide} = useSpinner()
  const dispatch = useDispatch()

 
  const [imgSrc, setImgSrc] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  const showErrors = (field, valueLen, min) => {
    if (valueLen === 0) {
      return `${field} field is required`;
    } else if (valueLen > 0 && valueLen < min) {
      return `${field} must be at least ${min} characters`;
    } else {
      return '';
    }
  };

  const schema = yup.object().shape({
    password: yup.string().required(),
    designation: yup
      .string()
      .required()
      .matches(/^[a-zA-Z0-9\s]+$/, 'Name should not contain special characters')
      .max(50, `Designation can't exceed 50 characters`),
    email: yup.string().email('Invalid email format').required('Email is required'),
    role: yup.number().required(),
    contact: yup
      .string()
      .required('Contact Number field is required')
      .matches(/^[0-9]+$/, 'Contact number must contain only digits')
      .max(10, 'Contact number cannot exceed 10 digits'),
    fullName: yup
      .string()
      .required()
      .min(3, (obj) => showErrors('First Name', obj.value.length, obj.min))
      .matches(/^[a-zA-Z0-9\s]+$/, 'Name should not contain special characters'),
      lastName : yup.string().required(),
    userName: yup
      .string()
      .required()
      .min(3, (obj) => showErrors('User Name', obj.value.length, obj.min))
      .matches(/^[a-zA-Z0-9\s]+$/, ' User Name should not contain special characters'),
    confirm_password: yup
      .string()
      .required('Password confirmation is required')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
    branch: yup.array().min(1, 'Select at least one branch').required('Select at least one branch')
  });

  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    show()
  
    hide()
    const filteredBranches = branches?.filter((branch) => data?.branch?.includes(branch.branch_identity));

    const new_user = {
      branch : filteredBranches?.[0]?._id,
      image : imgSrc,
      first_name : data.fullName,
      last_name : data.lastName,
      email : data.email,
      phone_number : "+91"+data.contact,
      username : data.userName,
      password : data.password,
      confirm_password : data.confirm_password,
      designation : data.designation,
      role : data.role,
      institute_id : useInstitute().getInstituteId()
    }

      const result = await addUser(new_user);

      if (result.success) {
        dispatch(getAllUsers({branch_id:branch_id,institute_id:useInstitute().getInstituteId(),page:"1"}))
        hide()
        setError('');
        toggle();
        reset();
        toast.success('User created successfully');
      } else {
        hide()
       
        toast.error(result?.message);
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

  const handleInputImageChange = async (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    const image = files[0]
    if (image.size > 1048576) {
      toast.success("image upload lesser than 1mb")
    }else{
      const data = new FormData()
      data.append("file",files[0])
      try {
        const fileUpload = await client.file.upload(data)
        setImgSrc(fileUpload?.data?.file)  
        toast.success(fileUpload?.message)
      } catch (error) {
        toast.error(error?.response?.data?.message)
      }
    } 
  };

  const handleClose = () => {
    setValue('contact', Number(''));
    toggle();
    reset();
  };

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant="h5">Add User</Typography>
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
            <ImgStyled src={imgSrc?getImageUrl(imgSrc):profilePlaceholder} alt="Profile Pic" />
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
              render={({ field: { onChange, value } }) => (
                <TextField
                  sx={{ mb: 4 }}
                  select
                  fullWidth
                  label="Branch"
                  id="select-multiple-checkbox"
                  value={value}
                  onChange={onChange}
                  SelectProps={{
                    MenuProps,
                    multiple: true,
                    renderValue: (selected) => selected.join(', ')
                  }}
                  error={Boolean(errors.branch)}
                  helperText={errors.branch?.message}
                >
                  {branches?.map((item, index) => (
                    <MenuItem key={index} value={item?.branch_identity}>
                      <Checkbox checked={value.includes(item.identity)} />
                      <ListItemText primary={item.branch_identity} />
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          <Controller
            name="fullName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="First Name"
                onChange={onChange}
                placeholder="John Doe"
                error={Boolean(errors.fullName)}
                {...(errors.fullName && { helperText: errors.fullName.message })}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Last Name"
                onChange={onChange}
                placeholder="John Doe"
                error={Boolean(errors.lastName)}
                {...(errors.lastName && { helperText: errors.lastName.message })}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                type="email"
                label="Email"
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.email)}
                placeholder="johndoe@email.com"
                {...(errors.email && { helperText: errors.email.message })}
              />
            )}
          />
          <Controller
            name="contact"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                type="number"
                value={value}
                sx={{ mb: 4 }}
                label="Contact"
                onChange={onChange}
                // placeholder="(397) 294-5153"
                error={Boolean(errors.contact)}
                {...(errors.contact && { helperText: errors.contact.message })}
                InputProps={{
                  startAdornment: <InputAdornment position="start">+91</InputAdornment>
                }}
              />
            )}
          />
          <Controller
            name="designation"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Designation"
                onChange={onChange}
                placeholder="Business Development Executive"
                error={Boolean(errors.designation)}
                {...(errors.designation && { helperText: errors.designation.message })}
              />
            )}
          />
          <Controller
            name="role"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                select
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Select Role"
                onChange={onChange}
                SelectProps={{ value: value, onChange: onChange }}
                error={Boolean(errors.role)}
                {...(errors.role && { helperText: errors.role.message })}
              >
                {groups?.data?.map((group, index) => (
                  <MenuItem key={index} value={group?.id}>
                    {group?.identity}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            name="userName"
            control={control}
            render={({ field: { value } }) => (
              <TextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="UserName"
                onChange={async (e) => {
                  setValue('userName', e.target.value);
                  // const result = await checkUserName(e.target.value);

                  // if (result.success) {
                  //   setError('userName', {
                  //     type: 'manual',
                  //     message: ''
                  //   });
                  // } else {
                  //   setError('userName', {
                  //     type: 'manual',
                  //     message: 'Username is already taken'
                  //   });
                  // }
                }}
                placeholder="John Doe"
                error={Boolean(errors.userName)}
                {...(errors.userName && { helperText: errors.userName.message })}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Password"
                onChange={onChange}
                placeholder="************"
                error={Boolean(errors.password)}
                {...(errors.password && { helperText: errors.password.message })}
              />
            )}
          />
          <Controller
            name="confirm_password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label="Confirm Password"
                onChange={onChange}
                placeholder="************"
                error={Boolean(errors.confirm_password)}
                {...(errors.confirm_password && { helperText: errors.confirm_password.message })}
              />
            )}
          />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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

SidebarAddUser.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  groups: PropTypes.any
};

export default SidebarAddUser;
