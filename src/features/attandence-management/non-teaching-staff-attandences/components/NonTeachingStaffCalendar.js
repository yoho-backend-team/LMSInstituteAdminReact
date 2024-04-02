// ** React Import
import { useEffect, useRef } from 'react';
// ** Full Calendar & it's Plugins
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
// ** Third Party Style Import
import 'bootstrap-icons/font/bootstrap-icons.css';

const TeachingStaffCalendar = (props) => {
  // ** Props
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

  // ** Refs
  const calendarRef = useRef();
  console.log('Staff Attendance : ', attendances);
  useEffect(() => {
    if (calendarApi === null) {
      // @ts-ignore
      setCalendarApi(calendarRef.current?.getApi());
    }
  }, [calendarApi, setCalendarApi]);
  if (attendances) {
    const calendarOptions = {
      events: attendances ? attendances : [],
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
    return <FullCalendar events={attendances} {...calendarOptions} />;
  } else {
    return null;
  }
};

export default TeachingStaffCalendar;
