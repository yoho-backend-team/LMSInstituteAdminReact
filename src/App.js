import { useSelector } from 'react-redux';
import { useState } from 'react'
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
import SubscriptionExpiredPopup from 'components/pop-up/subscriptionPopup';
import UpgradePrompt from 'components/pop-up/freeTrialPopup';
import { getInstituteCurrentSubscriptionStatus, UpgradSubscriptionPlanWithId } from 'features/common/services';
import toast from 'react-hot-toast';
import { useSpinner } from 'context/spinnerContext';
import usePushSubscription from 'usePushSubscription';

// import { onMessageListener} from './firebase';
// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const [showOverlay, setShowOverlay] = useState(false);
  // const [open, setOpen] = useState(false);
  // const { show , hide  } = useSpinner()

  if ('serviceWorker' in navigator) {
              navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                  console.log('Service Worker registered with scope:', registration.scope);
                      const user = JSON.parse(localStorage.getItem("userData"))
                      const selectBranchId = localStorage.getItem("selectedBranchId")
                      usePushSubscription(user.role,user._id,user,user?.institute_id,JSON.parse(selectBranchId))
                })
                .catch((error) => {
                  console.error('Service Worker registration failed:', error);
                });
            }


  const handleUpgradeClick = async () => {
    try{
      show()
      const getInstituteDetails = () => {
        const institute_details = localStorage.getItem('institute')
        if(institute_details){
           try {
           const parsed_data =  JSON.parse(institute_details)
            return parsed_data
           } catch (error) {
             return institute_details
           }
        }
      }
    
      const response = await UpgradSubscriptionPlanWithId({ institute: getInstituteDetails()})
      setShowOverlay(false);
      localStorage.setItem("requestPassed",true)
      toast.success("Subscription Upgrade Request sended successfully")
    }catch(error){
     toast.error(error?.message)
    }finally{
      hide()
    }

  };

  const handleCloseOverlay = () => {
    localStorage.setItem("requestPassed",true)
    setShowOverlay(false);
  };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleUpgrade = () => {
  //   console.log("Redirecting to upgrade page...");
  //   setOpen(false);
  // };

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
      console.log(registeration,"registeration",institute,branch)
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
    console.log(selectBranchId)
    if(!selectBranchId){
      localStorage.setItem("selectedBranchId",branches?.[0]?.uuid)
    }
    if(isAuthenticatedUser && !notifiAdd){
      console.log(user?.institute_id)
       regiserSubscription(user?.role,user?._id,user,JSON.parse(selectBranchId),user?.institute_id)
    }
  },[])

  const getSubscriptionStatusAndUpdate = async (data) => {
    try {
     const response = await  getInstituteCurrentSubscriptionStatus(data)
     console.log(response)
     if(response?.planStatus){
       setShowOverlay(true)
     }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const isAuthenticatedUser = localStorage.getItem("isAuthenticated")
    const requestState = localStorage.getItem("requestPassed")

    const getInstituteDetails = () => {
      const institute_details = localStorage.getItem('institute')
      if(institute_details){
         try {
         const parsed_data =  JSON.parse(institute_details)
          return parsed_data
         } catch (error) {
           return institute_details
         }
      }
    }
  
    

    if(isAuthenticatedUser && !requestState&&!showOverlay){
      const data = { institute : getInstituteDetails()?.uuid }
     getSubscriptionStatusAndUpdate(data)
    }
  },[])
  
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <DisableNumInputScroll />
        <NavigationScroll>
          {/* {
            open && <UpgradePrompt onClose={handleClose} onUpgrade={handleUpgrade} />
          }*/}
          {
          showOverlay && <SubscriptionExpiredPopup
           onClose={handleCloseOverlay}
           onUpgrade={handleUpgradeClick}
          />
          } 
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
