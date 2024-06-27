// groupThunks.js
import { getAllBatchesByBranch as fetchAllBatches } from '../services/batchServices'; // Replace with your service file
import { setBatches, setLoading } from './batchSlice';

export const getAllBatches = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllBatches(data); // Implement this function in your services
    dispatch(setBatches(response));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
