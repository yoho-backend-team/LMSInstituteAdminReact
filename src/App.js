import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import Routes from 'routes';
import themes from 'themes';
import NavigationScroll from 'layout/NavigationScroll';
import DisableNumInputScroll from 'components/disableNumberscroll';
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

  if ('serviceWorker' in navigator) {
              navigator.serviceWorker.register('/service-worker.js')
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
    try {
      show();
      const getInstituteDetails = () => {
        const institute_details = localStorage.getItem('institute');
        if (institute_details) {
          try {
            const parsed_data = JSON.parse(institute_details);
            return parsed_data;
          } catch (error) {
            return institute_details;
          }
        }
      };

      const response = await UpgradSubscriptionPlanWithId({ institute: getInstituteDetails() });
      setShowOverlay(false);
      setSecureItem("requestPassed", true);
      toast.success("Subscription Upgrade Request sent successfully");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hide();
    }
  };

  const handleCloseOverlay = () => {
    setSecureItem("requestPassed", true);
    setShowOverlay(false);
  };

  const registerSubscription = async (role, userId, user, branch, institute) => {
    try {
      const registration = await regSw();
      if (registration) {
        await subscribe(registration, role, userId, user, institute, branch);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const isAuthenticatedUser = localStorage.getItem("isAuthenticated");
    const selectBranchId = localStorage.getItem("selectedBranchId");
    const user =localStorage.getItem("userData");
    const notifiAdd = Cookies.get("instituteNotificationSubscription");
    const branches = localStorage.getItem('branches');
    if (!selectBranchId) {
      setSelectedBranchId(branches?.[0]?.uuid);
    }
    if (isAuthenticatedUser && !notifiAdd) {
      registerSubscription(user?.role, user?._id, user, JSON.parse(selectBranchId), user?.institute_id);
    }
  }, []);

  const getSubscriptionStatusAndUpdate = async (data) => {
    try {
      const response = await getInstituteCurrentSubscriptionStatus(data);
      if (response?.planStatus) {
        setShowOverlay(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const isAuthenticatedUser = localStorage.getItem("isAuthenticated");
    const requestState = localStorage.getItem("requestPassed");

    const getInstituteDetails = () => {
      const institute_details =localStorage.getItem('institute');
      if (institute_details) {
        return institute_details;
      }
    };

    if (isAuthenticatedUser && !requestState && !showOverlay) {
      const data = { institute: getInstituteDetails()?.uuid };
      getSubscriptionStatusAndUpdate(data);
    }
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <DisableNumInputScroll />
        <NavigationScroll>
          {showOverlay && (
            <SubscriptionExpiredPopup
              onClose={handleCloseOverlay}
              onUpgrade={handleUpgradeClick}
            />
          )}
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
