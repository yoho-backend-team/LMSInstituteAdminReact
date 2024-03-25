// StudentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const studentClosedTicketSlice = createSlice({
  name: 'studentClosedTickets',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setStudentClosedTickets: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setStudentClosedTickets, setLoading } = studentClosedTicketSlice.actions;
export default studentClosedTicketSlice.reducer;
