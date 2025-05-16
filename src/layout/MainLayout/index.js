import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery, ListItemIcon } from '@mui/material';

// project imports
import Breadcrumbs from 'components/extended/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';
import navigation from 'menu-items';
import { drawerWidth } from 'store/constant';
import { SET_MENU } from 'store/actions';
import PropTypes from 'prop-types';
import usePushSubscription from 'usePushSubscription';
import axios from 'axios';

// assets
import { IconChevronRight } from '@tabler/icons';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import secureLocalStorage from 'react-secure-storage';

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    'margin',
    open
      ? {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }
      : {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }
  ),
  marginLeft: open ? 0 : -(drawerWidth - 20),
  width: `calc(100% - ${drawerWidth}px)`,
  backgroundColor: '#F3F4F6' // Ensure the background is light for visibility
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = ({}) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();
  const Dates = localStorage.getItem('LastRunDate')
  const DateNow = new Date().toISOString().split('T')[0]
  let LastRunDate;
  if (typeof Dates == 'string') {
    LastRunDate = Dates.split('T')[0]
   }else{
    LastRunDate = undefined
   }

  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };
  const user = JSON.parse(secureLocalStorage.getItem("userData"))
 
  window.addEventListener("online", () => {
  axios.post(`${process.env.REACT_APP_PUBLIC_API_URL}/online`,{user:user._id})
  });

 window.addEventListener("offline", () => {
  axios.post(`${process.env.REACT_APP_PUBLIC_API_URL}/offline`,{user:user._id})
  });


  if ('serviceWorker' in navigator) {
    if(DateNow != LastRunDate || LastRunDate == undefined){
      navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);                 
            const selectedBranchId = secureLocalStorage.getItem('selectedBranchId');        
               usePushSubscription(user?.role,user?._id,user,user?.institute_id,selectedBranchId)
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
    }
  }

   
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: 'white',
          transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <Sidebar drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

      {/* main content */}
      <Main
        theme={theme}
        sx={{ marginLeft: leftDrawerOpened ? '0px' : 'null', paddingLeft: '50px', marginTop: '86px' }}
        open={leftDrawerOpened}
      >
        {/* breadcrumb */}
        <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
        <Outlet />
      </Main>
    </Box>
  );
};

export default MainLayout;
