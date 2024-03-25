// ** React Imports
import { useEffect, useState } from 'react';
// ** MUI Imports
import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
// import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
// ** Icon Imports
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Icon from 'components/icon';
import { getAllActiveBatchesByCourse } from 'features/batch-management/batches/services/batchServices';
import { getAllActiveCourses } from 'features/course-management/courses-page/services/courseServices';
import { getFeeByStudentId } from 'features/payment-management/fees/services/studentFeeServices';
import { getAllStudentsByBatch } from 'features/student-management/students/services/studentService';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { addStudentFeeRefund } from '../services/studentFeeRefundServices';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  course: yup.string().required('Course is required'),
  batch: yup.string().required('Batch is required'),
  student: yup.string().required('Students is required'),
  amount: yup.number().typeError('Amount must be a number').required('Paid Amount is required'),
  studentfee: yup.object().required('Student Fee is required')
});

const defaultValues = {
  course: '',
  batch: '',
  student: '',
  amount: Number('0'),
  studentfee: ''
};

const RefundAddDrawer = (props) => {
  // ** Props
  const { open, toggle } = props;
  // ** State

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const [activeCourse, setActiveCourse] = useState([]);
  const [activeBatches, setActiveBatches] = useState([]);
  const [activeStudents, setActiveStudents] = useState([]);
  const [activeStudentsFee, setActiveStudentsFee] = useState([]);

  console.log(activeStudentsFee);

  useEffect(() => {
    getActiveCoursesByBranch(selectedBranchId);
  }, [selectedBranchId]);

  const getActiveCoursesByBranch = async (selectedBranchId) => {
    const result = await getAllActiveCourses({ branch_id: selectedBranchId });
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

  const getStudentByStudentFee = async (studentId) => {
    const data = { student_id: studentId };
    const result = await getFeeByStudentId(data);

    console.log('student fees : ', result.data);
    setActiveStudentsFee(result.data.data);
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
    setValue('amount', '');
    setValue(''); // Reset input value
    reset(); // Reset form values
    toggle(); // Close the drawer
  };

  const onSubmit = async (data) => {
    console.log(data);
    var bodyFormData = new FormData();
    bodyFormData.append('student_id', data.student);
    bodyFormData.append('course_id', data.course);
    bodyFormData.append('batch_id', data.batch);
    bodyFormData.append('amount', data.amount);
    bodyFormData.append('institute_student_fee_id', data.studentfee.fee_id);
    bodyFormData.append('branch_id', selectedBranchId);

    const result = await addStudentFeeRefund(bodyFormData);

    if (result.success) {
      toast.success(result.message);
      handleClose();
    } else {
      let errorMessage = '';
      Object.values(result.message).forEach((errors) => {
        errors.forEach((error) => {
          errorMessage += `${error}\n`;
        });
      });
      toast.error(errorMessage.trim());
      // toast.error(result.message);
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
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 500 } } }}
      >
        <Header>
          <Typography variant="h5">Add Fees</Typography>
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
                    onChange={(event, newValue) => {
                      onChange(newValue?.student_id);
                      getStudentByStudentFee(newValue?.student_id);
                    }}
                    value={activeStudents.find((student) => student.student_id === value) || null}
                    renderInput={(params) => (
                      <TextField {...params} label="Student" error={Boolean(errors.student)} helperText={errors.student?.message} />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <Controller
                name="studentFee"
                control={control}
                rules={{ required: 'Student Fee field is required' }}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    fullWidth
                    options={activeStudentsFee}
                    getOptionLabel={(student) => `${student.fee_id}`}
                    onChange={(event, newValue) => {
                      onChange(newValue?.student_id), setValue('studentfee', newValue);
                    }}
                    value={activeStudentsFee.find((student) => student.student_id === value) || null}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Student Fee"
                        error={Boolean(errors.studentfee)}
                        helperText={errors.studentfee?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="Amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{ mb: 2 }}
                    fullWidth
                    label="Amount"
                    type="number"
                    error={Boolean(errors.amount)}
                    helperText={errors.amount?.message}
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

export default RefundAddDrawer;
