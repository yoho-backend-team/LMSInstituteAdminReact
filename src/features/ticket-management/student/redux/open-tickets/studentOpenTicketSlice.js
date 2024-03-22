// studentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const studentOpenTicketSlice = createSlice({
  name: 'studentOpenTickets',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setStudentOpenTickets: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setStudentOpenTickets, setLoading } = studentOpenTicketSlice.actions;
export default studentOpenTicketSlice.reducer;
