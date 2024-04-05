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
import { TextField, MenuItem } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Icon from 'components/icon';
import { getAllBatches } from 'features/batch-management/batches/services/batchServices';
import { getAllActiveCourses } from 'features/course-management/courses-page/services/courseServices';
import { getFeeByStudentId } from 'features/payment-management/fees/services/studentFeeServices';
import { getAllStudents } from 'features/student-management/students/services/studentService';
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
  batch: yup.object().required('Batch is required'),
  student: yup.string().required('Students is required'),
  amount: yup.number().typeError('Amount must be a number').required('Paid Amount is required'),
  studentfee: yup.string().required('Student Fee is required')
});

const defaultValues = {
  course: '',
  batch: null,
  student: '',
  amount: Number('0'),
  studentfee: ''
};

const RefundAddDrawer = (props) => {
  // ** Props
  const { open, toggle, setRefetch } = props;
  // ** State

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const [activeCourse, setActiveCourse] = useState([]);
  const [activeBatches, setActiveBatches] = useState([]);
  // const [activeStudents, setActiveStudents] = useState([]);
  const [activeStudentsFee, setActiveStudentsFee] = useState([]);

  const [selectedStudentFee, setSelectedStudentFee] = useState(null);

  const [students, setStudents] = useState([]);

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
    const data = { course_id: courseId, branch_id: selectedBranchId }; // Include branch_id in the request data
    const result = await getAllBatches(data);

    console.log('active batches : ', result.data);
    setActiveBatches(result.data.data);

    // Fetch students whenever active batches change
    result.data.data.forEach((batch) => {
      getStudentsByBatch(batch.batch_id);
    });
  };

  const getStudentsByBatch = async (batchId) => {
    const data = { batch_id: batchId, branch_id: selectedBranchId };
    const result = await getAllStudents(data);
    setStudents(result.data.data); // Assuming result.data contains the list of students
  };

  const getStudentByStudentFee = async (studentId) => {
    try {
      const data = { student_id: studentId };
      const result = await getFeeByStudentId(data);

      console.log('student fees : ', result.data.data);

      // Assuming result.data contains the list of student fees
      setActiveStudentsFee(result.data.data);
    } catch (error) {
      console.error('Error fetching student fees:', error);
      // Handle error if needed
    }
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
    // Check if selectedStudentFee is not null
    if (selectedStudentFee) {
      console.log('Form data:', data);
      try {
        const InputData = {
          student_id: data.student,
          course_id: data.course,
          batch_id: data.batch,
          amount: data.amount,
          institute_student_fee_id: selectedStudentFee.fee_id,
          branch_id: selectedBranchId
        };

        const result = await addStudentFeeRefund(InputData);

        if (result.success) {
          toast.success(result.message);
          setRefetch((state) => !state);
          handleClose();
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('An error occurred while submitting the form. Please try again.');
      }
    } else {
      // Handle case where no student fee is selected
      toast.error('Please select a student fee.');
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
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    fullWidth
                    options={activeBatches}
                    getOptionLabel={(option) => option?.batch?.batch_name}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                      setValue('batch', newValue);
                      getStudentsByBatch(newValue?.batch_id);
                    }}
                    value={field.value} // Set the selected value directly from the field value
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ mb: 2 }}
                        label="Batch"
                        error={Boolean(errors.batch)}
                        helperText={errors.batch?.message}
                      />
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
                render={({ field: { value } }) => (
                  <TextField
                    select
                    fullWidth
                    label="Student"
                    value={value}
                    onChange={(e) => {
                      setValue('student', e.target.value);
                      getStudentByStudentFee(e.target.value);
                    }}
                    error={Boolean(errors.student)}
                    helperText={errors.student?.message}
                  >
                    {students.map((student) => (
                      <MenuItem key={student?.student?.student_id} value={student?.student?.student_id}>
                        {`${student?.student?.first_name} ${student?.student?.last_name}`}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <Controller
                name="studentfee"
                control={control}
                rules={{ required: 'Student Fee field is required' }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    fullWidth
                    options={activeStudentsFee}
                    getOptionLabel={(studentFee) => `${studentFee.fee_id}`}
                    onChange={(event, newValue) => {
                      setSelectedStudentFee(newValue); // Set the selected fee object
                      field.onChange(newValue?.fee_id); // Set the field value
                    }}
                    value={selectedStudentFee}
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
