import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import { getBatchesByCourse } from 'features/batch-management/batches/services/batchServices';
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import CoursePdfInput from 'features/content-management/course-contents/components/PdfInput';
import { getAllCourses } from 'features/course-management/courses-page/services/courseServices';
import { getAllStudentsByBatch } from 'features/student-management/students/services/studentService';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import * as yup from 'yup';
import { addStudentCertificate } from '../services/studentCertificateServices';
import { useInstitute } from 'utils/get-institute-details';
import client from 'api/client';

// Custom styled header
const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  justifyContent: 'space-between',
  alignItems:"center",
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)',
  width:'90%',
  marginLeft:23,
  marginTop:"5%",
  backgroundColor:"linear-gradient(to right,#fbfbfb,#ebedee)"
}));

const schema = yup.object().shape({
  course: yup.string().required('Course is required'),
  branch: yup.string().required('Branch is required'),
  batch: yup.object().required('Batch is required'),
  student: yup.string().required('Students is required'),
  certificate_name: yup.string().required('Certificate Name is required')
});

const defaultValues = {
  branch: '',
  course: '',
  batch: null,
  student: '',
  certificate_name: '',
  description: ''
};

const StudentCertificateAddDrawer = (props) => {
  const { open, toggle, setStudentCertificateRefetch } = props;
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [activeBranches, setActiveBranches] = useState([]);
  const [activeCourse, setActiveCourse] = useState([]);
  const [activeBatches, setActiveBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [studymaterialPdf, setstudymaterialPdf] = useState('');

  useEffect(() => {
    getActiveBranchesByUser();
  }, []);

  useEffect(() => {
    getActiveCoursesByBranch(selectedBranchId);
  }, [selectedBranchId]);

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();
    setActiveBranches(result.data);
  };

  const getActiveCoursesByBranch = async (selectedBranchId) => {
    const result = await getAllCourses({ branch_id: selectedBranchId });
    if (result?.data) {
      setActiveCourse(result?.data);
    }
  };

  const getActiveBatchesByCourse = async (courseId) => {
    const data = { course_id: courseId, branch_id: selectedBranchId };
    const result = await getBatchesByCourse(data);
    if (result?.success) {
      setActiveBatches(result?.data);
    }
  };

  const getStudentsByBatch = async (batchId) => {
    const data = { batch_id: batchId, branch_id: selectedBranchId };
    const result = await getAllStudentsByBatch(data);
    if (result?.success) {
      setStudents(result?.data);
    }
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

  const handleSetPdf = async (data) => {
    setstudymaterialPdf(data);
  };

  const handleClose = () => {
    setValue('contact', Number(''));
    setstudymaterialPdf('');
    reset();
    toggle();
  };

  // Function to upload file to S3
  const uploadFileToS3 = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await client.file.upload();
      if (response.status === 200) {
        return response.data; // Assume the response data contains the uploaded file URL or relevant data
      } else {
        throw new Error('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    var bodyFormData = new FormData();
    bodyFormData.append('file_upload', studymaterialPdf);
    bodyFormData.append('student', data.student);
    bodyFormData.append('certificate_name', data.certificate_name);
    bodyFormData.append('description', data.description);
    bodyFormData.append('branch_id', selectedBranchId);

    const branch = activeBranches.filter(i=>i.branch_identity===data.branch);
    const InputData = {
      file_upload: data.pdf_file,
      student: data.student,
      branch_name: data.branch_id,
      branch_id: branch[0].uuid,
      institute_id: useInstitute().getInstituteId(),
      batch_id: data.batch._id,
      description: data.description,
      certificate_name: data.certificate_name,
      course: data.batch.course.uuid,
    };

    const result = await addStudentCertificate(InputData);

    if (result.success) {
      toast.success(result.message);
      handleClose();
      setStudentCertificateRefetch((state) => !state);
    } else {
      let errorMessage = '';
      Object.values(result.message).forEach((errors) => {
        errors.forEach((error) => {
          errorMessage += `${error}\n`;
        });
      });
      toast.error(errorMessage.trim());
    }
  };

  return (
    <DatePickerWrapper>
      <Drawer
        open={open}
        anchor="right"
        variant="temporary"
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 500 } }}}
      > 
        <Header>
          <Typography variant="h4" sx={{fontWeight: 'bold'}}>ADD CERTIFICATE</Typography>
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
            <Icon icon="tabler:x" fontSize='20' />
          </IconButton>
        </Header>
        <Box sx={{ p: 3,mt:2}}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Branch Field */}
            <Grid item xs={12} sx={{ mb: 4 }}>
              <Controller
                name="branch"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    fullWidth
                    options={activeBranches}
                    getOptionLabel={(branch) => branch.branch_identity}
                    onChange={(event, newValue) => {
                      onChange(newValue?.branch_identity);
                      getActiveCoursesByBranch(newValue?.uuid);
                    }}
                    value={activeBranches.find((branch) => branch.branch_identity === value) || null}
                    renderInput={(params) => (
                      <TextField 
                        {...params} 
                        label="Select Branch" 
                        error={Boolean(errors.branch)} 
                        helperText={errors.branch?.message}
                        sx={{ borderRadius: 1, borderColor: errors.branch ? 'red' : 'default'}}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            {/* Course Field */}
            <Grid item xs={12} sx={{ mb: 4 }}>
              <Controller
                name="course"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    fullWidth
                    options={activeCourse}
                    getOptionLabel={(course) => course.course_name}
                    onChange={(event, newValue) => {
                      onChange(newValue?._id);
                      getActiveBatchesByCourse(newValue?._id);
                    }}
                    value={activeCourse.find((course) => course._id === value) || null}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Course"
                        error={Boolean(errors.course)}
                        helperText={errors.course?.message}
                        sx={{ borderRadius: 1 }}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            {/* Batch Field */}
            <Grid item xs={12} sx={{ mb: 4 }}>
              <Controller
                name="batch"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    fullWidth
                    options={activeBatches}
                    getOptionLabel={(batch) => batch?.batch_name}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                      setValue('batch', newValue);
                      getStudentsByBatch(newValue?.uuid); 
                    }}
                    value={field.value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Batch"
                        error={Boolean(errors.batch)}
                        helperText={errors.batch?.message}
                        sx={{ borderRadius: 1 }}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            {/* Student Field */}
            <Grid item xs={12} sx={{ mb: 4 }}>
              <Controller
                name="student"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    select
                    fullWidth
                    label="Student"
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.student)}
                    helperText={errors.student?.message}
                    sx={{ borderRadius: 1 }}
                  >
                    {students.map((student) => (
                      <MenuItem key={student?.student} value={student?._id}>
                        {`${student?.first_name&&student?.last_name?student?.first_name+student?.last_name:student.full_name}`}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            {/* Certificate Name */}
            <Grid item xs={12} sm={12} sx={{mb: 4 }}>
              <Controller
                name="certificate_name"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    label="Certificate Name"
                    onChange={onChange}
                    placeholder="John Doe"
                    error={Boolean(errors.certificate_name)}
                    {...(errors.certificate_name && { helperText: errors.certificate_name.message })}
                    sx={{ borderRadius: 1,}}
                  />
                )}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12} sm={12}>
              <Controller
                name="description"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    label="Description"
                    onChange={onChange}
                    placeholder="Business Development Executive"
                    error={Boolean(errors.description)}
                    {...(errors.description && { helperText: errors.description.message })}
                    sx={{ borderRadius: 1,mb: 2}}
                  />
                )}
              />
            </Grid>

            {/* Submit and Cancel Buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 4,justifyContent:'space-between'}}>
              <Button type="submit" variant="contained" sx={{ mr: 3, borderRadius: 2,width:'30%',py:1}}>
                Submit
              </Button>
              <Button variant="tonal" color="secondary" onClick={handleClose} sx={{ borderRadius: 2,width:'30%',py:1}}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Drawer>
    </DatePickerWrapper>
  );
};

StudentCertificateAddDrawer.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  setStudentCertificateRefetch: PropTypes.any
};

export default StudentCertificateAddDrawer;
