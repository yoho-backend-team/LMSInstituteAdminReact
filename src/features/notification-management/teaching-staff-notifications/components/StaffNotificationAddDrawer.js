import { yupResolver } from '@hookform/resolvers/yup';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Button, Checkbox, Grid, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import CustomChip from 'components/mui/chip';
import { getAllActiveTeachingStaffs } from 'features/staff-management/teaching-staffs/services/teachingStaffServices';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { addStaffNotification } from '../services/staffNotificationServices';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  staff_type: yup.string().required('Type is required'),
  staff: yup.array().required('staff is required').min(1, 'Select at least one staff'),
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
  staff_type: '',
  staff: [],
  title: '',
  body: ''
};

const StaffNotificationAddDrawer = (props) => {
  const { open, toggle, setStaffNotificationRefetch } = props;

  const [inputValue, setInputValue] = useState('');

  const image =
    'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg';

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

  const handleClose = () => {
    setInputValue('');
    setImgSrc(image);
    setSelectedImage('');
    reset();
    toggle();
  };

  const onSubmit = async (data) => {
    console.log(data);
    var bodyFormData = new FormData();
    data?.staff?.forEach((staff) => {
      bodyFormData.append('staff_ids[]', staff?.staff_id);
    });
    bodyFormData.append('image', selectedImage);
    bodyFormData.append('branch_id', selectedBranchId);
    bodyFormData.append('type', data.type);
    bodyFormData.append('title', data.title);
    bodyFormData.append('body', data.body);

    const result = await addStaffNotification(bodyFormData);

    if (result.success) {
      toast.success(result.message);
      handleClose();
      setStaffNotificationRefetch();
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
        <Typography variant="h5">Add Staff Notification</Typography>
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
                        setValue('staff', updatedValue);
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

StaffNotificationAddDrawer.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  setStaffNotificationRefetch: PropTypes.any
};

export default StaffNotificationAddDrawer;
