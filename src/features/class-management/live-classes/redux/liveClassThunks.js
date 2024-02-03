// liveClassesThunks.js
import { getAllLiveClasses as fetchAllLiveClasses } from '../services/liveClassServices'; // Replace with your service file
import { setLiveClasses, setLoading } from './liveClassSlice';

export const getAllLiveClasses = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllLiveClasses(); // Implement this function in your services
    dispatch(setLiveClasses(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
