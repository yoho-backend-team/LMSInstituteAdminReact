// groupThunks.js
import { getAllStudentAttendances as fetchAllStudentAttendances } from '../services/studentAttendanceServices'; // Replace with your service file
import { setStudentAttendances, setLoading } from './studentAttendanceSlice';

export const getAllStudentAttendances = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllStudentAttendances(data); // Implement this function in your services
    dispatch(setStudentAttendances(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
