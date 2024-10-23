import PropTypes from 'prop-types';
import { Button, Grid, TextField, Typography,FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
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
import { getBranchObjectId, useInstitute } from 'utils/get-institute-details';
import { useState } from 'react';
import { makeStyles } from "@mui/styles";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';




const useStyles = makeStyles({
  form: {
    gap: "38px",
  },
  label: {
    color: "#606060",
    fontFamily: "Nunito Sans",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "normal",
  },
  rootright: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingRight: "20px",
    height: "100%",
  },
  rightImage: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cancelButton: {
    background: "#F8F9FA",
    border: "1px solid #DEE2E6",
  },
  conformButton: {
    background: "#5611B1",
    boxShadow: "0px 6px 34px -8px #0D6EFD",
  },
});

const CreateTicketDrawer = (props) => {
  const { open, toggle, setRefetch } = props;
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const classes = useStyles();

  const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(6),
    justifyContent: 'space-between'
  }));

  

  const schema = yup.object().shape({
    query: yup.string().required('Query is required'),
    priority: yup.string().required("Priority is required"),
  });

  const defaultValues = {
    query: '',
    priority: ''
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
        query: data.query,
        branch: selectedBranchId,
        priority: data.priority,
        institute: useInstitute().getInstituteMainId(),
      };

      const result = await CreateTicket(inputData);

      handleClose();
        toast.success("ticket created successfully");
      } catch (error) {
        toast.error(error?.message);
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
          <Grid item xs={12}>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth required error={Boolean(errors.priority)}>
                  <InputLabel className={classes.label} id="priority-label">Priority</InputLabel>
                  <Select
                    labelId="priority-label"
                    {...field}
                    defaultValue=""
                  >
                    <MenuItem value="" disabled>Select priority</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Urgent">Urgent</MenuItem>
                  </Select>
                  <FormHelperText>{errors.priority?.message || 'Choose your priority'}</FormHelperText>
                </FormControl>
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Drawer>
  );
};

CreateTicketDrawer.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  setRefetch: PropTypes.any
};

export default CreateTicketDrawer;
