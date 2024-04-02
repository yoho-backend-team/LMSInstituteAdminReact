// ** React Imports
import { useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
// ** Redux Imports
import { Grid } from '@mui/material';
// ** FullCalendar & App Components Imports
import Calendar from 'features/calender/components/Calendar';
import CalendarWrapper from 'styles/libs/fullcalendar';
// ** Actions

const calendarsColor = {
  present: 'success',
  absent: 'error',
  holiday: 'warning'
};

const AppCalendar = ({ attendance }) => {
  // ** States
  const [calendarApi, setCalendarApi] = useState(null);

  const skin = 'default';
  const direction = 'ltr';
  const mdAbove = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <Grid container>
      <Grid item xs={12} sm={12} sx={{ overflow: 'auto' }}>
        <CalendarWrapper
          className="app-calendar"
          sx={{
            boxShadow: skin === 'bordered' ? 0 : 6,
            ...(skin === 'bordered' && { border: (theme) => `1px solid ${theme.palette.divider}` })
          }}
        >
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
            <Calendar
              direction={direction}
              calendarApi={calendarApi}
              calendarsColor={calendarsColor}
              setCalendarApi={setCalendarApi}
              attendance={attendance}
            />
          </Box>
        </CalendarWrapper>
      </Grid>
    </Grid>
  );
};

export default AppCalendar;
