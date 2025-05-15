// groupThunks.js
import { getAllSubscriptions as fetchAllSubscriptions } from '../services'; 
import { setSubscriptions, setLoading } from './slices';

export const getSubscriptions = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllSubscriptions(data); 
    dispatch(setSubscriptions(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
