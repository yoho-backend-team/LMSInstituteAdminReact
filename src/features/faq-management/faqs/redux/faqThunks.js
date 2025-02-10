// FaqCategoryThunks.js
import { getAllFaqs as fetchAllFaqs } from '../services/faqServices'; 
import { setFaqs, setLoading } from './faqSlice';

export const getAllFaqs = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllFaqs(data); 
    dispatch(setFaqs(response));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
