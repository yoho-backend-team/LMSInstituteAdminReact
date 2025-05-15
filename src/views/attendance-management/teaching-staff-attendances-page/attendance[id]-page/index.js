import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import TeachingStaffAddEventSidebar from 'features/attandence-management/teaching-staff-attandences/components/TeachingStaffAddEventSidebar';
import TeachingStaffCalendar from 'features/attandence-management/teaching-staff-attandences/components/TeachingStaffCalendar';
import TeachingStaffSidebarLeft from 'features/attandence-management/teaching-staff-attandences/components/TeachingStaffSidebarLeft';
import { getTeachingStaffAttendanceById } from 'features/attandence-management/teaching-staff-attandences/services/teachingStaffAttendanceServices';
import { handleSelectEvent, updateEvent } from 'features/calender/redux/reducers';
import { staffStatusChange } from 'features/staff-management/teaching-staffs/services/teachingStaffServices';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CalendarWrapper from 'styles/libs/fullcalendar';

const calendarsColor = {
  present: 'success',
  absent: 'error'
};

const ViewAttendance = () => {
  // ** States
  const [calendarApi, setCalendarApi] = useState(null);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState(false);
  const [attendances, setAttendances] = useState([]);
  const [selected, setSelected] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const location = useLocation();
  const staff = location.state.staff;

  // ** Vars
  const leftSidebarWidth = 300;
  const addEventSidebarWidth = 400;

  const skin = 'default';
  const direction = 'ltr';
  const mdAbove = useMediaQuery((theme) => theme.breakpoints.up('md'));
 
  useEffect(() => {
    const data = {
      id: staff?.staff,
      title: ''
    };
    getStaffAttendance(data);
  }, [staffStatusChange, refetch]);

  const getStaffAttendance = async (data) => {
    const result = await getTeachingStaffAttendanceById(data);
    if (result) {
      setAttendances(result.data);
    }
  };

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen);
  const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen);
  console.log(attendances,"attendances")
  return (
    <CalendarWrapper
      className="app-calendar"
      sx={{
        boxShadow: skin === 'bordered' ? 0 : 6,
        ...(skin === 'bordered' && { border: (theme) => `1px solid ${theme.palette.divider}` })
      }}
    >
      <TeachingStaffSidebarLeft
        mdAbove={mdAbove}
        calendarApi={calendarApi}
        calendarsColor={calendarsColor}
        leftSidebarOpen={leftSidebarOpen}
        leftSidebarWidth={leftSidebarWidth}
        handleLeftSidebarToggle={handleLeftSidebarToggle}
        handleAddEventSidebarToggle={handleAddEventSidebarToggle}
        setAttendances={setAttendances}
        staffId={staff?.staff}
        staff={staff}
      />
      <Box
        sx={{
          p: 6,
          pb: 0,
          flexGrow: 1,
          borderRadius: 1,
          boxShadow: 'none',
          backgroundColor: 'background.paper',
          ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
        }}
      >
        <TeachingStaffCalendar
          direction={direction}
          updateEvent={updateEvent}
          calendarApi={calendarApi}
          calendarsColor={calendarsColor}
          setCalendarApi={setCalendarApi}
          handleLeftSidebarToggle={handleLeftSidebarToggle}
          handleAddEventSidebarToggle={handleAddEventSidebarToggle}
          attendances={attendances}
          setSelected={setSelected}
        />
      </Box>
      <TeachingStaffAddEventSidebar
        drawerWidth={addEventSidebarWidth}
        handleSelectEvent={handleSelectEvent}
        addEventSidebarOpen={addEventSidebarOpen}
        handleAddEventSidebarToggle={handleAddEventSidebarToggle}
        staffId={staff?.staff}
        selected={selected}
        setRefetch={setRefetch}
        staff={staff}
      />
    </CalendarWrapper>
  );
};

export default ViewAttendance;
