// staffSlice.js
import { createSlice } from '@reduxjs/toolkit';

const staffClosedTicketSlice = createSlice({
  name: 'staffClosedTickets',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setStaffClosedTickets: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setStaffClosedTickets, setLoading } = staffClosedTicketSlice.actions;
export default staffClosedTicketSlice.reducer;
