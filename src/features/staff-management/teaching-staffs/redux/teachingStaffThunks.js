// teachingStaffsThunks.js
import { getAllTeachingStaffs as fetchAllTeachingStaffs } from '../services/teachingStaffServices'; // Replace with your service file
import { setTeachingStaffs, setLoading } from './teachingStaffSlice';

export const getAllTeachingStaffs = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllTeachingStaffs(data); // Implement this function in your services
    dispatch(setTeachingStaffs(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
