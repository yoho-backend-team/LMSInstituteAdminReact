import { yupResolver } from '@hookform/resolvers/yup';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Box, Button, Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import CustomChip from 'components/mui/chip';
import { getAllGroups } from 'features/user-management/groups-page/services/groupService';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { updateUser } from '../../services/userServices';
import { imagePlaceholder, profilePlaceholder } from 'utils/placeholders';
import { getImageUrl } from 'utils/imageUtils';
import { useInstitute } from 'utils/get-institute-details';
import client from 'api/client';
import { hide } from '@popperjs/core';
import { useSpinner } from 'context/spinnerContext';
import {IconButton} from "@mui/material"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { white } from 'precise-ui/dist/es6/colors';

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
  first_name: yup
    .string()
    .required()
    .min(3, (obj) => showErrors('First Name', obj.value.length, obj.min))
    .matches(/^[a-zA-Z0-9\s]+$/, 'Name should not contain special characters'),
  last_name: yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9\s]+$/, 'Name should not contain special characters'),
  user_name: yup
    .string()
    .required()
    .min(3, (obj) => showErrors('User Name', obj.value.length, obj.min))
    .matches(/^[a-zA-Z0-9\s]+$/, ' User Name should not contain special characters'),
  email: yup.string().email().required(),
  phone_number: yup
    .string()
    .required('Contact Number field is required')
    .matches(/^[0-9]+$/, 'Contact number must contain only digits')
    .max(13, 'Contact number cannot exceed 10 digits'),
  designation: yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9\s]+$/, 'Name should not contain special characters')
    .max(50, `Designation can't exceed 50 characters`),
  // branch: yup.array().min(1, 'Select at least one branch').required('Select at least one branch')
});

const UserEditDialog = ({ openEdit, handleEditClose, userData, setRefetch }) => {
  const branches = useSelector((state) => state.auth.branches);
  
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [imgSrc, setImgSrc] = useState();
  const [groups, setGroups] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState([]);
  const defaultValues = {
    first_name: '',
    last_name : '',
    user_name: '',
    email: '',
    phone_number: '',
    designation: '',
    role: '',
    branch: []
  };
  const {show,hide} = useSpinner()
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });
  // Set form values when selectedBranch changes
  useEffect(() => {
    if (userData) {
      setValue('first_name', userData.first_name || '');
      setValue("last_name",userData?.last_name || '')
      setValue('user_name', userData.username || '');
      setValue('email', userData?.email || '');
      setValue('phone_number', userData?.phone_number?.slice(3) || '');
      setValue('designation', userData?.designation || '');
      setValue('branch', userData?.branche || []);
      setValue('role', userData?.role?.id || '');
      setSelectedBranch([userData?.branch]);
    }
  }, [userData, setValue]);
  const handleClose = () => {
    setValue('first_name', '');
    setValue("last_name",'')
    setValue('user_name', '');
    setValue('email', '');
    setValue('phone_number', '');
    setValue('designation', '');
    setValue('branch', []);
    setValue('role', Number(''));
    handleEditClose();
    reset();
    setSelectedImage(null);
  };

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    try {
      const result = await getAllGroups({branch_id:selectedBranch,institute_id:useInstitute().getInstituteId()});
      if (result.success) {
        setGroups(result.data);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
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
    const { files } = file.target;
    const image = files[0]
     if (image.size > 1048576) {
      toast.success("image upload lesser than 1mb")
    }else{
      const form_data = new FormData()
      form_data.append("file",files[0])
      const data = await client.file.upload(form_data)
      toast.success(data.message)
      setSelectedImage(data?.data?.file)
      setImgSrc(data?.data?.file)
    }
  };

  const onSubmit = async (data) => {
    show()
    const role = groups?.filter((i)=>i.id === data?.role)

    const new_form_data = {
      first_name : data?.first_name,
      last_name : data?.last_name,
      username : data?.username,
      email : data?.email,
      phone_number : "+91"+data?.phone_number,
      designation : data?.designation,
      role : role?.[0]?._id,
      userId : userData?.uuid,
      image : selectedImage ? selectedImage : userData?.image
    }

    const result = await updateUser(new_form_data);

    if (result.success) {
      toast.success(result.message);
      setRefetch((state) => !state);
      handleEditClose();
      hide()
    } else {
      hide()
      toast.error(result.message);
    }
  };
 
  return (
    <Dialog
      open={openEdit}
      onClose={handleEditClose}
      aria-labelledby="user-view-edit"
      aria-describedby="user-view-edit-description"
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 750 } }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>

        <DialogTitle
          id="user-view-edit"
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(10)} !important`],
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          Edit User Information
        </DialogTitle>

        <DialogContent
          sx={{
            pb: (theme) => `${theme.spacing(3)} !important`,
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              
              <IconButton
            sx={{
              
              position: "absolute",
              top: 195,
              right: 330,
              backgroundColor:  "ghostwhite",
              
            }}
            aria-label="upload picture"
            component="label"
          >
          <input
                      hidden
                      type="file"
                      value={inputValue}
                      accept="image/png, image/jpeg"
                      onChange={handleInputImageChange}
                      id="account-settings-upload-image"
                    />
            <CameraAltIcon  sx={{ fontSize: '20px' }}/>
          </IconButton>

                {!selectedImage && (
                  <ImgStyled
                    src={
                      userData?.image
                        ? `${getImageUrl(userData?.image)}`
                        : profilePlaceholder
                    }
                    alt="Profile Pic"
                    sx={{
                      borderRadius: '50%',
                      width: '100px',  
                      height: '100px', 
                      objectFit: 'cover', 
                    }}
                  />
                )}

                {selectedImage && <ImgStyled src={getImageUrl(imgSrc)} alt="Profile Pic" />}
                </Box>
                <div  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
  
  }}>
                  <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-image" sx={{ mt: 2, backgroundColor: 'white', 
    color: 'black',           
    '&:hover': {
      backgroundColor: 'white', 
      color: 'black',} }} >
                    Upload New Image 
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
              
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="first_name"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    label="Full Name"
                    onChange={onChange}
                    placeholder="John"
                    error={Boolean(errors.first_name)}
                    {...(errors.first_name && { helperText: errors.first_name.message })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="last_name"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    label="Last Name"
                    onChange={onChange}
                    placeholder="Doe"
                    error={Boolean(errors.full_name)}
                    {...(errors.last_name && { helperText: errors.last_name.message })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="user_name"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    defaultValue={value}
                    label="User Name"
                    onChange={onChange}
                    placeholder="John Doe"
                    error={Boolean(errors.user_name)}
                    {...(errors.user_name && { helperText: errors.user_name.message })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    defaultValue={value}
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder="johndoe@email.com"
                    {...(errors.email && { helperText: errors.email.message })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="phone_number"
                control={control}
                render={({ field: { value, onChange } }) => (
                 
                  <TextField
                    fullWidth
                    type="text"
                    defaultValue={value}
                    label="Contact"
                    onChange={onChange}
                    placeholder="(397) 294-5153"
                    error={Boolean(errors.phone_number)}
                    {...(errors.phone_number && { helperText: errors.phone_number.message })}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">+91</InputAdornment>
                    }}
                  />
                )}
              />
            </Grid>

            {/* <Grid item xs={12} sm={12}>
              <Autocomplete
                multiple
                disableCloseOnSelect
                id="select-multiple-chip"
                options={branches?branches:[]}
                getOptionLabel={(option) => option?.branch_identity}
                value={selectedBranch}
                onChange={(e, newValue) => {
                  setSelectedBranch(newValue);
                  setValue('branch', newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Select Branch"
                    InputProps={{
                      ...params.InputProps,
                      style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                    }}
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
                        key={option._id}
                        label={option.branch_identity}
                        // defaultValue={}
                        onDelete={() => {
                          const updatedValue = [...value];
                          updatedValue.splice(index, 1);
                          setSelectedBranch(updatedValue);
                          setValue('branch', updatedValue);
                        }}
                        color="primary"
                        sx={{ m: 0.75 }}
                      />
                    ))}
                  </div>
                )}
                isOptionEqualToValue={(option, value) => option._id === value._id}
              />
            </Grid> */}

            <Grid item xs={12} sm={6}>
              <Controller
                name="designation"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    defaultValue={value}
                    label="Designation"
                    onChange={onChange}
                    placeholder="Business Development Executive"
                    error={Boolean(errors.designation)}
                    {...(errors.designation && { helperText: errors.designation.message })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="role"
                control={control}
                render={() => (
                  <TextField
                    select
                    fullWidth
                    defaultValue={userData?.role?.id}
                    onChange={(e) => {
                      setValue('role', e.target.value);
                    }}
                  >
                    {/* <MenuItem value="">Select Role</MenuItem> */}
                    {groups?.map((group, index) => (
                      <MenuItem key={index} value={group?.id}>
                        {group?.identity}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions
          sx={{
            
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(10)} !important`],
            pb: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          <Button variant="tonal" color="secondary" onClick={handleClose}
           sx={{
            backgroundColor: '#f5f5f5', 
            color:'black',
            '&:hover': {
              backgroundColor: '#e0e0e0',}}}>
            Cancel
          </Button>

          <Button type="submit" variant="contained" sx={{ mr: 2,backgroundColor: 'black', 
    color: 'white',           
    '&:hover': {
      backgroundColor: 'black', 
      color: 'white',} }}>
            Save Changes
          </Button>
          

        </DialogActions>

      </form>
      
    </Dialog>
  );
};

UserEditDialog.propTypes = {
  openEdit: PropTypes.any,
  handleEditClose: PropTypes.any,
  userData: PropTypes.any,
  setRefetch: PropTypes.any
};

export default UserEditDialog;
