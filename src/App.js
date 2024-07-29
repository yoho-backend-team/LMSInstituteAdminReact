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
