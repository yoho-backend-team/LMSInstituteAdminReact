// groupThunks.js
import { getAllAllNotifications as fetchAllAllNotifications } from '../services/allNotificationServices'; // Replace with your service file
import { setAllNotifications, setLoading } from './allNotificationSlice';

export const getAllAllNotifications = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllAllNotifications(); // Implement this function in your services
    dispatch(setAllNotifications(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
