import { Avatar, TextField } from '@mui/material';
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
 console.log(selected,"selected",staff)
  const defaultState = {
    staff_name: '',
    title: '',
    attendance_date: selected ? selected?.date : ''
  };

  // ** States
  const [values, setValues] = useState(defaultState);
  const [selectedDate, setSelectedDate] = useState(null);
  const { show, hide } = useSpinner()

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
    // Create a new Date object from the original date string
    var originalDate = new Date(input);
    // Extract the year, month, and day components
    var year = originalDate.getFullYear();
    var month = ('0' + (originalDate.getMonth() + 1)).slice(-2); // Months are 0-based
    var day = ('0' + originalDate.getDate()).slice(-2);

    // Form the yyyy-mm-dd date string
    var formattedDateString = year + '-' + month + '-' + day;

    return formattedDateString;
  }
  const onSubmit = async (data) => {
    try{
      show()
      const new_attedence = {
        institute : useInstitute().getInstituteId(),
        branch : staff?.branch,
        date : convertDateFormat(selectedDate),
        staff : staff?.staff,
        status:data?.title
      }
      
      const result = await addTeachingStaffAttendance(new_attedence);
      setRefetch((state) => !state);
      toast.success(result.message);
      handleSidebarClose();
    }catch(error){
     toast.error(error.message)
    }finally{
      hide()
    }

  };

  const handleStartDate = (date) => {
    if (date) {
      setValues({ ...values, attendance_date: new Date(date) });
    }
  };

  const PickersComponent = forwardRef(({ ...props }, ref) => {
    return <TextField inputRef={ref} fullWidth {...props} label={props.label || ''} sx={{ width: '100%' }} error={props.error} />;
  });

  const RenderSidebarFooter = () => {
    return (
      <Fragment>
        <Button type="submit" variant="contained" sx={{ mr: 4 }}>
          Add
        </Button>
        <Button variant="tonal" color="secondary">
          Reset
        </Button>
      </Fragment>
    );
  };

  return (
    <Drawer
      anchor="right"
      open={addEventSidebarOpen}
      onClose={handleSidebarClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: ['100%', drawerWidth] } }}
    >
      <Box
        className="sidebar-header"
        sx={{
          p: 6,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h5">Add Attendance</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
        </Box>
      </Box>
      <Box className="sidebar-body" sx={{ p: (theme) => theme.spacing(0, 6, 6) }}>
        <DatePickerWrapper>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar src={''} sx={{ mr: 2.5, height: 38, width: 38 }} />
              <Box>
                <Typography variant="h5">{staff?.staff_name}</Typography>
                <Typography variant="body4" sx={{ color: 'text.secondary', fontSize: 12 }}>
                  {staff?.email}
                </Typography>
              </Box>
            </Box>
            <Controller
              name="title"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  select
                  fullWidth
                  sx={{ mb: 4 }}
                  label="Attendance"
                  SelectProps={{
                    value: value,
                    onChange: onChange
                  }}
                >
                  <MenuItem value="present">Present</MenuItem>
                  <MenuItem value="absent">Absent</MenuItem>
                </TextField>
              )}
            />
            <Box sx={{ mb: 4 }}>
              <DatePicker
                // selectsStart
                id="event-start-date"
                selected={selectedDate}
                // startDate={values.attendance_date}
                dateFormat={'yyyy-MM-dd'}
                customInput={<PickersComponent label="Attendance Date" registername="attendance_date" />}
                onChange={(date) => {
                  setSelectedDate(date);
                  setValue('attendance_date', date);
                }}
                onSelect={handleStartDate}
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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