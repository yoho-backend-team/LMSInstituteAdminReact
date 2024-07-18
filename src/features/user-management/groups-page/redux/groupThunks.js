// groupThunks.js
import { getAllGroupsByInstitute as fetchAllGroups } from '../services/groupService'; // Replace with your service file
import { setGroups, setLoading } from './groupSlice';

export const getAllGroups = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllGroups(data); // Implement this function in your services
    dispatch(setGroups(response));
    dispatch(setLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(setLoading(false));
  } finally {
    dispatch(setLoading(false));
  }
};
