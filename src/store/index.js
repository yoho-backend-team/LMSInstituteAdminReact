// import { createStore } from 'redux';
// import reducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';
import customizationReducer from './customizationReducer';
import groupReducer from 'features/user-management/groups/redux/groupSlice';
import userReducer from 'features/user-management/users/redux/userSlices';
import batchReducer from 'features/batch-management/batches/redux/batchSlice';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
  reducer: {
    customization: customizationReducer,
    groups: groupReducer,
    users: userReducer,
    batches: batchReducer
  }
});
// configureStore(reducer);
const persister = 'Free';

export { store, persister };
