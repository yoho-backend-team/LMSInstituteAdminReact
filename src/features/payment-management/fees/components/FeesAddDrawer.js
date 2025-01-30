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
import { getAllCourses } from 'features/course-management/courses-page/services/courseServices';
import { getAllStudentsByBatch } from 'features/student-management/students/services/studentService';
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import * as yup from 'yup';
import { addStudentFee } from '../services/studentFeeServices';
import { useInstitute } from 'utils/get-institute-details';
import { useSpinner } from 'context/spinnerContext';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

// Validation Schema for Payment History
const paymentHistoryValidationSchema = yup.object().shape({
  paid_amount: yup.number().required('Paid amount is required').typeError('Paid Amount is required'),
  balance: yup.number().required('Balance is required').typeError('Balance is required'),
  payment_date: yup.string().required('Payment date is required'),
  transaction_id: yup.number().required('Transaction ID is required').typeError('Transaction ID must be greater than 0'),
  payment_method: yup.string().oneOf(['offline', 'online'], 'Invalid payment method').default('offline'),
  duepaymentdate: yup.string().nullable().typeError('Due Payment Date must be a valid date')
});

const schema = yup.object().shape({
  course: yup.string().required('Course is required'),
  batch: yup.object().required('Batch is required'),
  branch: yup.string().required('Branch is required'),
  student: yup.string().required('Student is required'),
  paid_amount: yup.number().required('Paid amount is required').typeError('Paid Amount is required'),
  balance: yup.number().required('Balance is required').typeError('Balance is required'),
  payment_date: yup.string().required('Payment date is required'),
  transaction_id: yup.number().required('Transaction ID is required').typeError('Transaction ID must be greater than 0'),
  payment_method: yup.string().oneOf(['offline', 'online'], 'Invalid payment method').default('offline'),
  duepaymentdate: yup.string().nullable().typeError('Due Payment Date must be a valid date'),
  payment_history: yup.array().of(paymentHistoryValidationSchema).min(1, 'At least one payment history entry is required')
});

const defaultValues = {
  branch: '',
  course: '',
  batch: null,
  student: '',
  paid_amount: 0,
  balance: 0,
  payment_date: new Date(),
  transaction_id: 1,
  payment_method: 'offline',
  duepaymentdate: '',
  payment_history: [
    {
      paid_amount: 0,
      balance: 0,
      payment_date: new Date(),
      transaction_id: 1,
      payment_method: 'offline',
      duepaymentdate: ''
    }
  ]
};

const FeesAddDrawer = (props) => {
  // ** Props
  const { open, toggle, setRefetch } = props;

  const [inputValue, setInputValue] = useState('');
  const { show, hide } = useSpinner();
  const image =
    'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg';
  const [imgSrc, setImgSrc] = useState(image);
  const [selectedImage, setSelectedImage] = useState('');

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [activeBranches, setActiveBranches] = useState([]);
  const [activeCourse, setActiveCourse] = useState([]);
  const [activeBatches, setActiveBatches] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getActiveBranchesByUser();
  }, []);

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    getActiveCoursesByBranch(data);
  }, [selectedBranchId]);

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();
    setActiveBranches(result.data);
  };

  const getActiveCoursesByBranch = async (data) => {
    show();
    const result = await getAllCourses(data);
    if (result?.data) {
      hide();
      setActiveCourse(result?.data);
    } else {
      hide();
    }
  };

  const getActiveBatchesByCourse = async (courseId) => {
    show();
    const data = { course_id: courseId, branch_id: selectedBranchId }; // Include branch_id in the request data
    const result = await getBatchesByCourse(data);
    if (result?.success) {
      hide();
      setActiveBatches(result?.data);
    } else {
      hide();
    }
  };

  const getStudentsByBatch = async (batchId) => {
    show();
    const data = { batch_id: batchId, branch_id: selectedBranchId };
    const result = await getAllStudentsByBatch(data);
    if (result?.success) {
      hide();
      setStudents(result?.data);
    } else {
      hide();
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

  function convertDateFormat(input) {
    var originalDate = new Date(input);
    var year = originalDate.getFullYear();
    var month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
    var day = ('0' + originalDate.getDate()).slice(-2);
    var formattedDateString = month + '-' + day + '-' + year;
    return formattedDateString;
  }

  const handleClose = () => {
    setValue('contact', Number(''));
    toggle();
    reset();
  };
  console.log(errors, 'errors');
  const onSubmit = async (data) => {
    show();
    const branch = activeBranches.filter((i) => i.branch_identity === data.branch);

    const InputData = {
      student: data.student,
      branch_name: data.branch_id,
      branch_id: branch[0].uuid,
      institute_id: useInstitute().getInstituteId(),
      batch_name: data.batch._id,
      // paid_amount: data.paidAmount,
      // balance: data.balance,
      course_name: data.batch.course.uuid,
      paid_amount: data.paid_amount,
      balance: data.balance,
      payment_date: new Date(),
      transaction_id: data.transaction_id,
      payment_method: data.payment_method,
      duepaymentdate: data.duepaymentdate,
      // amount: data.amount,
      // transaction_id : data.transaction_id,
      // payment_date: new Date(),
      payment_history: [
        {
          paid_amount: data.paid_amount,
          balance: data.balance,
          payment_date: new Date(),
          transaction_id: data.transaction_id,
          payment_method: data.payment_method,
          duepaymentdate: data.duepaymentdate
        }
      ]
    };

    const result = await addStudentFee(InputData);

    if (result.success) {
      hide();
      toast.success(result.message);
      handleClose();
      setRefetch((state) => !state);
    } else {
      hide();
      let errorMessage = '';
      Object.values(result.message).forEach((errors) => {
        errors.forEach((error) => {
          errorMessage += `${error}\n`;
        });
      });
      toast.error(errorMessage.trim());
    }
  };

  const CustomInput = forwardRef(({ ...props }, ref) => {
    // ** Props
    const { label, readOnly } = props;

    return <TextField {...props} fullWidth inputRef={ref} label={label || ''} {...(readOnly && { inputProps: { readOnly: true } })} />;
  });

  // const ImgStyled = styled('img')(({ theme }) => ({
  //   width: 100,
  //   height: 100,
  //   marginRight: theme.spacing(2),
  //   borderRadius: theme.shape.borderRadius
  // }));

  // const ButtonStyled = styled(Button)(({ theme }) => ({
  //   [theme.breakpoints.down('sm')]: {
  //     width: '100%',
  //     textAlign: 'center'
  //   }
  // }));

  // const handleInputImageChange = (file) => {
  //   const reader = new FileReader();
  //   const { files } = file.target;
  //   if (files && files.length !== 0) {
  //     reader.onload = () => setImgSrc(reader.result);
  //     setSelectedImage(files[0]);
  //     reader.readAsDataURL(files[0]);
  //     if (reader.result !== null) {
  //       setInputValue(reader.result);
  //     }
  //   }
  // };

  const [isBranchSelected, setIsBranchSelected] = useState(false);
  const [isCourseSelected, setIsCourseSelected] = useState(false);
  const [isBatchSelected, setIsBatchSelected] = useState(false);
  const [isStudentSelected, setIsStudentSelected] = useState(false);

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
            {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
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
            </Box> */}
            <Grid container>
              <Grid item xs={12} sx={{ mb: 2 }}>
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
                        getActiveCoursesByBranch({ branch_id: newValue?.uuid });
                        setIsBranchSelected(true);
                        setIsCourseSelected(false);
                        setIsBatchSelected(false);
                        setIsStudentSelected(false);
                      }}
                      value={activeBranches.find((branch) => branch.branch_identity === value) || null}
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
                  render={({ field: { value, onChange } }) => (
                    <Autocomplete
                      fullWidth
                      options={activeCourse}
                      getOptionLabel={(course) => course.course_name}
                      onChange={(event, newValue) => {
                        onChange(newValue?.course_name);
                        getActiveBatchesByCourse(newValue?.course_name);
                        setIsCourseSelected(true);
                        setIsBatchSelected(false);
                        setIsStudentSelected(false);
                      }}
                      value={activeCourse.find((course) => course.course_name === value) || null}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Course" error={Boolean(errors.course)} helperText={errors.course?.message} />
                      )}
                      disabled={!isBranchSelected || isCourseSelected}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sx={{ mb: 2 }}>
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
                        setIsBatchSelected(true);
                        setIsStudentSelected(false);
                      }}
                      value={field.value}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{ mb: 2 }}
                          label="Batch"
                          error={Boolean(errors.batch)}
                          helperText={errors.batch?.message}
                        />
                      )}
                      disabled={!isCourseSelected || isBatchSelected}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sx={{ mb: 2 }}>
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
                      disabled={!isBatchSelected || isStudentSelected}
                    >
                      {students.map((student) => (
                        <MenuItem key={student?.student} value={student?._id}>
                          {`${student?.first_name && student?.last_name ? student?.first_name + student?.last_name : student.full_name}`}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sx={{ mb: 2 }}>
                <Controller
                  name="payment_date"
                  control={control}
                  defaultValue={new Date()}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      selected={value}
                      id="date-time-picker"
                      timeFormat="HH:mm"
                      className="full-width-datepicker"
                      onChange={onChange}
                      placeholderText="Click to select a date"
                      customInput={<CustomInput label="Payment Date" />}
                    />
                  )}
                />
                {errors.payment_date && (
                  <p style={{ color: 'red', margin: '5px 0 0', fontSize: '0.875rem' }}>{errors.payment_date?.message}</p>
                )}
              </Grid>

              <Grid item xs={12} sm={12}>
                <Controller
                  name="transaction_id"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={{ mb: 2 }}
                      fullWidth
                      label="Transaction Id"
                      type="number"
                      error={Boolean(errors.transaction_id)}
                      helperText={errors.transaction_id?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Controller
                  name="paid_amount"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={{ mb: 2 }}
                      fullWidth
                      label="Paid Amount"
                      type="number"
                      error={Boolean(errors.paid_amount)}
                      helperText={errors.paid_amount?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Controller
                  name="balance"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      sx={{ mb: 2 }}
                      fullWidth
                      label="Balance"
                      type="number"
                      error={Boolean(errors.balance)}
                      helperText={errors.balance?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <Controller
                  name="duepaymentdate"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      selected={value}
                      id="date-time-picker"
                      timeFormat="HH:mm"
                      className="full-width-datepicker"
                      onChange={onChange}
                      placeholderText="Click to select a date"
                      customInput={<CustomInput label="duepaymentdate" />}
                    />
                  )}
                />
                {errors.payment_date && (
                  <p style={{ color: 'red', margin: '5px 0 0', fontSize: '0.875rem' }}>{errors.payment_date?.message}</p>
                )}
              </Grid>
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

FeesAddDrawer.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  setRefetch: PropTypes.any
};
export default FeesAddDrawer;
