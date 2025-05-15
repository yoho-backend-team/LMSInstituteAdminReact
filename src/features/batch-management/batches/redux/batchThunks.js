// groupThunks.js
import { getAllBatchesByBranch as fetchAllBatches } from '../services/batchServices'; // Replace with your service file
import { setBatches, setLoading } from './batchSlice';

export const getAllBatches = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllBatches(data); // Implement this function in your services
    console.log('batches response in thunks:', response);
    dispatch(setBatches(response));
    return response?.course_id;
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
