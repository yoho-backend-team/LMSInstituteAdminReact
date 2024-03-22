// staffSlice.js
import { createSlice } from '@reduxjs/toolkit';

const staffOpenTicketSlice = createSlice({
  name: 'staffOpenTickets',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setStaffOpenTickets: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setStaffOpenTickets, setLoading } = staffOpenTicketSlice.actions;
export default staffOpenTicketSlice.reducer;
