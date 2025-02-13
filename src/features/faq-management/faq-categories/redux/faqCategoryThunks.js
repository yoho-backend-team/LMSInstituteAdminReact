// FaqCategoryThunks.js
import { getAllFaqCategories as fetchAllFaqCategories } from '../services/faqCategoryServices'; // Replace with your service file
import { setFaqCategories, setLoading } from './faqCategorySlice';

export const getAllFaqCategories = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllFaqCategories(data); // Implement this function in your services
    console.log("all categories",response)
    dispatch(setFaqCategories(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
 