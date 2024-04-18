import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, Grid, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import * as yup from 'yup';
import { updateStudentFee } from '../services/studentFeeServices';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  transaction_id: yup.number().required('Transaction Id is required').typeError('Transaction Id must be a number'),
  paid_amount: yup.number().required('Paid Amount is required').typeError('Paid Amount must be a number')
});

const CustomInput = forwardRef(({ ...props }, ref) => {
  const { label, readOnly } = props;
  return <TextField {...props} fullWidth inputRef={ref} label={label || ''} {...(readOnly && { inputProps: { readOnly: true } })} />;
});

const FeesEditDrawer = (props) => {
  const { open, toggle, selectedRows, setRefetch } = props;
  const image =
    'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg';
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [imgSrc, setImgSrc] = useState(image);
  const [selectedStatus, setSelectedStatus] = useState(selectedRows?.payment_date ? new Date(selectedRows?.payment_date) : new Date());
  const [selectedDate, setSelectedDate] = useState();

  const defaultValues = {
    transaction_id: '',
    paid_amount: '',
    selectedImage: '',
    payment_date: ''
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

  useEffect(() => {
    if (selectedRows) {
      setValue('logo', selectedRows.selectedImage || '');
      setValue('transaction_id', selectedRows?.transaction_id || '');
      setValue('paid_amount', selectedRows?.paid_amount || '');
      setValue('payment_date', new Date(`${selectedRows?.payment_date}`));
      setSelectedDate(selectedRows?.payment_date ? new Date(selectedRows?.payment_date) : new Date());
    }
  }, [selectedRows]);

  function convertDateFormat(input) {
    var originalDate = new Date(input);
    var year = originalDate.getFullYear();
    var month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
    var day = ('0' + originalDate.getDate()).slice(-2);
    var formattedDateString = year + '-' + month + '-' + day;
    return formattedDateString;
  }

  const handleClose = () => {
    setSelectedImage(null);
    reset();
    toggle();
  };

  // Form submission handler
  const onSubmit = useCallback(async (data) => {
    const inputData = new FormData();
    inputData.append('logo', selectedImage);
    inputData.append('transaction_id', data.transaction_id);
    inputData.append('paid_amount', data.paid_amount);
    inputData.append('payment_date', convertDateFormat(data.payment_date));
    inputData.append('id', selectedRows.id);

    const result = await updateStudentFee(inputData);

    if (result.success) {
      toast.success(result.message);
      setRefetch((state) => !state);
      handleClose();
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
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      setSelectedImage(files[0]);
      reader.readAsDataURL(files[0]);
      if (reader.result !== null) {
        setInputValue(reader.result);
      }
    }
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${selectedRows?.students?.image}`}
                  sx={{ mr: 2.5, height: 42, width: 42 }}
                />
                <Box>
                  <Typography variant="h5" sx={{ fontSize: '18px' }}>
                    {selectedRows?.students?.first_name}
                    {selectedRows?.students?.last_name}
                  </Typography>
                  <Typography variant="body4" sx={{ color: 'text.secondary', fontSize: '14px' }}>
                    {selectedRows?.students?.email}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontSize: 12, color: 'primary.main' }}>{selectedRows?.ago}</Typography>
              </Box>
            </Box>

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
            <Grid container>
              <Grid item xs={12} sm={12}>
                <TextField sx={{ mb: 2 }} defaultValue={'0'} select fullWidth label="Status" onChange={(e) => handleStatusChange(e)}>
                  <MenuItem value="0">Paid</MenuItem>
                  <MenuItem value="1">Refund</MenuItem>
                  <MenuItem value="2">Pending</MenuItem>
                </TextField>
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
                      error={Boolean(errors.paid_amount)}
                      helperText={errors.paid_amount?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6} sx={{ mb: 2 }}>
                <Controller
                  name="payment_date"
                  control={control}
                  rules={{ required: 'Payment Date field is required' }}
                  render={({ field: { onChange } }) => (
                    <DatePicker
                      selected={selectedDate}
                      id="basic-input"
                      className="full-width-datepicker"
                      onChange={(date) => {
                        onChange;
                        setSelectedDate(date);
                      }}
                      placeholderText="Click to select a date"
                      customInput={<CustomInput label="Payment Date" />}
                    />
                  )}
                />
                {errors.payment_date && (
                  <p style={{ color: 'red', margin: '5px 0 0', fontSize: '0.875rem' }}>{errors.payment_date.message}</p>
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

FeesEditDrawer.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  selectedRows: PropTypes.any,
  setRefetch: PropTypes.any
};
export default FeesEditDrawer;
