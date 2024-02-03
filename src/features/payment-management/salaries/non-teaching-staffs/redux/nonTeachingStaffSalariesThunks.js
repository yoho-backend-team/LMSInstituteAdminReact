// groupThunks.js
import { getAllNonTeachingStaffSalaries as fetchAllNonTeachingStaffSalaries } from '../services/nonTeachingStaffSalariesServices'; // Replace with your service file
import { setNonTeachingStaffSalaries, setLoading } from './nonTeachingStaffSalariesSlice';

export const getAllNonTeachingStaffSalaries = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllNonTeachingStaffSalaries(); // Implement this function in your services
    dispatch(setNonTeachingStaffSalaries(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
