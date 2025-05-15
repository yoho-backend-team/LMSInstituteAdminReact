import { Box, Paper } from '@mui/material';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

const TeachingStaffCalendar = (props) => {
  const {
    direction,
    calendarApi,
    calendarsColor,
    setCalendarApi,
    handleLeftSidebarToggle,
    handleAddEventSidebarToggle,
    attendances,
    setSelected
  } = props;

  const calendarRef = useRef();

  useEffect(() => {
    if (calendarApi === null) {
      setCalendarApi(calendarRef.current?.getApi());
    }
  }, [calendarApi, setCalendarApi]);

  // Map attendance data to FullCalendar's event format
  const events = attendances
    ? attendances.data?.map((item) => ({
        title: `${item.status}`,
        date: item.date,
        status: item.status,
        color: item.status === 'present' ? 'green' : 'red'
      }))
    : [];

  const calendarOptions = {
    events,
    displayEventTime: false,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'sidebarToggle, prev, next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    views: {
      week: {
        titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
      }
    },
    editable: false,
    eventResizableFromStart: true,
    dragScroll: true,
    dayMaxEvents: 2,
    navLinks: true,
    eventClassNames({ event: calendarEvent }) {
      const colorName = calendarsColor[calendarEvent._def.title];
      return [`bg-${colorName}`];
    },
    eventClick() {
      handleAddEventSidebarToggle();
    },
    customButtons: {
      sidebarToggle: {
        icon: 'bi bi-list',
        click() {
          handleLeftSidebarToggle();
        }
      }
    },
    dateClick(info) {
      setSelected(info);
      handleAddEventSidebarToggle();
    },
    ref: calendarRef,
    direction
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Paper elevation={3} sx={{ p: 2, borderRadius: '10px', overflow: 'hidden',padding:5}}>
        <FullCalendar {...calendarOptions} style={{ height: '100%', width: '100%' }} />
      </Paper>
    </Box>
  );
};

TeachingStaffCalendar.propTypes = {
  direction: PropTypes.any,
  calendarApi: PropTypes.any,
  calendarsColor: PropTypes.any,
  setCalendarApi: PropTypes.any,
  handleLeftSidebarToggle: PropTypes.any,
  handleAddEventSidebarToggle: PropTypes.any, 
  attendances: PropTypes.arrayOf(PropTypes.object),
  setSelected: PropTypes.func
};

export default TeachingStaffCalendar;
