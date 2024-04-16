import { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Icon from 'components/icon';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { updateStudentFeeRefund } from '../services/studentFeeRefundServices';
import { useCallback } from 'react';
import PropTypes from 'prop-types';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  batch: yup.string().required('Batch is required'),
  students: yup.string().required('Student is required'),
  amount: yup.number().typeError('Paid Amount must be a number').required('Paid Amount is required')
});


const RefundEditDrawer = (props) => {
  // ** Props
  const { open, toggle,selectedRows, setRefetch } = props;
  // ** State
  const [inputValue, setInputValue] = useState('');
  const image = require('assets/images/avatar/1.png');
  const [imgSrc, setImgSrc] = useState(image);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {}, []);

  const defaultValues = {
    batch: '',
    students: '',
    amount: ''
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

    const result = await updateStudentFeeRefund(inputData);

    if (result.success) {
      toast.success(result.message);
      setRefetch((state) => !state);
      handleEditClose();
    } else {
      toast.error(result.message);
    }
  });
  const handleClose = () => {
    setValue('amount', '');
    setValue('students', '');
    setValue('batch', '');
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
        sx={{ '& .MuiDrawer-paper': { width: { xs: '80%', sm: 500 } } }}
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
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
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
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    fullWidth
                    sx={{ mb: 2 }}
                    options={['UK', 'USA', 'Australia', 'Germany']}
                    renderInput={(params) => (
                      <TextField {...params} label="Batch" error={Boolean(errors.batch)} helperText={errors.batch?.message} />
                    )}
                    onChange={(e, value) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="students"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    fullWidth
                    sx={{ mb: 2 }}
                    options={['UK', 'USA', 'Australia', 'Germany']}
                    renderInput={(params) => (
                      <TextField {...params} label="Students" error={Boolean(errors.students)} helperText={errors.students?.message} />
                    )}
                    onChange={(e, value) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="amount"
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

SubscriptionTable.propTypes = {
  open: PropTypes.any,
  selectedRows: PropTypes.any,
  toggle: PropTypes.any,
  setRefetch: PropTypes.any
};
export default RefundEditDrawer;
