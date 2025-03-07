// FaqCategoryThunks.js
import { getAllFaqs as fetchAllFaqs } from '../services/faqServices'; 
import { setFaqs, setLoading } from './faqSlice';

export const getAllFaqs = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllFaqs(data); 
    console.log('All faqs  response:', response);
    dispatch(setFaqs(response));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
