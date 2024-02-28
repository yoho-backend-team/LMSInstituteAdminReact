
import { useSelector } from 'react-redux';
// import tinycolor from 'tinycolor2';
const DefaultPalette = () => {
  // const generatePrimaryObject = (primaryColor) => {
  //   const color = tinycolor(primaryColor);

  //   return {
  //     light: color.lighten(20).toHexString(),
  //     main: primaryColor,
  //     dark: color.darken(40).toHexString(),
  //     800: color.darken(40).toHexString(),
  //     200: color.lighten(60).toHexString(),
  //     contrastText: '#FFF'
  //   };
  // };
  // ** Vars

  const isDarkMode = useSelector((state) => state.customization.darkMode);
  const skin = 'default';
  const mode = isDarkMode ? 'dark' : 'light';
  const whiteColor = '#FFF';
  const lightColor = '47, 43, 61';
  const darkColor = '208, 212, 241';
  const darkPaperBgColor = '#2F3349';
  const mainColor = mode === 'light' ? lightColor : darkColor;

  // const primary = generatePrimaryObject('#D80032');
  // const secondary = generatePrimaryObject('#F79BD3');
  const defaultBgColor = () => {
    if (skin === 'bordered' && mode === 'light') {
      return whiteColor;
    } else if (skin === 'bordered' && mode === 'dark') {
      return darkPaperBgColor;
    } else if (mode === 'light') {
      return '#F8F7FA';
    } else return '#25293C';
  };

  return {
    customColors: {
      dark: darkColor,
      main: mainColor,
      light: lightColor,
      lightPaperBg: whiteColor,
      darkPaperBg: darkPaperBgColor,
      bodyBg: mode === 'light' ? '#F8F7FA' : '#25293C',
      trackBg: mode === 'light' ? '#F1F0F2' : '#363B54',
      avatarBg: mode === 'light' ? '#DBDADE' : '#4A5072',
      tableHeaderBg: mode === 'light' ? '#F6F6F7' : '#4A5072'
    },
    mode: mode,
    common: {
      black: '#000',
      white: whiteColor
    },
    // primary: primary,
    primary: {
      light: '#e3e1fc',
      main: '#7367F0',
      dark: '#655BD3',
      800: '#2e2960',
      200: '#c7c2f9',
      contrastText: whiteColor
    },
    secondary: {
      light: '#d3eafd',
      200: '#a6d5fa',
      main: '#2196f3',
      dark: '#1e88e5',
      800: '#0d3c61',
      contrastText: whiteColor
    },
    // secondary: secondary,

    error: {
      light: '#ED6F70',
      main: '#EA5455',
      dark: '#CE4A4B',
      contrastText: whiteColor
    },
    warning: {
      light: '#FFAB5A',
      main: '#FF9F43',
      dark: '#E08C3B',
      contrastText: whiteColor
    },
    info: {
      light: '#1FD5EB',
      main: '#00CFE8',
      dark: '#00B6CC',
      contrastText: whiteColor
    },
    success: {
      light: '#42CE80',
      main: '#28C76F',
      dark: '#23AF62',
      contrastText: whiteColor
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161'
    },
    dark: {
      light: '#bdc8f0',
      main: '#29314f',
      dark: '#212946',
      800: '#1a223f'
      // 900: theme.colors?.darkPaper
    },
    orange: {
      light: '#fbe9e7',
      main: '#ffab91',
      dark: '#d84315'
    },
    text: {
      primary: `rgba(${mainColor}, 0.78)`,
      secondary: `rgba(${mainColor}, 0.68)`,
      disabled: `rgba(${mainColor}, 0.42)`
    },
    divider: `rgba(${mainColor}, 0.16)`,
    background: {
      paper: mode === 'light' ? whiteColor : darkPaperBgColor,
      default: defaultBgColor()
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      selected: `rgba(${mainColor}, 0.06)`,
      selectedOpacity: 0.06,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`
    }
  };
};

export default DefaultPalette;
