// groupThunks.js
import { getAllStudentNotifications as fetchAllStudentNotifications } from '../services/studentNotificationServices'; // Replace with your service file
import { setStudentNotifications, setLoading } from './studentNotificationSlice';

export const getAllStudentNotifications = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllStudentNotifications(); // Implement this function in your services
    dispatch(setStudentNotifications(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
