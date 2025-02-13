import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, Grid, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import * as yup from 'yup';
import { updateTeachingStaffSalary } from '../teaching-staffs/services/teachingStaffSalariesServices';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  transaction_id: yup.number().typeError('Transaction id must be a number').required('Transaction id is required'),
  salary_amount: yup.number().typeError('Paid Amount must be a number').required('Paid Amount is required')
});

const SalaryEditDrawer = (props) => {
  const { open, toggle, selectedRows, setRefetch } = props;
  const image =
    'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg';
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [imgSrc, setImgSrc] = useState(image);
  console.log(selectedRows,"----------------------------------------------");
  

  const defaultValues = {
    transaction_id: '',
    salary_amount: '',
    selectedImage: ''
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

  // Set form values when selectedBranch changes
  useEffect(() => {
    if (selectedRows) {
      setValue('image', selectedRows?.selectedImage || '');
      setValue('transaction_id', selectedRows?.transaction_id || '');
      setValue('salary_amount', selectedRows?.salary_amount || '');
    }
  }, [selectedRows, setValue]);

  const handleClose = () => {
    setValue('contact', Number(''));
    toggle();
    reset();
  };

  const onSubmit = useCallback(async (data) => {
    const inputData = new FormData();
    inputData.append('image', selectedImage);
    inputData.append('transaction_id', data.transaction_id);
    inputData.append('salary_amount', data.salary_amount);
    inputData.append('_id', selectedRows._id);

    const salary_data = {
      image : selectedImage,
      transaction_id : data.transaction_id,
      salary_amount : data.salary_amount,
      _id : selectedRows._id
    }

    const result = await updateTeachingStaffSalary(salary_data);
    if (result.success) {
      toast.success(result.message);
      handleClose();
      setRefetch((state) => !state);
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

  return (
    <DatePickerWrapper>
      <Drawer
        open={open}
        anchor="right"
        variant="temporary"
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%',xs:300, sm: 500 } } }}
      >
        <Header>
          <Typography variant="h4"  sx={{outline:1.5,outlineColor:'#0cce7f',px:2, py:1, borderRadius:"50px"  }}>Edit Salaries</Typography>
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
        <Box sx={{p:2, boxShadow:3,mx:6,borderRadius:'20px',display:'flex', justifyContent:'center', alignItems:'center' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                <Avatar
                  src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${selectedRows?.staff?.image}`}
                  sx={{ mr: 2.5, height: 42, width: 42 }}
                />
                <Box>
                  <Typography variant="h5" sx={{ fontSize: '18px' }}>
                    {selectedRows?.staff?.username}
                  </Typography>
                  <Typography variant="body4" sx={{ color: 'text.secondary', fontSize: '14px' }}>
                    {selectedRows?.staff?.staffId}
                  </Typography>
                </Box>
              
            </Box>

            <Grid item xs={12} sm={12}>
              <Controller
                name="transaction_id"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value}
                    sx={{ mb: 2,width:'300px' }}
                    fullWidth
                    
                    onChange={onChange}
                    label="transaction Id"
                    type="number"
                    error={Boolean(errors.transaction_id)}
                    helperText={errors.transaction_id?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="salary_amount"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    sx={{ mb: 2 }}
                    fullWidth
                    value={value}
                    onChange={onChange}
                    label="Salary Amount"
                    type="number"
                    error={Boolean(errors.salary_amount)}
                    helperText={errors.salary_amount?.message}
                  />
                )}
              />
            </Grid>

            <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:'center' , mt: 4 }}>
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

SalaryEditDrawer.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  selectedRows: PropTypes.any,
  setRefetch: PropTypes.any
};
export default SalaryEditDrawer;
