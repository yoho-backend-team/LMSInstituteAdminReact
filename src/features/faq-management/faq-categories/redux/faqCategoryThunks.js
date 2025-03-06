// FaqCategoryThunks.js
import { getAllFaqCategories as fetchAllFaqCategories } from '../services/faqCategoryServices'; // Replace with your service file
import { setFaqCategories, setLoading } from './faqCategorySlice';

export const getAllFaqCategories = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    console.log('All categories  details:', data);
    const response = await fetchAllFaqCategories(data); 
    console.log('All categories  response:', response);

    
    dispatch(setFaqCategories(response));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
 