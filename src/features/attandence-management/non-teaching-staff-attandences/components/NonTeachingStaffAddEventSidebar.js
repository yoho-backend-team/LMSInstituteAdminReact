import { Autocomplete, Avatar, Checkbox, TextField } from '@mui/material';
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
import { addNonTeachingStaffAttendance } from '../services/nonTeachingStaffAttendanceServices';
import { useSpinner } from 'context/spinnerContext';
import CustomChip from "components/mui/chip"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import { useBranchId, useInstitute } from 'utils/get-institute-details';
import { getUserListWithRoleName } from 'features/attandence-management/teaching-staff-attandences/services/teachingStaffAttendanceServices';


const TeachingStaffAddEventSidebar = (props) => {
  // ** Props
  const { drawerWidth, addEventSidebarOpen, handleAddEventSidebarToggle, staffId, selected, setRefetch, staff } = props;

  const defaultState = {
    staff_name: '',
    title: '',
    attendance_date: selected ? selected?.date : '',
    staff_type: ''
  };

  // ** States
  const [values, setValues] = useState(defaultState);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectUsers,setSelectedUsers] = useState([])
  const [userList,setUserList] = useState([])
  const {show,hide} = useSpinner()

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

  const mapToRoleName = {
    staff : "teaching_staff",
    non_teaching : "non_teaching_staff",
    student : "student"
}

const getUserList = async (name) => {
  show()
  const data = {institute_id:useInstitute().getInstituteId(),branch_id:useBranchId(),role:name}
  const userList = await getUserListWithRoleName(data)
  if(userList?.status){
     setUserList(userList?.data?.data)
     toast.success(userList?.message)
     hide()
  }else{
   toast.error(userList?.message)
   hide()
  }
}



  const onSubmit = async (data) => {
    const ids = selectUsers?.map((i)=>i._id)
    const inputData = {
      staff_id: staffId,
      title: data.title,
      date: convertDateFormat(selectedDate),
      institute_id: useInstitute().getInstituteId(),
      branch_id: useBranchId(),
      staff_type: mapToRoleName[data.staff_type],
      user:ids
    };
    const new_attedence = {
      institute : useInstitute().getInstituteId(),
      branch : staff.branch,
      status:data?.title,
      date : convertDateFormat(selectedDate),
      staff : staff?.staff
    }
    const result = await addNonTeachingStaffAttendance(new_attedence);
    if (result.success) {
      setRefetch((state) => !state);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    handleSidebarClose();
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
                <Typography variant="h5">{staff?.user?.full_name}</Typography>
                <Typography variant="body4" sx={{ color: 'text.secondary', fontSize: 12 }}>
                  {staff?.email}
                </Typography>
              </Box>
            </Box>
            <Controller
              name="staff_type"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  select
                  fullWidth
                  sx={{ mb: 4 }}
                  label="Staff Type"
                  value={value}
                  onChange={(e)=>{
                  getUserList(e.target.value)
                  onChange(e.target.value)
                  }}
                >
                  <MenuItem value="staff">Teaching Staff</MenuItem>
                  <MenuItem value="non_teaching">Non-Teaching Staff</MenuItem>
                  <MenuItem value="student">Student</MenuItem>
                </TextField>
              )}
            ></Controller>
            <Box mb={4}>
             <Autocomplete
                  multiple
                  disableCloseOnSelect
                  id="select-multiple-chip"
                  options={[{ _id: 'selectAll', full_name: 'Select All' }, ...userList]}
                  getOptionLabel={(option) => option.full_name}
                  value={selectUsers || []} 
                  onChange={(e, newValue) => {
                    if (newValue && newValue.some((option) => option._id === 'selectAll')) {
                      setSelectedUsers(selectUsers.filter((option) => option._id !== 'selectAll'));
                      setValue(
                        'users',
                        userList.filter((option) => option._id !== 'selectAll')
                      );
                    } else {
                      setSelectedUsers(newValue);
                      setValue('instructor', newValue);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Instructors"
                      InputProps={{
                        ...params.InputProps,
                        style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                      }}
                    />
                  )}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.full_name}
                    </li>
                  )}
                  renderTags={(value) => (
                    <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                      {value.map((option, index) => (
                        <CustomChip
                          key={option._id}
                          label={option.full_name}
                          onDelete={() => {
                            const updatedValue = [...value];
                            updatedValue.splice(index, 1);
                            setSelectedUsers(updatedValue);
                            setValue('instructor', updatedValue);
                          }}
                          color="primary"
                          sx={{ m: 0.75 }}
                        />
                      ))}
                    </div>
                  )}
                  isOptionEqualToValue={(option, value) => option._id === value._id}
                  selectAllText="Select All"
                  selectallprops={{ sx: { fontWeight: 'bold' } }}
                />
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
                  value={value}
                  onChange={onChange}
                >
                  <MenuItem value="present">Present</MenuItem>
                  <MenuItem value="absent">Absent</MenuItem>
                </TextField>
              )}
            />
            <Box sx={{ mb: 4 }}>
              <DatePicker
                id="event-start-date"
                selected={selectedDate}
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
