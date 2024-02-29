// ** React Imports
import { useEffect, useState } from 'react';
// ** MUI Imports
import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
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
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import { useSelector } from 'react-redux';
import { getAllActiveCourses } from 'features/course-management/courses-page/services/courseServices';
import { getAllActiveBatchesByCourse } from 'features/batch-management/batches/services/batchServices';
import { getAllStudentsByBatch } from 'features/student-management/students/services/studentService';
import { addStudentCertificate } from '../services/studentCertificateServices';
import CoursePdfInput from 'features/content-management/course-contents/components/PdfInput';
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
    const result = await getAllActiveCourses(selectedBranchId);

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
    bodyFormData.append('branch_id', data.branch);
    bodyFormData.append('student_id', data.student);
    bodyFormData.append('name', data.name);
    bodyFormData.append('description', data.description);

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
                render={({ field: { value } }) => (
                  <TextField
                    fullWidth
                    select
                    SelectProps={{
                      MenuProps: Object.assign(MenuProps, {
                        PaperProps: {
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                            width: 250
                          }
                        }
                      })
                    }}
                    label="Select Branch"
                    value={value}
                    onChange={(e) => {
                      setValue('branch', e.target.value);
                      getActiveCoursesByBranch(e.target.value);
                    }}
                    error={Boolean(errors.branch)}
                    helperText={errors.branch?.message}
                  >
                    {activeBranches.map((branch) => (
                      <MenuItem key={branch.branch_id} value={branch.branch_id}>
                        {branch.branch_name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Controller
                name="course"
                control={control}
                rules={{ required: 'Course field is required' }}
                render={({ field: { value } }) => (
                  <TextField
                    fullWidth
                    select
                    SelectProps={{
                      MenuProps: Object.assign(MenuProps, {
                        PaperProps: {
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                            width: 250
                          }
                        }
                      })
                    }}
                    label="Select Course"
                    id="select-single-course-extra"
                    value={value}
                    onChange={(e) => {
                      setValue('course', e.target.value);
                      getActiveBatchesByCourse(e.target.value);
                    }}
                    error={Boolean(errors.course)}
                    helperText={errors.course?.message}
                  >
                    {activeCourse.map((course) => (
                      <MenuItem key={course.course_id} value={course.course_id}>
                        {course.course_name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Controller
                name="batch"
                control={control}
                rules={{ required: 'Batch field is required' }}
                render={({ field: { value } }) => (
                  <TextField
                    fullWidth
                    select
                    SelectProps={{
                      MenuProps: Object.assign(MenuProps, {
                        PaperProps: {
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                            width: 250
                          }
                        }
                      })
                    }}
                    label="Batch"
                    id="select-single-batch"
                    value={value}
                    onChange={(e) => {
                      setValue('batch', e.target.value);
                      getActiveStudentByBatch(e.target.value);
                    }}
                    error={Boolean(errors.batch)}
                    helperText={errors.batch?.message}
                  >
                    {activeBatches.map((batch) => (
                      <MenuItem key={batch.batch_id} value={batch.batch_id}>
                        {batch.batch_name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <Controller
                name="student"
                control={control}
                rules={{ required: 'student field is required' }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    select
                    SelectProps={{
                      MenuProps: Object.assign(MenuProps, {
                        PaperProps: {
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                            width: 250
                          }
                        }
                      })
                    }}
                    label="student"
                    id="select-single-student"
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.student)}
                    helperText={errors.student?.message}
                  >
                    {activeStudents.map((student) => (
                      <MenuItem key={student.student_id} value={student.student_id}>
                        {student.first_name} {student.last_name}
                      </MenuItem>
                    ))}
                  </TextField>
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
