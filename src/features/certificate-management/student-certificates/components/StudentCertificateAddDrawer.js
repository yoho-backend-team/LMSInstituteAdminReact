// ** React Imports
import { useEffect, useState } from 'react';
// ** MUI Imports
import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
// ** Icon Imports
import { TextField } from '@mui/material';
import Icon from 'components/icon';
import toast from 'react-hot-toast';
import DatePickerWrapper from 'styles/libs/react-datepicker';
// import { addStudentFee } from '../services/studentFeeServices';
import Autocomplete from '@mui/material/Autocomplete';
import { getAllActiveBatchesByCourse } from 'features/batch-management/batches/services/batchServices';
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import CoursePdfInput from 'features/content-management/course-contents/components/PdfInput';
import { getAllActiveCourses } from 'features/course-management/courses-page/services/courseServices';
import { getAllStudentsByBatch } from 'features/student-management/students/services/studentService';
import { useSelector } from 'react-redux';
import { addStudentCertificate } from '../services/studentCertificateServices';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  course: yup.string().required('Course is required'),
  branch: yup.string().required('Branch is required'),
  batch: yup.string().required('Batch is required'),
  student: yup.string().required('Students is required'),
  name: yup.string().required('Certificate Name is required')
});

const defaultValues = {
  branch: '',
  course: '',
  batch: '',
  student: '',
  name: '',
  description: ''
};


const StudentCertificateAddDrawer = (props) => {
  // ** Props
  const { open, toggle } = props;
  // ** State

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [activeBranches, setActiveBranches] = useState([]);
  const [activeCourse, setActiveCourse] = useState([]);
  const [activeBatches, setActiveBatches] = useState([]);
  const [activeStudents, setActiveStudents] = useState([]);
  const [studymaterialPdf, setstudymaterialPdf] = useState('');
  useEffect(() => {
    getActiveBranchesByUser();
  }, []);

  useEffect(() => {
    getActiveCoursesByBranch(selectedBranchId);
  }, [selectedBranchId]);

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();

    console.log('active branches : ', result.data);
    setActiveBranches(result.data.data);
  };
  const getActiveCoursesByBranch = async (selectedBranchId) => {
    const result = await getAllActiveCourses({branch_id:selectedBranchId});

    console.log('active courses : ', result.data);
    setActiveCourse(result.data.data);
  };
  const getActiveBatchesByCourse = async (courseId) => {
    const data = { course_id: courseId };
    const result = await getAllActiveBatchesByCourse(data);

    console.log('active batches : ', result.data);
    setActiveBatches(result.data.data);
  };
  const getActiveStudentByBatch = async (courseId) => {
    const data = { batch_id: courseId };
    const result = await getAllStudentsByBatch(data);

    console.log('active students : ', result.data);
    setActiveStudents(result.data.data);
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

  const handleSetPdf = (data) => {
    setstudymaterialPdf(data);
  };

  const onSubmit = async (data) => {
    console.log(data);
    var bodyFormData = new FormData();
    bodyFormData.append('certificate_file', studymaterialPdf);
    // bodyFormData.append('branch_id', data.branch);
    bodyFormData.append('institute_student_id', data.student);
    bodyFormData.append('name', data.name);
    bodyFormData.append('description', data.description);
    bodyFormData.append('institute_branch_id', selectedBranchId);

    const result = await addStudentCertificate(bodyFormData);

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
  

  const handleClose = () => {
    setValue('contact', Number(''));
    toggle();
    reset();
  };

  return (
    <DatePickerWrapper>
      <Drawer
        open={open}
        anchor="right"
        variant="temporary"
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 500 } } }}
      >
        <Header>
          <Typography variant="h5">Add Certificate</Typography>
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

            <Grid item xs={12} sx={{ mb: 2 }}>
              <Controller
                name="branch"
                control={control}
                rules={{ required: 'Branch field is required' }}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    fullWidth
                    options={activeBranches}
                    getOptionLabel={(branch) => branch.branch_name}
                    onChange={(event, newValue) => {
                      onChange(newValue?.branch_id);
                      getActiveCoursesByBranch(newValue?.branch_id);
                    }}
                    value={activeBranches.find((branch) => branch.branch_id === value) || null}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Branch" error={Boolean(errors.branch)} helperText={errors.branch?.message} />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <Controller
                name="course"
                control={control}
                rules={{ required: 'Course field is required' }}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    fullWidth
                    options={activeCourse}
                    getOptionLabel={(course) => course.course_name}
                    onChange={(event, newValue) => {
                      onChange(newValue?.course_id);
                      getActiveBatchesByCourse(newValue?.course_id);
                    }}
                    value={activeCourse.find((course) => course.course_id === value) || null}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Course" error={Boolean(errors.course)} helperText={errors.course?.message} />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <Controller
                name="batch"
                control={control}
                rules={{ required: 'Batch field is required' }}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    fullWidth
                    options={activeBatches}
                    getOptionLabel={(batch) => batch.batch_name}
                    onChange={(event, newValue) => {
                      onChange(newValue?.batch_id);
                      getActiveStudentByBatch(newValue?.batch_id);
                    }}
                    value={activeBatches.find((batch) => batch.batch_id === value) || null}
                    renderInput={(params) => (
                      <TextField {...params} label="Batch" error={Boolean(errors.batch)} helperText={errors.batch?.message} />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <Controller
                name="student"
                control={control}
                rules={{ required: 'Student field is required' }}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    fullWidth
                    options={activeStudents}
                    getOptionLabel={(student) => `${student.first_name} ${student.last_name}`}
                    onChange={(event, newValue) => onChange(newValue?.student_id)}
                    value={activeStudents.find((student) => student.student_id === value) || null}
                    renderInput={(params) => (
                      <TextField {...params} label="Student" error={Boolean(errors.student)} helperText={errors.student?.message} />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    sx={{ mb: 2 }}
                    label="Certificate Name"
                    onChange={onChange}
                    placeholder="John Doe"
                    error={Boolean(errors.name)}
                    {...(errors.name && { helperText: errors.name.message })}
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
    </DatePickerWrapper>
  );
};

export default StudentCertificateAddDrawer;
