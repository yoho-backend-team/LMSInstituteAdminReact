// coursesThunks.js
import { getAllCoursesByBranch as fetchAllCourses } from '../services/courseServices'; // Replace with your service file
import { setCourses, setLoading } from './courseSlice';

export const getAllCourses = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllCourses(data); 
    console.log(response,response.data.data)
    dispatch(setCourses(response?.data.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
