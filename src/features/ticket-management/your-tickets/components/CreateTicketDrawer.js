import PropTypes from 'prop-types';
import { Button, FormControl, Grid, TextField, Typography, MenuItem, InputLabel, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Icon from 'components/icon';
import { useSelector } from 'react-redux';
import { CreateTicket } from '../services/ticketService';
import { useInstitute } from 'utils/get-institute-details';
import toast from 'react-hot-toast';
import { useSpinner } from 'context/spinnerContext';
import { getErrorMessage } from 'utils/error-handler';
import client from 'api/client';

const CreateTicketDrawer = (props) => {
  const { open, toggle, setRefetch } = props;
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const { show, hide } = useSpinner()

  const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(6),
    justifyContent: 'space-between'
  }));

  

  const schema = yup.object().shape({
    query: yup.string().required('Query is required'),
    description: yup.string().required('Description is required'),
    priority: yup.string().required('Priority is required'),
    file: yup.mixed().optional(),
  });

  const defaultValues = {
    query: '',
    description: '',
    priority: '',
    file: ''
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

 

  const handleClose = () => {
    setValue('query', '');
    reset();
    toggle();
  };

  const onSubmit = async (data) => {
    try {
      show()
      console.log(data,"data")
      const inputData = {
        query: data.query,
        description: data.description,
        priority: data.priority,
        branch : selectedBranchId,
        file : data?.file ? data?.file : "null",
        institute : useInstitute().getInstituteId(),
      };

      await CreateTicket(inputData);
      handleClose();
      setRefetch((state) => !state);
      toast.success("Ticket created successfully")
    } catch (error) {
      hide()
      toast?.error(error?.message)
    }finally{
      hide()
    }
  };

  const handleFileUpload = async (e) => {
    try{
      const { files } = e.target
      const form_data = new FormData()
      form_data.append("file", files[0])
      const response = await client.file.upload(form_data)
      console.log(response)
      toast.success("file upload successfully")
      setValue("file",response?.data?.file)
    }catch(error){
     const error_message = getErrorMessage(error)
     toast.error(error_message)
    }finally{
      hide()
    }
  }

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
        <Typography variant="h5">Create Ticket</Typography>
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
          {/* Query Field */}
          <Grid item xs={12} sm={12}>
            <Controller
              name="query"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  multiline
                  rows={6}
                  sx={{ mb: 2 }}
                  label="Query"
                  placeholder="Enter your query here"
                  error={Boolean(errors.query)}
                  helperText={errors.query?.message}
                />
              )}
            />
          </Grid>

          {/* Description Field */}
          <Grid item xs={12} sm={12}>
            <Controller
              name="description"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  multiline
                  rows={4}
                  sx={{ mb: 2 }}
                  label="Description"
                  placeholder="Enter a detailed description"
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Grid>

          {/* Priority Field */}
          <Grid item xs={12} sm={12}>
            <Controller
              name="priority"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FormControl fullWidth sx={{ mb: 2 }} error={Boolean(errors.priority)}>
                  <InputLabel id="priority-label">Priority</InputLabel>
                  <Select
                    labelId="priority-label"
                    value={value}
                    onChange={onChange}
                    label="Priority"
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                  {errors.priority && (
                    <Typography variant="caption" color="error">
                      {errors.priority.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Grid>

          {/* File Upload Field */}
          <Grid item xs={12} sm={12}>
            <Controller
              name="file"
              control={control}
              render={({ field: { onChange } }) => (
                <TextField
                  fullWidth
                  type="file"
                  onChange={(e) => handleFileUpload(e)}
                  sx={{ mb: 2 }}
                  error={Boolean(errors.file)}
                  helperText={errors.file?.message}
                />
              )}
            />
          </Grid>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Button type="submit" variant="contained" sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant="tonal" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      /> */}
    </Drawer>
  );
};

CreateTicketDrawer.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  setRefetch: PropTypes.any
};

export default CreateTicketDrawer;
