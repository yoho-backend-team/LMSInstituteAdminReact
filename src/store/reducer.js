import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import groupReducer from 'features/user-management/groups/redux/groupSlice';
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  groups: groupReducer
});

export default reducer;
