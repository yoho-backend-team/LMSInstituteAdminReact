// FaqCategoryThunks.js
import { getAllCommunities as fetchAllCommunities } from '../services/communityServices'; // Replace with your service file
import { setCommunities, setLoading } from './communitySlice';

export const getAllCommunities = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllCommunities(data);
    dispatch(setCommunities(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
