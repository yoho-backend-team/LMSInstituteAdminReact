// groupThunks.js
import { getAllStaffNotifications as fetchAllStaffNotifications } from '../services/staffNotificationServices'; // Replace with your service file
import { setStaffNotifications, setLoading } from './staffNotificationSlice';

export const getAllStaffNotifications = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllStaffNotifications(data); // Implement this function in your services
    dispatch(setStaffNotifications(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
