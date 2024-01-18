import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Grid, Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

import { getAllActiveGroups, updateUser } from '../services/viewUserServices';

const UserEditDialog = ({ id, userData, openEdit, handleEditClose }) => {
  const image = require('assets/images/avatar/1.png');
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [imgSrc, setImgSrc] = useState(image);
  const [groups, setGroups] = useState([]);
  const [formState, setFormState] = useState({
    id: id,
    name: '',
    email: '',
    phone: '',
    employee_id: '',
    designation: '',
    is_active: '',
    role: '',
    username: ''
  });
  useEffect(() => {
    getAllGroups();
  }, []);

  const getAllGroups = async () => {
    try {
      const result = await getAllActiveGroups();
      if (result.success) {
        console.log('User Data:', result.data);
        setGroups(result.data);
      } else {
        console.log(result.message);
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

  const handleEdit = async () => {
    var bodyFormData = new FormData();
    bodyFormData.append('image', selectedImage);
    bodyFormData.append('id', formState.id);
    bodyFormData.append('name', formState.name);
    bodyFormData.append('email', formState.email);
    bodyFormData.append('mobile', formState.phone);
    bodyFormData.append('designation', formState.designation);
    bodyFormData.append('username', formState.username);
    bodyFormData.append('role_id', formState?.role);
    bodyFormData.append('is_active', formState?.is_active);

    try {
      const result = await updateUser(bodyFormData);
      if (result.success) {
        console.log('User Data:', result.data);
        handleEditClose();
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value
    }));
  };
  return (
    <Dialog
      open={openEdit}
      onClose={handleEditClose}
      aria-labelledby="user-view-edit"
      aria-describedby="user-view-edit-description"
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 750 } }}
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
              <ImgStyled src={imgSrc} alt="Profile Pic" />
              <div>
                <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-image">
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
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full Name"
              placeholder="John Doe"
              defaultValue={userData?.name}
              name="name"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="User Name"
              placeholder="John Doe"
              defaultValue={userData?.username}
              name="username"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="email"
              label="Official Email"
              defaultValue={userData?.platform_user?.email}
              name="email"
              placeholder="john.doe@gmail.com"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contact"
              placeholder="723-348-2344"
              defaultValue={`${userData?.platform_user?.mobile}`}
              onChange={handleInputChange}
              name="phone"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Designation"
              placeholder="Developer"
              defaultValue={userData?.platform_user?.designation}
              onChange={handleInputChange}
              name="designation"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="Status" defaultValue={userData?.is_active} name="is_active" onChange={handleInputChange}>
              <MenuItem value="1">Active</MenuItem>
              <MenuItem value="0">Inactive</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField select fullWidth label="Role" defaultValue={userData?.id} name="role" onChange={handleInputChange}>
              {groups?.map((group, index) => (
                <MenuItem key={index} value={group?.id}>
                  {group?.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        {/* </form> */}
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(10)} !important`],
          pb: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`]
        }}
      >
        <Button variant="contained" sx={{ mr: 2 }} onClick={handleEdit}>
          Submit
        </Button>
        <Button variant="tonal" color="secondary" onClick={handleEditClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserEditDialog;
