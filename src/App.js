import { useSelector } from 'react-redux';
// import {useEffect} from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import DisableNumInputScroll from 'components/disableNumberscroll';
import { useEffect } from 'react';
import { regSw, subscribe } from 'helpers';
import Cookies from 'js-cookie';
// import { onMessageListener} from './firebase';
// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  // onMessageListener()
  // .then((payload) => {
  // })
  // .catch((err) => );

  // useEffect(()=>{
  //   requestForToken()
  // },[])

  const regiserSubscription = async (role,userId,user,branch,institute) => {
    try {
      const registeration = await regSw()
      console.log(registeration,"registeration",institute)
      if(registeration){
        await subscribe(registeration,role,userId,user,institute,branch)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() =>{
    const isAuthenticatedUser = localStorage.getItem("isAuthenticated")
    const selectBranchId = localStorage.getItem("selectedBranchId")
    const user = JSON.parse(localStorage.getItem("userData"))
    const notifiAdd = Cookies.get("instituteNotificationSubscription")
    const branches = JSON.parse(localStorage.getItem('branches'));
    if(!selectBranchId){
      localStorage.setItem("selectedBranchId",branches[0]?.uuid)
    }
    if(isAuthenticatedUser && !notifiAdd){
      console.log(user?.institute_id)
       regiserSubscription(user?.role,user?._id,user,selectBranchId,user?.institute_id)
    }
  })
  
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <DisableNumInputScroll />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
