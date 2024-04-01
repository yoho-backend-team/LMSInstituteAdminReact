// ** React Imports
import { useEffect, useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux';
// ** FullCalendar & App Components Imports
import TeachingStaffAddEventSidebar from 'features/attandence-management/teaching-staff-attandences/components/TeachingStaffAddEventSidebar';
import TeachingStaffCalendar from 'features/attandence-management/teaching-staff-attandences/components/TeachingStaffCalendar';
import TeachingStaffSidebarLeft from 'features/attandence-management/teaching-staff-attandences/components/TeachingStaffSidebarLeft';
import CalendarWrapper from 'styles/libs/fullcalendar';
// ** Actions
import { fetchEvents, handleAllCalendars, handleCalendarsUpdate, handleSelectEvent, updateEvent } from 'features/calender/redux/reducers';
import { useLocation } from 'react-router-dom';
import { getTeachingStaffAttendanceById } from 'features/attandence-management/teaching-staff-attandences/services/teachingStaffAttendanceServices';

// ** CalendarColors
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
  const staffId = location.state.id;
  // ** Hooks
  const dispatch = useDispatch();
  const store = useSelector((state) => state.calendar);

  // ** Vars
  const leftSidebarWidth = 300;
  const addEventSidebarWidth = 400;

  const skin = 'default';
  const direction = 'ltr';
  const mdAbove = useMediaQuery((theme) => theme.breakpoints.up('md'));

  useEffect(() => {
    const data = {
      staff_id: staffId
    };
    getStaffAttendance(data);
  }, [staffId, refetch]);

  const getStaffAttendance = async (data) => {
    const result = await getTeachingStaffAttendanceById(data);
    if (result) {
      setAttendances(result.data.data);
    }
  };

  useEffect(() => {
    dispatch(fetchEvents(store?.selectedCalendars));
  }, [dispatch, store?.selectedCalendars]);
  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen);
  const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen);

  return (
    <CalendarWrapper
      className="app-calendar"
      sx={{
        boxShadow: skin === 'bordered' ? 0 : 6,
        ...(skin === 'bordered' && { border: (theme) => `1px solid ${theme.palette.divider}` })
      }}
    >
      <TeachingStaffSidebarLeft
        store={store}
        mdAbove={mdAbove}
        dispatch={dispatch}
        calendarApi={calendarApi}
        calendarsColor={calendarsColor}
        leftSidebarOpen={leftSidebarOpen}
        leftSidebarWidth={leftSidebarWidth}
        handleSelectEvent={handleSelectEvent}
        handleAllCalendars={handleAllCalendars}
        handleCalendarsUpdate={handleCalendarsUpdate}
        handleLeftSidebarToggle={handleLeftSidebarToggle}
        handleAddEventSidebarToggle={handleAddEventSidebarToggle}
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
        staffId={staffId}
        selected={selected}
        setRefetch={setRefetch}
      />
    </CalendarWrapper>
  );
};

export default ViewAttendance;
