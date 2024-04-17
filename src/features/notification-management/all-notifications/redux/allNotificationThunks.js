// groupThunks.js
import { getAllNotifications as fetchAllAllNotifications } from '../services/allNotificationServices'; // Replace with your service file
import { setAllNotifications, setLoading } from './allNotificationSlice';

export const getAllNotifications = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllAllNotifications(data); // Implement this function in your services
    dispatch(setAllNotifications(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
