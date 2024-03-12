// ** React Imports
import { useEffect, useState , forwardRef } from 'react';
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
import MenuItem from '@mui/material/MenuItem';
import Icon from 'components/icon';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { updateStudentFee } from '../services/studentFeeServices';
import DatePicker from 'react-datepicker';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  paymentId: yup.number().typeError('Payment Id must be a number').required('Payment Id is required'),
  paidAmount: yup.number().typeError('Paid Amount must be a number').required('Paid Amount is required')
});

const CustomInput = forwardRef(({ ...props }, ref) => {
  // ** Props
  const { label, readOnly } = props;

  return <TextField {...props} fullWidth inputRef={ref} label={label || ''} {...(readOnly && { inputProps: { readOnly: true } })} />;
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
  const { open, toggle, selectedRows, setRefetch } = props;
  const image = require('assets/images/avatar/1.png');
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [imgSrc, setImgSrc] = useState(image);
  const [selectedStatus, setSelectedStatus] = useState(null);
  console.log(selectedStatus);
  console.log(selectedRows);

  const defaultValues = {
    transaction_id: '',
    paid_amount: '',
    selectedImage: ''
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
      setValue('paymentId', selectedRows?.transaction_id || '');
      setValue('paidAmount', selectedRows?.paid_amount || '');
      setValue('payment_date', new Date(selectedRows?.payment_date) || '');
      
    }
  }, [selectedRows, setValue]);

  // Form submission handler
  const onSubmit = useCallback(async (data) => {
    const inputData = new FormData();
    inputData.append('logo', selectedImage);
    inputData.append('paymentId', data.transaction_id);
    inputData.append('paid_amount', data.paid_amount);
    inputData.append('payment_date', data.payment_date);
    inputData.append('id', selectedRows.id);

    const result = await updateStudentFee(inputData);

    if (result.success) {
      toast.success(result.message);
      setRefetch((state) => !state);
      handleEditClose();
    } else {
      toast.error(result.message);
    }
  });

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
    console.log(setImgSrc);
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      setSelectedImage(files[0]);
      reader.readAsDataURL(files[0]);
      if (reader.result !== null) {
        setInputValue(reader.result);
      }
    }
  };

  console.log(selectedImage);

  const handleClose = () => {
    setSelectedImage(null);
    reset();
    toggle();
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
              {!selectedImage && (
                <ImgStyled
                  src={
                    selectedRows?.payment_proof ? `${process.env.REACT_APP_PUBLIC_API_URL}/storage/${selectedRows?.payment_proof}` : imgSrc
                  }
                  alt="Profile Pic"
                />
              )}

              {selectedImage && <ImgStyled src={imgSrc} alt="Profile Pic" />}
              <div>
                <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-payment">
                  Upload New Image
                  <input
                    hidden
                    type="file"
                    value={inputValue}
                    accept="image/png, image/jpeg"
                    onChange={handleInputImageChange}
                    id="account-settings-upload-payment"
                  />
                </ButtonStyled>
              </div>
            </Box>

            <Grid item xs={12} sm={12}>
              <TextField sx={{ mb: 2 }} defaultValue={"0"} select fullWidth label="Status" onChange={(e) => handleStatusChange(e)}>
                <MenuItem value="0">Paid</MenuItem>
                <MenuItem value="1">Refund</MenuItem>
                <MenuItem value="2">Pending</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="paymentId"
                rules={{ required: true }}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    // defaultValue={selectedRows? selectedRows?.total :5556}
                    value={value}
                    sx={{ mb: 2 }}
                    fullWidth
                    // value={value}
                    onChange={onChange}
                    // label={selectedRows?.total}
                    label="transaction Id"
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
                render={({ field: { onChange, value } }) => (
                  <TextField
                    sx={{ mb: 2 }}
                    fullWidth
                    value={value}
                    onChange={onChange}
                    label="Paid Amount"
                    type="number"
                    error={Boolean(errors.paidAmount)}
                    helperText={errors.paidAmount?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
              <Controller
                name="payment_date"
                control={control}
                rules={{ required: 'Payment Date field is required' }}
                render={({ field: {  onChange } }) => (
                  <DatePicker
                    // selected={value}
                    id="basic-input"
                    dateFormat={'yyyy-MM-dd'}
                    className="full-width-datepicker"
                    onChange={onChange}
                    placeholderText="Click to select a date"
                    customInput={<CustomInput label="Payment Date" />}
                  />
                )}
              />
              {errors.payment_date && (
                <p style={{ color: 'red', margin: '5px 0 0', fontSize: '0.875rem' }}>{errors.payment_date.message}</p>
              )}
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
