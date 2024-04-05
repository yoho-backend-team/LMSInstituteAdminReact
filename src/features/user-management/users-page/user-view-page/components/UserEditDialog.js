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
import { getAllActiveGroups } from 'features/user-management/groups-page/services/groupService';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { updateUser } from '../../services/userServices';

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
    .required()
    .min(3, (obj) => showErrors('First Name', obj.value.length, obj.min))
    .matches(/^[a-zA-Z0-9\s]+$/, 'Name should not contain special characters'),
  user_name: yup
    .string()
    .required()
    .min(3, (obj) => showErrors('User Name', obj.value.length, obj.min))
    .matches(/^[a-zA-Z0-9\s]+$/, ' User Name should not contain special characters'),
  email: yup.string().email().required(),
  contact: yup
    .string()
    .required('Contact Number field is required')
    .matches(/^[0-9]+$/, 'Contact number must contain only digits')
    .max(10, 'Contact number cannot exceed 10 digits'),
  designation: yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9\s]+$/, 'Name should not contain special characters')
    .max(50, `Designation can't exceed 50 characters`),
  // role: yup.string().required(),
  branch: yup.array().min(1, 'Select at least one branch').required('Select at least one branch')
});

const UserEditDialog = ({ openEdit, handleEditClose, userData, setRefetch }) => {
  const branches = useSelector((state) => state.auth.branches);
  const image =
    'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg';

  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [imgSrc, setImgSrc] = useState(image);
  const [groups, setGroups] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState([]);
  const defaultValues = {
    full_name: '',
    user_name: '',
    email: '',
    contact: Number(''),
    designation: '',
    role: '',
    branch: []
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
      setValue('email', userData?.institution_users?.email || '');
      setValue('contact', userData?.institution_users?.mobile || '');
      setValue('designation', userData?.institution_users?.designation || '');
      setValue('branch', userData?.branches || []);
      setValue('role', userData?.role_groups?.role?.id || '');
      setSelectedBranch(userData?.branches);
    }
  }, [userData, setValue]);
  const handleClose = () => {
    setValue('full_name', '');
    setValue('user_name', '');
    setValue('email', '');
    setValue('contact', Number(''));
    setValue('designation', '');
    setValue('branch', []);
    setValue('role', Number(''));
    handleEditClose();
    reset();
    setSelectedImage(null);
  };

  // const image = require('assets/images/avatar/1.png');

  useEffect(() => {
    getAllGroups();
  }, []);

  const getAllGroups = async () => {
    try {
      const result = await getAllActiveGroups();
      if (result.success) {
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

  const onSubmit = async (data) => {
    // const filteredBranches = selectedBranch?.filter((branch) => data?.branch?.includes(branch.branch_name));
    console.log(data?.branch);

    const InputData = new FormData();
    data?.branch.forEach((branch) => {
      InputData.append('branch_id[]', branch.branch_id);
    });
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
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {!selectedImage && (
                  <ImgStyled
                    src={
                      userData?.institution_users?.image
                        ? `${process.env.REACT_APP_PUBLIC_API_URL}/storage/${userData?.institution_users?.image}`
                        : imgSrc
                    }
                    alt="Profile Pic"
                  />
                )}

                {selectedImage && <ImgStyled src={imgSrc} alt="Profile Pic" />}
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
                    InputProps={{
                      startAdornment: <InputAdornment position="start">+91</InputAdornment>
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Autocomplete
                multiple
                disableCloseOnSelect
                id="select-multiple-chip"
                options={branches}
                getOptionLabel={(option) => option.branch_name}
                value={selectedBranch}
                onChange={(e, newValue) => {
                  // if (newValue && newValue.some((option) => option.branch_id === 'selectAll')) {
                  //   setSelectedBranch(activeCourse.filter((option) => option.branch_id !== 'selectAll'));
                  // } else {
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
                    {option.branch_name}
                  </li>
                )}
                renderTags={(value) => (
                  <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                    {value.map((option, index) => (
                      <CustomChip
                        key={option.branch_id}
                        label={option.branch_name}
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
                isOptionEqualToValue={(option, value) => option.branch_id === value.branch_id}
              // selectAllText="Select All"
              // SelectAllProps={{ sx: { fontWeight: 'bold' } }}
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
