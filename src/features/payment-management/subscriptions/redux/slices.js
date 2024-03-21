// subscriptionsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setSubscriptions: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setSubscriptions, setLoading } = subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;
