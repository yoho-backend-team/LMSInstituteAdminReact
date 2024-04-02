// communitySlice.js
import { createSlice } from '@reduxjs/toolkit';

const communitySlice = createSlice({
  name: 'communities',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setCommunities: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setCommunities, setLoading } = communitySlice.actions;
export default communitySlice.reducer;
