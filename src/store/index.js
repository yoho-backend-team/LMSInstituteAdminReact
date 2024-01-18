// import { createStore } from 'redux';
// import reducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';
import customizationReducer from './customizationReducer';
import groupReducer from 'features/user-management/groups/redux/groupSlice';
import userReducer from 'features/user-management/users/redux/userSlices';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
  reducer: {
    customization: customizationReducer,
    groups: groupReducer,
    users: userReducer
  }
});
// configureStore(reducer);
const persister = 'Free';

export { store, persister };
