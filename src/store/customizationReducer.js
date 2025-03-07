// project imports
import config from 'config';
import secureLocalStorage from 'react-secure-storage';

// action - state management
import * as actionTypes from './actions';

const getInitialDarkModeState = () => {
  const storedDarkMode = secureLocalStorage.getItem('darkMode');
  return storedDarkMode ? JSON.parse(storedDarkMode) : false;
};

const getInitialFontFamilyState = () => {
  const storedFontFamily = secureLocalStorage.getItem('fontFamily');
  return storedFontFamily || config.fontFamily;
};

const getInitialBorderRadiusState = () => {
  const storedBorderRadius = secureLocalStorage.getItem('borderRadius');
  return storedBorderRadius || config.borderRadius;
};

export const initialState = {
  isOpen: [], // for active default menu
  defaultId: 'default',
  fontFamily: getInitialFontFamilyState(),
  borderRadius: getInitialBorderRadiusState(),
  opened: true,
  darkMode: getInitialDarkModeState()
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action) => {
  let id;
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      id = action.id;
      return {
        ...state,
        isOpen: [id]
      };
    case actionTypes.SET_MENU:
      return {
        ...state,
        opened: action.opened
      };
    case actionTypes.SET_FONT_FAMILY:
      // Save to secure local storage
      secureLocalStorage.setItem('fontFamily', action.fontFamily);
      return {
        ...state,
        fontFamily: action.fontFamily
      };
    case actionTypes.SET_BORDER_RADIUS:
      // Save to secure local storage
      secureLocalStorage.setItem('borderRadius', action.borderRadius);
      return {
        ...state,
        borderRadius: action.borderRadius
      };
    case actionTypes.TOGGLE_DARK_MODE:
      secureLocalStorage.setItem('darkMode', JSON.stringify(!state.darkMode));

      return {
        ...state,
        darkMode: !state.darkMode
      };
    default:
      return state;
  }
};

export default customizationReducer;