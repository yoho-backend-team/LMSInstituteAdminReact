import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import groupReducer from 'features/user-management/groups-page/redux/groupSlice';
import calendar from 'features/calender/redux/reducers';
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  groups: groupReducer,
  calendar: calendar
});

export default reducer;
