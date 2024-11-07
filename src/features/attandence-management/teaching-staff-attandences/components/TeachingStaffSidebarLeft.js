import { Avatar, FormControl, Radio, RadioGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import React from 'react';
import DatePicker from 'react-datepicker';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { getTeachingStaffAttendanceById } from '../services/teachingStaffAttendanceServices';
import { useSpinner } from 'context/spinnerContext';
import toast from 'react-hot-toast';
import { getErrorMessage } from 'utils/error-handler';

const TeachingStaffSidebarLeft = (props) => {
  const {
    mdAbove,
    calendarApi,
    leftSidebarOpen,
    leftSidebarWidth,
    handleLeftSidebarToggle,
    handleAddEventSidebarToggle,
    setAttendances,
    staffId,
    staff
  } = props;

  const getStaffAttendance = async (data) => {

    const result = await getTeachingStaffAttendanceById(data);
    if (result) {
      setAttendances(result.data.data);
    }
  };
  const [value, setValue] = React.useState('');
  const { show, hide } = useSpinner()

  const handleChange = async (event) => {
    try{
      show()
      setValue(event.target.value);
      const data = {
        id: staffId,
        status: event.target.value ? event.target.value : null
      };
      const result = await getTeachingStaffAttendanceById(data);
     console.log(result) 
      if (result) {
        setAttendances(result.data);
      }
    }catch(error){
     const error_message = getErrorMessage(error)
     toast.error(error_message)
    }finally{
      hide()
    }
    
  };

  const handleSidebarToggleSidebar = () => {
    handleAddEventSidebarToggle();
  };

  return (
    <Drawer
      open={leftSidebarOpen}
      onClose={handleLeftSidebarToggle}
      variant={mdAbove ? 'permanent' : 'temporary'}
      ModalProps={{
        disablePortal: true,
        disableAutoFocus: true,
        disableScrollLock: true,
        keepMounted: true
      }}
      sx={{
        zIndex: 3,
        display: 'block',
        position: mdAbove ? 'static' : 'absolute',
        '& .MuiDrawer-paper': {
          borderRadius: 1,
          boxShadow: 'none',
          width: leftSidebarWidth,
          borderTopRightRadius: 0,
          alignItems: 'flex-start',
          borderBottomRightRadius: 0,
          zIndex: mdAbove ? 2 : 'drawer',
          position: mdAbove ? 'static' : 'absolute'
        },
        '& .MuiBackdrop-root': {
          borderRadius: 1,
          position: 'absolute'
        }
      }}
    >
      <Box sx={{ p: 3, width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar src={''} sx={{ mr: 2.5, height: 38, width: 38 }} />
          <Box>
            <Typography variant="h5">{staff?.user?.full_name}</Typography>
            <Typography variant="body4" sx={{ color: 'text.secondary', fontSize: 12 }}>
              {staff?.user?.email}
            </Typography>
          </Box>
        </Box>
        <Button fullWidth variant="contained" sx={{ '& svg': { mr: 2 } }} onClick={handleSidebarToggleSidebar}>
          <Icon icon="tabler:plus" fontSize="1.125rem" />
          Add Attendance
        </Button>
      </Box>

      <Divider sx={{ width: '100%', m: '0 !important' }} />
      <DatePickerWrapper
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          '& .react-datepicker': { boxShadow: 'none !important', border: 'none !important' }
        }}
      >
        <DatePicker inline onChange={(date) => calendarApi.gotoDate(date)} />
      </DatePickerWrapper>
      <Divider sx={{ width: '100%', m: '0 !important' }} />
      <Box sx={{ p: 6, width: '100%', display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
        <Typography variant="body2" sx={{ mb: 2, color: 'text.disabled', textTransform: 'uppercase' }}>
          Filters
        </Typography>

        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="" control={<Radio />} label="View All" />
            <FormControlLabel value="present" control={<Radio />} label="Present" />
            <FormControlLabel value="absent" control={<Radio />} label="Absent" />
          </RadioGroup>
        </FormControl>
      </Box>
    </Drawer>
  );
};

TeachingStaffSidebarLeft.propTypes = {
  mdAbove: PropTypes.any,
  calendarApi: PropTypes.any,
  leftSidebarOpen: PropTypes.any,
  leftSidebarWidth: PropTypes.any,
  handleLeftSidebarToggle: PropTypes.any,
  handleAddEventSidebarToggle: PropTypes.any,
  setAttendances: PropTypes.any,
  staffId: PropTypes.any,
  staff: PropTypes.any
};

export default TeachingStaffSidebarLeft;
