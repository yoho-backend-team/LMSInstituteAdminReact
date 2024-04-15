// courseModuleThunks.js
import { getAllCourseModules as fetchAllCourseModules } from '../services/moduleServices'; // Replace with your service file
import { setCourseModules, setLoading } from './moduleSlice';

export const getAllCourseModules = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllCourseModules(data); // Implement this function in your services
    dispatch(setCourseModules(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
