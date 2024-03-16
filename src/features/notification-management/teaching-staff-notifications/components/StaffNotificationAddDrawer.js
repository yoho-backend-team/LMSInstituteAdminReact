// ** React Imports
import { useEffect, useState } from 'react';
// ** MUI Imports
import { Button, Grid, Typography, Checkbox } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CustomChip from 'components/mui/chip';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
// ** Icon Imports
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Icon from 'components/icon';
import { getAllActiveTeachingStaffs } from 'features/staff-management/teaching-staffs/services/teachingStaffServices';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { addStaffNotification } from '../services/staffNotificationServices';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  // type: yup.string().required('Type is required'),
  // staffs: yup.array().required('Students is required').min(1, 'Select at least one student'),
  // title: yup.string().required('Title is required'),
  // body: yup.string().required('Body is required')
});

const defaultValues = {
  type: '',
  staffs: [],
  title: '',
  body: ''
};

const StaffNotificationAddDrawer = (props) => {
  // ** Props
  const { open, toggle } = props;
  // ** State

  const [inputValue, setInputValue] = useState('');
  const image = require('assets/images/avatar/1.png');
  const [imgSrc, setImgSrc] = useState(image);
  const [selectedImage, setSelectedImage] = useState('');
  const [activeStaffs, setActiveStaffs] = useState([]);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [selectedStaff, setSelectedStaff] = useState([]);

  useEffect(() => {
    getActiveStaffsByBranch(selectedBranchId);
  }, [selectedBranchId]);

  const getActiveStaffsByBranch = async (selectedBranchId, type) => {
    const data = {
      type: type,
      branch_id: selectedBranchId
    };
    const result = await getAllActiveTeachingStaffs(data);

    console.log('active staffs : ', result.data);
    setActiveStaffs(result.data.data);
  };

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    console.log(data);
    var bodyFormData = new FormData();
    bodyFormData.append('payment_proof', selectedImage);
    bodyFormData.append('branch_id', data.branch);
    bodyFormData.append('institute_staff_id', data.staff.staff_id);
    bodyFormData.append('title', data.title);
    bodyFormData.append('body', data.body);

    const result = await addStaffNotification(bodyFormData);

    if (result.success) {
      toast.success(result.message);
    } else {
      let errorMessage = '';
      Object.values(result.message).forEach((errors) => {
        errors.forEach((error) => {
          errorMessage += `${error}\n`; // Concatenate errors with newline
        });
      });
      toast.error(errorMessage.trim());
      // toast.error(result.message);
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
      sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 700 } } }}
    >
      <Header>
        <Typography variant="h5">Add Notification</Typography>
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
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
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

          <Grid item xs={12} sx={{ mb: 2 }}>
            <Controller
              name="staff_type"
              control={control}
              rules={{ required: 'Staff Type field is required' }}
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  fullWidth
                  value={value}
                  onChange={(e, newValue) => {
                    onChange(newValue);
                    getActiveStaffsByBranch(selectedBranchId, newValue);
                  }}
                  options={['Teaching', 'Non Teaching']}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Staff Type"
                      error={Boolean(errors.staff_type)}
                      helperText={errors.staff_type?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Autocomplete
              multiple
              disableCloseOnSelect
              id="select-multiple-chip"
              options={activeStaffs}
              getOptionLabel={(option) => option?.staff_name || ''}
              value={selectedStaff}
              onChange={(e, newValue) => {
                setSelectedStaff(newValue);
                setValue('staff', newValue);
              }}
              renderInput={(params) => (
                <Controller
                  name="staff"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      {...params}
                      sx={{ mb: 2 }}
                      fullWidth
                      label="Staff"
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.staff)}
                      helperText={errors.staff ? errors.staff.message : null}
                      aria-describedby="stepper-linear-personal-branches"
                      // {...(errors.students['Students'] && { helperText: 'This field is required' })}
                      // {...(errors.students && { helperText: 'This field is required' })}
                      InputProps={{
                        ...params.InputProps,
                        style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                      }}
                    />
                  )}
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
                  {option?.staff_name}
                </li>
              )}
              renderTags={(value) => (
                <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                  {value?.map((option, index) => (
                    <CustomChip
                      key={option?.staff_id}
                      label={option?.staff_name}
                      onDelete={() => {
                        const updatedValue = [...value];
                        updatedValue?.splice(index, 1);
                        setSelectedStaff(updatedValue);
                      }}
                      color="primary"
                      sx={{ m: 0.75 }}
                    />
                  ))}
                </div>
              )}
              isOptionEqualToValue={(option, value) => option?.staff_id === value?.staff_id}
              selectAllText="Select All"
              SelectAllProps={{ sx: { fontWeight: 'bold' } }}
            />
          </Grid>

          {/* <Grid item xs={12} sx={{ mb: 2 }}>
              <Controller
                name="staff"
                control={control}
                rules={{ required: 'Staff field is required' }}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    fullWidth
                    value={value}
                    onChange={(event, newValue) => onChange(newValue)}
                    options={activeStaffs}
                    getOptionLabel={(staff) => staff.staff_name}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Staff" error={Boolean(errors.staff)} helperText={errors.staff?.message} />
                    )}
                  />
                )}
              />
            </Grid> */}

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

export default StaffNotificationAddDrawer;
