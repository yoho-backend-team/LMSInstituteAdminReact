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
import Autocomplete from '@mui/material/Autocomplete';
import Icon from 'components/icon';
import toast from 'react-hot-toast';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { updateStudentFee } from '../services/studentFeeServices';
import { useCallback } from 'react';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  course: yup.string().required('Course is required'),
  batch: yup.string().required('Batch is required'),
  students: yup.array().required('Students is required'),
  paymentId: yup.number().typeError('Payment Id must be a number').required('Payment Id is required'),
  paidAmount: yup.number().typeError('Paid Amount must be a number').required('Paid Amount is required')
});

// const defaultValues = {
//   email: '',
//   password: '',
//   confirm_password: '',
//   designation: '',
//   fullName: '',
//   userName: '',
//   role: '',
//   contact: Number('')
// };

const FeesEditDrawer = (props) => {
  // ** Props
  const { open, toggle, selectedRows,setRefetch } = props;
  const [inputValue, setInputValue] = useState('');
  const image = require('assets/images/avatar/1.png');
  const [imgSrc, setImgSrc] = useState(image);
  const [selectedImage, setSelectedImage] = useState('');


  console.log(selectedRows);

  const defaultValues = {
    full_name: '',
    user_name: '',
    email: '',
    contact: Number(''),
    designation: '',
    role: ''
  };

  // console.log(defaultValues);


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
      if (selectedRows) {
        setValue('logo', selectedRows.selectedImage || '');
        setValue('batch', selectedRows.batch || '');
        setValue('students', selectedRows?.students || '');
        setValue('paymentId', selectedRows?.paymentId || '');
        setValue('paidAmount', selectedRows?.paidAmount || '');
      }
    }, [selectedRows, setValue]);

  // Form submission handler
  const onSubmit = useCallback(
    async (data) => {
      const inputData = new FormData();
      inputData.append('student_id', student?.student_id);
      inputData.append('logo', selectedImage);
      inputData.append('batch', data.batch);
      inputData.append('students', data.students);
      inputData.append('paymentId', data.paymentId);
      inputData.append('paidAmount', data.paidAmount);

      const result = await updateStudentFee(InputData);

      if (result.success) {
        toast.success(result.message);
        setRefetch((state) => !state);
        handleEditClose();
      } else {
        toast.error(result.message);
      }
    },
  );

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

  // Function to handle image input change
  const handleInputImageChange = useCallback((file) => {
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
  }, []);

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
          <Typography variant="h5">Edit Fees</Typography>
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

            <Grid item xs={12} sm={12}>
              <Controller
                name="batch"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    fullWidth
                    value={value}
                    onChange={(event, newValue) => onChange(newValue)}
                    options={['Batch 1', 'Batch 2']}
                    renderInput={(params) => (
                      <TextField
                        sx={{ mb: 2 }}
                        {...params}
                        label="Select Batch"
                        error={Boolean(errors.batch)}
                        helperText={errors.batch?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="students"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    fullWidth
                    multiple
                    value={value}
                    onChange={(event, newValue) => onChange(newValue)}
                    options={['Student 1', 'Student 2']}
                    renderInput={(params) => (
                      <TextField
                        sx={{ mb: 2 }}
                        {...params}
                        label="Select Students"
                        error={Boolean(errors.students)}
                        helperText={errors.students?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="paymentId"
                rules={{ required: true }}
                control={control}
                render={({ field: { onChange } }) => (
                  <TextField
                    // defaultValue={selectedRows? selectedRows?.total :5556}
                    value={selectedRows ? selectedRows.total : ''}
                    sx={{ mb: 2 }}
                    fullWidth
                    // value={value}
                    onChange={onChange}
                    // label={selectedRows?.total}
                    label="Payment Id"
                    type="number"
                    error={Boolean(errors.paymentId)}
                    helperText={errors.paymentId?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="paidAmount"
                rules={{ required: true }}
                control={control}
                render={({ field: { onChange } }) => (
                  <TextField
                    sx={{ mb: 2 }}
                    fullWidth
                    value={selectedRows ? selectedRows.balance : ''}
                    onChange={onChange}
                    label="Paid Amount"
                    type="number"
                    error={Boolean(errors.paidAmount)}
                    helperText={errors.paidAmount?.message}
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

export default FeesEditDrawer;
