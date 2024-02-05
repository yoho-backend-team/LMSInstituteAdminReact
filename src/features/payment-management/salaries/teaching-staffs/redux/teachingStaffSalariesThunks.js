// groupThunks.js
import { getAllTeachingStaffSalaries as fetchAllTeachingStaffSalaries } from '../services/teachingStaffSalariesServices'; // Replace with your service file
import { setTeachingStaffSalaries, setLoading } from './teachingStaffSalariesSlice';

export const getAllTeachingStaffSalaries = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllTeachingStaffSalaries(); // Implement this function in your services
    dispatch(setTeachingStaffSalaries(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
