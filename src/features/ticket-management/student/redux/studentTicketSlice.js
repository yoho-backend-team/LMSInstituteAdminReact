// studentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const studentTicketSlice = createSlice({
  name: 'studentTickets',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setStudentTickets: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setStudentTickets, setLoading } = studentTicketSlice.actions;
export default studentTicketSlice.reducer;
