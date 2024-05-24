// groupThunks.js
import { getAllOfflineClasses as fetchAllOfflineClasses } from '../services/offlineClassServices'; // Replace with your service file
import { setOfflineClasses, setLoading } from './offlineClassSlice';

export const getAllOfflineClasses = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllOfflineClasses(data); // Implement this function in your services
    dispatch(setOfflineClasses(response));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
