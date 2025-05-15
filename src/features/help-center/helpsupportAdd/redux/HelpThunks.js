// FaqCategoryThunks.js
import { getAllHelpCenterDetails as fetchAllHelpCenter } from '../service/helpCenter';
import { setHelpCenter,setLoading } from './HelpSlices';


export const getAllHelpCenterDetails = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllHelpCenter(data);
    
    dispatch(setHelpCenter(response?.data));
   
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
 