// subscriptionsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    data: [],
    loading: true,
    upgrade: [] 
  },
  reducers: {
    setSubscriptions: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUpgrade: (state, action) => {
      state.upgrade = [...state.upgrade, action.payload];
    }
  }
});

export const { setSubscriptions, setLoading, setUpgrade } = subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;
