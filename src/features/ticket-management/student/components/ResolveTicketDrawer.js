import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, Grid, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { updateStudentTicket } from '../services/studentTicketService';

const TicketResolveDrawer = (props) => {
  const { open, toggle, ticket, setRefetch } = props;

  const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(6),
    justifyContent: 'space-between'
  }));

  const schema = yup.object().shape({
    solution: yup.string().required()
  });

  const defaultValues = {
    solution: ''
  };

  // ** Hooks
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

  const onSubmit = async (data) => {
    const inputData = {
      solution: data.solution,
      uuid: ticket.uuid
    };

    const result = await updateStudentTicket(inputData);

    if (result.success) {
      toast.success(result.message);
      reset();
      toggle();
      setRefetch();
    } else {
      toast.error(result.message);
    }
  };

  const handleClose = () => {
    setValue('solution', '');
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
        <Typography variant="h5">Resolve Ticket</Typography>
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={''} sx={{ mr: 2.5, height: 38, width: 38 }} />
                <Box>
                  <Typography variant="h5">
                    {ticket?.student?.first_name} {ticket?.student?.last_name}
                  </Typography>
                  <Typography variant="body4" sx={{ color: 'text.secondary', fontSize: 12 }}>
                    {ticket?.student?.email}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontSize: 12, color: 'primary.main' }}>{ticket?.ago}</Typography>
              </Box>
            </Box>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'text.main' }}>
              Problem :
            </Typography>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>{ticket?.query}</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Controller
              name="solution"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  value={value}
                  sx={{ mb: 2 }}
                  label="Solution"
                  onChange={onChange}
                  placeholder="Business Development Executive"
                  error={Boolean(errors.solution)}
                  {...(errors.solution && { helperText: errors.solution.message })}
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

TicketResolveDrawer.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  ticket: PropTypes.any,
  setRefetch: PropTypes.any
};
export default TicketResolveDrawer;
