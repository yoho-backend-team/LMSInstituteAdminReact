// groupThunks.js
import { getAllNotifications as fetchAllAllNotifications } from '../services/allNotificationServices'; // Replace with your service file
import { setAllNotifications, setLoading } from './allNotificationSlice';

export const getAllNotifications = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllAllNotifications(data);
    dispatch(setAllNotifications(response));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
