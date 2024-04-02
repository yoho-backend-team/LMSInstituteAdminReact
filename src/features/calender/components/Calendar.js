// ** React Import
import { useEffect, useRef } from 'react';

// ** Full Calendar & it's Plugins
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import interactionPlugin from '@fullcalendar/interaction';

// ** Third Party Style Import
import 'bootstrap-icons/font/bootstrap-icons.css';

const Calendar = (props) => {
  // ** Props
  const { calendarApi, calendarsColor, setCalendarApi, attendance,direction } = props;

  // ** Refs
  const calendarRef = useRef();
  useEffect(() => {
    if (calendarApi === null) {
      // @ts-ignore
      setCalendarApi(calendarRef.current?.getApi());
    }
  }, [calendarApi, setCalendarApi]);
  if (attendance) {
    // ** calendarOptions(Props)
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
        // @ts-ignore
        const colorName = calendarsColor[calendarEvent._def.title];

        return [
          // Background Color
          `bg-${colorName}`
        ];
      },

      customButtons: {
        sidebarToggle: {
          icon: 'bi bi-list'
        }
      },

      ref: calendarRef,

      // Get direction from app state (store)
      direction
    };

    // @ts-ignore
    return <FullCalendar {...calendarOptions} />;
  } else {
    return null;
  }
};

export default Calendar;
