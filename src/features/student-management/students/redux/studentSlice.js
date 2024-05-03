// studentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setStudents: (state, action) => {
      console.log(state.data,action.payload)
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setStudents, setLoading } = studentSlice.actions;
export default studentSlice.reducer;
