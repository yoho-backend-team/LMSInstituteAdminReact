// faqCategorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const HelpCenterSlice = createSlice({
  name: 'helpcenter',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setHelpCenter: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setHelpCenter, setLoading } = HelpCenterSlice.actions;
export default HelpCenterSlice.reducer;
