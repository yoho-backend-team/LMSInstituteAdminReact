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
  console.log(props,"props")

  useEffect(() => {
    if (calendarApi === null) {
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
        console.log(info,"infor")
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

TeachingStaffCalendar.propTypes = {
  direction: PropTypes.any,
  calendarApi: PropTypes.any,
  calendarsColor: PropTypes.any,
  setCalendarApi: PropTypes.any,
  handleLeftSidebarToggle: PropTypes.any,
  handleAddEventSidebarToggle: PropTypes.any,
  attendances: PropTypes.any,
  setSelected: PropTypes.any
};

export default TeachingStaffCalendar;