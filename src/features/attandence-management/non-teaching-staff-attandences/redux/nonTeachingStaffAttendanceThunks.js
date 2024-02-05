// nonTeachingAttendanceThunks.js
import { getAllNonTeachingStaffAttendances as fetchAllNonTeachingStaffAttendances } from '../services/nonNonTeachingStaffAttendanceServices'; // Replace with your service file
import { setNonTeachingStaffAttendances, setLoading } from './nonNonTeachingStaffAttendanceSlice';

export const getAllNonTeachingStaffAttendances = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllNonTeachingStaffAttendances(); // Implement this function in your services
    dispatch(setNonTeachingStaffAttendances(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
