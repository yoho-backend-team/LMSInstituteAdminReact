// studentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const staffTicketSlice = createSlice({
  name: 'staffTickets',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setStaffTickets: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setStaffTickets, setLoading } = staffTicketSlice.actions;
export default staffTicketSlice.reducer;
