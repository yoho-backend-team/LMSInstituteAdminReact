// ** React Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux';

// ** Hooks

// ** FullCalendar & App Components Imports

import TeachingStaffCalendar from 'features/attandence-management/teaching-staff-attandences/components/TeachingStaffCalendar';
import CalendarWrapper from 'styles/libs/fullcalendar';
import TeachingStaffSidebarLeft from 'features/attandence-management/teaching-staff-attandences/components/TeachingStaffSidebarLeft';
import TeachingStaffAddEventSidebar from 'features/attandence-management/teaching-staff-attandences/components/TeachingStaffAddEventSidebar';

// ** Actions
import {
  addEvent,
  fetchEvents,
  deleteEvent,
  updateEvent,
  handleSelectEvent,
  handleAllCalendars,
  handleCalendarsUpdate
} from 'features/calender/redux/reducers';

// ** CalendarColors
const calendarsColor = {
  Personal: 'error',
  Business: 'primary',
  Family: 'warning',
  Holiday: 'success',
  ETC: 'info'
};

const ViewAttendance = () => {
  // ** States
  const [calendarApi, setCalendarApi] = useState(null);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState(false);

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
          store={store}
          dispatch={dispatch}
          direction={direction}
          updateEvent={updateEvent}
          calendarApi={calendarApi}
          calendarsColor={calendarsColor}
          setCalendarApi={setCalendarApi}
          handleSelectEvent={handleSelectEvent}
          handleLeftSidebarToggle={handleLeftSidebarToggle}
          handleAddEventSidebarToggle={handleAddEventSidebarToggle}
        />
      </Box>
      <TeachingStaffAddEventSidebar
        store={store}
        dispatch={dispatch}
        addEvent={addEvent}
        updateEvent={updateEvent}
        deleteEvent={deleteEvent}
        calendarApi={calendarApi}
        drawerWidth={addEventSidebarWidth}
        handleSelectEvent={handleSelectEvent}
        addEventSidebarOpen={addEventSidebarOpen}
        handleAddEventSidebarToggle={handleAddEventSidebarToggle}
      />
    </CalendarWrapper>
  );
};

export default ViewAttendance;
