import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { updateUser } from 'features/user-management/users-page/services/userServices';
import { getAllGroups } from 'features/user-management/groups-page/services/groupService';
import { useInstitute } from 'utils/get-institute-details';
import { getImageUrl } from 'utils/imageUtils';
import { profilePlaceholder } from 'utils/placeholders';
import { useSpinner } from 'context/spinnerContext';
import client from 'api/client';

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
  full_name: yup
    .string()
    .min(3, (obj) => showErrors('Full name', obj.value.length, obj.min))
    .required(),
  user_name: yup
    .string()
    .min(3, (obj) => showErrors('User name', obj.value.length, obj.min))
    .required(),
  email: yup.string().email().required(),
  contact: yup
    .number()
    .typeError('Contact Number field is required')
    .min(10, (obj) => showErrors('Contact Number', obj.value.length, obj.min))
    .required(),
  designation: yup.string().required()
  // role: yup.string().required()
});

const UserEditDialog = ({ openEdit, handleEditClose, userData, setRefetch }) => {
  const defaultValues = {
    full_name: '',
    user_name: '',
    email: '',
    contact: Number(''),
    designation: '',
    role: ''
  };
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
      setValue('full_name', userData.name || '');
      setValue('user_name', userData.username || '');
      setValue('email', userData?.email || '');
      setValue('contact', userData?.phone_number || '');
      setValue('designation', userData?.designation || '');
      setValue('role', userData?.role?.id || '');
    }
  }, [userData, setValue]);
  const handleClose = () => {
    setValue('full_name', '');
    setValue('user_name', '');
    setValue('email', '');
    setValue('contact', Number(''));
    setValue('designation', '');
    setValue('role', Number(''));
    handleEditClose();
    reset();
    setSelectedImage(null);
  };

  const image = require('assets/images/avatar/1.png');
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [imgSrc, setImgSrc] = useState(image);
  const [groups, setGroups] = useState([]);
  const { show, hide } = useSpinner();

  useEffect(() => {
    getGroups();
  }, []);
  console.log(userData, 'userData');
  const getGroups = async () => {
    try {
      const result = await getAllGroups({ institute_id: useInstitute().getInstituteId() });
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
    borderRadius: 50
  }));

  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }));

  const handleInputImageChange = async (file) => {
    try {
      show();
      const { files } = file.target;
      const form_data = new FormData();
      form_data.append('file', files);
      const response = await client.file.upload(form_data);
    } catch (error) {
    } finally {
      hide();
    }
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

  const onSubmit = async (data) => {
    const InputData = new FormData();
    InputData.append('name', data.full_name);
    InputData.append('user_name', data.user_name);
    InputData.append('email', data.email);
    InputData.append('mobile', data.contact);
    InputData.append('designation', data.designation);
    InputData.append('role_id', data.role);
    InputData.append('image', selectedImage);
    InputData.append('id', userData.id);

    const result = await updateUser(InputData);

    if (result.success) {
      toast.success(result.message);
      setRefetch((state) => !state);
      handleEditClose();
    } else {
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
              <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {!selectedImage && (
                  <ImgStyled
                    src={userData?.image ? getImageUrl(userData?.image) : profilePlaceholder}
                    alt="Profile Pic"
                    sx={{ position: 'relative' }} // Ensure ImgStyled has relative positioning
                  />
                )}

                {selectedImage && (
                  <ImgStyled
                    src={userData?.image ? getImageUrl(userData?.image) : profilePlaceholder}
                    alt="Profile Pic"
                    sx={{ position: 'relative' }} // Ensure ImgStyled has relative positioning
                  />
                )}

                {/* Button placed in the bottom-right of the image */}
                <ButtonStyled
                  component="label"
                  variant="contained"
                  htmlFor="account-settings-upload-image"
                  sx={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '250px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    padding: 0,
                    minWidth: '30px',
                    minHeight: '30px'
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20" fill="#fff">
                    <path d="M450 856h60V596l98 98 43-43-161-161-161 161 43 43 98-98v260ZM240 936q-33 0-56.5-23.5T160 856V296q0-33 23.5-56.5T240 216h480q33 0 56.5 23.5T800 296v560q0 33-23.5 56.5T720 936H240Zm0-80h480V296H240v560ZM240 296v560-560Z" />
                  </svg>

                  <input
                    hidden
                    type="file"
                    value={inputValue}
                    accept="image/png, image/jpeg"
                    onChange={handleInputImageChange}
                    id="account-settings-upload-image"
                  />
                </ButtonStyled>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="full_name"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    label="Full Name"
                    onChange={onChange}
                    placeholder="John Doe"
                    error={Boolean(errors.full_name)}
                    {...(errors.full_name && { helperText: errors.full_name.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="user_name"
                control={control}
                rules={{ required: true }}
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
                rules={{ required: true }}
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
                name="contact"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    type="number"
                    defaultValue={value}
                    label="Contact"
                    onChange={onChange}
                    placeholder="(397) 294-5153"
                    error={Boolean(errors.contact)}
                    {...(errors.contact && { helperText: errors.contact.message })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="designation"
                control={control}
                rules={{ required: true }}
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
                rules={{ required: true }}
                render={() => (
                  <TextField
                    select
                    fullWidth
                    defaultValue={userData?.role_groups?.role?.id}
                    onChange={(e) => {
                      setValue('role', e.target.value);
                    }}
                  >
                    {/* <MenuItem value="">Select Role</MenuItem> */}
                    {groups?.map((group, index) => (
                      <MenuItem key={index} value={group?.role?.id}>
                        {group?.role?.name}
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
            justifyContent: 'center',
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(10)} !important`],
            pb: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          <Button type="submit" variant="contained" sx={{ mr: 2 }}>
            Submit
          </Button>
          <Button variant="tonal" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserEditDialog;
