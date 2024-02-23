// ** React Imports
import { useEffect, useState } from 'react';
// ** MUI Imports
import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import axios from 'axios';
// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
// ** Icon Imports
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import Icon from 'components/icon';
import CustomChip from 'components/mui/chip';
import toast from 'react-hot-toast';
import { addCourseStudyMaterial } from '../study-materials/services/studyMaterialServices';
import CoursePdfInput from './PdfInput';
import MenuItem from '@mui/material/MenuItem';

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`;
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`;
  } else {
    return '';
  }
};

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  description: yup.string().required(),
  title: yup
    .string()
    .min(3, (obj) => showErrors('Title', obj.value.length, obj.min))
    .required(),
  branch: yup.string().required(),
  courses: yup.array().min(1, 'Please select at least one course')
});

const defaultValues = {
  description: '',
  title: '',
  branch: '',
  courses: []
};

const StudyMaterialAddDrawer = (props) => {
  // ** Props
  const { open, toggle } = props;

  // ** State
  const [studymaterialPdf, setstudymaterialPdf] = useState('');
  const [groups, setGroups] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const courses = [
    { course_id: '1', course_name: 'Course 1' },
    { course_id: '2', course_name: 'Course 2' },
    { course_id: '3', course_name: 'Course 3' }
  ];

  useEffect(() => {
    getAllGroups();
  }, []);

  console.log(studymaterialPdf);

  const getAllGroups = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/user-management/course/get-all`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };

    await axios
      .request(config)
      .then((response) => {
        console.log('Groups : ', response.data);
        setGroups(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(groups);

  // ** Hooks
  const {
    reset,
    control,
    setValue,
    // setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    var bodyFormData = new FormData();
    bodyFormData.append('branch', data.branch);
    bodyFormData.append('course', data.course);
    bodyFormData.append('title', data.title);
    bodyFormData.append('description', data.description);
    console.log(bodyFormData);

    const result = await addCourseStudyMaterial(bodyFormData);

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

  const handleSetPdf = (data) => {
    setstudymaterialPdf(data);
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
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 500 } } }}
    >
      <Header>
        <Typography variant="h5">Add Study Material</Typography>
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
          <Grid item xs={12} sm={12} sx={{ mb: 4 }}>
            <CoursePdfInput setCourseNotePdf={handleSetPdf} />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name="Branch"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  value={value}
                  select
                  defaultValue=""
                  label="Branch"
                  id="custom-select"
                  onChange={onChange}
                  error={Boolean(errors.branch)}
                  {...(errors.branch && { helperText: errors.branch.message })}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Autocomplete
              multiple
              disableCloseOnSelect
              id="select-multiple-chip"
              options={[{ course_id: 'selectAll', course_name: 'Select All' }, ...courses]}
              getOptionLabel={(option) => option.course_name}
              value={selectedCourses}
              onChange={(e, newValue) => {
                if (newValue && newValue.some((option) => option.course_id === 'selectAll')) {
                  setSelectedCourses(courses.filter((option) => option.course_id !== 'selectAll'));
                } else {
                  setSelectedCourses(newValue);
                }
              }}
              renderInput={(params) => (
                <TextField
                  sx={{ mb: 2 }}
                  {...params}
                  fullWidth
                  label="Courses"
                  InputProps={{
                    ...params.InputProps,
                    style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                  }}
                  error={Boolean(errors.courses)}
                  {...(errors.courses && { helperText: errors.courses.message })}
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
                  {option.course_name}
                </li>
              )}
              renderTags={(value) => (
                <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                  {value.map((option, index) => (
                    <CustomChip
                      key={option.course_id}
                      label={option.course_name}
                      onDelete={() => {
                        const updatedValue = [...value];
                        updatedValue.splice(index, 1);
                        setSelectedCourses(updatedValue);
                      }}
                      color="primary"
                      sx={{ m: 0.75 }}
                    />
                  ))}
                </div>
              )}
              isOptionEqualToValue={(option, value) => option.course_id === value.course_id}
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
                  value={value}
                  sx={{ mb: 2 }}
                  label="Title"
                  onChange={onChange}
                  placeholder="John Doe"
                  error={Boolean(errors.title)}
                  {...(errors.title && { helperText: errors.title.message })}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  sx={{ mb: 2 }}
                  label="description"
                  onChange={onChange}
                  placeholder="Business Development Executive"
                  error={Boolean(errors.description)}
                  {...(errors.description && { helperText: errors.description.message })}
                />
              )}
            />
          </Grid>

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

export default StudyMaterialAddDrawer;
