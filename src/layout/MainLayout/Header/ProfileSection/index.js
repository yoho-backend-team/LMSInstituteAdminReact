import { useState, useRef, useEffect } from 'react';

import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Paper,
  Popper,
  Stack,
  Switch,
  Typography
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MainCard from 'components/cards/MainCard';
import Transitions from 'components/extended/Transitions';
import UpgradePlanCard from './UpgradePlanCard';
import User1 from 'assets/images/users/user-round.svg';
// import { Link } from 'react-router-dom';
import { logout } from 'features/authentication/authActions';
import { useDispatch } from 'react-redux';

// assets
import { IconLogout, IconSearch, IconSettings, IconUser, IconUserCircle } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from 'utils/check-auth-state';
import { getImageUrl } from 'utils/imageUtils';
import { profilePlaceholder } from 'utils/placeholders';
// ==============================|| PROFILE MENU ||============================== //
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};
const ProfileSection = () => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [sdm, setSdm] = useState(true);
  const [value, setValue] = useState('');
  const [notification, setNotification] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const user = getUserDetails()
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);
  const handleLogout = async () => {
    const user = JSON.parse(localStorage.getItem("userData"))
    
    dispatch(logout({email:user.email}));
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== '') {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light
            }
          },
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        icon={
          <Avatar
            src={ user?.image ? getImageUrl(user?.image):profilePlaceholder}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer'
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
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
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]} sx={{backgroundColor:'light grey'}}>
                  <Box sx={{ p: 2 }}>
                    <Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
  <Typography variant="h5" sx={{fontWeight:"600"}}>{getGreeting()},</Typography>
  <Typography component="span" variant="h3" sx={{ fontWeight: 500,fontSize:"20px" }}>
    {user?.first_name} {user?.last_name}
  </Typography>
</Stack>
<Box sx={{display:"flex",alignItems:"center",justifyContent:"start"}}>
<Chip 
  label="Admin" 
  color="primary" 
  size="small" 
  sx={{ fontWeight: "bold", borderRadius: "6px", p:1,width:"100px" ,mt:1}} 
/>
</Box>

                    </Stack>
                   
                   
                  </Box>
                  <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                    <Box sx={{ p: 2 }}>
                      {/* <UpgradePlanCard /> */}
                      {/* <Divider /> */}
                      {/* <Card
                        sx={{
                          bgcolor: theme.palette.primary.light,
                          my: 2
                        }}
                      > */}
                        {/* <CardContent>
                          <Grid container spacing={3} direction="column">
                            <Grid item>
                              <Grid item container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="subtitle1">Start DND Mode</Typography>
                                </Grid>
                                <Grid item>
                                  <Switch
                                    color="primary"
                                    checked={sdm}
                                    onChange={(e) => setSdm(e.target.checked)}
                                    name="sdm"
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid item container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="subtitle1">Allow Notifications</Typography>
                                </Grid>
                                <Grid item>
                                  <Switch
                                    checked={notification}
                                    onChange={(e) => setNotification(e.target.checked)}
                                    name="sdm"
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent> */}
                      {/* </Card> */}
                      {/* <Divider /> */}
                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 350,
                          minWidth: 300,
                          marginTop:'-20px',
                          marginLeft:'-30px',
                         
                          borderRadius: '10px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%'
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5
                          }
                        }}
                      >
                       <ListItemButton
  sx={{ 
    border: "1px solid #E0E0E0", 
    borderRadius: "8px",
    padding: "8px 16px", 
    transition: "all 0.3s ease",
    ml:3.5,

    '&:hover': {
      backgroundColor: "#F5F5F5", 
    }
  }} 
  selected={selectedIndex === 0}
  onClick={(event) => {
    handleListItemClick(event, 0, '#');
    navigate('/profile-management/account-settings');
  }}
>
<ListItemIcon 
    sx={{ 
      minWidth: "32px", 
      color: "black", 
      '& svg': {
        color: "black !important", 
      }
    }}
  >
    <PersonIcon />
  </ListItemIcon>
  <ListItemText 
    primary={
      <Typography variant="body2" sx={{ fontWeight: 500, color: "black" }}>
        Profile
      </Typography>
    } 
  />
</ListItemButton>

                        <ListItemButton
                      sx={{ 
                        border: "1px solid #E0E0E0", 
                        borderRadius: "8px",
                        padding: "8px 16px", 
                        transition: "all 0.3s ease",
                        ml:3.5,
                    
                        '&:hover': {
                          backgroundColor: "#F5F5F5", 
                        }
                      }} 
                         selected={selectedIndex === 1}
                          onClick={(event) => {
                            handleListItemClick(event, 1, '#');
                            navigate("/institute-management/settings")
                          }}
                        >
                          <ListItemIcon
  sx={{
    minWidth: "40px",
    color: selectedIndex === 0 ? "white" : "inherit", 
    "& svg": {
      color: "black", 
    },
  }}
>
<SettingsIcon/>
</ListItemIcon>
                           <ListItemText primary={<Typography variant='body2'sx={{ fontWeight: 500 }} >Settings</Typography>}></ListItemText>
                        </ListItemButton>
                        {/* <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 1}
                          onClick={(event) => handleListItemClick(event, 1, '#')}
                        >
                          <ListItemIcon>
                            <IconUser stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid container spacing={1} justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="body2">Social Profile</Typography>
                                </Grid>
                                <Grid item>
                                  <Chip
                                    label="02"
                                    size="small"
                                    sx={{
                                      bgcolor: theme.palette.warning.dark,
                                      color: theme.palette.background.default
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton> */}
                       <ListItemButton
  sx={{ 
    backgroundColor: "#E53935", // Red background
    borderRadius: "8px",
    padding: "10px 16px",
    transition: "all 0.3s ease",
    ml: 3.5,
    '&:hover': {
      backgroundColor: "#D32F2F", // Darker red on hover
    }
  }} 
  onClick={handleLogout}
>
  <ListItemIcon             
    sx={{
      minWidth: "40px",
      color: "white", // White icon color
      "& svg": {
        color: "white !important", // Ensure it stays white
      },
    }}
  >
    <LogoutIcon/>
  </ListItemIcon>
  <ListItemText 
    primary={
      <Typography 
        variant="body2" 
        sx={{ fontWeight: 500, color: "white" }}
      >
        Logout
      </Typography>
    } 
  />
</ListItemButton>


                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
