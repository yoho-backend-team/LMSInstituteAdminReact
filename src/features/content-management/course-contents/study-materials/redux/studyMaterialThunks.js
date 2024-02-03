// courseStudyMaterialsThunks.js
import { getAllCourseStudyMaterials as fetchAllCourseStudyMaterials } from '../services/studyMaterialServices'; // Replace with your service file
import { setCourseStudyMaterials, setLoading } from './studyMaterialSlice';

export const getAllCourseStudyMaterials = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllCourseStudyMaterials(); // Implement this function in your services
    dispatch(setCourseStudyMaterials(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
