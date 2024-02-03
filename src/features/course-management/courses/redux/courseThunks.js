// coursesThunks.js
import { getAllCourses as fetchAllCourses } from '../services/courseServices'; // Replace with your service file
import { setCourses, setLoading } from './courseSlice';

export const getAllCourses = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllCourses(); // Implement this function in your services
    dispatch(setCourses(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
