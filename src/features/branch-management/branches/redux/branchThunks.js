// groupThunks.js
import { getAllBranches as fetchAllBranches } from '../services/branchServices'; // Replace with your service file
import { setBranches, setLoading } from './branchSlice';

export const getAllBranches = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllBranches(); // Implement this function in your services
    dispatch(setBranches(response.data.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
