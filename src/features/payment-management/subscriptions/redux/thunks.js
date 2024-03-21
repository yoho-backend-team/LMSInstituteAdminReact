// groupThunks.js
import { getAllSubscriptions as fetchAllSubscriptions } from '../services'; // Replace with your service file
import { setSubscriptions, setLoading } from './slices';

export const getSubscriptions = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllSubscriptions(data); // Implement this function in your services
    dispatch(setSubscriptions(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
