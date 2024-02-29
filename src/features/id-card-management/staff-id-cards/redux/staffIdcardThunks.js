// groupThunks.js
import { getAllStaffIdCards as fetchAllStaffIdCards } from '../services/staffIdcardServices'; // Replace with your service file
import { setStaffIdCards, setLoading } from './staffIdcardSlice';

export const getAllStaffIdCards = (selectedBranchId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllStaffIdCards(selectedBranchId); // Implement this function in your services
    dispatch(setStaffIdCards(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
