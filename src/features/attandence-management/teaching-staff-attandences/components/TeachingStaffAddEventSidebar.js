import { Avatar, Paper, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { Fragment, forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { addTeachingStaffAttendance } from '../services/teachingStaffAttendanceServices';
import { useBranchId, useInstitute } from 'utils/get-institute-details';
import { useSpinner } from 'context/spinnerContext';

const TeachingStaffAddEventSidebar = (props) => {
  const { drawerWidth, addEventSidebarOpen, handleAddEventSidebarToggle, staffId, selected, setRefetch, staff } = props;
  const defaultState = {
    staff_name: '',
    title: '',
    attendance_date: selected ? selected?.date : ''
  };

  // ** States
  const [values, setValues] = useState(defaultState);
  const [selectedDate, setSelectedDate] = useState(null);
  const { show, hide } = useSpinner();

  useEffect(() => {
    if (selected) {
      setSelectedDate(selected?.date);
    }
  }, [selected]);

  const { control, setValue, clearErrors, handleSubmit } = useForm({ defaultValues: defaultState });

  const handleSidebarClose = async () => {
    setValues(defaultState);
    clearErrors();
    handleAddEventSidebarToggle();
  };

  function convertDateFormat(input) {
    var originalDate = new Date(input);
    var year = originalDate.getFullYear();
    var month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
    var day = ('0' + originalDate.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  }

  const onSubmit = async (data) => {
    try {
      show();
      const new_attedence = {
        institute: useInstitute().getInstituteId(),
        branch: staff?.branch,
        date: convertDateFormat(selectedDate),
        staff: staff?.staff,
        status: data?.title
      };

      const result = await addTeachingStaffAttendance(new_attedence);
      setRefetch((state) => !state);
      toast.success(result.message);
      handleSidebarClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      hide();
    }
  };

  const handleStartDate = (date) => {
    if (date) {
      setValues({ ...values, attendance_date: new Date(date) });
    }
  };

  const RenderSidebarFooter = () => {
    return (
      <Fragment>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button type="submit" sx={{ pl: 7, pr: 7 }} variant="contained" color="primary">
            Add
          </Button>
          <Button variant="outlined" color="secondary" sx={{ pl: 7, pr: 7 }}>
            Reset
          </Button>
        </Box>
      </Fragment>
    );
  };

  return (
    <Drawer
      anchor="right"
      open={addEventSidebarOpen}
      onClose={handleSidebarClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: ['100%', drawerWidth], backgroundColor: 'aliceblue' } }}
    >
      <Box
        className="sidebar-header"
        sx={{
          p: 2,
          backgroundColor: 'lightblue'
        }}
      >
        <Paper sx={{ width: '100%', display: 'flex', justifyContent: 'center',gap:"50%", alignItems: 'center',py:1}}>
          <Typography variant="h4">Add Attendance</Typography>
          <IconButton
            size="small"
            onClick={handleSidebarClose}
            sx={{
              p: '0.375rem',
              borderRadius: 1,
              color: 'text.primary',
              backgroundColor: 'action.selected',
              '&:hover': {
                backgroundColor: (theme) => `rgba(${theme.palette.customColors.main}, 0.16)`
              }
            }}
          >
            <Icon icon="tabler:x" fontSize="1.25rem" />
          </IconButton>
        </Paper>
      </Box>
      <Box className="sidebar-body" sx={{ p: (theme) => theme.spacing(3, 6, 6) }}>
        <DatePickerWrapper>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mb: 8 }}>
              <Avatar src={''} sx={{ height: 50, width: 50, mb: 2 }} />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5">{staff?.staff_name}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {staff?.email}
                </Typography>
              </Box>
            </Box>
            <Controller
              name="title"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField select fullWidth sx={{ mb: 4 }} label="Attendance" value={value} onChange={onChange}>
                  <MenuItem value="present">Present</MenuItem>
                  <MenuItem value="absent">Absent</MenuItem>
                </TextField>
              )}
            />
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Attendance Date
              </Typography>
              <DatePicker
                inline
                id="event-start-date"
                selected={selectedDate}
                dateFormat={'yyyy-MM-dd'}
                onChange={(date) => {
                  setSelectedDate(date);
                  setValue('attendance_date', date);
                }}
                onSelect={handleStartDate}
              />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <RenderSidebarFooter />
            </Box>
          </form>
        </DatePickerWrapper>
      </Box>
    </Drawer>
  );
};

TeachingStaffAddEventSidebar.propTypes = {
  drawerWidth: PropTypes.any,
  addEventSidebarOpen: PropTypes.any,
  handleAddEventSidebarToggle: PropTypes.any,
  staffId: PropTypes.any,
  selected: PropTypes.any,
  setRefetch: PropTypes.any,
  staff: PropTypes.any
};
export default TeachingStaffAddEventSidebar;
