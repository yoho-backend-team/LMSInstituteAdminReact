import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  CardActions,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  Paper,
  Popper,
  Stack,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'components/cards/MainCard';
import Transitions from 'components/extended/Transitions';
import NotificationList from './NotificationList';
import socket from 'utils/socket';
import { getLastNotifications } from 'features/notification-management/all-notifications/services/allNotificationServices';
import { useInstitute } from 'utils/get-institute-details';

// assets
import { IconBell } from '@tabler/icons';
import { useBranchId } from 'utils/get-institute-details';
import { width } from '@mui/system';

// notification status options
const status = [
  {
    value: 'all',
    label: 'All Notification'
  },
  {
    value: 'new',
    label: 'New'
  },
  {
    value: 'unread',
    label: 'Unread'
  },
  {
    value: 'other',
    label: 'Other'
  }
];

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const branch_id = useBranchId()

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = { institute_id : useInstitute().getInstituteId() };
        const query = { branch_id : branch_id, status: "unread" }
        const result = await getLastNotifications(data,query);
        setNotifications(result.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchData();
  }, []);

  let readNotification = []; let unreadNotification =[];

  notifications.map(item=>{
    if (item.status == 'unread') {
          unreadNotification.push(item)
    }else{
          readNotification.push(item)
    }
  })

  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    socket.connect()
    socket.emit("JoinInstituteNotification",{branchId : branch_id})
    socket.on("triggerInstituteNotification",(notification) => {
      console.log(notification,"notification")
        setNotifications((prevNotification) => [...prevNotification,notification.notification])
    })

    return () => {
      socket.disconnect()
      socket.off("triggerInstituteNotification")
    }
  },[socket])

  const handleChange = (event) => {
    if (event?.target.value) setValue(event?.target.value);
  };
  // console.log(notifications,"notificationsection")
  return (
    <>
      <Box
        sx={{
          // ml: 2,
          mr: 3,
          [theme.breakpoints.down('md')]: {
            mr: 2
          },
          
        }}
      >
        <ButtonBase sx={{ borderRadius: '12px' }}>
        {notifications?.length !==0  && (
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: '#FF0000',
            position: 'absolute',
            zIndex: 1000,
            top: 0,
            right: 0,
            animation: 'blink 1s infinite',
            boxShadow: '0 0 6px rgba(255, 0, 0, 0.5)',
          }}
        />
      )}
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&[aria-controls="menu-list-grow"],&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light
              }
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            color="inherit"
          >
            <IconBell stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? 5 : 0, 20]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]} sx={{height:"300px",width:"300px"}}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item xs={12} >
                      <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2, px: 2 }}>
                        <Grid item>
                          <Stack direction="row" spacing={15}>
                            <Typography variant="subtitle1">All Notification</Typography>
                            <Chip
                              size="small"
                              label={unreadNotification.length}
                              sx={{
                                color: theme.palette.background.default,
                                bgcolor: theme.palette.warning.dark,
                               
                              }}
                            />
                          </Stack>
                        </Grid>
                        <Grid item>
                          <Typography component={Link} to="#" sx={{ display: "none"}} variant="subtitle2" color="primary">
                            Mark as all read
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden' }}>
                        <Grid container direction="column" spacing={2}>
                          {/* <Grid item xs={12}>
                            <Box sx={{ px: 2, pt: 0.25 }}>
                              <TextField
                                id="outlined-select-currency-native"
                                select
                                fullWidth
                                value={value}
                                onChange={handleChange}
                                SelectProps={{
                                  native: true
                                }}
                              >
                                {status.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </TextField>
                            </Box>
                          </Grid> */}
                          <Grid item xs={12} p={0}>
                            <Divider sx={{ my: 0 }} />
                          </Grid>
                        </Grid>
                        {/* Notification List */}
                        <NotificationList notifications={unreadNotification} onClose={() => setOpen(false)} />
                      </PerfectScrollbar>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Typography variant="body1" color="textSecondary" align="center" sx={{padding :"50px",paddingTop:"90px",paddingBottom:"80px"}}>
            No new notifications
          </Typography>
          <Divider  />
                  <CardActions sx={{ justifyContent: 'center',paddingTop:"20px",paddingLeft:"5px" }}>
                    <Button component={Link} onClick={(e) => handleClose(e)} to="/profile-management/notifications" size="small" disableElevation>
                      View All
                    </Button>
                  </CardActions>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default NotificationSection;
