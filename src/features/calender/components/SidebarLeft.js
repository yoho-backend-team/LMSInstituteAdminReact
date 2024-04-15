import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import DatePickerWrapper from 'styles/libs/react-datepicker';

const SidebarLeft = (props) => {
  const {
    store,
    mdAbove,
    dispatch,
    calendarApi,
    calendarsColor,
    leftSidebarOpen,
    leftSidebarWidth,
    handleSelectEvent,
    handleAllCalendars,
    handleCalendarsUpdate,
    handleLeftSidebarToggle,
    handleAddEventSidebarToggle
  } = props;
  const colorsArr = calendarsColor ? Object.entries(calendarsColor) : [];

  const renderFilters = colorsArr.length
    ? colorsArr.map(([key, value]) => {
        return (
          <FormControlLabel
            key={key}
            label={key}
            sx={{ '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
            control={
              <Checkbox
                color={value}
                checked={store?.selectedCalendars.includes(key)}
                onChange={() => dispatch(handleCalendarsUpdate(key))}
              />
            }
          />
        );
      })
    : null;

  const handleSidebarToggleSidebar = () => {
    handleAddEventSidebarToggle();
    dispatch(handleSelectEvent(null));
  };
  if (renderFilters) {
    return (
      <Drawer
        open={leftSidebarOpen}
        onClose={handleLeftSidebarToggle}
        variant={mdAbove ? 'permanent' : 'temporary'}
        ModalProps={{
          disablePortal: true,
          disableAutoFocus: true,
          disableScrollLock: true,
          keepMounted: true
        }}
        sx={{
          zIndex: 3,
          display: 'block',
          position: mdAbove ? 'static' : 'absolute',
          '& .MuiDrawer-paper': {
            borderRadius: 1,
            boxShadow: 'none',
            width: leftSidebarWidth,
            borderTopRightRadius: 0,
            alignItems: 'flex-start',
            borderBottomRightRadius: 0,
            zIndex: mdAbove ? 2 : 'drawer',
            position: mdAbove ? 'static' : 'absolute'
          },
          '& .MuiBackdrop-root': {
            borderRadius: 1,
            position: 'absolute'
          }
        }}
      >
        <Box sx={{ p: 6, width: '100%' }}>
          <Button fullWidth variant="contained" sx={{ '& svg': { mr: 2 } }} onClick={handleSidebarToggleSidebar}>
            <Icon icon="tabler:plus" fontSize="1.125rem" />
            Add Event
          </Button>
        </Box>

        <Divider sx={{ width: '100%', m: '0 !important' }} />
        <DatePickerWrapper
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            '& .react-datepicker': { boxShadow: 'none !important', border: 'none !important' }
          }}
        >
          <DatePicker inline onChange={(date) => calendarApi.gotoDate(date)} />
        </DatePickerWrapper>
        <Divider sx={{ width: '100%', m: '0 !important' }} />
        <Box sx={{ p: 6, width: '100%', display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
          <Typography variant="body2" sx={{ mb: 2, color: 'text.disabled', textTransform: 'uppercase' }}>
            Filters
          </Typography>
          <FormControlLabel
            label="View All"
            sx={{ '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
            control={
              <Checkbox
                checked={store?.selectedCalendars.length === colorsArr.length}
                onChange={(e) => dispatch(handleAllCalendars(e.target.checked))}
              />
            }
          />
          {renderFilters}
        </Box>
      </Drawer>
    );
  } else {
    return null;
  }
};

SidebarLeft.propTypes = {
  store: PropTypes.any,
  mdAbove: PropTypes.any,
  dispatch: PropTypes.any,
  calendarApi: PropTypes.any,
  calendarsColor: PropTypes.any,
  leftSidebarOpen: PropTypes.any,
  leftSidebarWidth: PropTypes.any,
  handleSelectEvent: PropTypes.any,
  handleAllCalendars: PropTypes.any,
  handleCalendarsUpdate: PropTypes.any,
  handleLeftSidebarToggle: PropTypes.any,
  handleAddEventSidebarToggle: PropTypes.any
};

export default SidebarLeft;
