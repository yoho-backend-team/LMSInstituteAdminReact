import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { updateHelpcenter } from '../service/helpCenter';
import { useSpinner } from 'context/spinnerContext';

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`;
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`;
  } else {
    return '';
  }
};

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object({
  question: yup.string().required('Question is required'),
  answer: yup.string().required('Answer is required'),
  category: yup.string().required('Category is required'),
  videolink: yup.string().required('Add Video Link')
});

const defaultValues = {
  question: '',
  answer: '',
  category:'',
  videolink:''
};

const HelpCenterEdit = (props) => {
  const { open, toggle, setRefetch } = props;
  const { show,hide} = useSpinner()

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: props.initialValues || defaultValues,
    mode: 'onChange',
    
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (open) {
      reset(props.initialValues || defaultValues);
    }
  }, [open, reset, props.initialValues]);

  const onSubmit = async (data) => {
    const inputData = {
      question: data.question,
      answer: data.answer,
      category: data.category,
      videolink:data.videolink,
      id: props.initialValues.uuid
    };

    try {
      show()
      const result = await updateHelpcenter(inputData);
    
      if (result.success) {
        toast.success(result.message);
        toggle();
        setRefetch((state) => !state);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error in onSubmit:', error);
      toast.error(result.message);
    }finally{
      hide()
     }
  };

 
  
  const handleClose = () => {
    setValue('contact', Number(''));
    toggle();
    reset();
  };

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 500 } } }}
    >
      <Header>
        <Typography variant="h5">Edit Questions</Typography>
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
            <Grid item xs={12} sm={12}>
              <Controller
                name="question"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                    label="Question"
                    onChange={onChange}
                    error={Boolean(errors.question)}
                    {...(errors.question && { helperText: errors.question.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name="answer"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                    label="Answer"
                    onChange={onChange}
                    error={Boolean(errors.answer)}
                    {...(errors.answer && { helperText: errors.answer.message })}
              />
            )}
          />
          </Grid>
          <Grid item xs={12} sm={12}>
              <Controller
                name="videolink"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    multiline
                    
                    rows={2}
                    sx={{ 
                      mb: 2,
                    }}
                    label="Video Link"
                    onChange={onChange}
                    error={Boolean(errors.videolink)}
                    {...(errors.videolink && { helperText: errors.videolink.message })}
                  />
                )}
              />
            </Grid>
          <Grid item xs={12} sm={12}>
  <Controller
    name="category"
    control={control}
    rules={{ required: true }}
    defaultValue="" 
    render={({ field: { value, onChange } }) => (
      <TextField
        fullWidth
        select  
        value={value} 
        sx={{ mb: 2 }}
        label="Select Category"
        onChange={onChange}
        error={Boolean(errors.category)} 
        helperText={errors.category ? errors.category.message : null} 
      >
        
        <MenuItem value="Mail">Mail</MenuItem>
        <MenuItem value="Profile">Profile</MenuItem>
        <MenuItem value="Classes">Classes</MenuItem>
        <MenuItem value="Password">Password</MenuItem>
        <MenuItem value="Attendance">Attendance</MenuItem>
        <MenuItem value="Payment">Payment</MenuItem>
        <MenuItem value="Login&Sign Up">Login&Sign Up</MenuItem>
      </TextField>
    )}
  />
</Grid>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
  );
};

HelpCenterEdit.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  setRefetch: PropTypes.any
};

export default HelpCenterEdit;