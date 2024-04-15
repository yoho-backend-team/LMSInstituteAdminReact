import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

const Calendar = (props) => {
  // ** Props
  const { calendarApi, calendarsColor, setCalendarApi, attendance, direction } = props;

  const calendarRef = useRef();
  useEffect(() => {
    if (calendarApi === null) {
      setCalendarApi(calendarRef.current?.getApi());
    }
  }, [calendarApi, setCalendarApi]);
  if (attendance) {
    const calendarOptions = {
      events: attendance ? attendance : [],
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

      editable: true,

      eventResizableFromStart: true,

      dragScroll: true,

      dayMaxEvents: 2,

      navLinks: true,
      eventClassNames({ event: calendarEvent }) {
        const colorName = calendarsColor[calendarEvent._def.title];
        return [`bg-${colorName}`];
      },

      customButtons: {
        sidebarToggle: {
          icon: 'bi bi-list'
        }
      },

      ref: calendarRef,
      direction
    };

    return <FullCalendar {...calendarOptions} />;
  } else {
    return null;
  }
};

Calendar.propTypes = {
  calendarApi: PropTypes.any,
  calendarsColor: PropTypes.any,
  setCalendarApi: PropTypes.any,
  attendance: PropTypes.any,
  direction: PropTypes.any
};

export default Calendar;
