// teachingStaffsThunks.js
import { getAllTeachingStaffs as fetchAllTeachingStaffs } from '../services/teachingStaffServices'; // Replace with your service file
import { setTeachingStaffs, setLoading } from './teachingStaffSlice';

export const getAllTeachingStaffs = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllTeachingStaffs(); // Implement this function in your services
    dispatch(setTeachingStaffs(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
