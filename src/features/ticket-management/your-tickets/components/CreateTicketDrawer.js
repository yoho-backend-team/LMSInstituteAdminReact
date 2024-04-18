import PropTypes from 'prop-types';
import { Button, Grid, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Icon from 'components/icon';
import { useSelector } from 'react-redux';
import { CreateTicket } from '../services/ticketService';
 
const CreateTicketDrawer = (props) => {

  const { open, toggle, setRefetch } = props;
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(6),
    justifyContent: 'space-between'
  }));

  const schema = yup.object().shape({
    query: yup.string().required('Query is required')
  });

  const defaultValues = {
    query: ''
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
      const inputData = {
        query: data.query
      };

      const result = await CreateTicket(inputData);

      if (result.success) {
        console.log('Ticket created successfully');
        handleClose();
        setRefetch((state) => !state);
      } else {
        console.error('Failed to create ticket:', result.message);
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
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
    </Drawer>
  );
};

CreateTicketDrawer.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  setRefetch: PropTypes.any,
};

export default CreateTicketDrawer;
