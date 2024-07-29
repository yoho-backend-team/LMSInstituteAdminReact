import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import * as yup from 'yup';
import { addHelpCenter } from '../service/helpCenter';
import { useSpinner } from 'context/spinnerContext';
const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  question: yup.string().required('Question is required'),
  answer: yup.string().required('Answer is required'),
  category: yup.string().required('Category required'),
  videolink: yup.string().required('Add Video Link')
});

const defaultValues = {
  question: '',
  answer: '',
  category:'',
  videolink:''
};

const HelpCenterAddDrawer = (props) => {
  const { open, toggle, setRefetch } = props;
  const { show,hide} = useSpinner()

  const institute = JSON.parse(localStorage.getItem('institute'));
  const selectedBranchId = localStorage.getItem('selectedBranchId');

  const requestData = {
    branch_id: selectedBranchId,
    institute_id: institute ? institute._id : ''
  }; 


  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const handleClose = () => {
    reset();
    toggle();
  };

  const onSubmit = async (data) => {
    const inputData = {
      question: data.question,
      answer: data.answer,
      category: data.category,
      videolink:data.videolink,
      ...requestData 
    };

        try {
          show()
        const result = await addHelpCenter(inputData);
        toast.success(result.message); 
        setRefetch((state) => !state);
        toggle(); 
        reset();
      } catch (error) {
        toast.error(result.response.data?.message);
      }finally{
        hide()
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
          <Typography variant="h5">Add Question</Typography>
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
        <Box sx={{ p: (theme) => theme.spacing(0, 6, 6)}}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12} sm={12} >
              <Controller
                name="question"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={value}
                    sx={{ 
                      mb: 2,
                    }}
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
                    sx={{ 
                      mb: 2,
                    }}
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
                    error={Boolean(errors.answer)}
                    {...(errors.answer && { helperText: errors.answer.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
  <Controller
    name="category"
    control={control}
    rules={{ required: true }}
    defaultValue="Default Category" // Set default value here
    render={({ field: { value, onChange } }) => (
      <TextField
        fullWidth
       
        select 
        value={value} 
        sx={{ 
          mb: 2,
        
        }}
        label="Select Category"
        onChange={onChange}
        error={Boolean(errors.category)} // Use category for error check
        helperText={errors.category ? errors.category.message : null} // Adjust helperText for category
      >
        {/* Define your dropdown options here */}
        <MenuItem value="Mail">Mail</MenuItem>
        <MenuItem value="Profile">Profile</MenuItem>
        <MenuItem value="Classes">Classes</MenuItem>
        <MenuItem value="Password">Password</MenuItem>
        <MenuItem value="Attendance">Attendance</MenuItem>
        <MenuItem value="Payment">Payment</MenuItem>
        <MenuItem value="Login&Sign Up">Login&SignUp</MenuItem>
      </TextField>
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

HelpCenterAddDrawer.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  setRefetch: PropTypes.any
};

export default HelpCenterAddDrawer;