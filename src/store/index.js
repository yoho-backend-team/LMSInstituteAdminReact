// import { createStore } from 'redux';
// import reducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';
import customizationReducer from './customizationReducer';
import groupReducer from 'features/user-management/groups/redux/groupSlice';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
  reducer: {
    customization: customizationReducer,
    groups: groupReducer
  }
});
// configureStore(reducer);
const persister = 'Free';

export { store, persister };
